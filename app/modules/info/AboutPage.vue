<template>
  <div class="about-page">
    <div class="container container-adaptive">
      <h1 class="page-title">О нас</h1>
      
      <!-- Герой-секция с фото, текстом и орнаментом -->
      <AboutPageHero />

      <section class="about-section">
        <h2>Достижения</h2>
        <div class="achievements">
          <!-- Год -->
          <div class="ach-year">2025</div>
          <!-- События года -->
          <div class="ach-row">
            <div class="ach-date">14 июля</div>
            <div class="ach-title">Зарегистрировали товарный знак</div>
            <div class="ach-link">
              <NuxtLink to="/blog/17-08-2025" class="link-inline">
                Читать
                <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>
            </div>
            <div class="ach-result">Тадам!</div>
          </div>

          <div class="ach-year">2024</div>
          <div class="ach-row">
            <div class="ach-date">5 ноября</div>
            <div class="ach-title">Выход на Вайлдбериз ноябрь 2024</div>
            <div class="ach-link">
              <NuxtLink to="/blog/05-11-2024" class="link-inline">
                Читать
                <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>
            </div>
            <div class="ach-result">Вжух!</div>
          </div>

          <div class="ach-divider"></div>

          <div class="ach-row">
            <div class="ach-date">11 марта</div>
            <div class="ach-title">1-е место Textile Design Talents Solstudio Award 2024</div>
            <div class="ach-link">
              <NuxtLink to="/blog/11-03-2024" class="link-inline">
                Как это было?
                <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>
            </div>
            <div class="ach-result">Победитель</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Импортируем компоненты
import AboutPageHero from '~/modules/info/AboutPageHero.vue'

// SEO
useSeoMeta({
  title: 'О нас — студия паттернов и иллюстрации Shamanri',
  description:
    'Узнайте, как Shamanri создаёт акварельные паттерны, плитку и открытки: философия гармонии с природой, команда и достижения бренда.',
  ogTitle: 'Shamanri — кто мы и зачем создаём паттерны',
  ogDescription:
    'Философия студии Shamanri: любовь к природе, акварельным узорам и предметам, которые приносят уют. История бренда и награды.',
  twitterCard: 'summary_large_image'
})

useHead({
  meta: [
    {
      key: 'about-keywords',
      name: 'keywords',
      content:
        'Shamanri, студия паттернов, дизайнерская плитка, авторские открытки, философия бренда, достижения Shamanri'
    }
  ]
})
</script>

<style lang="scss" scoped>
.about-page {
  min-height: 60vh;
  padding: 32px 0 0 0;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

.page-title {
  font-family: var(--font-secondary);
  font-weight: var(--font-secondary-weight);
  font-size: 48px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.about-section {
  margin-bottom: 32px;
  
  h2 {
    font-family: var(--font-secondary);
    font-weight: var(--font-secondary-weight);
    font-size: 40px;
    color: var(--text-secondary);
    margin-bottom: 24px; /* отступ 24px от заголовка */
  }

  p {
    font-family: var(--font-primary);
    font-size: 24px;
    line-height: 1.2;
    color: var(--text-primary);
  }
}

/* Достижения */
.achievements {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ach-divider {
  width: 100%;
  height: 1px;
  background-color: var(--border-rest, #DDD7CF);
}

.ach-year {
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  color: var(--text-secondary);
  margin-top: 24px;
}

.achievements > .ach-year:first-child {
  margin-top: 0;
}

.ach-row {
  display: grid;
  grid-template-columns: 140px 1fr 180px 160px; /* дата | событие | ссылка | результат */
  align-items: start;
  gap: 16px;
  padding: 16px 0;
}

.ach-date,
.ach-title,
.ach-link,
.ach-result {
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  color: var(--text-primary);
}

.ach-link {
  font-size: 20px;
}

.ach-result {
  text-align: right;
  font-weight: 500;
  color: var(--bg-primary-default, #A54E3B);
}

.link-inline {
  color: inherit;
  font-weight: 500;
  text-decoration: underline;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  
  &:hover {
    color: var(--text-secondary);
  }
}

.arrow-icon {
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .ach-row {
    grid-template-columns: 120px minmax(0, 1fr) auto;
    grid-template-rows: auto auto;
    column-gap: 16px;
    row-gap: 12px;
  }

  .ach-date {
    grid-column: 1;
    grid-row: 1;
  }

  .ach-title {
    grid-column: 2 / 4;
    grid-row: 1;
  }

  .ach-link {
    grid-column: 2;
    grid-row: 2;
    justify-self: flex-start;
  }

  .ach-result {
    grid-column: 3;
    grid-row: 2;
    justify-self: flex-end;
    text-align: right;
  }
}

@media (max-width: 767px) {
  .page-title {
    font-size: 44px;
  }

  .about-section {
    h2 {
      font-size: 36px;
    }

    p {
      font-size: 20px;
    }
  }

  .ach-year,
  .ach-date,
  .ach-title,
  .ach-link,
  .ach-result {
    font-size: 20px;
  }
}
</style>

