<template>
  <header class="app-header">
    <div class="header-container">
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
        <NuxtLink to="/catalog">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">Каталог</Button>
        </NuxtLink>
        <NuxtLink to="/blog">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">Блог</Button>
        </NuxtLink>
        <NuxtLink to="/about">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn">О нас</Button>
        </NuxtLink>
        
        <!-- Разделитель -->
        <div class="nav-divider"></div>
        
        <!-- Корзина -->
        <NuxtLink to="/cart">
          <Button variant="transparent" no-padding :font-weight="400" class="nav-btn cart-btn">
            <span class="material-icons cart-icon">shopping_cart</span>
            <span class="cart-count">0</span>
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
  padding: 20px 24px;
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
