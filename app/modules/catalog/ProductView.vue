<template>
  <div class="product-view" v-if="product">
    <!-- Модальное окно для просмотра изображений -->
    <div v-if="isImageModalOpen" class="image-modal" @click.self="closeImageModal">
      <div class="image-modal__content">
        <!-- Левая часть с каруселью и большой картинкой -->
        <div class="image-modal__left">
          <!-- Вертикальная карусель маленьких картинок -->
          <div class="product-images-carousel-wrapper">
            <!-- Кнопка прокрутки вверх -->
            <button
              v-if="canScrollUp"
              class="product-images-carousel__scroll-btn product-images-carousel__scroll-btn--up"
              @click="scrollCarousel('up')"
            >
              <span class="material-icons">arrow_upward</span>
            </button>
            
            <!-- Контейнер карусели с прокруткой -->
            <div class="product-images-carousel" ref="carouselRef" @wheel.prevent="handleWheel">
              <div
                v-for="(imagePath, index) in productImages"
                :key="index"
                class="product-images-carousel__item"
                :class="{ 'product-images-carousel__item--active': selectedImageIndex === index }"
                @click="selectedImageIndex = index"
              >
                <img
                  :src="imagePath"
                  :alt="`${product?.title || 'Product'} - изображение ${index + 1}`"
                />
              </div>
              <!-- Пустые контейнеры для отображения фона, если нет изображений -->
              <template v-if="productImages.length === 0">
                <div class="product-images-carousel__item product-images-carousel__item--empty"></div>
                <div class="product-images-carousel__item product-images-carousel__item--empty"></div>
                <div class="product-images-carousel__item product-images-carousel__item--empty"></div>
              </template>
            </div>
            
            <!-- Кнопка прокрутки вниз -->
            <button
              v-if="canScrollDown"
              class="product-images-carousel__scroll-btn product-images-carousel__scroll-btn--down"
              @click="scrollCarousel('down')"
            >
              <span class="material-icons">arrow_downward</span>
            </button>
          </div>
          
          <!-- Большая текущая картинка -->
          <div class="product-main-image product-main-image--modal">
            <img
              v-if="currentMainImage"
              :src="currentMainImage"
              :alt="product?.title || 'Product'"
            />
          </div>
        </div>
        
        <!-- Кнопка закрыть -->
        <button
          class="image-modal__close-btn"
          @click="closeImageModal"
        >
          <span class="material-icons">close</span>
        </button>
      </div>
    </div>

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
        <div class="product-card-container__left">
          <!-- Вертикальная карусель маленьких картинок -->
          <div class="product-images-carousel-wrapper">
            <!-- Кнопка прокрутки вверх -->
            <button
              v-if="canScrollUp"
              class="product-images-carousel__scroll-btn product-images-carousel__scroll-btn--up"
              @click="scrollCarousel('up')"
            >
              <span class="material-icons">arrow_upward</span>
            </button>
            
            <!-- Контейнер карусели с прокруткой -->
            <div class="product-images-carousel" ref="carouselRef" @wheel.prevent="handleWheel">
              <div
                v-for="(imagePath, index) in productImages"
                :key="index"
                class="product-images-carousel__item"
                :class="{ 'product-images-carousel__item--active': selectedImageIndex === index }"
                @click="selectedImageIndex = index"
              >
                <img
                  :src="imagePath"
                  :alt="`${product?.title || 'Product'} - изображение ${index + 1}`"
                />
              </div>
              <!-- Пустые контейнеры для отображения фона, если нет изображений -->
              <template v-if="productImages.length === 0">
                <div class="product-images-carousel__item product-images-carousel__item--empty"></div>
                <div class="product-images-carousel__item product-images-carousel__item--empty"></div>
                <div class="product-images-carousel__item product-images-carousel__item--empty"></div>
              </template>
            </div>
            
            <!-- Кнопка прокрутки вниз -->
            <button
              v-if="canScrollDown"
              class="product-images-carousel__scroll-btn product-images-carousel__scroll-btn--down"
              @click="scrollCarousel('down')"
            >
              <span class="material-icons">arrow_downward</span>
            </button>
          </div>
          
          <!-- Большая текущая картинка -->
          <div class="product-main-image" @click="openImageModal">
            <img
              v-if="currentMainImage"
              :src="currentMainImage"
              :alt="product?.title || 'Product'"
            />
            <button
              class="product-main-image__fullscreen-btn"
              @click.stop="openImageModal"
            >
              <span class="material-icons">open_in_full</span>
            </button>
          </div>
        </div>
        <div class="product-card-container__right">
          <div class="product-card-container__right-top">
            <h1 class="product-title">{{ product.title }}</h1>
            <div v-if="product.price" class="product-price">
              <span class="product-price__value">{{ formatPriceNumber(product.price) }}</span>
              <span class="material-icons product-price__icon">currency_ruble</span>
            </div>
            <p v-if="product.description" class="product-description">{{ product.description }}</p>
          </div>
          <div class="product-card-container__right-bottom">
            <!-- Блок для digital товара -->
            <template v-if="product.kind === 'digital'">
              <!-- Если товар в корзине - показываем контролы количества -->
              <template v-if="isInCart">
                <div class="product-cart-controls">
                  <NuxtLink to="/cart" class="product-cart-controls__link">
                    <Button variant="inCart" class="product-cart-controls__button">
                      Перейти в корзину
                    </Button>
                  </NuxtLink>
                  <div class="product-quantity">
                    <button
                      type="button"
                      class="product-quantity__btn product-quantity__btn--minus"
                      @click="decreaseQuantity"
                    >
                      <span class="material-icons">remove</span>
                    </button>
                    <input
                      type="number"
                      :value="cartQuantity"
                      min="0"
                      class="product-quantity__input"
                      @input="handleQuantityInput"
                      @blur="handleQuantityBlur"
                      @keydown.enter="handleQuantityBlur"
                    />
                    <button
                      type="button"
                      class="product-quantity__btn product-quantity__btn--plus"
                      @click="increaseQuantity"
                    >
                      <span class="material-icons">add</span>
                    </button>
                  </div>
                </div>
              </template>
              <!-- Если товара нет в корзине - показываем кнопку добавления -->
              <template v-else>
                <Button
                  variant="default"
                  class="product-add-to-cart-btn"
                  wfull
                  @click="handleAddToCart"
                >
                  В корзину
                </Button>
              </template>
              <p class="product-digital-notice">
                Это цифровой товар. После оплаты будет отправлен на вашу почту.
              </p>
            </template>
            
            <!-- Блок для wb товара -->
            <template v-if="product.kind === 'wb'">
              <a :href="wbLink" target="_blank" rel="noopener noreferrer" class="product-wb-link">
                <Button
                  variant="wb"
                  class="product-wb-btn"
                  wfull
                  right-icon="north_east"
                >
                  Перейти на Wildberries
                </Button>
              </a>
            </template>
            
            <!-- Блок для complex товара -->
            <template v-if="product.kind === 'complex'">
              <p class="product-complex-text">
                Заинтересовал товар?<br>
                Свяжитесь с нами в <a href="https://t.me/mveeva" target="_blank" rel="noopener noreferrer" class="product-complex-link">Телеграм</a> или <button type="button" class="product-complex-link product-complex-link--button" @click="openContactForm">заполните форму</button>
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

  <NotFoundPlaceholder v-else />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import Button from '~/modules/shared/kit/Button.vue'
