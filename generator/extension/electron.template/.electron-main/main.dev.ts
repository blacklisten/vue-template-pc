// Set environment for development
const installExtension = require("electron-devtools-installer")
const { VUEJS_DEVTOOLS } = installExtension
const electron = require("electron")
const debug = require("electron-debug")

electron.app.whenReady().then(() => {
  installExtension.default(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err))
    .finally(() => {
      debug({ showDevTools: true })
    })
});

// Require `main` process to boot app
<%_ if (options.classComponent) { _%>
require("./main.ts"); 
<%_ } else { _%>
require("./main.js"); 
<%_ } _%>

