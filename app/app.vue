<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Глобальные настройки приложения
useHead({
  titleTemplate: (chunk?: string) =>
    chunk ? `${chunk} | Shamanri` : 'Shamanri — иллюстрации, паттерны и новогодние сказки',
  meta: [
    {
      key: 'description',
      name: 'description',
      content:
        'Shamanri — авторские иллюстрации, паттерны и волшебные истории художницы Марии Матвеевой.'
    },
    {
      key: 'keywords',
      name: 'keywords',
      content:
        'Shamanri, Мария Матвеева, иллюстратор, авторские паттерны, новогодние открытки, акварель, сказки'
    },
    {
      key: 'og:site_name',
      property: 'og:site_name',
      content: 'Shamanri'
    },
    {
      key: 'og:type',
      property: 'og:type',
      content: 'website'
    },
    {
      key: 'og:title',
      property: 'og:title',
      content: 'Shamanri — иллюстрации, паттерны и новогодние сказки'
    },
    {
      key: 'og:description',
      property: 'og:description',
      content:
        'Магия природы в иллюстрациях и паттернах. Узнайте о творчестве студии Shamanri и вдохновитесь уютными историями.'
    }
  ]
})
</script>

<style lang="scss">
@use "~/assets/styles/main.scss" as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  width: 100%;
}

/* Кастомные шрифты */
@font-face {
  font-family: 'Haymaker';
  src: url('/Haymaker.woff2') format('woff2'),
       url('/Haymaker.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'MarckScript';
  src: url('/MarckScript-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>