import NotFoundPlaceholder from '~/modules/shared/components/NotFoundPlaceholder.vue'
import { useCartStore } from '~/stores/cart'
import type { Product as CartProduct } from '~/types'

interface Product {
  id: string
  title?: string
  price?: number
  previewImage?: string
  image?: string
  category?: string
  description?: string
  isNew?: boolean
  images?: string[]
  kind?: 'digital' | 'wb' | 'complex'
  link?: string
  [key: string]: any
}

const props = defineProps<{
  productId: string
}>()

const product = ref<Product | null>(null)
const selectedImageIndex = ref(0)
const carouselRef = ref<HTMLElement | null>(null)
const canScrollUp = ref(false)
const canScrollDown = ref(false)
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
    // Пробуем загрузить из разных категорий
    const categories = ['patterns', 'postcards', 'tiles', 'other']
    
    for (const category of categories) {
      const fileName = categoryToFileName[category]
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
          category,
          image,
          images
        }
        
        // Устанавливаем первое изображение из массива
        selectedImageIndex.value = 0
        
        return
      }
    }
    
    console.error('Продукт не найден')
  } catch (error) {
    console.error('Ошибка загрузки продукта:', error)
  }
}

// Вычисляемые свойства для изображений
const productImages = computed(() => {
  return product.value?.images || []
})

const currentMainImage = computed(() => {
  if (productImages.value.length === 0) return null
  return productImages.value[selectedImageIndex.value] || productImages.value[0]
})

// Ссылка на Wildberries
const wbLink = computed(() => {
  if (product.value?.kind === 'wb') {
    return product.value.link || 'https://www.wildberries.ru/seller/4253084'
  }
  return ''
})

