<template>
  <BlogList />
</template>

<script setup lang="ts">
import BlogList from '~/modules/blog/BlogList.vue'

// SEO мета-теги
useHead({
  title: 'Блог - Shamanri',
  meta: [
    { name: 'description', content: 'Статьи о творчестве, природе и вдохновении от Shamanri' },
    { name: 'keywords', content: 'блог, статьи, творчество, природа, вдохновение, рисование' }
  ]
})
</script>
