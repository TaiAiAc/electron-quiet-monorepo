const path = require('path')

const pathFile = path.join(__dirname, 'dist', 'preload.js')

function getElectronPath() {
  return pathFile
}

module.exports = getElectronPath()

