<template>
  <div class="product-images-carousel-wrapper" :class="{ 'product-images-carousel-wrapper--modal': modal }">
    <!-- Кнопка прокрутки вверх -->
    <button
      v-if="canScrollUp"
      class="product-images-carousel__scroll-btn product-images-carousel__scroll-btn--up"
      @click="scrollCarousel('up')"
    >
      <span class="material-icons">arrow_upward</span>
    </button>
    
    <!-- Контейнер карусели с прокруткой -->
    <div 
      class="product-images-carousel" 
      :class="{ 'product-images-carousel--modal': modal }"
      ref="carouselRef" 
      @wheel.prevent="handleWheel"
    >
      <div
        v-for="(imagePath, index) in images"
        :key="index"
        class="product-images-carousel__item"
        :class="{ 'product-images-carousel__item--active': selectedIndex === index }"
        @click="$emit('update:selected', index)"
      >
        <img
          :src="imagePath"
          :alt="`${productTitle || 'Product'} - изображение ${index + 1}`"
        />
      </div>
      <!-- Пустые контейнеры для отображения фона, если нет изображений -->
      <template v-if="images.length === 0">
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
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

interface Props {
  images: string[]
  selectedIndex: number
  productTitle?: string
  modal?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:selected': [index: number]
}>()

const carouselRef = ref<HTMLDivElement | null>(null)
const canScrollUp = ref(false)
const canScrollDown = ref(false)

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
  
  // Высота зависит от режима (обычный или модальный)
  const itemHeight = props.modal ? 175 : 135
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

// Экспортируем ref для внешнего доступа
defineExpose({
  carouselRef
})

onMounted(() => {
  // Проверяем прокрутку после загрузки и при изменении изображений
  watch([() => props.images, carouselRef], () => {
    nextTick(() => {
      checkScrollability()
      if (carouselRef.value) {
        carouselRef.value.addEventListener('scroll', checkScrollability)
      }
    })
  }, { immediate: true })
})

onUnmounted(() => {
  if (carouselRef.value) {
    carouselRef.value.removeEventListener('scroll', checkScrollability)
  }
})
</script>

<style scoped lang="scss">
.product-images-carousel-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 684px;
  flex-shrink: 0;
  overflow: hidden;
  
  &--modal {
    height: auto;
    overflow: visible;
  }
}

.product-images-carousel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 684px;
  height: 100%;
  scroll-behavior: smooth;
  flex-shrink: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  box-sizing: border-box;
  
  &--modal {
    max-height: calc(100vh - 64px);
    height: calc(100vh - 64px);
  }
  
  // Скрываем стандартный скроллбар
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
}

.product-images-carousel__item {
  width: 128px;
  height: 135px;
  flex-shrink: 0;
  border-radius: var(--8, 8px);
  border: 1px solid var(--border-active, #A54E3B);
  background: var(--bg-secondary-default, #EEE7DE);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  &--active {
    border-color: var(--bg-primary-default, #A54E3B);
    border-width: 2px;
  }
  
  &--empty {
    border: 1px solid var(--border-active, #A54E3B);
    background: var(--bg-secondary-default, #EEE7DE);
  }
  
  &:hover {
    border-color: var(--bg-primary-active, #8B3E2F);
  }
}

.product-images-carousel--modal .product-images-carousel__item {
  width: 166px;
  height: 175px;
}

.product-images-carousel__scroll-btn {
  position: absolute;
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
  
  &--up {
    top: 4px;
  }
  
  &--down {
    bottom: 4px;
  }
}
</style>

