<template>
  <div class="product-card-container__left">
    <ProductImageCarousel
      :images="images"
      :selected-index="selectedIndex"
      :product-title="productTitle"
      @update:selected="$emit('update:selected', $event)"
    />
    
    <!-- Большая текущая картинка -->
    <div class="product-main-image" @click="$emit('open-modal')">
      <img
        v-if="currentImage"
        :src="currentImage"
        :alt="productTitle || 'Product'"
      />
      <button
        class="product-main-image__fullscreen-btn"
        @click.stop="$emit('open-modal')"
      >
        <span class="material-icons">open_in_full</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProductImageCarousel from '~/modules/catalog/ProductImageCarousel.vue'

interface Props {
  images: string[]
  selectedIndex: number
  productTitle?: string
}

const props = defineProps<Props>()
defineEmits<{
  'update:selected': [index: number]
  'open-modal': []
}>()

const currentImage = computed(() => {
  return props.images[props.selectedIndex] || null
})
</script>

<style scoped lang="scss">
.product-card-container__left {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.product-main-image {
  width: 552px;
  height: 684px;
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
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
}
</style>

