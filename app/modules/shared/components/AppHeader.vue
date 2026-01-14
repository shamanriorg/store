<template>
  <header class="app-header">
    <div class="header-container container-adaptive">
      <!-- Логотип -->
      <NuxtLink to="/" class="header-logo">
        <img 
          src="~/assets/images/shamanri-logo.svg" 
          alt="Shamanri" 
          class="logo-image"
        />
      </NuxtLink>
      
      <!-- Навигация -->
      <nav class="header-nav">
        <NuxtLink to="/catalog" @click="closeMenu">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">Каталог</Button>
        </NuxtLink>
        <NuxtLink to="/blog">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">Блог</Button>
        </NuxtLink>
        <NuxtLink to="/about">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">О нас</Button>
        </NuxtLink>
        
        <!-- Разделитель и корзина показываются только если есть товары в корзине -->
        <div class="nav-divider" v-if="cartTotal > 0"></div>
        
        <!-- Корзина -->
        <NuxtLink to="/cart" v-if="cartTotal > 0">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn cart-btn">
            <span class="material-icons cart-icon">shopping_cart</span>
            <span class="cart-total">{{ formatPrice(cartTotal) }}</span>
            <span class="material-icons currency-icon">currency_ruble</span>
          </Button>
        </NuxtLink>
      </nav>

      <!-- Бургер-меню для мобильных -->
      <button
        class="burger-button"
        type="button"
        aria-label="Меню"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span class="burger-line" />
        <span class="burger-line" />
        <span class="burger-line" />
      </button>

    </div>

    <!-- Мобильное меню -->
    <transition name="mobile-fade">
      <div
        v-if="isMenuOpen"
        class="mobile-menu"
        role="dialog"
        aria-modal="true"
      >
        <nav class="mobile-nav">
          <NuxtLink to="/catalog" @click="closeMenu">
            <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">Каталог</Button>
          </NuxtLink>
          <NuxtLink to="/blog" @click="closeMenu">
            <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">Блог</Button>
          </NuxtLink>
          <NuxtLink to="/about" @click="closeMenu">
            <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">О нас</Button>
          </NuxtLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
// Импортируем кнопку из kit
import Button from '~/modules/shared/kit/Button.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const cartTotal = computed(() => {
  // Безопасный доступ к store на сервере
  if (import.meta.server) return 0
  return cartStore.totalPrice
})

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const isMenuOpen = ref(false)

const handleResize = () => {
  if (import.meta.client && window.innerWidth >= 768 && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  background-color: var(--bg-primary);
  z-index: 1000;
}

.header-container {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  box-sizing: border-box;
}

.header-logo {
  flex-shrink: 0;
  text-decoration: none;
  color: inherit;
  
  .logo-image {
    display: block;
    max-height: 24px;
    width: auto;
    object-fit: contain;
  }
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  transition: opacity 0.2s ease;
  
  a {
    text-decoration: none;
    color: inherit;
  }

  .is-disabled {
    cursor: not-allowed;
    opacity: 0.8;
    
    * {
      cursor: not-allowed;
    }
  }
}

.nav-btn {
  height: auto;
  font-family: Rubik, sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-primary);
}

.nav-divider {
  width: 1px;
  height: 24px;
  background-color: #e5e7eb;
}

.cart-btn {
  :deep(button) {
    gap: 8px;
  }
  
  :deep(.btn__content) {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .cart-icon {
    font-size: 20px;
    color: var(--text-primary);
  }
  
  .cart-total {
    font-weight: 500;
    color: var(--text-primary);
    min-width: 16px;
    text-align: center;
  }
  
  .currency-icon {
    font-size: 20px;
    color: var(--text-primary);
    font-weight: 700;
  }
}


/* Адаптивность будет добавлена позже */

.burger-button {
  display: none;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  position: relative;
  padding: 0;
  cursor: pointer;
}

.burger-line {
  position: absolute;
  left: 8px;
  right: 8px;
  height: 2px;
  background-color: var(--text-primary);
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:nth-child(1) {
    top: 12px;
  }

  &:nth-child(2) {
    top: 19px;
  }

  &:nth-child(3) {
    top: 26px;
  }
}

.burger-button[aria-expanded='true'] {
  .burger-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .burger-line:nth-child(2) {
    opacity: 0;
  }

  .burger-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}

.mobile-menu {
  position: fixed;
  top: calc(64px);
  left: 0;
  right: 0;
  background: var(--bg-secondary-page, #F9F5EF);
  padding: 24px 24px 32px;
  z-index: 99;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  text-align: center;

  a {
    text-decoration: none;
    width: 100%;
  }

  .nav-btn {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .is-disabled {
    cursor: not-allowed;
    opacity: 0.8;

    * {
      cursor: not-allowed;
    }
  }
}

.mobile-fade-enter-active,
.mobile-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-fade-enter-from,
.mobile-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 767px) {
  .header-container {
    justify-content: space-between;
    gap: 16px;
  }

  .header-nav {
    display: none;
  }

  .burger-button {
    display: block;
  }
}

@media (max-width: 375px) {
  .header-container {
    gap: 8px;
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .header-logo {
    flex-shrink: 1;
    min-width: 0;
    
    .logo-image {
      max-width: 100%;
      height: auto;
    }
  }
  
  .burger-button {
    flex-shrink: 0;
    min-width: 40px;
  }
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}
</style>
