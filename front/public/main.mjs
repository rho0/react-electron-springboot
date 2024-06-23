import { app, BrowserWindow } from 'electron';
import { dirname, join } from 'path';
import path from "node:path";
import {fileURLToPath} from "node:url";

let mainWindow;
// __dirname을 ESM에서 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_URL = 'http://localhost:3000'

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon.ico')
  });

  mainWindow.loadURL(BASE_URL); // 개발 도구에서 호스팅하는 주소로 로드합니다.
  mainWindow.webContents.openDevTools({mode: 'detach'}) // DevTools를 엽니다.

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
