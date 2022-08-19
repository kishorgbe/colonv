const { app, BrowserWindow, ipcMain, clipboard } = require("electron");
const path = require("path");

// For development
require("electron-reloader")(module, {
  watchRenderer: true
});

let win;
const createWindow = () => {
  win = new BrowserWindow({
    height: 600,
    width: 1024,
    minWidth: 800,
    minHeight: 400,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.resolve(__dirname, "./preload.js")
    },
    icon: path.resolve(__dirname, "./public/icons/logo.png")
  });

  win.webContents.openDevTools();
  win.loadFile(__dirname + "/public/index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Inter process communication - IPC
let isMaximized = false;
ipcMain.on("close-app", () => win.close());
ipcMain.on("minimize-app", () => win.minimize());
ipcMain.on("maximize-app", () => {
  isMaximized = !isMaximized;
  isMaximized ? win.unmaximize() : win.maximize();
});
ipcMain.on("open-console", () => win.webContents.openDevTools());
ipcMain.on("copy-code", (event, text) => clipboard.writeText(text));
