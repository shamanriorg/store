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
    chunk ? `${chunk} | Shamanri` : 'Shamanri — акварельные паттерны, плитка и открытки',
  meta: [
    {
      key: 'description',
      name: 'description',
      content:
        'Shamanri — студия акварельных паттернов, плитки и открыток художницы Марии Матвеевой. Волшебные иллюстрации, цифровые коллекции и истории о природе.'
    },
    {
      key: 'keywords',
      name: 'keywords',
      content:
        'Shamanri, Мария Матвеева, акварельные паттерны, плитка с узорами, авторские открытки, цифровые принты, иллюстрация о природе'
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
      content: 'Shamanri — акварельные паттерны, плитка и открытки'
    },
    {
      key: 'og:description',
      property: 'og:description',
      content:
        'Студия Shamanri создаёт авторские паттерны, плитку, открытки и цифровые коллекции, вдохновлённые природой и сезонной магией.'
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

