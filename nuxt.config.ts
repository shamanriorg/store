// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Директория с исходным кодом
  srcDir: 'app',
  
  // Директория для статических файлов
  dir: {
    public: '../public'
  },
  
  // SSG настройки
  // Используем гибридный режим: SSR для пререндеринга, но с безопасной обработкой
  ssr: true,
  nitro: {
    compatibilityDate: '2025-10-23',
    prerender: {
      routes: (() => {
        // Импортируем функцию для генерации маршрутов синхронно
        const { getPrerenderRoutes } = require('./app/server/routes/prerender')
        const dynamicRoutes = getPrerenderRoutes()
        
        // Базовые маршруты + динамические + sitemap
        return [
          '/',
          '/about',
          '/company',
          '/catalog',
          '/blog',
          '/sitemap.xml',
          ...dynamicRoutes
        ]
      })(),
      crawlLinks: true,
      // Дополнительные настройки для лучшего пререндеринга
      failOnError: false,
      // Автоматически найдет все ссылки через crawlLinks
    },
    routeRules: {
      // Редиректы со старых HTML страниц на новые (обрабатываются через middleware)
      // Убрали '/index.html': { redirect: '/' } чтобы избежать циклического редиректа
      '/cards.html': { redirect: '/catalog' },
      '/fabrics.html': { redirect: '/catalog' },
      '/prints.html': { redirect: '/catalog' },
      '/packs.html': { redirect: '/catalog' },
      '/scarfs.html': { redirect: '/catalog' },
      '/cart.html': { redirect: '/cart' },
      '/info.html': { redirect: '/about' },
      // Статические страницы с SSR
      '/': { prerender: true, index: true },
      '/about': { prerender: true },
      '/company': { prerender: true },
      '/catalog': { prerender: true },
      '/blog': { prerender: true },
      // Динамические маршруты тоже пререндерим
      '/product/**': { prerender: true },
      '/blog/**': { prerender: true },
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
          content: 'Shamanri — студия акварельных паттернов, плитки и открыток художницы Марии Матвеевой, вдохновлённых природой.' 
        },
        { 
          hid: 'keywords', 
          name: 'keywords', 
          content: 'Shamanri, акварельные паттерны, декоративная плитка, авторские открытки, цифровые коллекции, Мария Матвеева' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://shamanri.art' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
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
      apiBase: process.env.API_BASE || '/api',
      emailjs: {
        serviceId: process.env.EMAILJS_SERVICE_ID || '',
        templateId: process.env.EMAILJS_TEMPLATE_ID || '',
        publicKey: process.env.EMAILJS_PUBLIC_KEY || ''
      }
    }
  }
})
