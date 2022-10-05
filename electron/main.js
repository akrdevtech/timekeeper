const { app, BrowserWindow, ipcMain } = require('electron');
const { channels } = require('../src/shared/constants');
const path = require('path');
const url = require('url');


let mainWindow;
let splashWindow;
function createWindow() {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  const splashUrl = url.format({
    pathname: path.join(__dirname, './splashscreen/splash.html'),
    protocol: 'file:',
    slashes: true,
  });

  splashWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    show: false,
    width: 500,
    height: 500,
    alwaysOnTop: true,
  })
  splashWindow.loadURL(splashUrl)
  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  splashWindow.once('ready-to-show', (args) => {
    splashWindow.show();
    const server = require('./backend/bin/www');
    mainWindow.loadURL(startUrl);
    mainWindow.once('ready-to-show', () => {
      splashWindow.destroy();
      mainWindow.setMenu(null)
      mainWindow.maximize()
      mainWindow.show();
    })

  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});