<template>
  <div class="catalog-page">
    <div class="container container-adaptive">
      <h1 class="catalog-title">Каталог</h1>
      <p class="catalog-note">Тут можно что-нибудь купить или просто посмотреть.</p>

      <div class="catalog-grid">
        <CategoryButton
          v-for="category in categories"
          :key="category.id"
          :label="category.label"
          :hover-background="category.hoverBackground"
          :active-background="category.activeBackground"
          :fan-images="category.fanImages"
          :is-active="category.id === selectedCategory"
          @click="handleCardClick(category.id)"
        />
      </div>

      <div v-if="false" class="catalog-filters">
        <Filter
          v-model="selectedCategories"
          text="Категория"
          type="checkbox"
          :options="categoryFilterOptions"
        />
        <Filter
          v-model="selectedSort"
          text="Сортировка"
          type="radio"
          :options="sortOptions"
          align="left"
        />
      </div>

      <div v-if="products.length > 0" class="catalog-grid-products">
        <ProductCard
          v-for="product in filteredAndSortedProducts"
          :key="product.id"
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :image="product.image"
          :category="product.category"
          :double="product.double"
          :is-new="product.isNew"
        />
      </div>

      <div v-else-if="!isLoading" class="catalog-placeholder">
        <span>В этой категории пока нет товаров. Следите за обновлениями!</span>
      </div>

      <div v-else class="catalog-placeholder">
        <span>Загрузка...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from '#imports'
import CategoryButton from '~/modules/catalog/CategoryButton.vue'
import ProductCard from '~/modules/catalog/ProductCard.vue'
import Filter from '~/modules/shared/kit/Filter.vue'

interface Product {
  id: string
  title?: string
  price?: number
  image?: string
  category?: string
  date?: string
  double?: boolean
  [key: string]: any
}

// Импортируем изображения для паттернов
import pattern1 from '~/assets/images/button-pattern-1.png'
import pattern2 from '~/assets/images/button-pattern-2.png'
import pattern3 from '~/assets/images/button-pattern-3.png'

const route = useRoute()
const router = useRouter()

const categories = [
  {
    id: 'patterns',
    label: 'Паттерны',
    hoverBackground: '#A79D83',
    activeBackground: '#5C5034',
    fanImages: [pattern1, pattern2, pattern3]
  },
  {
    id: 'postcards',
    label: 'Открытки',
    hoverBackground: '#A37F7F',
    activeBackground: '#5C3434'
  },
  {
    id: 'tiles',
    label: 'Плитка',
    hoverBackground: '#909875',
    activeBackground: '#535C34'
  },
  {
    id: 'other',
    label: 'Разное',
    hoverBackground: '#76819B',
    activeBackground: '#34405C'
  }
]

const selectedCategory = ref<string>(categories[0].id)

// Данные для фильтров
const categoryFilterOptions = [
  { id: 'patterns', text: 'Паттерны' },
  { id: 'postcards', text: 'Открытки' },
  { id: 'tiles', text: 'Плитка' },
  { id: 'other', text: 'Разное' }
]

const sortOptions = [
  { id: 'new-to-old', text: 'От нового к старому' },
  { id: 'old-to-new', text: 'От старого к новому' },
  { id: 'cheaper', text: 'Дешевле' },
  { id: 'expensive', text: 'Дороже' }
]

const selectedCategories = ref<typeof categoryFilterOptions>([])
const selectedSort = ref<typeof sortOptions[0] | null>(sortOptions[0])

// Товары
const products = ref<Product[]>([])
const isLoading = ref(false)

// Динамические SEO мета-теги для каталога
const categoryNames: Record<string, string> = {
  patterns: 'Паттерны',
  postcards: 'Открытки',
  tiles: 'Плитка',
  other: 'Разное'
}

const seoTitle = computed(() => {
  const categoryName = categoryNames[selectedCategory.value] || 'Каталог'
  return `${categoryName} | Каталог Shamanri`
})

