import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'
import App from './App.vue'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/icons.css'

const pinia = createPinia()
const bootstrap = createBootstrap()

const app = createApp(App)
app.use(pinia)
app.use(bootstrap)
app.mount('#app')
