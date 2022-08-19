const { contextBridge, ipcRenderer } = require("electron");

// Context isolation
// contextBridge.exposeInMainWorld("api", {
//   closeApp: () => ipcRenderer.send("close-app"),
//   minimizeApp: () => ipcRenderer.send("minimize-app"),
//   maximizeApp: () => ipcRenderer.send("maximize-app")
// });

window.api = {
  closeApp: () => ipcRenderer.send("close-app"),
  minimizeApp: () => ipcRenderer.send("minimize-app"),
  maximizeApp: () => ipcRenderer.send("maximize-app"),
  openConsole: () => ipcRenderer.send("open-console"),
  copyCode: (text) => ipcRenderer.send("copy-code", text.trim())
};
