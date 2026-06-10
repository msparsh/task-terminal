// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  runTaskbook: (args) => ipcRenderer.invoke('run-tb', args)
});