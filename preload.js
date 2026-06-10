// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // ⚡ Using sendSync to avoid rewriting the frontend with async/await
  loadDataSync: () => ipcRenderer.sendSync('get-data'),
  saveDataSync: (data) => ipcRenderer.sendSync('save-data', data)
});