<template>
  <BlogList />
</template>

<script setup lang="ts">
import BlogList from '~/modules/blog/BlogList.vue'

useSeoMeta({
  title: 'Блог Shamanri — истории о творчестве и природе',
  description:
    'Читайте свежие заметки Shamanri: вдохновение, творческие процессы, новости бренда и закулисье авторских проектов.',
  ogTitle: 'Блог Shamanri — истории о творчестве',
  ogDescription:
    'Все статьи бренда Shamanri: вдохновение, гармония природы и новости мастерской Марии Матвеевой.',
  twitterCard: 'summary_large_image'
})

useHead({
  meta: [
    {
      key: 'blog-keywords',
      name: 'keywords',
      content: 'блог Shamanri, статьи природы, вдохновение, иллюстрации, Мария Матвеева'
    }
  ]
})
</script>
