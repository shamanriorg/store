<template>
  <ArticleView :article-id="articleId" />
</template>

<script setup lang="ts">
import ArticleView from '~/modules/blog/ArticleView.vue'

// Получаем ID статьи из параметров маршрута
const route = useRoute()
const articleId = route.params.id as string
</script>

