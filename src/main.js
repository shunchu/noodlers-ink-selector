// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Inks from './source_data'
import App from './App.vue'
import BootstrapVueNext from 'bootstrap-vue-next'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/icons.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(BootstrapVueNext)

app.mount('#app')
