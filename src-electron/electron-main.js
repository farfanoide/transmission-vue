import { app, BrowserWindow, nativeTheme } from 'electron'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  // TODO: save last window size on localstorage and use it after
  // initialization
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 900,
    useContentSize: true,
    webPreferences: {
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
      webSecurity: false, // enable CORS free requests
      // we enable contextIsolation (Electron 12+ has it enabled by default anyway)
      contextIsolation: true,
      // we use a new way to reference the preload script
      // (it's going to be needed, so add it and create the file if it's not there already)
      preload: require('path').resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  // if (process.env.DEBUGGING) {
  //   // if on DEV or Production with debug enabled
  //   mainWindow.webContents.openDevTools()
  // }
  // else {
  //   // we're on production; no access to devtools pls
  //   mainWindow.webContents.on('devtools-opened', () => {
  //     mainWindow.webContents.closeDevTools()
  //   })
  // }
  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
