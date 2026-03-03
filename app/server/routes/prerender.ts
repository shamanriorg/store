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
    
    // Категории товаров, для которых есть отдельные страницы товара
    // Иллюстрации (cards/postcards) здесь НЕ указываем, т.к. по ним нет
    // отдельных карточек товара — они показываются только внутри каталога.
    const categories: Array<{ slug: string; fileName: string; listKey: string }> = [
      { slug: 'patterns', fileName: 'patterns', listKey: 'patterns' },
      { slug: 'tiles', fileName: 'tiles', listKey: 'tiles' },
      { slug: 'other', fileName: 'others', listKey: 'others' }
    ]
    
    // Читаем товары из каждой категории и добавляем маршруты
    for (const { slug, fileName, listKey } of categories) {
      try {
        const listPath = join(publicPath, 'catalog', fileName, `${fileName}-list.json`)
        const listData = JSON.parse(readFileSync(listPath, 'utf-8'))
        
        // Получаем массив товаров (может быть в разных форматах)
        let productIds: string[] = []
        if (Array.isArray(listData[listKey])) {
          productIds = listData[listKey]
        } else if (Array.isArray(listData.products)) {
          productIds = listData.products
        } else if (Array.isArray(listData)) {
          productIds = listData
        }
        
        // Добавляем маршруты для каждого товара
        productIds.forEach((productId: string) => {
          routes.push(`/product/${slug}/${productId}`)
        })
      } catch (error) {
        // Игнорируем ошибки для категорий, которых может не быть
        console.warn(`Не удалось загрузить список товаров для категории ${slug}:`, error)
      }
    }
  } catch (error) {
    console.error('Ошибка при генерации маршрутов для пререндеринга:', error)
  }
  
  return routes
}
