<template>
  <div :class="['product-card', { 'product-card--double': double }]">
    <NuxtLink 
      :to="`/product/${category || 'patterns'}/${id}`"
      class="product-card__image-container"
    >
      <div class="product-card__image">
        <img
          v-if="image && !imageError"
          :src="image"
          :alt="title || id"
          class="product-card__img"
          @error="handleImageError"
        />
        <div v-else class="product-card__placeholder">
          <span>{{ title || id }}</span>
        </div>
      </div>
      <img
        v-if="isNew"
        src="~/assets/images/badge-new.svg"
        alt="NEW"
        class="product-card__badge"
      />
    </NuxtLink>
    <NuxtLink 
      v-if="title" 
      :to="`/product/${category || 'patterns'}/${id}`"
      class="product-card__title"
    >
      {{ title }}
    </NuxtLink>
    <NuxtLink
      v-if="price && isInCart"
      to="/cart"
      class="product-card__price-button-link"
    >
      <Button
        variant="inCart"
        class="product-card__price-button"
      >
        В корзине
      </Button>
    </NuxtLink>
    <NuxtLink
      v-else-if="category === 'patterns'"
      :to="`/product/${category || 'patterns'}/${id}`"
      class="product-card__price-button-link"
    >
      <Button
        variant="default"
        class="product-card__price-button"
      >
        Подробнее
      </Button>
    </NuxtLink>
    <Button
      v-else-if="price"
      variant="default"
      left-icon="shopping_cart"
      right-icon="currency_ruble"
      class="product-card__price-button"
      @click.stop="handleCartClick"
    >
      {{ formatPriceNumber(price) }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '~/modules/shared/kit/Button.vue'
import { useCartStore } from '~/stores/cart'
import type { Product } from '~/types'

interface Props {
  id: string
  title?: string
  price?: number
  image?: string
  category?: string
  double?: boolean
  isNew?: boolean
  [key: string]: any
}

const props = defineProps<Props>()
const cartStore = useCartStore()

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

const isInCart = computed(() => {
  return cartStore.items.some(item => item.product.id === props.id)
})

const handleCartClick = () => {
  if (!isInCart.value && props.price) {
    // Преобразуем данные продукта в формат Product для store
    const product: Product = {
      id: props.id,
      name: props.title || props.id,
      type: props.category || 'other',
      price: props.price,
      image: props.image || '',
      category: props.category || 'other',
      inStock: true
    }
    cartStore.addToCart(product, 1)
  }
}

const formatPriceNumber = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<style scoped lang="scss">
.product-card {
  width: 100%;
  height: 586px;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
}

.product-card--double {
  grid-column: span 2;
}

.product-card__image-container {
  width: 100%;
  height: 474px;
  padding: 12px;
  background: #FFF;
  border: 1px solid var(--border-rest, #DDD7CF);
  border-radius: var(--8, 8px);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  position: relative;
}

.product-card__image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
  transform-origin: center;
}

.product-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-card__image-container:hover .product-card__image {
  transform: scale(1.12);
}

.product-card__badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  width: auto;
  height: 72px;
  object-fit: contain;
  z-index: 10;
  pointer-events: none;
}

.product-card__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 16px;
  background: var(--bg-secondary-active, #E4DFD7);
}

.product-card__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-secondary, #62322D);
  font-family: "Cormorant Infant";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  text-align: left;
  cursor: pointer;
  text-decoration: none;
  display: block;
}

.product-card__price-button {
  align-self: flex-start;

  :deep(.btn__icon--right) {
    font-weight: 700;
  }
}

.product-card__price-button-link {
  align-self: flex-start;
  text-decoration: none;
  display: inline-block;
}

@media (max-width: 767px) {
  .product-card {
    width: 100%;
    max-width: 336px;
  }

  .product-card--double {
    width: 100%;
    max-width: 336px;
    grid-column: span 1;
  }

  .product-card__image-container {
    width: 100%;
    max-width: 336px;
  }

  .product-card__title {
    font-size: 24px;
  }
}
</style>

