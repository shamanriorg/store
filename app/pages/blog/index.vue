<template>
  <BlogList />
</template>

<script setup lang="ts">
import BlogList from '~/modules/blog/BlogList.vue'

useSeoMeta({
  title: 'Блог Shamanri — паттерны, плитка и жизнь студии',
  description:
    'Материалы Shamanri о создании паттернов, коллекций плитки, открыток и цифровых проектов. Новости мастерской и вдохновение природы.',
  ogTitle: 'Блог Shamanri — закулисье паттернов и плитки',
  ogDescription:
    'Читайте истории студии Shamanri: запуск коллекций, эксперименты с плиткой, открыточные серии и мысли Марии Матвеевой.',
  twitterCard: 'summary_large_image'
})

useHead({
  meta: [
    {
      key: 'blog-keywords',
      name: 'keywords',
      content: 'блог Shamanri, паттерны, плитка, открытки, новости студии, Мария Матвеева'
    }
  ]
})
</script>
