// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Директория с исходным кодом
  srcDir: 'app',
  
  // SSG настройки
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    }
  },

  // Модули
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-quasar-ui'
  ],

  // Стили
  css: [
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/roboto-font/roboto-font.css',
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

  // Tailwind CSS настройки
  tailwindcss: {
    config: {
      content: [
        './app/components/**/*.{js,vue,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app/app.vue'
      ],
      theme: {
        extend: {
          fontFamily: {
            'rubik': ['Rubik', 'sans-serif'],
            'cormorant': ['Cormorant Infant', 'serif'],
          },
          colors: {
            'shamanri': {
              50: '#fef7f0',
              100: '#fdecd8',
              200: '#fbd5b0',
              300: '#f8b87d',
              400: '#f59347',
              500: '#f2751f',
              600: '#e35d15',
              700: '#bc4514',
              800: '#963817',
              900: '#7a3016',
            }
          }
        }
      }
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
