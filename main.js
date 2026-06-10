const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

function createWindow() {
  const blankIcon = nativeImage.createEmpty();
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: true,
    autoHideMenuBar: true,
    title: 'Terminal',          // 2️⃣ Clears the title text! 
    icon: blankIcon,

    titleBarStyle: 'hidden',      // 🙈 Hides the native title bar, icon, and text!
    titleBarOverlay: true,
    backgroundColor: '#0a0e17',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // No preload needed because the app is self-contained
    },
    show: false,
  });

  win.loadFile('index.html');
  win.once('ready-to-show', () => {
    win.show();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});