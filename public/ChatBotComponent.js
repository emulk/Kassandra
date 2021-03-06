import React, { Component } from 'react';
import { Container, Row, Col, Table, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import FormData from 'form-data';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatBotStyle.css';

class BotResponse {
    constructor(Message, ClassName, ClassTd) {
        this.message = Message;
        this.className = ClassName;
        this.classTd = ClassTd;
    }
}

class ChatBotCompontent extends Component {
    constructor(props) {
        super(props);
        let riverScript;
        this.state = {
            answare: [],
            inputValue: '',
            userMessage: [],
            botMessage: []
        };

        this.botQuestion = this.botQuestion.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.submitInput = this.submitInput.bind(this);

        this.updateAnsareResponse = this.updateAnsareResponse.bind(this);

        this.onReady = this.onReady.bind(this);
        this.onError = this.onError.bind(this);

        this.closeBot = this.closeBot.bind(this);
        this.submitButton = this.submitButton.bind(this);

        this.scrollToBottom = this.scrollToBottom.bind(this);

        this.sendLog = this.sendLog.bind(this);
    }

    componentDidMount() {
        this.riverScript = new window.RiveScript();

        // Load our files 
        this.riverScript.loadFile([
            window.location.href + "/testsuite.rive",
            window.location.href + "/myself.rive",
            window.location.href + "/eliza.rive",
            window.location.href + "/clients.rive",
            window.location.href + "/news.rive"
        ]).then(this.onReady).catch(this.onError);
        // You can register objects that can then be called
        // using <call></call> syntax
        this.riverScript.setSubroutine('fancyJSObject', function (rs, args) {
        });
    }

    onReady() {
        // Now to sort the replies!
        this.riverScript.sortReplies();
    }

    onError(err, filename, lineno) {
        console.log(err);
    }

    botQuestion() {
        if (this.state.inputValue.length > 0) {
            debugger;
            // RiveScript remembers user data by their username and can tell
            // multiple users apart.
            let username = "local-user";
            let responseAnsware = this.state.answare;
            // NOTE: the API has changed in v2.0.0 and returns a Promise now.
            this.riverScript.reply(username, this.state.inputValue).then(reply => {
                let botResponse = new BotResponse(this.state.inputValue, 'humanMessage', 'humanTd');
                responseAnsware.push(botResponse);
                botResponse = new BotResponse(reply, 'botMessage', '');
                responseAnsware.push(botResponse);

                this.sendLog(responseAnsware);

                this.setState({
                    inputValue: '',
                    answare: responseAnsware
                })

                this.scrollToBottom();
            });
        }
    }

    sendLog(responseAnsware) {
        debugger;
        var dataLog = "";
        for (var i = 0; i < responseAnsware.length; i++) {
            dataLog += responseAnsware[i].message + " : " + responseAnsware[i].className + " ; ";
        }

        let formData = new FormData();
        formData.append('log', dataLog);
        if (dataLog.length > 0) {
            fetch(window.location.href + 'log.php', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: formData
            }).then((res) => res.json())
                .then((responseJson) => {
                    console.log(responseJson.output);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    updateAnsareResponse(response) {
        this.setState({
            answare: response
        });
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    submitInput(evt) {
        if (evt.charCode === 13) {
            this.botQuestion();
            evt.target.value = '';
        }
    }

    submitButton() {
        this.botQuestion();
        document.getElementById('inputForm').value = '';
    }

    closeBot() {
        this.setState({
            inputValue: '',
            answare: []
        })
    }

    scrollToBottom() {
        var rows = document.querySelectorAll('#tableID tr');
        rows[(rows.length - 1)].scrollIntoView({
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <Container className="appWrapper">
                <span className="contentScreen">

                    <Row className="topWrapper">
                        <Col>
                            <img src="favicon.ico" alt="Icon" />
                        </Col>
                        <Col>
                            <div className="botName">Kassandra</div>
                        </Col>
                        <Col>
                            <div className="close">
                                <FontAwesomeIcon onClick={this.closeBot} icon={faTimes} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="conversation">
                        <Col>
                            <Table id="tableID" >
                                <tbody>
                                    {this.state.answare.map((item, i) => (
                                        <tr className={item.classTd} key={i} >
                                            <td className={item.className} key={i}>{item.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="typing">
                        <Col>
                            <InputGroup size="lg">
                                <FormControl
                                    placeholder="Write here..." id="inputForm" className="inputForm" onKeyPress={this.submitInput} onChange={this.updateInputValue} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                                <InputGroup.Prepend>
                                    <FontAwesomeIcon onClick={this.submitButton} icon={faPaperPlane} size="2x" />
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="bottom">
                        <Col>
                            Powered by <a target="_blank" href="https://www.elegantweb.it/">ElegantWeb</a>
                        </Col>
                    </Row>

                </span>
            </Container>
        );
    }
}

export default ChatBotCompontent;