// Состояние модального окна для просмотра изображений
const isImageModalOpen = ref(false)

// Открытие модального окна
const openImageModal = () => {
  isImageModalOpen.value = true
  document.body.style.overflow = 'hidden' // Блокируем прокрутку фона
}

// Закрытие модального окна
const closeImageModal = () => {
  isImageModalOpen.value = false
  document.body.style.overflow = '' // Восстанавливаем прокрутку
}

// Форматирование цены
const formatPriceNumber = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Добавление в корзину
const handleAddToCart = () => {
  if (!product.value || !product.value.price) return
  
  const cartProduct: CartProduct = {
    id: product.value.id,
    name: product.value.title || product.value.id,
    type: product.value.category || 'other',
    price: product.value.price,
    image: product.value.image || '',
    category: product.value.category || 'other',
    inStock: true
  }
  
  cartStore.addToCart(cartProduct, 1)
}

// Открытие формы обратной связи
const openContactForm = () => {
  const contactFormOpen = useState('contactFormOpen', () => false)
  contactFormOpen.value = true
}

// Проверка, есть ли товар в корзине
const isInCart = computed(() => {
  if (!product.value) return false
  return cartStore.items.some(item => item.product.id === product.value?.id)
})

// Количество товара в корзине
const cartQuantity = computed(() => {
  if (!product.value) return 0
  const item = cartStore.items.find(item => item.product.id === product.value?.id)
  return item?.quantity || 0
})

// Увеличение количества
const increaseQuantity = () => {
  if (!product.value) return
  const currentQuantity = cartQuantity.value
  cartStore.updateQuantity(product.value.id, currentQuantity + 1)
}

// Уменьшение количества
const decreaseQuantity = () => {
  if (!product.value) return
  const currentQuantity = cartQuantity.value
  if (currentQuantity > 1) {
    cartStore.updateQuantity(product.value.id, currentQuantity - 1)
  }
}

// Обработка ввода количества
const handleQuantityInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = parseInt(target.value)
  
  // Запрещаем отрицательные числа - устанавливаем минимум 0
  if (isNaN(value) || value < 0) {
    target.value = '0'
    return
  }
  
  if (!product.value) return
  
  // Обновляем количество только если > 0
  if (value > 0) {
    cartStore.updateQuantity(product.value.id, value)
  }
}

// Обработка blur для количества
const handleQuantityBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = parseInt(target.value)
  
  if (!product.value) return
  
  // Если 0 или отрицательное - удаляем из корзины
  if (isNaN(value) || value <= 0) {
    cartStore.removeFromCart(product.value.id)
  } else {
    cartStore.updateQuantity(product.value.id, value)
  }
}

// Проверка возможности прокрутки
const checkScrollability = () => {
  if (!carouselRef.value) {
    canScrollUp.value = false
    canScrollDown.value = false
    return
  }
  
  const { scrollTop, scrollHeight, clientHeight } = carouselRef.value
  canScrollUp.value = scrollTop > 0
  canScrollDown.value = scrollTop < scrollHeight - clientHeight - 1
}

// Прокрутка карусели
const scrollCarousel = (direction: 'up' | 'down') => {
  if (!carouselRef.value) return
  
  const itemHeight = 135 // высота одного элемента
  const gap = 8 // gap между элементами
  const scrollStep = itemHeight + gap
  
  if (direction === 'up') {
    carouselRef.value.scrollTop -= scrollStep
  } else {
    carouselRef.value.scrollTop += scrollStep
  }
  
  // Проверяем после небольшой задержки для обновления состояния
  setTimeout(checkScrollability, 100)
}

// Отключение прокрутки колесом мыши
const handleWheel = (event: WheelEvent) => {
  event.preventDefault()
}

