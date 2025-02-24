import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    favorite_tooltip: `Add/Remove from the "Favorites" section in multiple ways:<br/>
    - Click the star icon<br/>
    - Double-tap a movie item`,
  },
  fr: {
    favorite_tooltip: `FR version`,
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