const seoDescription = computed(() => {
  const categoryName = categoryNames[selectedCategory.value] || 'товары'
  const categoryNameLower = categoryName.toLowerCase()
  return `Купить ${categoryNameLower} в Shamanri. Авторские ${categoryNameLower} от Марии Матвеевой. Акварельные паттерны, плитка и открытки для интерьера, текстиля и полиграфии.`
})

watch([selectedCategory, products], () => {
  useSeoMeta({
    title: seoTitle.value,
    description: seoDescription.value,
    keywords: `Shamanri, Мария Матвеева, ${categoryNames[selectedCategory.value] || 'каталог'}, акварельные паттерны, авторские открытки, плитка с узорами, цифровые принты`,
    ogTitle: seoTitle.value,
    ogDescription: seoDescription.value,
    ogType: 'website',
    twitterCard: 'summary_large_image'
  })
}, { immediate: true })

// Маппинг категорий на имена файлов
const categoryToFileName: Record<string, string> = {
  patterns: 'patterns',
  postcards: 'cards',
  tiles: 'tiles',
  other: 'others'
}

// Загрузка списка товаров из JSON
const loadProductsList = async (category: string): Promise<string[]> => {
  try {
    const fileName = categoryToFileName[category] || 'patterns'
    const response = await fetch(`/catalog/${fileName}/${fileName}-list.json`)
    if (!response.ok) return []
    const data = await response.json()
    return data[fileName] || []
  } catch (error) {
    console.error(`Ошибка загрузки списка товаров для категории ${category}:`, error)
    return []
  }
}

// Загрузка данных товара
const loadProductData = async (category: string, productId: string): Promise<Product | null> => {
  try {
    const fileName = categoryToFileName[category] || 'patterns'
    const response = await fetch(`/catalog/${fileName}/${productId}/product.json`)
    if (!response.ok) return null
    const data = await response.json()
    
    // Преобразуем previewImage в полный путь к изображению
    const image = data.previewImage 
      ? `/catalog/${fileName}/${productId}/${data.previewImage}`
      : undefined
    
    return { 
      ...data, 
      id: productId, 
      category,
      image 
    }
  } catch (error) {
    console.error(`Ошибка загрузки товара ${productId}:`, error)
    return null
  }
}

// Загрузка всех товаров категории
const loadCategoryProducts = async (category: string) => {
  // На сервере не загружаем данные, чтобы избежать проблем с fetch
  if (import.meta.server) {
    products.value = []
    isLoading.value = false
    return
  }
  
  isLoading.value = true
  products.value = []

  try {
    const productIds = await loadProductsList(category)
    const productsData = await Promise.all(
      productIds.map(id => loadProductData(category, id))
    )
    products.value = productsData.filter((p): p is Product => p !== null)
  } catch (error) {
    console.error(`Ошибка загрузки товаров категории ${category}:`, error)
    products.value = []
  } finally {
    isLoading.value = false
  }
}

// Фильтрация и сортировка товаров
const filteredAndSortedProducts = computed(() => {
  let result = [...products.value]

  // Фильтрация по выбранным категориям (если выбраны)
  if (selectedCategories.value.length > 0) {
    const selectedIds = selectedCategories.value.map(c => c.id)
    result = result.filter(p => {
      const productCategory = p.category || selectedCategory.value
      return selectedIds.includes(productCategory)
    })
  }

  // Сортировка
  if (selectedSort.value) {
    const sortId = selectedSort.value.id
    result.sort((a, b) => {
      switch (sortId) {
        case 'new-to-old':
          return (new Date(b.date || 0).getTime()) - (new Date(a.date || 0).getTime())
        case 'old-to-new':
          return (new Date(a.date || 0).getTime()) - (new Date(b.date || 0).getTime())
        case 'cheaper':
          return (a.price || 0) - (b.price || 0)
        case 'expensive':
          return (b.price || 0) - (a.price || 0)
        default:
          return 0
      }
    })
  }

  return result
})

const applyCategoryFromQuery = (value?: string | string[]) => {
  const candidate = Array.isArray(value) ? value[0] : value
  if (candidate && categories.some(category => category.id === candidate)) {
    selectedCategory.value = candidate
    return true
  }
  selectedCategory.value = categories[0].id
  return false
}

