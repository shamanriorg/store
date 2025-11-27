<template>
  <ProductView :product-id="productId" :category="category" />
</template>

<script setup lang="ts">
import ProductView from '~/modules/catalog/ProductView.vue'

// Получаем ID продукта и категорию из параметров маршрута
const route = useRoute()
const productId = route.params.id as string
const category = route.params.category as string
</script>


