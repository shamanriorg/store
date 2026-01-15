<template>
  <div class="product-view" v-if="product">
    <!-- Модальное окно для просмотра изображений -->
    <ProductImageModal
      :is-open="isImageModalOpen"
      :images="productImages"
      :selected-index="selectedImageIndex"
      :product-title="product.title"
      @update:open="isImageModalOpen = $event"
      @update:selected="selectedImageIndex = $event"
    />

    <div class="container container-adaptive product-view__container">
      <!-- Кнопка "В каталог" -->
      <div class="back-to-catalog">
        <NuxtLink :to="catalogLink">
          <Button variant="transparent" left-icon="arrow_back">
            В каталог
          </Button>
        </NuxtLink>
      </div>

      <p class="product-notice">Напоминаем, все материалы защищены</p>

      <!-- Контейнер карточки продукта -->
      <div class="product-card-container">
        <ProductImageGallery
          :images="productImages"
          :selected-index="selectedImageIndex"
          :product-title="product.title"
          @update:selected="selectedImageIndex = $event"
          @open-modal="openImageModal"
        />
        <ProductInfo :product="product">
          <template #actions>
            <ProductActions :product="product" />
          </template>
        </ProductInfo>
      </div>
      
      <!-- Дополнительная информация и лицензии для complex товаров -->
      <ProductComplexDetails v-if="product.kind === 'complex'" />
    </div>
  </div>
  <NotFoundPlaceholder v-else />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Button from '~/modules/shared/kit/Button.vue'
import NotFoundPlaceholder from '~/modules/shared/components/NotFoundPlaceholder.vue'
import ProductComplexDetails from '~/modules/catalog/ProductComplexDetails.vue'
import ProductImageGallery from '~/modules/catalog/ProductImageGallery.vue'
import ProductImageModal from '~/modules/catalog/ProductImageModal.vue'
import ProductInfo from '~/modules/catalog/ProductInfo.vue'
import ProductActions from '~/modules/catalog/ProductActions.vue'

interface Product {
  id: string
  title?: string
  price?: number
  comPrice?: number
  exPrice?: number
  previewImage?: string
  image?: string
  category?: string
  techDescr?: string | string[]
  artDescr?: string | string[]
  useRecomend?: string | string[]
  isNew?: boolean
  images?: string[]
  kind?: 'digital' | 'wb' | 'complex'
  link?: string
  // SEO поля
  metaDescription?: string
  keywords?: string | string[]
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  [key: string]: any
}

const props = defineProps<{
  productId: string
  category?: string
}>()

const route = useRoute()

// Формируем ссылку на каталог с восстановлением категории
const catalogLink = computed(() => {
  const fromCategory = route.query?.fromCategory as string | undefined
  if (fromCategory) {
    return `/catalog?category=${fromCategory}`
  }
  // Если категория товара известна, используем её
  if (product.value?.category) {
    return `/catalog?category=${product.value.category}`
  }
  return '/catalog'
})
const selectedImageIndex = ref(0)
const cartStore = useCartStore()

// Маппинг категорий на имена файлов
const categoryToFileName: Record<string, string> = {
  patterns: 'patterns',
  postcards: 'cards',
  tiles: 'tiles',
  other: 'others'
}

// Используем переданную категорию или дефолтную
const categoryName = props.category || 'patterns'
const fileName = categoryToFileName[categoryName] || 'patterns'

// Загрузка продукта с использованием useAsyncData для SSR
const { data: productData, error: productError } = await useAsyncData(
  `product-${props.productId}-${categoryName}`,
  async () => {
    try {
      let data: any
      
      // На сервере читаем файл напрямую, на клиенте используем fetch
      if (import.meta.server) {
        const { readFileSync } = await import('fs')
        const { join } = await import('path')
        const publicPath = join(process.cwd(), 'public')
        const filePath = join(publicPath, 'catalog', fileName, props.productId, 'product.json')
        try {
          data = JSON.parse(readFileSync(filePath, 'utf-8'))
        } catch (fileError) {
          // Если файл не найден, выбрасываем 404
          throw createError({
            statusCode: 404,
            statusMessage: 'Товар не найден'
          })
        }
      } else {
        const response = await fetch(`/catalog/${fileName}/${props.productId}/product.json`)
        if (!response.ok) {
          // Если товар не найден, выбрасываем 404
          throw createError({
            statusCode: 404,
            statusMessage: 'Товар не найден'
          })
        }
        data = await response.json()
      }
      
      // Проверяем, что данные валидны
      if (!data || typeof data !== 'object') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Товар не найден'
        })
      }
      
      // Преобразуем previewImage в полный путь к изображению
      const image = data.previewImage 
        ? `/catalog/${fileName}/${props.productId}/${data.previewImage}`
        : undefined
      
      // Преобразуем массив images в полные пути
      const images = Array.isArray(data.images)
        ? data.images.map((img: string) => `/catalog/${fileName}/${props.productId}/${img}`)
        : []
      
      // Если есть previewImage, но нет images, добавляем его
      if (image && images.length === 0) {
        images.push(image)
      }
      
      // Используем Object.assign для безопасности на SSR
      return Object.assign({}, data, {
        id: props.productId, 
        category: categoryName,
        image,
        images
      })
    } catch (error: any) {
      // Если это уже созданная ошибка, пробрасываем её дальше
      if (error?.statusCode) {
        throw error
      }
      console.error('Ошибка загрузки продукта:', error)
      throw createError({
        statusCode: 404,
        statusMessage: 'Товар не найден'
      })
    }
  }
)

