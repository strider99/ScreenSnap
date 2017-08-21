const electron = require('electron');
const path = require('path');
const { app, BrowserWindow, globalShortcut, Menu, Tray} = electron;

let mainWindow;

function startApp(){
  mainWindow = new BrowserWindow({
    frame: false,
    width: 0,
    height: 0,
    resizable: false
  });

  mainWindow.loadURL(`file://${__dirname}/capture.html`);

  const tray = new Tray(path.join(__dirname, 'icon.png'));
  const template = [
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ];
  tray.setToolTip("Press Ctrl + Alt + P to take a screeshot");
  let menu = Menu.buildFromTemplate(template);
  tray.setContextMenu(menu);

  globalShortcut.register('Ctrl+Alt+P', () => {
    mainWindow.webContents.send('capture', app.getPath('pictures'));

  })
  mainWindow.on('closed', closeApp);

}


function closeApp() {
  mainWindow = null;
  app.quit();
}

app.on('ready', startApp);

