<template>
  <CompanyPage />
</template>

<script setup lang="ts">
import CompanyPage from '~/modules/info/CompanyPage.vue'
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'О компании — контакты и информация Shamanri',
  description:
    'Контактная информация Shamanri: адрес, телефон, email, социальные сети. Юридическая информация, условия оплаты и доставки. Интернет-магазин художественной продукции с 2020 года.',
  ogTitle: 'Контакты Shamanri — как с нами связаться',
  ogDescription:
    'Свяжитесь с Shamanri: почта shamanri@ya.ru, телефон +7 936 615 8336, Telegram, Instagram, ВК. Режим работы: будни с 11 до 19 мск.',
  twitterCard: 'summary_large_image'
})

useHead({
  meta: [
    {
      key: 'company-keywords',
      name: 'keywords',
      content:
        'Shamanri контакты, контактная информация Shamanri, как связаться с Shamanri, адрес Shamanri, телефон Shamanri, email Shamanri, условия оплаты, доставка Shamanri'
    }
  ]
})
</script>

