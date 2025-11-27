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

    <div class="container container-adaptive">
      <!-- Кнопка "В каталог" -->
      <div class="back-to-catalog">
        <NuxtLink to="/catalog">
          <Button variant="transparent" left-icon="arrow_back">
            В каталог
          </Button>
        </NuxtLink>
      </div>

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
import { ref, computed, onMounted } from 'vue'
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
  [key: string]: any
}

const props = defineProps<{
  productId: string
  category?: string
}>()

const product = ref<Product | null>(null)
const selectedImageIndex = ref(0)
const cartStore = useCartStore()

// Маппинг категорий на имена файлов
const categoryToFileName: Record<string, string> = {
  patterns: 'patterns',
  postcards: 'cards',
  tiles: 'tiles',
  other: 'others'
}

// Загрузка продукта
const loadProduct = async () => {
  try {
    // Используем переданную категорию или дефолтную
    const categoryName = props.category || 'patterns'
    const fileName = categoryToFileName[categoryName] || 'patterns'
    
    const response = await fetch(`/catalog/${fileName}/${props.productId}/product.json`)
    
    if (response.ok) {
      const data = await response.json()
      
      // Преобразуем previewImage в полный путь к изображению
      const image = data.previewImage 
        ? `/catalog/${fileName}/${props.productId}/${data.previewImage}`
        : undefined
      
      // Преобразуем массив images в полные пути
      const images = data.images 
        ? data.images.map((img: string) => `/catalog/${fileName}/${props.productId}/${img}`)
        : []
      
      // Если есть previewImage, но нет images, добавляем его
      if (image && images.length === 0) {
        images.push(image)
      }
      
      product.value = { 
        ...data, 
        id: props.productId, 
        category: categoryName,
        image,
        images
      }
      
      // Устанавливаем первое изображение из массива
      selectedImageIndex.value = 0
    } else {
      console.error('Продукт не найден')
    }
  } catch (error) {
    console.error('Ошибка загрузки продукта:', error)
  }
}

// Вычисляемые свойства для изображений
const productImages = computed(() => {
  return product.value?.images || []
})

// Состояние модального окна для просмотра изображений
const isImageModalOpen = ref(false)

// Открытие модального окна
const openImageModal = () => {
  isImageModalOpen.value = true
}

onMounted(() => {
  loadProduct()
})
</script>

<style lang="scss" scoped>
.product-view {
  min-height: 60vh;
  padding: 32px 0 0 0;
}

.back-to-catalog {
  margin-bottom: 24px;
}

.product-card-container {
  display: flex;
  flex-direction: row;
  gap: 16px;
  min-height: 684px;
  align-items: stretch;
}

// Адаптивность
@media (max-width: 768px) {
  .product-view {
    padding: 16px 0 0 0;
  }
  
  .product-card-container {
    flex-direction: column;
    min-height: auto;
    height: auto;
  }
}
</style>

