import { createApp } from 'vue'
import './style.css'
import { EventKeys, IpcWindowOptions } from '@quiteer/electron-ipc/web'
import App from './App.vue'

createApp(App).mount('#app')

console.info(import.meta.env)

window.$ipc.send('dasda')
window.$ipc.send(EventKeys.WindowOptionsKey)
