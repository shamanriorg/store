<template>
  <div class="latest-articles">
    <!-- Заголовок и ссылка на блог -->
    <div class="articles-header">
      <h2 class="articles-title">Что еще почитать</h2>
      <NuxtLink to="/blog" class="blog-link">
        Перейти в блог
        <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>

    <!-- Список статей -->
    <div class="articles-grid">
      <!-- Статья 1 -->
      <NuxtLink to="/blog/article-1" class="article-card">
        <div class="article-image"></div>
        <h3 class="article-title">Секреты рисования растений</h3>
        <p class="article-date">Позавчера</p>
      </NuxtLink>

      <!-- Статья 2 -->
      <NuxtLink to="/blog/article-2" class="article-card">
        <div class="article-image"></div>
        <h3 class="article-title">Секреты рисования растений</h3>
        <p class="article-date">3 дня назад</p>
      </NuxtLink>

      <!-- Статья 3 -->
      <NuxtLink to="/blog/article-3" class="article-card">
        <div class="article-image"></div>
        <h3 class="article-title">Секреты рисования растений</h3>
        <p class="article-date">2 недели назад</p>
      </NuxtLink>

      <!-- Статья 4 -->
      <NuxtLink to="/blog/article-4" class="article-card">
        <div class="article-image"></div>
        <h3 class="article-title">Секреты рисования растений</h3>
        <p class="article-date">3 месяца назад</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент последних статей для главной страницы
// TODO: Добавить логику фильтрации закрепленной статьи
</script>

<style lang="scss" scoped>
.latest-articles {
  margin-bottom: 64px;
  overflow: hidden;
}

.articles-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

.articles-title {
  font-family: var(--font-secondary);
  font-weight: var(--font-secondary-weight);
  font-size: 40px;
  line-height: normal;
  color: var(--text-secondary);
  margin: 0;
}

.blog-link {
  color: inherit;
  text-decoration: underline;
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 500;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  
  &:hover {
    color: var(--text-secondary);
  }
  
  .arrow-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
}

.articles-grid {
  display: flex;
  gap: 16px;
}

.article-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.85;
  }
}

.article-image {
  width: 336px;
  height: 265px;
  background-color: #000000;
  border-radius: 8px;
}

.article-title {
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 28px;
  line-height: normal;
  color: var(--text-primary);
  margin: 0;
}

.article-date {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  color: var(--text-tertiary);
  margin: 0;
}
</style>

