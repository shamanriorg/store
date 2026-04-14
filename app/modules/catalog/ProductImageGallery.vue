<template>
  <div
    :class="[
      'product-card-container__left',
      { 'product-card-container__left--postcard-landscape': isPostcardLandscape }
    ]"
  >
    <ProductImageCarousel
      v-if="showCarousel"
      :images="images"
      :selected-index="selectedIndex"
      :product-title="productTitle"
      @update:selected="$emit('update:selected', $event)"
    />
    
    <!-- Большая текущая картинка -->
    <div
      :class="[
        'product-main-image',
        { 'product-main-image--postcard-landscape': isPostcardLandscape }
      ]"
      @click="handleImageClick"
    >
      <img
        v-if="currentImage"
        :src="currentImage"
        :alt="productTitle || 'Product'"
      />
      <button
        class="product-main-image__fullscreen-btn"
        @click.stop="handleImageClick"
      >
        <span class="material-icons">open_in_full</span>
      </button>
      
      <!-- Стрелки для мобильных устройств -->
      <button
        v-if="images.length > 1"
        class="product-main-image__nav-btn product-main-image__nav-btn--left"
        @click.stop="goToPrevious"
      >
        <span class="material-icons">arrow_back</span>
      </button>
      <button
        v-if="images.length > 1"
        class="product-main-image__nav-btn product-main-image__nav-btn--right"
        @click.stop="goToNext"
      >
        <span class="material-icons">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ProductImageCarousel from '~/modules/catalog/ProductImageCarousel.vue'

interface Props {
  images: string[]
  selectedIndex: number
  productTitle?: string
  category?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:selected': [index: number]
  'open-modal': []
  'orientation-change': [isLandscape: boolean]
  'orientation-pending-change': [isPending: boolean]
}>()

const currentImage = computed(() => {
  return props.images[props.selectedIndex] || null
})

const isPostcardLandscape = ref(false)
const viewportWidth = ref<number>(Number.POSITIVE_INFINITY)

const showCarousel = computed(() => {
  if (props.images.length === 0) return false

  // Для горизонтальных иллюстраций скрываем миниатюры на узких экранах.
  if (props.category === 'postcards' && isPostcardLandscape.value && viewportWidth.value < 1120) {
    return false
  }

  return true
})

const updateViewportWidth = () => {
  if (!import.meta.client) return
  viewportWidth.value = window.innerWidth
}

const detectOrientation = (src: string | null) => {
  if (!import.meta.client || !src || props.category !== 'postcards') {
    isPostcardLandscape.value = false
    emit('orientation-change', false)
    emit('orientation-pending-change', false)
    return
  }

  emit('orientation-pending-change', true)
  const img = new Image()
  img.onload = () => {
    const landscape = img.naturalWidth > img.naturalHeight
    isPostcardLandscape.value = landscape
    emit('orientation-change', landscape)
    emit('orientation-pending-change', false)
  }
  img.onerror = () => {
    isPostcardLandscape.value = false
    emit('orientation-change', false)
    emit('orientation-pending-change', false)
  }
  img.src = src
}

watch(currentImage, (src) => {
  detectOrientation(src)
}, { immediate: true })

onMounted(() => {
  updateViewportWidth()
  if (import.meta.client) {
    window.addEventListener('resize', updateViewportWidth)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateViewportWidth)
  }
})

// Навигация по изображениям
const goToPrevious = () => {
  const newIndex = props.selectedIndex > 0 
    ? props.selectedIndex - 1 
    : props.images.length - 1
  emit('update:selected', newIndex)
}

const goToNext = () => {
  const newIndex = props.selectedIndex < props.images.length - 1 
    ? props.selectedIndex + 1 
    : 0
  emit('update:selected', newIndex)
}

// Обработка клика по изображению - открываем модалку только на больших экранах
const handleImageClick = () => {
  // Проверяем ширину экрана (только на клиенте)
  if (import.meta.client && window.innerWidth >= 736) {
    emit('open-modal')
  }
}
</script>

<style scoped lang="scss">
.product-card-container__left {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: stretch;
  height: 100%;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1220px) {
    margin: 0 auto;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
}

.product-card-container__left--postcard-landscape {
  width: 100%;
  justify-content: center;
}

.product-main-image {
  width: 552px;
  height: 684px;
  min-height: 684px;
  max-height: 684px;
  border-radius: var(--8, 8px);
  border: 1px solid var(--border-rest, #DDD7CF);
  background: var(--bg-secondary-default, #EEE7DE);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;
  
  @media (max-width: 1220px) {
    width: 552px;
    height: 684px;
    min-height: 684px;
    max-height: 684px;
    flex-shrink: 0;
    flex-grow: 0;
  }
  
  @media (max-width: 736px) {
    width: 552px;
    height: 684px;
    min-height: 684px;
    max-width: 552px;
    max-height: 684px;
    cursor: default;
  }
  
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 0;
    aspect-ratio: 552 / 684;
    cursor: default;
    box-sizing: border-box;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.product-main-image--postcard-landscape {
  width: min(100%, 920px);
  height: auto;
  min-height: 0;
  max-height: none;
  aspect-ratio: 16 / 10;

  img {
    object-fit: contain;
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
  
  // Скрываем кнопку на мобильных устройствах
  @media (max-width: 736px) {
    display: none;
  }
}

.product-main-image__nav-btn {
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
  top: 50%;
  transform: translateY(-50%);
  
  .material-icons {
    font-size: 24px;
  }
  
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.45);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  &--left {
    left: 4px;
  }
  
  &--right {
    right: 4px;
  }
  
  // Показываем только на мобильных устройствах
  @media (min-width: 737px) {
    display: none;
  }
}
</style>

