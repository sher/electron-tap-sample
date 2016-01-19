'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = require('electron');

var status = {
  state: 'OFF'
};

_electron.ipcMain.on('switch-state', function (event) {
  // synchronous response
  event.returnValue = status.state;
});

_electron.ipcMain.on('switch-on', function (event) {
  // async response
  status.state = 'ON';
  event.sender.send('switch-response', status.state);
});

_electron.ipcMain.on('switch-off', function (event) {
  // ... some processing
  // synchronous response
  status.state = 'OFF';
  event.returnValue = status.state;
});

exports.default = status;
//# sourceMappingURL=state-machine.js.map
