const path = require('path')

const pathFile = path.join(__dirname, 'dist', 'prealod.js')

function getElectronPath() {
  return pathFile
}

module.exports = getElectronPath()