onMounted(() => {
  loadProduct()
  
  // Проверяем прокрутку после загрузки и при изменении изображений
  watch([productImages, carouselRef], () => {
    nextTick(() => {
      checkScrollability()
      if (carouselRef.value) {
        carouselRef.value.addEventListener('scroll', checkScrollability)
      }
    })
  }, { immediate: true })
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
  height: 684px;
}

.product-card-container__left {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.product-images-carousel-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-images-carousel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 684px;
  scroll-behavior: smooth;
  flex-shrink: 0;
  
  .image-modal & {
    height: 100%;
    gap: calc(8px * (100vh - 64px) / 684);
  }
  
  // Скрываем стандартный скроллбар
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE и Edge
  
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
}

.product-images-carousel__item {
  border-radius: var(--8, 8px);
  border: 1px solid var(--border-active, #A54E3B);
  background: var(--bg-secondary-default, #EEE7DE);
  width: 128px;
  height: 135px;
  padding: 0 16px;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  
  &:hover {
    border-color: var(--bg-primary-active, #8B3E2F);
  }
  
  &--active {
    border-color: var(--bg-primary-active, #8B3E2F);
    border-width: 2px;
  }
  
  &--empty {
    cursor: default;
    border-color: var(--border-rest, #DDD7CF);
    
    &:hover {
      border-color: var(--border-rest, #DDD7CF);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.product-images-carousel__scroll-btn {
  width: 40px;
  height: 40px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: var(--bg-secondary-reverse, #FFF);
  box-shadow: 0 1px 8.5px 0 rgba(0, 0, 0, 0.37);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  
  .material-icons {
    font-size: 24px;
    color: var(--bg-primary-default, #A54E3B);
  }
  
  &--up {
    top: 4px;
  }
  
  &--down {
    bottom: 4px;
  }
  
  
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.45);
  }
}

.product-main-image {
  width: 552px;
  height: 684px;
  border-radius: var(--8, 8px);
  border: 1px solid var(--border-rest, #DDD7CF);
  background: var(--bg-secondary-default, #EEE7DE);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .image-modal & {
    width: 552px;
    height: 684px;
  }
  
  &--modal {
    border: none;
    background: transparent;
    cursor: default;
  }
}

.product-main-image__fullscreen-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  border-radius: var(--8, 8px);
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  color: var(--bg-primary-default, #A54E3B);
  
  .image-modal & {
    width: calc(40px * (100vh - 64px) / 684);
    height: calc(40px * (100vh - 64px) / 684);
    padding: calc(8px * (100vh - 64px) / 684);
  }
  
  .material-icons {
    font-size: 24px;
  }
  
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.45);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

// Модальное окно для просмотра изображений
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  padding: 0;
  overflow-y: auto;
}

.image-modal__content {
  position: relative;
  width: 100%;
  max-width: calc(552px + 128px + 8px + 24px + 40px); // ширина контента + отступы
  max-height: calc(100vh - 64px); // высота экрана минус отступы сверху и снизу
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin: 32px 0; // Отступы сверху и снизу
}

.image-modal__left {
  display: flex;
  flex-direction: row;
  gap: 8px;
  background: transparent;
}

.image-modal__close-btn {
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  border-radius: var(--8, 8px);
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  color: var(--bg-primary-default, #A54E3B);
  flex-shrink: 0;
  
  .material-icons {
    font-size: 24px;
  }
  
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.45);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.product-card-container__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-card-container__right-top {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-card-container__right-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-add-to-cart-btn {
  width: 100%;
}

.product-cart-controls {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
}

.product-cart-controls__link {
  flex: 1;
  text-decoration: none;
  display: block;
}

.product-cart-controls__button {
  width: 100%;
}

.product-quantity {
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-muted, #BAB3A9);
  border-radius: var(--8, 8px);
  overflow: hidden;
  padding: 0 16px;
}

.product-quantity__btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text-primary, #361406);
  padding: 0;
  
  .material-icons {
    font-size: 24px;
  }
  
  &:hover {
    background: var(--bg-secondary-active, #E4DFD7);
  }
  
  &:active {
    background: var(--bg-secondary-active, #E4DFD7);
  }
}

.product-quantity__input {
  flex: 1;
  border: none;
  background: transparent;
  text-align: center;
  font-family: Rubik;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-primary, #361406);
  padding: 0;
  height: 48px;
  
  &:focus {
    outline: none;
  }
  
  /* Убираем стрелки у input type="number" */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
}

.product-digital-notice {
  color: var(--text-tertiary, #6F615B);
  text-align: center;
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
}

.product-title {
  color: var(--text-primary, #361406);
  font-family: "Cormorant Infant";
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  margin: 0;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--bg-primary-default, #A54E3B);
  font-family: Rubik;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
}

.product-price__value {
  line-height: 1;
}

.product-price__icon {
  font-size: 40px;
  line-height: 1;
}

.product-description {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
}

.product-wb-link {
  text-decoration: none;
  display: block;
  width: 100%;
}

.product-wb-btn {
  :deep(.btn__icon--right) {
    margin-left: 4px;
  }
}

.product-complex-text {
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
}

.product-complex-link {
  color: var(--bg-primary-default, #A54E3B);
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  
  &:hover {
    color: var(--bg-primary-active, #8B3E2F);
  }
  
  &--button {
    text-decoration: underline;
  }
}

// Адаптивность
@media (max-width: 768px) {
  .product-view {
    padding: 16px 0 0 0;
  }
}
</style>

