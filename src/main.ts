import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/scss/app.scss'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
