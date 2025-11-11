<template>
  <div class="about-hero">
    <div class="about-hero-content">
      <div class="about-hero-image">
        <img
          src="~/assets/images/about-mary.png"
          alt="Мария Матвеева"
          class="mary-image"
        />
      </div>
      <div class="about-hero-text">
        <section class="about-section about-section-hero">
          <h2>Волшебные миры, рождённые акварелью и природой.</h2>
          <div class="hero-text">
            <p>
              Привет, друг!
            </p>
            <p>
              Меня зовут Мария. Я художник-иллюстратор, который верит, что магия — в деталях:
              в шепоте листьев, в уюте новогоднего вечера, в гармонии неспешной жизни. С
              помощью акварели и смешанных техник я превращаю это волшебство в иллюстрации,
              принты и сказки.
            </p>
            <p>
              Исследуй моё творчество:
            </p>
            <ul class="hero-list">
              <li>Паттерны, нашептывающие сказки</li>
              <li>Новогодние открытки — чтобы дарить самое тёплое</li>
              <li>Плитка и стикеры — частичка моего искусства на каждый день</li>
              <li>Путешествие за кулисы моей собственной книги-сказки</li>
            </ul>
            <p>
              Оставайтесь, здесь уютно!
            </p>

            <div class="hero-messengers">
              <MessengerLinks />
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="ornament-section">
      <MainOrnamentBanner />
    </div>
  </div>
</template>

<script setup lang="ts">
import MessengerLinks from '~/modules/shared/components/MessengerLinks.vue'
import MainOrnamentBanner from '~/modules/main/MainOrnamentBanner.vue'
</script>

<style scoped lang="scss">
.about-hero {
  margin-bottom: 64px;
}

.about-hero-content {
  display: flex;
  gap: 16px;
  margin-bottom: 64px;

  @media (max-width: 1190px) {
    flex-direction: column;
  }
}

.about-hero-image {
  flex-shrink: 0;

  .mary-image {
    width: 688px;
    height: 688px;
    object-fit: cover;
    border-radius: 8px;

    @media (max-width: 1190px) {
      width: 100%;
      height: auto;
      min-width: 343px;
      min-height: 343px;
      max-width: 100%;
    }
  }
}

.about-hero-text {
  flex: 1;
  display: flex;
  align-items: flex-start;

  @media (max-width: 1190px) {
    align-items: stretch;
  }
}

.about-section {
  margin-bottom: 32px;

  h2 {
    font-family: var(--font-secondary);
    font-weight: var(--font-secondary-weight);
    font-size: 40px;
    color: var(--text-secondary);
    margin-bottom: 20px;
    line-height: 1.2;
  }

  p {
    font-family: var(--font-primary);
    font-size: 24px;
    line-height: 1.2;
    color: var(--text-primary);
  }
}

.about-section-hero {
  h2 {
    margin-bottom: 24px;
  }
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-list {
  font-family: var(--font-primary);
  font-size: 24px;
  line-height: normal;
  color: var(--text-primary);
  padding-left: 24px;
  margin: 0;

  li {
    margin-bottom: 12px;

    &::marker {
      color: var(--bg-primary-default);
    }
  }
}

.hero-messengers {
  margin-top: 24px;
}

.ornament-section {
  margin-bottom: 64px;
}

@media (max-width: 767px) {
  .about-section {
    h2 {
      font-size: 36px;
    }

    p {
      font-size: 20px;
    }
  }

  .hero-list {
    font-size: 20px;
  }
}
</style>

