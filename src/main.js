import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import './assets/main.css';
import App from './App.vue';

const app = createApp(App);
app.config.performance = import.meta.env.DEV;
app.use(createPinia());
app.mount('#app');
