const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require("path")
let win;
function MainWindow() {
    win = new BrowserWindow({
        height: 864,
        width: 1536,
        frame: false,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    //win.setFullScreen(true);
    win.loadFile("index.html");
    win.webContents.on('will-navigate', (e, url) => {
        //e.preventDefault()
    });
}
app.whenReady().then(MainWindow);
app.on('window-all-closed', () => {
    app.quit()
    process.exit();
});
ipcMain.on('minimize', async () => {
    win.minimize()
});
ipcMain.on('maximize', async () => {
    if (win.isMaximized()) win.unmaximize()
    else win.maximize()
});
