// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$ipc', {
  send: (...args) => ipcRenderer.send(...args),
  sendSync: (...args) => ipcRenderer.sendSync(...args),
  invoke: (...args) => ipcRenderer.invoke(...args),
  on: (...args) => ipcRenderer.on(...args),
  once: (...args) => ipcRenderer.once(...args),
  removeAllListeners: (...args) =>
    ipcRenderer.removeAllListeners(...args)
})
