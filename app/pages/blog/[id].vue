<template>
  <ArticleView :article-id="articleId" />
</template>

<script setup lang="ts">
import ArticleView from '~/modules/blog/ArticleView.vue'

// Получаем ID статьи из параметров маршрута
const route = useRoute()
const articleId = route.params.id as string

// Отладка
console.log('Article ID:', articleId)
console.log('Route params:', route.params)

// SEO мета-теги
useHead({
  title: `Статья - Shamanri`,
  meta: [
    { name: 'description', content: 'Читайте статьи о творчестве, природе и вдохновении от Shamanri' }
  ]
})
</script>

