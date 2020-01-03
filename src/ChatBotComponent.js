import React, { Component } from 'react';
import { Container, Row, Col, Table, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
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
    }

    componentDidMount() {
        this.riverScript = new window.RiveScript({
        });

        // Load our files 
        this.riverScript.loadFile([
            window.location.href + "/testsuite.rive"
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

            this.setState({ answare: responseAnsware })
        });
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

    render() {
        return (
            <Container className="appWrapper">
                <span className="contentScreen">

                    <Row className="topWrapper">
                        <div className="close">
                            <div data-size="normal" className="tpl-close">
                                <FontAwesomeIcon onClick={this.botQuestion} icon={faTimes} />
                            </div>
                        </div>
                        <Col>
                            <div  className="botName">Kassandra</div>
                        </Col>
                    </Row>
                    <Row className="conversation">
                        <Col>
                            <Table responsive>
                                <tbody>
                                    {this.state.answare.map(item => (
                                        <tr className={item.classTd} >
                                            <td className={item.className} >{item.message}</td>
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
                                    placeholder="Write here..." className="inputForm" onKeyPress={this.submitInput} onChange={this.updateInputValue} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                                <InputGroup.Prepend>
                                    <FontAwesomeIcon onClick={this.botQuestion} icon={faPaperPlane} size="2x" />
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