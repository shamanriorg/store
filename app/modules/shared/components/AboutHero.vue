<template>
  <div class="about-hero">
    <!-- Контейнер с изображением и текстом -->
    <div class="about-hero-content">
      <div class="about-hero-image">
        <img
          src="~/assets/images/about-mary.jpg"
          alt="Мария Матвеева"
          class="mary-image"
        />
      </div>
      <div class="about-hero-text">
        <section class="about-section about-section-hero">
          <h2>{{ title }}</h2>
          <div class="hero-text">
            <p>
              Привет, друг!
            </p>
            <p>
              Меня зовут Мария, и я художник-иллюстратор.
              Используя смешанную технику, создаю акварельные иллюстрации, волшебные принты, и сказки.
            </p>
            <p>
              Я восхищаюсь и вдохновляюсь природой. Её силой,спокойствием и бесконечным разнообразием.
              Адепт неспешной жизни и гармонии во всем, чего мы касаемся, я стараюсь сохранить ощущение единства с миром и целостности в том, что делаю.
            </p>
            <p>
              Здесь ты сможешь найти:
            </p>
            <ul class="hero-list">
              <li>Авторские сказочные паттерны</li>
              <li>Открытки(новому году посвящаются отдельные серии)</li>
              <li>Плитку с моими паттернами</li>
              <li>Стикеры с авторскими иллюстрациями</li>
              <li>Процесс иллюстрации моей собственной книги(сказки,конечно же)</li>
              <li>Различные цифровые товары</li>
              <li>Безопасность, тепло и возможность никуда не спешить</li>
            </ul>
            <p>
              Добро пожаловать!
            </p>
            
            <!-- Ссылки на мессенджеры -->
            <div class="hero-messengers">
              <MessengerLinks />
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Орнаментальный баннер -->
    <div class="ornament-section">
      <OrnamentBanner />
    </div>
  </div>
</template>

<script setup lang="ts">
// Импортируем компоненты
import MessengerLinks from '~/modules/shared/components/MessengerLinks.vue'
import OrnamentBanner from '~/modules/shared/components/OrnamentBanner.vue'

// Пропсы
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Обо мне'
})
</script>

<style lang="scss" scoped>
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
  }

  p {
    font-family: var(--font-primary);
    font-size: 24px;
    line-height: normal;
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
</style>