// Проверяем категорию из query только на клиенте
// Используем onMounted для безопасности при SSR
onMounted(() => {
  if (!route.query) return
  
  try {
    const hasValidInitialCategory = applyCategoryFromQuery(route.query.category)
    
    if (!hasValidInitialCategory) {
      // Безопасное копирование query объекта
      let currentQuery: Record<string, any> = {}
      if (route.query && typeof route.query === 'object') {
        try {
          // Проверяем, что это обычный объект, а не null prototype
          if (route.query.constructor === Object || Object.getPrototypeOf(route.query) === Object.prototype) {
            currentQuery = Object.assign({}, route.query)
          }
        } catch (e) {
          // Если не удалось скопировать, используем пустой объект
          currentQuery = {}
        }
      }
      router.replace({ query: { ...currentQuery, category: selectedCategory.value } })
    }
  } catch (error) {
    // Игнорируем ошибки при инициализации
    console.warn('Error applying category from query:', error)
  }
})

// Загрузка товаров при изменении категории
watch(
  () => selectedCategory.value,
  (newCategory) => {
    loadCategoryProducts(newCategory)
  },
  { immediate: true }
)

watch(
  () => route.query?.category,
  (value) => {
    if (import.meta.client) {
      applyCategoryFromQuery(value)
    }
  }
)

const handleCardClick = async (id: string) => {
  if (selectedCategory.value === id) return
  selectedCategory.value = id

  // Безопасное копирование query объекта
  let currentQuery: Record<string, any> = {}
  if (route.query && typeof route.query === 'object') {
    try {
      // Проверяем, что это обычный объект, а не null prototype
      if (route.query.constructor === Object || Object.getPrototypeOf(route.query) === Object.prototype) {
        currentQuery = Object.assign({}, route.query)
      }
    } catch (e) {
      currentQuery = {}
    }
  }
  const newQuery = { ...currentQuery, category: id }
  await router.replace({ query: newQuery })
}

// Первоначальная загрузка уже происходит через watch с immediate: true
</script>

<style scoped lang="scss">
.catalog-page {
  padding: 32px 0 0 0;
  min-height: 60vh;
}

.catalog-title {
  font-family: var(--font-secondary);
  font-weight: var(--font-secondary-weight);
  font-size: 48px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.catalog-note {
  margin-bottom: 32px;
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
}

.catalog-grid {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  width: 100%;
}

.catalog-filters {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  width: 100%;
}

.catalog-grid-products {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 24px;
  column-gap: 16px;
  width: 100%;
}

/* На маленьких экранах переключаемся на адаптивный режим */
@media (max-width: 1020px) and (min-width: 769px) {
  .catalog-grid-products {
    grid-template-columns: repeat(auto-fit, minmax(336px, 1fr));
  }
}

/* На экранах около 736px фиксируем 2 колонки с возможностью сжатия */
@media (max-width: 768px) and (min-width: 550px) {
  .catalog-grid-products {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 8px;
  }
}

/* На экранах меньше 550px показываем по 1 карточке в ряд */
@media (max-width: 549px) {
  .catalog-grid-products {
    grid-template-columns: 1fr;
    column-gap: 16px;
  }
}

@media (max-width: 1019px) {
  .catalog-grid {
    gap: 8px;
  }
}

.catalog-subtitle {
  font-family: var(--font-primary);
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 48px;
  max-width: 720px;
}

.catalog-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: var(--bg-color-ornament, #F9F5EF);
  border: 1px dashed var(--border-rest, #DDD7CF);
  border-radius: 16px;
  font-family: var(--font-primary);
  font-size: 20px;
  color: var(--text-tertiary);
  text-align: center;
}

@media (max-width: 767px) {
  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .catalog-filters {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .catalog-subtitle {
    font-size: 20px;
    margin-bottom: 32px;
  }

  .catalog-placeholder {
    padding: 48px 16px;
    font-size: 18px;
  }
}
</style>
