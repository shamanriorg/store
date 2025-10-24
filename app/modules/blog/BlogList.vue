<template>
  <div class="blog-page">
    <div class="container container-adaptive">
      <h1 class="page-title">Блог</h1>

      <div class="articles-list" v-if="articles.length > 0">
        <article 
          v-for="article in articles" 
          :key="article.id"
          class="article-item"
        >
          <NuxtLink :to="`/blog/${article.id}`" class="article-link">
            <div class="article-image">
              <img 
                v-if="article.coverImage && !article.imageError"
                :src="article.coverImage.src" 
                :alt="article.coverImage.alt"
                @error="article.imageError = true"
              />
              <div v-else class="image-placeholder"></div>
              <!-- Бейдж для мобильных устройств -->
              <img 
                v-if="article.isNew" 
                src="~/assets/images/badge-new.svg" 
                alt="NEW" 
                class="badge-new badge-mobile" 
              />
            </div>
            
            <div class="article-content">
              <div class="article-text">
                <h2 class="article-title">{{ article.title }}</h2>
                <p class="article-annotation">{{ article.annotation }}</p>
              </div>
              
              <div class="article-meta">
                <p class="article-date">{{ formatDate(article.date) }}</p>
                <img 
                  v-if="article.isNew" 
                  src="~/assets/images/badge-new.svg" 
                  alt="NEW" 
                  class="badge-new" 
                />
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <div v-else class="no-articles">
        <p>Статьи пока не добавлены</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatRelativeDate } from '~/modules/shared/utils/dateUtils'

interface ContentItem {
  type: 'text' | 'heading' | 'image' | 'video' | 'video-embed'
  text?: string
  src?: string
  alt?: string
  url?: string
  poster?: string
  isPreview?: boolean
}

interface Article {
  id: string
  title: string
  date: string
  isPinned: boolean
  isNew?: boolean
  annotation?: string
  content: Array<ContentItem>
  coverImage?: ContentItem
  previewText: Array<ContentItem>
  imageError?: boolean
}

const articles = ref<Article[]>([])

// Загрузка списка статей
const loadArticles = async () => {
  try {
    const response = await fetch('/articles/articles-list.json')
    if (!response.ok) return
    
    const data = await response.json()
    const articleFolders = data.articles || []
    
    const loadedArticles: Article[] = []
    
    for (const folder of articleFolders) {
      try {
        const articleResponse = await fetch(`/articles/${folder}/article.json`)
        if (!articleResponse.ok) continue
        
        const articleData = await articleResponse.json()
        
        // Загружаем все статьи для страницы блога
        
        // Получаем обложку (первое изображение)
        const coverImage = articleData.content.find((item: ContentItem) => item.type === 'image')
        
        // Получаем превью текст
        const previewText = articleData.content.filter((item: ContentItem) => 
          item.type === 'text' && item.isPreview
        )
        
        loadedArticles.push({
          ...articleData,
          coverImage,
          previewText,
          imageError: false
        })
      } catch (err) {
        console.warn(`Не удалось загрузить статью из ${folder}:`, err)
        continue
      }
    }
    
    // Сортируем по дате (новые сначала)
    loadedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    articles.value = loadedArticles
  } catch (error) {
    console.error('Ошибка загрузки статей:', error)
  }
}

// Используем утилиту для форматирования даты
const formatDate = formatRelativeDate

onMounted(() => {
  loadArticles()
})
</script>

<style lang="scss" scoped>
.blog-page {
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

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.article-item {
  min-height: 176px;
  background-color: var(--bg-primary);
  border-radius: 8px;
  overflow: hidden;
  transition: opacity 0.3s ease;
  border-bottom: 1px solid var(--border-rest, #DDD7CF);
  border-radius: 0;
  
  &:hover {
    opacity: 0.85;
  }
  
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
}

.article-link {
  display: flex;
  height: 100%;
  text-decoration: none;
  color: inherit;
  padding: 16px 0;
  min-width: 0;
  overflow: hidden;
}

.article-image {
  // align-self: center;
  width: 124px;
  height: 144px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 4px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .image-placeholder {
    width: 100%;
    height: 100%;
    background-color: #000000;
  }
}

.article-content {
  display: flex;
  flex: 1;
  margin-left: 16px;
  gap: 16px;
  justify-content: space-between;
  min-width: 0;
  overflow: hidden;
}

.article-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.article-title {
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 40px;
  line-height: 1;
  color: var(--text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  min-width: 0;
}

.article-annotation {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  color: var(--text-primary);
  margin: 0;
}

.article-meta {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex-shrink: 0;
  min-width: 120px;
  width: 120px;
}

.article-date {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  color: var(--text-tertiary);
  margin: 0;
}

.badge-new {
  height: 72px;
  width: auto;
  object-fit: contain;
}

.badge-mobile {
  display: none;
}

.no-articles {
  text-align: center;
  padding: 64px 0;
  
  p {
    font-family: var(--font-primary);
    font-size: 20px;
    color: var(--text-tertiary);
  }
}

// Адаптивность
@media (max-width: 768px) {
  .blog-page {
    padding: 16px 0 0 0;
  }
  
  .page-title {
    font-size: 36px;
    margin-bottom: 24px;
  }
  
  .article-item {
    min-height: auto;
    // border-bottom: none;
  }
  
  .article-link {
    flex-direction: column;
    padding: 24px 0 0 0;
  }
  
  .article-image {
    width: 100%;
    height: 200px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  
  .article-content {
    margin-left: 0;
    flex-direction: column;
    gap: 0;
  }
  
  .article-text {
    order: 2;
    margin-bottom: 8px;
  }
  
  .article-meta {
    order: 1;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 8px;
  }
  
  .article-title {
    font-size: 28px;
    margin-bottom: 8px;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
  }
  
  .article-annotation {
    font-size: 16px;
  }
  
  .article-date {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  .article-image {
    position: relative;
  }
  
  .article-image .badge-mobile {
    display: block !important;
    position: absolute !important;
    bottom: 8px !important;
    left: 8px !important;
    height: 72px !important;
    width: 112px !important;
    object-fit: contain !important;
    z-index: 2 !important;
  }
  
  .article-meta .badge-new {
    display: none;
  }
}
</style>
