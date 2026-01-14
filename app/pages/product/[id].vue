<template>
  <div></div>
</template>

<script setup lang="ts">
// Редирект на новую структуру с категорией (по умолчанию patterns)
const route = useRoute()
const productId = route.params.id as string

// Редиректим на новую структуру (работает и на сервере, и на клиенте)
await navigateTo(`/product/patterns/${productId}`, { 
  redirectCode: 301,
  replace: true 
})
</script>

