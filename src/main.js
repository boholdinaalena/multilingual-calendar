import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { languages } from './i18n'
import { defaultLocal } from './i18n'
import { createI18n , useI18n } from 'vue-i18n'

const localeStorageLang = localStorage.getItem('lang')

const messages = Object.assign(languages)
const i18n = createI18n({
    legacy: false,
    locale: localeStorageLang || defaultLocal,
    fallbackLocale: 'ru',
    messages
})

createApp(App,
    {
        setup() {
            const {t} = useI18n()
            return {t}
        }
    }).use(i18n).mount('#app')
