import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';
import 'dotenv/config'

let mainWindow;

async function handleFolderSelect() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (!canceled) {
    return filePaths[0];
  }
  return undefined;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 2000,
    height: 980,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      webSecurity: false
    }
  });

  // Vite dev server URL
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFolder', handleFolderSelect);
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});
