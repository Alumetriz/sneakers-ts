import './main.css'

import { createApp } from 'vue'
import { router } from '@/router'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
