<template>
  <div></div>
</template>

<script setup lang="ts">
// Редирект на новую структуру с категорией (по умолчанию patterns)
const route = useRoute()
const productId = route.params.id as string
const router = useRouter()

// Редиректим на новую структуру
onMounted(() => {
  router.replace(`/product/patterns/${productId}`)
})
</script>

