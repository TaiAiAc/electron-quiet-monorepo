import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import testPreload from './preload'
import testIpc from './ipc'

createApp(App).mount('#app')
// testPreload()
testIpc()

