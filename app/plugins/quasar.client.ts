import { Quasar, Notify, Dialog, Loading } from 'quasar'
// import '@quasar/extras/material-icons/material-icons.css' // Временно отключен

export default defineNuxtPlugin((nuxtApp) => {
  // Инициализируем только на клиенте
  if (import.meta.server) {
    return
  }
  
  try {
    nuxtApp.vueApp.use(Quasar, {
      plugins: {
        Notify,
        Dialog,
        Loading
      },
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
        },
        notify: {
          position: 'top-right',
          timeout: 3000
        }
      },
      // SSR настройки
      ssr: {
        pwa: false
      }
    })
  } catch (error) {
    console.warn('Quasar client plugin initialization error:', error)
  }
})


