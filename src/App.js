import React, { Component } from 'react';
import ChatBotCompontent from './ChatBotComponent';
import './ChatBotStyle.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatBotCompontent />
      </div>
    );
  }
}

export default App;
