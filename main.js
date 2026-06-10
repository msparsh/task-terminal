const { app, BrowserWindow, nativeImage, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs'); // 📁 Added fs

// 📂 Define the target path: Documents/Tasks/tasks.json
const tasksDir = path.join(app.getPath('documents'), 'Tasks');
const tasksFile = path.join(tasksDir, 'tasks.json');

// 🏗️ Ensure directory exists when the app starts
if (!fs.existsSync(tasksDir)) {
  fs.mkdirSync(tasksDir, { recursive: true });
}

// 🔌 Synchronous IPC Handlers for reading/writing
ipcMain.on('get-data', (event) => {
  if (fs.existsSync(tasksFile)) {
    event.returnValue = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'));
  } else {
    event.returnValue = { items: {}, archive: {} }; // Default empty state 📭
  }
});

ipcMain.on('save-data', (event, data) => {
  fs.writeFileSync(tasksFile, JSON.stringify(data, null, 2)); 
  event.returnValue = true; // ✅ Acknowledge save
});

function createWindow() {
  const blankIcon = nativeImage.createEmpty();
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: true,
    autoHideMenuBar: true,
    title: 'Task Terminal',
    icon: blankIcon,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    backgroundColor: '#0a0e17',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // 🔗 Hooking up the preload script!
      preload: path.join(__dirname, 'preload.js') 
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