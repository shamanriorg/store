import { readFileSync } from 'fs'
import { join } from 'path'

// Генерация sitemap.xml
export default defineEventHandler(async (event) => {
  const routes: Array<{ url: string; lastmod?: string; changefreq?: string; priority?: string }> = []
  
  try {
    // Базовый путь к public директории
    const publicPath = join(process.cwd(), 'public')
    // Получаем URL сайта из конфига или используем дефолтный
    const config = useRuntimeConfig()
    const siteUrl = config.public?.siteUrl || 'https://shamanri.art'
    
    // Базовые страницы
    const basePages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/catalog', priority: '0.9', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'weekly' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/company', priority: '0.8', changefreq: 'monthly' }
    ]
    
    routes.push(...basePages.map(page => ({
      url: `${siteUrl}${page.url}`,
      priority: page.priority,
      changefreq: page.changefreq,
      lastmod: new Date().toISOString().split('T')[0]
    })))
    
    // Читаем список статей
    try {
      const articlesListPath = join(publicPath, 'articles', 'articles-list.json')
      const articlesData = JSON.parse(readFileSync(articlesListPath, 'utf-8'))
      if (articlesData.articles && Array.isArray(articlesData.articles)) {
        articlesData.articles.forEach((articleId: string) => {
          // Пытаемся получить дату из файла статьи
          let lastmod = new Date().toISOString().split('T')[0]
          try {
            const articlePath = join(publicPath, 'articles', articleId, 'article.json')
            const articleData = JSON.parse(readFileSync(articlePath, 'utf-8'))
            if (articleData.date) {
              // Преобразуем дату из формата DD-MM-YYYY в ISO
              const [day, month, year] = articleData.date.split('-')
              lastmod = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString().split('T')[0]
            }
          } catch (e) {
            // Используем текущую дату, если не удалось прочитать
          }
          
          routes.push({
            url: `${siteUrl}/blog/${articleId}`,
            priority: '0.8',
            changefreq: 'monthly',
            lastmod
          })
        })
      }
    } catch (error) {
      console.warn('Не удалось загрузить список статей для sitemap:', error)
    }
    
    // Категории товаров
    const categories = ['patterns', 'tiles', 'cards', 'others']
    const categoryToFileName: Record<string, string> = {
      patterns: 'patterns',
      tiles: 'tiles',
      cards: 'cards',
      others: 'others'
    }
    
    // Читаем товары из каждой категории
    for (const category of categories) {
      try {
        const fileName = categoryToFileName[category] || category
        const listPath = join(publicPath, 'catalog', fileName, `${fileName}-list.json`)
        const listData = JSON.parse(readFileSync(listPath, 'utf-8'))
        
        // Получаем массив товаров (может быть в разных форматах)
        let productIds: string[] = []
        if (Array.isArray(listData[category])) {
          productIds = listData[category]
        } else if (Array.isArray(listData.products)) {
          productIds = listData.products
        } else if (Array.isArray(listData)) {
          productIds = listData
        }
        
        // Добавляем маршруты для каждого товара
        productIds.forEach((productId: string) => {
          // Пытаемся получить дату из файла товара
          let lastmod = new Date().toISOString().split('T')[0]
          try {
            const productPath = join(publicPath, 'catalog', fileName, productId, 'product.json')
            const productData = JSON.parse(readFileSync(productPath, 'utf-8'))
            if (productData.createdDate) {
              // Преобразуем дату из формата DD-MM-YYYY в ISO
              const [day, month, year] = productData.createdDate.split('-')
              lastmod = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString().split('T')[0]
            }
          } catch (e) {
            // Используем текущую дату, если не удалось прочитать
          }
          
          routes.push({
            url: `${siteUrl}/product/${category}/${productId}`,
            priority: '0.7',
            changefreq: 'monthly',
            lastmod
          })
        })
      } catch (error) {
        // Игнорируем ошибки для категорий, которых может не быть
        console.warn(`Не удалось загрузить список товаров для категории ${category} в sitemap:`, error)
      }
    }
  } catch (error) {
    console.error('Ошибка при генерации sitemap:', error)
  }
  
  // Генерируем XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${route.url}</loc>
    ${route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : ''}
    ${route.changefreq ? `    <changefreq>${route.changefreq}</changefreq>` : ''}
    ${route.priority ? `    <priority>${route.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`
  
  // Устанавливаем правильный Content-Type
  event.node.res.setHeader('Content-Type', 'application/xml')
  
  return sitemap
})
