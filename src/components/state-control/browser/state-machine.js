import { ipcMain } from 'electron';

let status = {
  state: 'OFF'
};

ipcMain.on('switch-state', function(event) {
  // synchronous response
  event.returnValue = status.state;
});

ipcMain.on('switch-on', function(event) {
  // async response
  status.state = 'ON';
  event.sender.send('switch-response', status.state);
});

ipcMain.on('switch-off', function(event) {
  // ... some processing
  // synchronous response
  status.state = 'OFF';
  event.returnValue = status.state;
});

export default status;
