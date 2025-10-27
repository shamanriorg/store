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
    <div class="articles-grid" v-if="articles.length > 0">
      <NuxtLink 
        v-for="article in articles" 
        :key="article.id"
        :to="`/blog/${article.id}`" 
        class="article-card"
      >
        <div class="article-image">
          <img 
            v-if="article.coverImage && !article.imageError"
            :src="article.coverImage.src" 
            :alt="article.coverImage.alt"
            @error="article.imageError = true"
          />
        </div>
        <h3 class="article-title">{{ article.title }}</h3>
        <p class="article-date">{{ formatDate(article.date) }}</p>
      </NuxtLink>
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

// Загрузка последних 4 статей (исключая закрепленную)
const loadLatestArticles = async () => {
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
        
        // Исключаем закрепленные статьи
        if (articleData.isPinned) {
          continue
        }
        
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
    
    // Сортируем по дате (новые сначала) и берем первые 4
    loadedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    articles.value = loadedArticles.slice(0, 4)
  } catch (error) {
    console.error('Ошибка загрузки статей:', error)
  }
}

// Используем утилиту для форматирования даты
const formatDate = formatRelativeDate

onMounted(() => {
  loadLatestArticles()
})
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
  line-height: 1.2;
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
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.article-title {
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 28px;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0;
}

.article-date {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--text-tertiary);
  margin: 0;
}
</style>

