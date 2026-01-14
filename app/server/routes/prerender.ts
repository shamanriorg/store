import { readFileSync } from 'fs'
import { join } from 'path'

// Функция для генерации списка всех маршрутов для пререндеринга
export function getPrerenderRoutes(): string[] {
  const routes: string[] = []
  
  try {
    // Базовый путь к public директории
    const publicPath = join(process.cwd(), 'public')
    
    // Читаем список статей
    try {
      const articlesListPath = join(publicPath, 'articles', 'articles-list.json')
      const articlesData = JSON.parse(readFileSync(articlesListPath, 'utf-8'))
      if (articlesData.articles && Array.isArray(articlesData.articles)) {
        articlesData.articles.forEach((articleId: string) => {
          routes.push(`/blog/${articleId}`)
        })
      }
    } catch (error) {
      console.warn('Не удалось загрузить список статей:', error)
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
          routes.push(`/product/${category}/${productId}`)
        })
      } catch (error) {
        // Игнорируем ошибки для категорий, которых может не быть
        console.warn(`Не удалось загрузить список товаров для категории ${category}:`, error)
      }
    }
  } catch (error) {
    console.error('Ошибка при генерации маршрутов для пререндеринга:', error)
  }
  
  return routes
}
