<template>
  <ProductView :product-id="productId" />
</template>

<script setup lang="ts">
import ProductView from '~/modules/catalog/ProductView.vue'

// Получаем ID продукта из параметров маршрута
const route = useRoute()
const productId = route.params.id as string
</script>

