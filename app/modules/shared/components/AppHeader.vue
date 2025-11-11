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
        <!-- NOTE: <NuxtLink to="/catalog"> temporarily disabled until Catalog is ready -->
        <div class="nav-disabled is-disabled" role="button" aria-disabled="true" tabindex="-1">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">Каталог</Button>
        </div>
        <NuxtLink to="/blog">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">Блог</Button>
        </NuxtLink>
        <NuxtLink to="/about">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">О нас</Button>
        </NuxtLink>
        
        <!-- Разделитель и корзина показываются только если есть товары в корзине -->
        <div class="nav-divider" v-if="cartCount > 0"></div>
        
        <!-- Корзина -->
        <NuxtLink to="/cart" v-if="cartCount > 0">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn cart-btn">
            <span class="material-icons cart-icon">shopping_cart</span>
            <span class="cart-count">{{ cartCount }}</span>
            <span class="material-icons currency-icon">currency_ruble</span>
          </Button>
        </NuxtLink>
      </nav>
      
    </div>
  </header>
</template>

<script setup lang="ts">
// Импортируем кнопку из kit
import Button from '~/modules/shared/kit/Button.vue'

// Временная заглушка для количества товаров в корзине.
// Когда добавим механику корзины, заменим на реальный источник данных (store/api).
const cartCount = 0
</script>

<style lang="scss" scoped>
.app-header {
  width: 100%;
  height: 64px;
  background-color: var(--bg-primary);
  position: sticky;
  top: 0;
  z-index: 100;
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
    height: 100%;
    max-height: 24px;
    width: auto;
    object-fit: contain;
  }
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  
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
}

.nav-divider {
  width: 1px;
  height: 24px;
  background-color: #e5e7eb;
}

.cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .cart-icon,
  .currency-icon {
    font-size: 20px;
    color: var(--text-primary);
  }
  
  .cart-count {
    font-weight: var(--font-primary-weight);
    color: var(--text-primary);
    min-width: 16px;
    text-align: center;
  }
}


/* Адаптивность будет добавлена позже */
</style>
