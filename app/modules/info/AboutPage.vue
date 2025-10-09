<template>
  <div class="about-page">
    <div class="container container-adaptive">
      <h1 class="page-title">О нас</h1>
      
      <section class="about-section">
        <h2>Мария Матвеева</h2>
        <p>
          Художник-иллюстратор, создатель бренда Shamanri. 
          Вдохновение черпаю из природы, культуры и путешествий.
        </p>
      </section>

      <section class="about-section">
        <h2>Наша история</h2>
        <p>
          Shamanri начался как личный творческий проект, который постепенно 
          превратился в полноценный бренд авторских платков и художественной продукции.
        </p>
        <p>
          Каждый дизайн создается вручную с любовью к деталям и уникальным стилем, 
          который отличает наши изделия от массового производства.
        </p>
      </section>

      <section class="about-section">
        <h2>Наши ценности</h2>
        <ul class="values-list">
          <li>Уникальность каждого дизайна</li>
          <li>Высокое качество материалов</li>
          <li>Внимание к деталям</li>
          <li>Экологичность производства</li>
          <li>Индивидуальный подход к клиентам</li>
        </ul>
      </section>

      <section class="about-section">
        <h2>Свяжитесь с нами</h2>
        <p>
          Мы всегда рады новым знакомствам и сотрудничеству. 
          Следите за нашими новинками в социальных сетях и пишите нам!
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  padding: 40px 0;
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
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 30px;
  }
}

.about-section {
  margin-bottom: 40px;
  
  h2 {
    font-family: var(--font-secondary);
    font-weight: var(--font-secondary-weight);
    font-size: 32px;
    color: var(--text-secondary);
    margin-bottom: 16px;
    
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
  
  p {
    font-family: var(--font-primary);
    font-size: 18px;
    line-height: 1.8;
    color: var(--text-primary);
    margin-bottom: 16px;
    
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
}

.values-list {
  font-family: var(--font-primary);
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-primary);
  padding-left: 24px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 12px;
    
    &::marker {
      color: var(--bg-primary-default);
    }
  }
}
</style>

