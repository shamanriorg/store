<template>
  <NotFoundPlaceholder />
</template>

<script setup lang="ts">
import NotFoundPlaceholder from '~/modules/shared/components/NotFoundPlaceholder.vue'

// SEO мета-теги для 404 страницы
useHead({
  title: 'Страница не найдена - Shamanri',
  meta: [
    { name: 'description', content: 'Запрашиваемая страница не найдена. Возможно, она ещё не создана или была перемещена.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
