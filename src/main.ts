import { createApp, type ComponentPublicInstance } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/scss/app.scss'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { globalErrorStore } from '@/stores/global-error'

const { showError } = globalErrorStore()

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.config.errorHandler = (error: unknown, _: ComponentPublicInstance | null, info: string) => {
  showError()
  console.log(error, info)
}

app.mount('#app')
