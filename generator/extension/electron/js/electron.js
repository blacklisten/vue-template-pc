
const init = () => {
  if (window.navigator.userAgent.includes('Electron')) {
    const { ELECTRON_CONTROL } = require('va-electron-control')
    window.ELECTRON_CONTROL = ELECTRON_CONTROL
    window.ELECTRON_CONTROL.getMessage((event, { message, data }) => {
      if (message === 'from') {
        window.ISFROM = data
      }
    })
  }
}

export default init
