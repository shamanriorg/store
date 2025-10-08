<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Левый контейнер с информацией -->
      <div class="footer-left">
        <!-- Навигация -->
        <nav class="footer-nav">
          <NuxtLink to="/">
            <Button variant="transparent" size="xs" no-padding :font-weight="400">Главная</Button>
          </NuxtLink>
          <NuxtLink to="/catalog">
            <Button variant="transparent" size="xs" no-padding :font-weight="400">Каталог</Button>
          </NuxtLink>
          <NuxtLink to="/blog">
            <Button variant="transparent" size="xs" no-padding :font-weight="400">Блог</Button>
          </NuxtLink>
          <NuxtLink to="/about">
            <Button variant="transparent" size="xs" no-padding :font-weight="400">О нас</Button>
          </NuxtLink>
          <NuxtLink to="/company">
            <Button variant="transparent" size="xs" no-padding :font-weight="400">О компании</Button>
          </NuxtLink>
          <NuxtLink to="/contact">
            <Button variant="transparent" size="xs" no-padding :font-weight="400">Заполнить форму</Button>
          </NuxtLink>
        </nav>
        
        <!-- Мессенджеры -->
        <div class="footer-messengers">
          <a href="https://t.me/shamanri" target="_blank" rel="noopener noreferrer">
            <Button variant="transparent" size="xs" no-padding :font-weight="400" left-icon="telegram" />
          </a>
          <a href="https://wa.me/shamanri" target="_blank" rel="noopener noreferrer">
            <Button variant="transparent" size="xs" no-padding :font-weight="400" left-icon="whatsapp" />
          </a>
          <a href="mailto:info@shamanri.art">
            <Button variant="transparent" size="xs" no-padding :font-weight="400" left-icon="email" />
          </a>
        </div>
        
        <!-- Логотип и копирайт -->
        <div class="footer-logo">
          <img 
            src="~/assets/images/shamanri-logo.svg" 
            alt="Shamanri" 
            class="logo-image"
          />
          <p class="copyright">
            © {{ currentYear }}. Все материалы являются собственностью автора. Использование без согласования запрещено.
          </p>
        </div>
      </div>
      
      <!-- Правый контейнер с изображением -->
      <div class="footer-right">
        <img 
          src="~/assets/images/sun.svg" 
          alt="Sun" 
          class="sun-image"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Импортируем кнопку из kit
import Button from '~/modules/shared/kit/Button.vue'

// Получаем текущий год
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.app-footer {
  width: 100%;
  background-color: var(--bg-primary);
  padding: 40px 0;
}

.footer-container {
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  
  a {
    text-decoration: none;
    color: inherit;
  }
}

.footer-messengers {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  
  a {
    text-decoration: none;
    color: inherit;
  }
}

.footer-logo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  
  .logo-image {
    height: 24px;
    width: auto;
    object-fit: contain;
  }
  
  .copyright {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-tertiary);
    line-height: 1.5;
    max-width: 400px;
  }
}

.footer-right {
  flex-shrink: 0;
  
  .sun-image {
    width: 200px;
    height: auto;
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 32px;
  }
  
  .footer-left {
    align-items: center;
    gap: 20px;
  }
  
  .footer-nav,
  .footer-messengers {
    justify-content: center;
  }
  
  .footer-logo {
    align-items: center;
    gap: 12px;
  }
  
  .sun-image {
    width: 150px;
  }
}
</style>
