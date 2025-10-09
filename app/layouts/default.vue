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
  </div>
</template>

<script setup lang="ts">
// Импортируем хедер и футер
import AppHeader from '~/modules/shared/components/AppHeader.vue'
import AppFooter from '~/modules/shared/components/AppFooter.vue'
</script>

<style lang="scss" scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

</style>
