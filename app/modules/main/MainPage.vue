<template>
  <div class="main-page">
    <!-- Основной контент -->
    <div class="main-content">
      <div class="container">
        <section class="hero-section">
          <h1 class="hero-title">
            <span class="material-icons title-icon" style="color: #A54E3B; font-size: 2rem;">store</span>
            <q-icon name="favorite" size="2rem" color="#8E402F" class="title-icon" />
            Shamanri Store
          </h1>
          <p class="hero-subtitle">Добро пожаловать в интернет-магазин авторских платков и художественной продукции</p>
          
          <div class="hero-actions">
            <Button variant="default" size="large" left-icon="shopping_bag" @click="handleClick">
              Перейти в каталог
            </Button>
            <Button variant="transparent" size="large" left-icon="info" @click="handleClick">
              О нас
            </Button>
          </div>
        </section>
        
        <section class="features-section">
          <h2 class="section-title">Почему выбирают нас</h2>
          <div class="features-grid">
            <div class="feature-card">
              <span class="material-icons feature-icon">palette</span>
              <h3>Авторские работы</h3>
              <p>Уникальные дизайны от талантливых художников</p>
            </div>
            <div class="feature-card">
              <span class="material-icons feature-icon">eco</span>
              <h3>Экологичные материалы</h3>
              <p>Только натуральные и безопасные материалы</p>
            </div>
            <div class="feature-card">
              <span class="material-icons feature-icon">local_shipping</span>
              <h3>Быстрая доставка</h3>
              <p>Доставляем по всей России и зарубеж</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Импортируем компоненты
import Button from '~/modules/shared/kit/Button.vue'

const handleClick = (event: MouseEvent) => {
  console.log('Кнопка нажата:', event)
}
</script>

<style lang="scss" scoped>
.main-page {
  min-height: 100vh;
}

.main-content {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #A54E3B;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  flex-shrink: 0;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.features-section {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 3rem;
  font-weight: 700;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15);
  }
}

.feature-icon {
  font-size: 3rem;
  color: var(--bg-primary-default);
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* Адаптивность */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-section {
    padding: 2rem 0;
  }
  
  .features-section {
    padding: 2rem 0;
  }
}
</style>
