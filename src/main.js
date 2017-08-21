const electron = require('electron');
const { app, BrowserWindow, globalShortcut} = electron;

let mainWindow;

function startApp(){
  mainWindow = new BrowserWindow({
    width: 900,
    height: 900
  });
  mainWindow.loadURL(`file://${__dirname}/capture.html`);
  mainWindow.openDevTools();

  globalShortcut.register('Ctrl+Alt+P', () => {
    mainWindow.webContents.send('capture', app.getPath('pictures'));

  })

}


function closeApp() {
  mainWindow = null;
  app.quit();
}

app.on('ready', startApp);
app.on('closed', closeApp);
