<template>
  <NuxtLayout name="default">
    <div class="error-page">
      <NotFoundPlaceholder />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import NotFoundPlaceholder from '~/modules/shared/components/NotFoundPlaceholder.vue'

// Обработка ошибок
const props = defineProps<{
  error: Object
}>()

// Логирование ошибки
console.error('Error:', props.error)

// SEO для страницы ошибки
useHead({
  title: 'Страница не найдена - Shamanri',
  meta: [
    { name: 'description', content: 'Запрашиваемая страница не найдена' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
