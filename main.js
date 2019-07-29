const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const shell = require('electron').shell
const path = require('path')

// declare the windows
let mainWindow
let addProjectWindow

// creating a window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    // load HTML files
    mainWindow.loadFile('templates/index.html')

    //when app is closed
    app.on('closed', () => {
        mainWindow = null
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}

// when app is ready, create the window
app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow()
    }
})

// respond to button click by adding new window
ipcMain.on('add-project-window', () => {
    addProjectWindow = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        }
    })

    addProjectWindow.loadFile('templates/addProject.html')
})

// respond to button click on form and send the values to the main window
ipcMain.on('add-project-to-list', (event, arg) => {
    console.log(`Project passed: ${arg}`)
    mainWindow.webContents.send('add-project-to-list', arg)
})

// create the menu that appears at the top of the screen
const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                accelerator: 'CmdOrCtrl+N',
                click() {
                    addProjectWindow = new BrowserWindow({
                        width: 400,
                        height: 200,
                        webPreferences: {
                            nodeIntegration: true
                        }
                    })
                
                    addProjectWindow.loadFile('templates/addProject.html')
                }
            },
            {
                label: 'Clear All',
                accelerator: 'CmdOrCtrl+Shift+C',
                click() {
                    mainWindow.webContents.send('clear-all')
                }

            },
            {type: 'separator'},
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'Project Help',
        submenu: [
            {
                // help with general programming stuff
                label: 'Git Cheatsheet',
                click() {
                    shell.openExternal('https://www.git-tower.com/blog/git-cheat-sheet')
                }
            }
        ]
    }

]

if(process.platform === 'darwin') {
    menu.unshift({label: ''})
}
