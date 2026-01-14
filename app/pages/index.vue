<template>
  <MainPage />
</template>

<script setup lang="ts">
// Импортируем главную страницу из модуля
import MainPage from '~/modules/main/MainPage.vue'
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Shamanri — акварельные паттерны, плитка и открытки',
  description:
    'Главная страница Shamanri: свежие паттерны, плитка с авторскими узорами, открытки и проекты художницы Марии Матвеевой.',
  ogTitle: 'Shamanri — студия акварельных паттернов и плитки',
  ogDescription:
    'Загляните в мастерскую Shamanri: коллекции паттернов, плитки, открыток и вдохновляющих историй о природе и волшебстве.',
  twitterCard: 'summary_large_image'
})

useHead({
  meta: [
    {
      key: 'home-keywords',
      name: 'keywords',
      content:
        'Shamanri, Мария Матвеева, акварельные паттерны, плитка с узорами, авторские открытки, цифровые принты, иллюстрация о природе, ботанические узоры, интерьерные паттерны'
    }
  ]
})
</script>