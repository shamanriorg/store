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
  title: 'Shamanri - Авторские платки и открытки',
  meta: [
    { name: 'description', content: 'Авторские платки, открытки и художественная продукция иллюстратора Марии Матвеевой' }
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