const product = computed(() => productData.value as Product | null)

// Обработка ошибок загрузки
if (productError.value) {
  // Если произошла ошибка, выбрасываем её для показа страницы 404
  throw productError.value
}

// Устанавливаем первое изображение из массива после загрузки
if (product.value) {
  selectedImageIndex.value = 0
}

// Вычисляемые свойства для изображений
const productImages = computed(() => {
  return product.value?.images || []
})

// Вычисляемые свойства для SEO
const seoTitle = computed(() => {
  if (product.value?.ogTitle) return product.value.ogTitle
  if (product.value?.title) return `${product.value.title} | Shamanri`
  return 'Товар | Shamanri'
})

const seoDescription = computed(() => {
  if (product.value?.metaDescription) return product.value.metaDescription
  if (product.value?.ogDescription) return product.value.ogDescription
  if (product.value?.artDescr) {
    const descr = Array.isArray(product.value.artDescr) 
      ? product.value.artDescr.join(' ') 
      : product.value.artDescr
    return descr.length > 160 ? descr.substring(0, 157) + '...' : descr
  }
  return `Купить ${product.value?.title || 'товар'} в Shamanri. Авторские паттерны, плитка и открытки от Марии Матвеевой.`
})

const seoKeywords = computed(() => {
  if (product.value?.keywords) {
    return Array.isArray(product.value.keywords) 
      ? product.value.keywords.join(', ') 
      : product.value.keywords
  }
  const baseKeywords = ['Shamanri', 'Мария Матвеева', 'акварельные паттерны']
  if (product.value?.title) baseKeywords.push(product.value.title)
  if (product.value?.category) {
    const categoryNames: Record<string, string> = {
      patterns: 'паттерны',
      postcards: 'открытки',
      tiles: 'плитка',
      other: 'разное'
    }
    baseKeywords.push(categoryNames[product.value.category] || product.value.category)
  }
  return baseKeywords.join(', ')
})

const seoImage = computed(() => {
  if (product.value?.ogImage) {
    const categoryName = product.value.category || 'patterns'
    const fileName = categoryToFileName[categoryName] || 'patterns'
    return `/catalog/${fileName}/${product.value.id}/${product.value.ogImage}`
  }
  if (product.value?.image) return product.value.image
  if (product.value?.images?.[0]) return product.value.images[0]
  return '/shamanri-logo.svg'
})

const productUrl = computed(() => {
  if (import.meta.server && !route.path) {
    return 'https://shamanri.ru'
  }
  return `https://shamanri.ru${route.path || ''}`
})

// JSON-LD структурированные данные для товара
const jsonLd = computed(() => {
  if (!product.value) return null
  
  const categoryName = product.value.category || 'patterns'
  const fileName = categoryToFileName[categoryName] || 'patterns'
  const imageUrl = seoImage.value.startsWith('http') 
    ? seoImage.value 
    : `https://shamanri.ru${seoImage.value}`
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.value.title || 'Товар',
    description: seoDescription.value,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: 'Shamanri'
    },
    offers: {
      '@type': 'Offer',
      price: product.value.price || 0,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: productUrl.value
    },
    category: categoryName
  }
})

// Состояние модального окна для просмотра изображений
const isImageModalOpen = ref(false)

// Открытие модального окна
const openImageModal = () => {
  isImageModalOpen.value = true
}

// Функция для установки SEO тегов
const updateSeoMeta = () => {
  if (product.value) {
    useHead({
      title: seoTitle.value,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: seoDescription.value
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: seoKeywords.value
        },
        {
          property: 'og:title',
          content: seoTitle.value
        },
        {
          property: 'og:description',
          content: seoDescription.value
        },
        {
          property: 'og:image',
          content: seoImage.value
        },
        {
          property: 'og:url',
          content: productUrl.value
        },
        {
          property: 'og:type',
          content: 'product'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: seoTitle.value
        },
        {
          name: 'twitter:description',
          content: seoDescription.value
        },
        {
          name: 'twitter:image',
          content: seoImage.value
        }
      ],
      script: jsonLd.value ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd.value)
        }
      ] : []
    })
  }
}

// SEO мета-теги и структурированные данные
watch([product, jsonLd], () => {
  updateSeoMeta()
}, { immediate: true })

// Обновляем SEO теги сразу после загрузки данных
if (product.value) {
  updateSeoMeta()
}

// Данные загружаются через useAsyncData выше
</script>

<style lang="scss" scoped>
.product-view {
  min-height: 60vh;
  padding: 32px 0 0 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.product-view__container {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  
  // Убеждаемся, что все дочерние элементы не выходят за границы
  > * {
    max-width: 100%;
    box-sizing: border-box;
  }
}

.back-to-catalog {
  margin-bottom: 24px;
}

.product-notice {
  margin-bottom: 24px;
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
}

.product-card-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  min-height: 684px;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
}

// Адаптивность
@media (max-width: 1220px) {
  .product-card-container {
    grid-template-columns: 1fr;
    min-height: auto;
    height: auto;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
}

@media (max-width: 768px) {
  .product-view {
    max-width: 100vw;
  }
  
  .product-view__container {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
  
  .product-card-container {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
}
</style>

