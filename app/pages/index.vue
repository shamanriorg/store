<template>
  <MainPage />
</template>

<script setup lang="ts">
// Импортируем главную страницу из модуля
import MainPage from '~/modules/main/MainPage.vue'
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Shamanri — авторские иллюстрации, паттерны и новогодние истории',
  description:
    'Иллюстрации Марии Матвеевой: акварельные паттерны, новогодние открытки, тактильные изделия и вдохновляющие истории Shamanri.',
  ogTitle: 'Shamanri — авторские иллюстрации и паттерны',
  ogDescription:
    'Откройте мир Shamanri: волшебные паттерны, теплые открытки и истории, которые становятся любимыми.',
  twitterCard: 'summary_large_image'
})
</script>