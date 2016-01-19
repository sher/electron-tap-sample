'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _electron2.default.app;
var BrowserWindow = _electron2.default.BrowserWindow;

var win = null;

app.on('window-all-closed', app.quit);

app.on('ready', function onReady() {
  var screen = _electron2.default.screen;

  var displays = screen.getAllDisplays();
  var primaryDisplay = screen.getPrimaryDisplay();
  var externalDisplay = null;

  for (var i in displays) {
    if (displays[i].id !== primaryDisplay.id) {
      externalDisplay = displays[i];
      break; // select the second external display
    }
  }

  var targetDisplay = externalDisplay || primaryDisplay;

  win = new BrowserWindow({
    x: targetDisplay.workArea.x,
    y: targetDisplay.workArea.y,
    width: targetDisplay.workArea.width / 2,
    height: targetDisplay.workArea.height
  });

  win.loadURL(_path2.default.join('file://', __dirname, 'index.html'));
  win.on('closed', function onClose() {
    win = null;
  });
});
//# sourceMappingURL=index.js.map
