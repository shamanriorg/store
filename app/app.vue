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
  ],
  script: [
    // Google Analytics 4 и Яндекс.Метрика загружаются только в production
    ...(import.meta.dev ? [] : [
      // Google Analytics 4
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-VC8CSHGSH0',
        async: true
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VC8CSHGSH0');
        `
      },
      // Яндекс.Метрика
      {
        type: 'text/javascript',
        innerHTML: `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(88167231, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `
      }
    ])
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

