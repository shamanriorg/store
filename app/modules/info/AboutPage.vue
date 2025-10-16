<template>
  <div class="about-page">
    <div class="container container-adaptive">
      <h1 class="page-title">О нас</h1>
      
      <!-- Герой-секция с фото, текстом и орнаментом -->
      <AboutHero title="Кто я?" />

      <section class="about-section">
        <h2>Достижения</h2>
        <p>Здесь будет информация о достижениях и наградах.</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Импортируем компонент
import AboutHero from '~/modules/shared/components/AboutHero.vue'

// SEO
useHead({
  title: 'О нас - Shamanri',
  meta: [
    {
      name: 'description',
      content: 'Узнайте больше о художнике-иллюстраторе Марии Матвеевой и истории бренда Shamanri'
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
    margin-bottom: 20px;
  }

  p {
    font-family: var(--font-primary);
    font-size: 24px;
    line-height: normal;
    color: var(--text-primary);
  }
}

</style>

