import electronControlTypes from 'va-electron-control'

const init = () => {
  if (window.navigator.userAgent.includes('Electron')) {
    const { ELECTRON_CONTROL }: { ELECTRON_CONTROL: typeof electronControlTypes.ELECTRON_CONTROL } = require('va-electron-control')
    window.ELECTRON_CONTROL = ELECTRON_CONTROL
    window.ELECTRON_CONTROL.getMessage((event: any, { message, data }: any): any => {
      if (message === 'from') {
        window.ISFROM = data
      }
    })
  }
}

export default init

