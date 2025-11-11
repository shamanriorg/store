import { Quasar } from 'quasar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    plugins: {},
    config: {
      brand: {
        primary: '#f2751f',
        secondary: '#26A69A',
        accent: '#9C27B0',
        dark: '#1d1d1d',
        darkPage: '#121212',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    },
    // SSR настройки
    ssr: {
      pwa: false
    }
  })
})
