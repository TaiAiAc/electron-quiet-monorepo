import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
console.log('window.$ipc :>> ', window.$ipc)
console.log('window.$path :>> ', window.$path)
console.log('window.$clipboard :>> ', window.$clipboard)
console.log('window.$webFrame :>> ', window.$webFrame)
