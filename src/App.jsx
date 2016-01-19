import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StateControl from './components/state-control/renderer/StateControl';

class App extends Component {
  render() {
    return (
      <StateControl />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
