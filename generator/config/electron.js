exports.devDependencies = {
  "@types/node": "^14.11.2",
  "@types/webpack-env": "^1.15.3",
  "babili-webpack-plugin": "^0.1.2",
  "cfonts": "^2.8.6",
  "chalk": "^4.1.0",
  "commitizen": "^4.2.1",
  "electron": "^10.1.2",
  "electron-builder": "^22.8.1",
  "fs-extra": "^9.0.1",
  "webpack": "^4.44.2",
  "webpack-dev-server": "^3.11.0",
  "webpack-hot-middleware": "^2.25.0"
}

exports.scripts = {
  "package": "npm run package:main && vue-cli-service build && electron-builder",
  "package:render": "vue-cli-service build",
  "package:main": "node ./build/build"
}

exports.dependencies = {
  "electron-debug": "^3.1.0",
  "electron-devtools-installer": "^3.1.1",
}

exports.main = "./.electron-dist/main/main.js"

exports.build = {
  "productName": "electron-vue-admin",
  "appId": "org.simulatedgreg.electron-vue",
  "directories": {
    "output": "dist"
  },
  "files": [
    ".electron-dist/**/*"
  ],
  "dmg": {
    "contents": [
      {
        "x": 410,
        "y": 150,
        "type": "link",
        "path": "/Applications"
      },
      {
        "x": 130,
        "y": 150,
        "type": "file"
      }
    ]
  },
  "mac": {
    "icon": "build/icons/icon.icns"
  },
  "win": {
    "icon": "build/icons/icon.ico"
  },
  "linux": {
    "icon": "build/icons"
  }
}