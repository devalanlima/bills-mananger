const { app, BrowserWindow } = require('electron');
const path = require('path');

require('dotenv').config();


function createWindow() {

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // If you have a preload script
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL || path.join(__dirname, './index.html')
  );

  mainWindow.on('closed', function () {
    app.quit();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
