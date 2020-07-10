const { app, BrowserWindow } = require('electron')

function createWindow()
{
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1200,
        height: 600,
        frame: false,
        fullscreen: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    })


    win.webContents.openDevTools();

    // load the index.html of the app.
    win.loadFile(`./build/index.html`)
}

app.on('ready', createWindow)