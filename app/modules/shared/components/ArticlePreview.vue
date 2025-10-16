<template>
  <div class="article-preview">
    <div class="article-preview-content">
      <div class="article-preview-media">
        <div class="media-placeholder"></div>
      </div>
      <div class="article-preview-text">
        <section class="article-section">
          <h2>
            <span class="title-text">{{ title }}</span>
            <img src="~/assets/images/badge-new.svg" alt="NEW" class="badge-new" />
          </h2>
          <div class="article-text">
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
              Итак, проекты, в которых мне бы очень хотелось поучаствовать:
            </p>
            <p>
              Мультфильм, похожий на современные Приключения Умки от Союзмультфильма.
              Познакомилась с ним благодаря сыну и теперь нежно люблю всей душой. Добрый, аутентичный, спокойный, с хорошей моралью, красивый (природа, орнаменты, яранги, олени - огонь).
              Поучаствовать в подобном проекте - было бы большой честью и удачей для меня...
              <NuxtLink to="/blog/article" class="read-more-link">
                Читать далее
                <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент предпросмотра статьи для главной страницы
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Проекты, в которых мне бы хотелось принять участие'
})
</script>

<style lang="scss" scoped>
.article-preview {
  margin-bottom: 64px;
}

.article-preview-content {
  display: flex;
  gap: 16px;
  
  @media (max-width: 1190px) {
    flex-direction: column;
  }
}

.article-preview-text {
  flex: 1;
  display: flex;
  align-items: flex-start;
  order: 1;
  
  @media (max-width: 1190px) {
    align-items: stretch;
    order: 2;
  }
}

.article-preview-media {
  flex-shrink: 0;
  order: 2;
  
  .media-placeholder {
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
  
  @media (max-width: 1190px) {
    order: 1;
  }
}

.article-section {
  margin-bottom: 32px;
  
  h2 {
    font-family: var(--font-secondary);
    font-weight: var(--font-secondary-weight);
    font-size: 40px;
    line-height: normal;
    color: var(--text-secondary);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    
    @media (max-width: 1190px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .title-text {
      order: 1;
      
      @media (max-width: 1190px) {
        order: 2;
      }
    }
    
    .badge-new {
      width: auto;
      height: 72px;
      object-fit: contain;
      order: 2;
      
      @media (max-width: 1190px) {
        order: 1;
      }
    }
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

.article-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  .read-more-link {
    color: inherit;
    text-decoration: underline;
    font-weight: 500;
    margin-left: 8px;
    transition: color 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    
    &:hover {
      color: var(--text-secondary);
    }
    
    .arrow-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }
  }
}
</style>

