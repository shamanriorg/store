<template>
  <div class="main-page">
    <!-- Видео-блок Заглушка для видео -->
    <!-- <div class="video-section">
      
    </div>-->

    <!-- Основной контент -->
    <div class="main-content">
      <div class="container container-adaptive">
        <!-- Компонент "Обо мне" -->
        <div class="about-section">
          <MainAboutHero />
        </div>

        <!-- Кнопки категорий -->
        <div class="categories-section">
          <CategoryButtons />
        </div>

        <!-- Предпросмотр статьи -->
        <div class="article-section">
          <ArticlePreview />
        </div>

        <!-- Последние статьи -->
        <div class="latest-articles-section">
          <LatestArticles />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Импортируем компоненты
import MainAboutHero from '~/modules/main/MainAboutHero.vue'
import CategoryButtons from '~/modules/main/CategoryButtons.vue'
import ArticlePreview from '~/modules/main/ArticlePreview.vue'
import LatestArticles from '~/modules/shared/components/LatestArticles.vue'
</script>

<style lang="scss" scoped>
.main-page {
  min-height: 100vh;
}

.video-section {
  width: 100vw;
  height: 898px;
  background-color: #000000;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

.main-content {
  padding: 64px 0 2rem 0;
}

.about-section {
  margin-bottom: 64px;
}

.categories-section {
  margin-bottom: 64px;
}

.article-section {
  margin-bottom: 64px;
}

.latest-articles-section {
  margin-bottom: 64px;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
