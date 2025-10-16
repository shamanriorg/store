<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Левый контейнер с информацией -->
      <div class="footer-left">
        <!-- Навигация -->
        <nav class="footer-nav container-adaptive">
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
        <div class="footer-messengers container-adaptive">
          <MessengerLinks />
        </div>
        
        <!-- Логотип и копирайт -->
        <div class="footer-logo container-adaptive">
          <div class="logo-container">
            <img 
              src="~/assets/images/star-logo.svg" 
              alt="Star" 
              class="star-logo"
            />
            <div class="logo-with-copyright">
              <img 
                src="~/assets/images/shamanri-logo.svg" 
                alt="Shamanri" 
                class="logo-image"
              />
              <p class="copyright">
                © {{ currentYear }}. Все материалы являются собственностью автора. Использование без согласования запрещено.
              </p>
            </div>
            <img 
              src="~/assets/images/star-logo.svg" 
              alt="Star" 
              class="star-logo"
            />
          </div>
        </div>
      </div>
      
      <!-- Правый контейнер с изображением -->
      <div class="footer-right">
        <img 
          src="~/assets/images/sun-footer.svg" 
          alt="Sun" 
          class="sun-image"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Импортируем компоненты
import Button from '~/modules/shared/kit/Button.vue'
import MessengerLinks from '~/modules/shared/components/MessengerLinks.vue'

// Получаем текущий год
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.app-footer {
  width: 100%;
  background-color: var(--bg-primary);
  padding: 80px 0 0 0;
  overflow: hidden;
}

.footer-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 40px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
}

.footer-logo {
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: min-content;
  
  .logo-container {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    
    @media (max-width: 550px) {
      gap: 0;
    }
  }
  
  .logo-with-copyright {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  
  .logo-image {
    height: 60px;
    width: 455px;
    width: auto;
    object-fit: contain;
  }
  
  .star-logo {
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin-top: 22px;
  }
  
  .copyright {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-tertiary);
    line-height: 1.5;
    max-width: 100%;
    padding: 0 0 32px 0;
  }
}

.footer-right {
  flex-shrink: 0;
  
  .sun-image {
    height: 500px;
    width: auto;
  }
}

/* Адаптивность */
@media (max-width: 900px) {
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

    .copyright {
      padding: 0;
    }
  }
  
  .sun-image {
    width: 150px;
  }
}
</style>
