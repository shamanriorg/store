<template>
  <div
    v-if="isOpen"
    :class="['image-modal', { 'image-modal--illustration': isIllustration }]"
    @click.self="handleClose"
  >
    <div :class="['image-modal__content', { 'image-modal__content--illustration': isIllustration }]">
      <!-- Левая часть с каруселью и большой картинкой -->
      <div class="image-modal__left">
        <ProductImageCarousel
          v-if="images.length > 1"
          :images="images"
          :selected-index="selectedIndex"
          :product-title="productTitle"
          modal
          @update:selected="$emit('update:selected', $event)"
        />
        
        <!-- Большая текущая картинка -->
        <div
          :class="[
            'product-main-image',
            'product-main-image--modal',
            { 'product-main-image--illustration': isIllustration, 'product-main-image--zoomed': isIllustration && isZoomed }
          ]"
        >
          <img
            v-if="currentImage"
            :src="currentImage"
            :alt="productTitle || 'Product'"
            @click="toggleZoom"
          />
          <!-- Кнопка закрыть -->
          <button
            class="image-modal__close-btn"
            @click="handleClose"
          >
            <span class="material-icons">close</span>
          </button>
          <button
            v-if="isIllustration"
            class="image-modal__zoom-btn"
            @click="toggleZoom"
          >
            {{ isZoomed ? 'Сбросить' : 'Увеличить' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ProductImageCarousel from '~/modules/catalog/ProductImageCarousel.vue'

interface Props {
  isOpen: boolean
  images: string[]
  selectedIndex: number
  productTitle?: string
  category?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
  'update:selected': [index: number]
}>()

const currentImage = computed(() => {
  return props.images[props.selectedIndex] || null
})

const isIllustration = computed(() => props.category === 'postcards')
const isZoomed = ref(false)

const handleClose = () => {
  isZoomed.value = false
  emit('update:open', false)
}

const toggleZoom = () => {
  if (!isIllustration.value) return
  isZoomed.value = !isZoomed.value
}

// Блокируем прокрутку body при открытии модалки
watch(() => props.isOpen, (isOpen) => {
  if (import.meta.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      isZoomed.value = false
    }
  }
})
</script>

<style scoped lang="scss">
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow-y: auto;
}

.image-modal__content {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin: 32px auto;
  width: fit-content;
  max-width: 100%;
}

.image-modal__left {
  display: flex;
  flex-direction: row;
  gap: 8px;
  background: transparent;
}

.product-main-image--modal {
  width: calc((100vh - 64px) * 552 / 684);
  height: calc(100vh - 64px);
  border-radius: var(--8, 8px);
  border: 1px solid var(--border-rest, #DDD7CF);
  background: var(--bg-secondary-default, #EEE7DE);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 1024px) {
    width: calc((100vh - 64px) * 552 / 684 / 1.5);
    height: calc((100vh - 64px) / 1.5);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.image-modal--illustration {
  padding: 12px;
  overflow: auto;
}

.image-modal__content--illustration {
  margin: auto;
  width: min(98vw, 1700px);
  max-width: 98vw;
  max-height: 98vh;
}

.product-main-image--illustration {
  width: min(92vw, 1500px);
  height: min(92vh, 1200px);
  overflow: auto;

  img {
    object-fit: contain;
    cursor: zoom-in;
  }
}

.product-main-image--zoomed {
  align-items: flex-start;
  justify-content: flex-start;

  img {
    width: 180%;
    height: auto;
    max-width: none;
    cursor: zoom-out;
  }
}

.image-modal__close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
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

.image-modal__zoom-btn {
  position: absolute;
  top: 24px;
  left: 24px;
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: 8px;
  background: white;
  color: var(--bg-primary-default, #A54E3B);
  font-family: Rubik;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

@media (max-width: 767px) {
  .image-modal--illustration {
    padding: 8px;
  }

  .image-modal__content--illustration {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .product-main-image--illustration {
    width: 100%;
    height: calc(100vh - 16px);
  }

  .image-modal__close-btn {
    top: 12px;
    right: 12px;
  }

  .image-modal__zoom-btn {
    top: 12px;
    left: 12px;
  }

  .product-main-image--zoomed img {
    width: 240%;
  }
}
</style>

