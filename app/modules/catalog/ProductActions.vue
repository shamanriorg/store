<template>
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/modules/shared/kit/Button.vue'
import { useCartStore } from '~/stores/cart'
import type { Product as CartProduct } from '~/types'

interface Product {
  id: string
  title?: string
  price?: number
  kind?: 'digital' | 'wb' | 'complex'
  link?: string
  [key: string]: any
}

interface Props {
  product: Product
}

const props = defineProps<Props>()
const cartStore = useCartStore()

// Ссылка на Wildberries
const wbLink = computed(() => {
  if (props.product?.kind === 'wb') {
    return props.product.link || 'https://www.wildberries.ru/seller/4253084'
  }
  return ''
})

// Проверка, есть ли товар в корзине
const isInCart = computed(() => {
  if (!props.product) return false
  return cartStore.items.some(item => item.product.id === props.product?.id)
})

// Количество товара в корзине
const cartQuantity = computed(() => {
  if (!props.product) return 0
  const item = cartStore.items.find(item => item.product.id === props.product?.id)
  return item?.quantity || 0
})

// Добавление в корзину
const handleAddToCart = () => {
  if (!props.product || !props.product.price) return
  
  const cartProduct: CartProduct = {
    id: props.product.id,
    name: props.product.title || props.product.id,
    type: props.product.category || 'other',
    price: props.product.price,
    image: props.product.image || '',
    category: props.product.category || 'other',
    inStock: true
  }
  
  cartStore.addToCart(cartProduct, 1)
}

// Увеличение количества
const increaseQuantity = () => {
  if (!props.product) return
  const currentQuantity = cartQuantity.value
  cartStore.updateQuantity(props.product.id, currentQuantity + 1)
}

// Уменьшение количества
const decreaseQuantity = () => {
  if (!props.product) return
  const currentQuantity = cartQuantity.value
  if (currentQuantity > 1) {
    cartStore.updateQuantity(props.product.id, currentQuantity - 1)
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
  
  if (!props.product) return
  
  // Обновляем количество только если > 0
  if (value > 0) {
    cartStore.updateQuantity(props.product.id, value)
  }
}

// Обработка blur для количества
const handleQuantityBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = parseInt(target.value)
  
  if (!props.product) return
  
  // Если 0 или отрицательное - удаляем из корзины
  if (isNaN(value) || value <= 0) {
    cartStore.removeFromCart(props.product.id)
  } else {
    cartStore.updateQuantity(props.product.id, value)
  }
}

// Открытие формы обратной связи
const openContactForm = () => {
  const contactFormOpen = useState('contactFormOpen', () => false)
  contactFormOpen.value = true
}
</script>

<style scoped lang="scss">
.product-cart-controls {
  display: flex;
  gap: 16px;
  width: 100%;
}

.product-cart-controls__link {
  flex: 1;
  text-decoration: none;
  display: inline-block;
}

.product-cart-controls__button {
  width: 100%;
}

.product-quantity {
  flex: 1;
  display: flex;
  gap: 0;
  border-radius: var(--8, 8px);
  border: 1px solid var(--border-muted, #BAB3A9);
  padding: 0 16px;
  align-items: center;
}

.product-quantity__btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-primary, #361406);
  font-size: 24px;
  padding: 0;
  
  &:hover {
    color: var(--bg-primary-default, #A54E3B);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.product-quantity__input {
  flex-grow: 1;
  text-align: center;
  border: none;
  background: transparent;
  font-family: Rubik;
  font-size: 20px;
  color: var(--text-primary, #361406);
  padding: 0;
  
  &:focus {
    outline: none;
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
}

.product-add-to-cart-btn {
  width: 100%;
}

.product-digital-notice {
  color: var(--text-tertiary, #6F615B);
  text-align: center;
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 16px 0 0 0;
}

.product-wb-link {
  width: 100%;
  text-decoration: none;
  display: block;
}

.product-wb-btn {
  width: 100%;
}

.product-complex-text {
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
  line-height: 1.5;
}

.product-complex-link {
  color: var(--bg-primary-default, #A54E3B);
  text-decoration: none;
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
</style>

