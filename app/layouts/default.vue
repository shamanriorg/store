<template>
  <div class="layout-default">
    <!-- Хедер -->
    <AppHeader />
    
    <!-- Основной контент -->
    <main class="main">
      <slot />
    </main>
    
  <!-- Футер -->
  <AppFooter />
  
  <!-- Форма обратной связи -->
  <ContactFormDrawer />
  
  <!-- Кнопка Telegram -->
  <TelegramButton />
  </div>
</template>

<script setup lang="ts">
// Импортируем хедер и футер
import AppHeader from '~/modules/shared/components/AppHeader.vue'
import AppFooter from '~/modules/shared/components/AppFooter.vue'
import TelegramButton from '~/modules/shared/components/TelegramButton.vue'
import ContactFormDrawer from '~/modules/shared/components/ContactFormDrawer.vue'
</script>

<style lang="scss" scoped>
.layout-default {
  min-height: 100vh;
  display: block;
}

.main {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  padding-top: 64px; /* Отступ для фиксированного хедера */
}

</style>
