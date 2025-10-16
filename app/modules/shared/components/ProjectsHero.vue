<template>
  <div class="projects-hero">
    <div class="projects-hero-content">
      <div class="projects-hero-text">
        <section class="projects-section">
          <h2>{{ title }}</h2>
          <div class="hero-text">
            <p>
              Друзья, если вам понравилось то, что я делаю, и вы хотите пригласить меня в совместный проект,
            </p>
            <p>
              а) Это круто, спасибо мне очень приятно!
            </p>
            <p>
              б) Посмотрите на список ниже, и если вы делаете что-то из нижеперечисленного я стопроцентно с большим удовольствием присоединюсь
            </p>
            <p>
              <strong>Итак, проекты, в которых мне бы очень хотелось поучаствовать:</strong>
            </p>
            <p>
              Мультфильм, похожий на современные Приключения Умки от Союзмультфильма.
              Познакомилась с ним благодаря сыну и теперь нежно люблю всей душой. Добрый, аутентичный, спокойный, с хорошей моралью, красивый (природа, орнаменты, яранги, олени - огонь).
              Поучаствовать в подобном проекте - было бы большой честью и удачей для меня
            </p>
          </div>
        </section>
      </div>
      <div class="projects-hero-video">
        <div class="video-placeholder"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Пропсы
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Проекты, в которых мне бы хотелось принять участие'
})
</script>

<style lang="scss" scoped>
.projects-hero {
  margin-bottom: 64px;
}

.projects-hero-content {
  display: flex;
  gap: 16px;
  
  @media (max-width: 1190px) {
    flex-direction: column;
  }
}

.projects-hero-text {
  flex: 1;
  display: flex;
  align-items: flex-start;
  
  @media (max-width: 1190px) {
    align-items: stretch;
  }
}

.projects-hero-video {
  flex-shrink: 0;
  
  .video-placeholder {
    width: 688px;
    height: 688px;
    background-color: #000000;
    border-radius: 8px;
    
    @media (max-width: 1190px) {
      width: 100%;
      height: auto;
      min-width: 343px;
      min-height: 343px;
      max-width: 100%;
      aspect-ratio: 1;
    }
  }
}

.projects-section {
  margin-bottom: 32px;
  
  h2 {
    font-family: var(--font-secondary);
    font-weight: var(--font-secondary-weight);
    font-size: 40px;
    color: var(--text-secondary);
    margin-bottom: 24px;
  }

  p {
    font-family: var(--font-primary);
    font-size: 24px;
    line-height: normal;
    color: var(--text-primary);
    
    strong {
      font-weight: 500;
    }
  }
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

