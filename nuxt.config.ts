// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Директория с исходным кодом
  srcDir: 'app',
  
  // Директория для статических файлов
  dir: {
    public: '../public'
  },
  
  // SSG настройки
  ssr: false,
  nitro: {
    compatibilityDate: '2025-10-23',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    }
  },

  // Модули
  modules: [
    '@pinia/nuxt'
    // 'nuxt-quasar-ui' // Временно отключен
  ],

  // Стили
  css: [
    '~/assets/styles/main.scss'
  ],

  // Vite настройки для SCSS
  vite: {
    define: {
      'process.env.DEBUG': false,
    }
  },

  // SEO и мета-теги
  app: {
    head: {
      title: 'Shamanri - Авторские платки и открытки',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Авторские платки, открытки и художественная продукция иллюстратора Марии Матвеевой' 
        },
        { 
          hid: 'keywords', 
          name: 'keywords', 
          content: 'платки, открытки, художественная продукция, иллюстратор мария матвеева, shamanri' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://shamanri.art' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Cormorant+Infant:wght@400;500;600;700&display=swap' }
      ]
    }
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false
  },

  // ESLint
  eslint: {
    lintOnStart: false
  },

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: 'https://shamanri.art',
      apiBase: process.env.API_BASE || '/api'
    }
  }
})
