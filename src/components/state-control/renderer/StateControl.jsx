import React, { Component } from 'react';
import { remote, ipcRenderer } from 'electron';
import path from 'path';

remote.require(path.resolve(__dirname, '../browser/state-machine'));

export default class StateControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchState: ipcRenderer.sendSync('switch-state')
    };

    this.changeSwitchState = this.changeSwitchState.bind(this);
    this.setSwitchState = this.setSwitchState.bind(this);
    ipcRenderer.on('switch-response', this.setSwitchState);
  }

  changeSwitchState(event) {
    event.preventDefault();
    event.target.disabled = true;

    if (this.state.switchState == 'OFF') {
      ipcRenderer.send('switch-on');
    }
    else {
      this.setSwitchState(null, ipcRenderer.sendSync('switch-off'));
    }
  }

  setSwitchState(sender, switchState) {
    this.setState({
      switchState
    });

    this.refs.button.disabled = false;
  }

  render() {
    const buttonText = this.state.switchState == 'OFF' ? 'Switch ON' : 'Switch OFF';
    const button = <button ref='button' onClick={this.changeSwitchState}>{buttonText}</button>

    const style = {
      height: '60px',
      padding: '10px'
    };

    return (
      <div style={style}>
        <p>State: {this.state.switchState}</p>
        {button}
      </div>
    )
  }
}
