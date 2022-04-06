import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import languagedetector from "i18next-browser-languagedetector"

import en from "./languages/en/translation.json"
import ar from "./languages/ar/translation.json"
import es from "./languages/es/translation.json"
import fr from "./languages/fr/translation.json"
import ko from "./languages/ko/translation.json"
import zhCN from "./languages/zh-CN/translation.json"
import zhTW from "./languages/zh-TW/translation.json"
import hi from "./languages/hi/translation.json"


const resources = {
    en: { translation: en  },
    ar: { translation: ar },
    es: { translation: es },
    fr: { translation: fr },
    ko: { translation: ko },
    zhCN: { translation: zhCN },
    zhTW: { translation: zhTW },
    hi:{translation:hi}
}

i18n
    .use(initReactI18next)
    .use(languagedetector)
    .init({
        resources,
        // lng:"hi",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })
    export default i18n;
