import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import ElementPlus from 'element-plus'
import router from './routers'
import App from './App.vue'

const persist = createPersistedState()
const pinia = createPinia()
pinia.use(persist)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$store = pinia
app.mount('#app')
