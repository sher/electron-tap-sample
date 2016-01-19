import path from 'path';
import electron from 'electron';
const { app, BrowserWindow } = electron;

let win = null;

app.on('window-all-closed', app.quit);

app.on('ready', function onReady() {
  const { screen } = electron;
  const displays = screen.getAllDisplays();
  const primaryDisplay = screen.getPrimaryDisplay();
  let externalDisplay = null;

  for (var i in displays) {
    if (displays[i].id !== primaryDisplay.id) {
      externalDisplay = displays[i];
      break; // select the second external display
    }
  }

  const targetDisplay = externalDisplay || primaryDisplay;

  win = new BrowserWindow({
    x: targetDisplay.workArea.x,
    y: targetDisplay.workArea.y,
    width: targetDisplay.workArea.width / 2,
    height: targetDisplay.workArea.height,
  });

  win.loadURL(path.join('file://', __dirname, 'index.html'));
  win.on('closed', function onClose() { win = null; });
});
