<template>
  <div class="article-view" v-if="article">
    <div class="container container-adaptive">
      <!-- Кнопка "В блог" -->
      <div class="back-to-blog">
        <NuxtLink to="/blog">
          <Button variant="transparent" left-icon="arrow_back">
            В блог
          </Button>
        </NuxtLink>
      </div>

      <!-- Заголовок статьи -->
      <h1 class="article-title">{{ article.title }}</h1>
      
      <!-- Дата статьи -->
      <p class="article-date">{{ formatDate(article.date) }}</p>

    <div class="article-content">
      <div 
        v-for="(item, index) in article.content" 
        :key="index"
        class="content-item"
      >
        <!-- Изображение -->
        <div v-if="item.type === 'image'" class="image-container">
          <img 
            v-if="item.src && !item.imageError"
            :src="item.src" 
            :alt="item.alt"
            class="content-image"
            @error="item.imageError = true"
          />
          <div v-else class="image-placeholder">
            <span class="placeholder-text">Изображение недоступно</span>
          </div>
        </div>
        
        <!-- Видео (локальное) -->
        <video 
          v-else-if="item.type === 'video'"
          :src="item.src"
          :poster="item.poster"
          controls
          class="content-video"
        >
          Ваш браузер не поддерживает видео.
        </video>
        
        <!-- Видео (встроенное) -->
        <iframe 
          v-else-if="item.type === 'video-embed'"
          :src="item.url"
          frameborder="0"
          allowfullscreen
          class="content-embed"
        ></iframe>
        
        <!-- Заголовок -->
        <h2 
          v-else-if="item.type === 'heading'"
          class="content-heading"
        >
          {{ item.text }}
        </h2>
        
        <!-- Текст -->
        <p 
          v-else-if="item.type === 'text'"
          class="content-text"
        >
          {{ item.text }}
        </p>
      </div>
    </div>
    </div>
  </div>

  <NotFoundPlaceholder v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatRelativeDate } from '~/modules/shared/utils/dateUtils'
import Button from '~/modules/shared/kit/Button.vue'
import NotFoundPlaceholder from '~/modules/shared/components/NotFoundPlaceholder.vue'

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
}

const props = defineProps<{
  articleId: string
}>()

const article = ref<Article | null>(null)

// Загрузка статьи
const loadArticle = async () => {
  try {
    const response = await fetch(`/articles/${props.articleId}/article.json`)
    if (!response.ok) {
      console.error('Статья не найдена')
      return
    }
    
    const data = await response.json()
    article.value = data
  } catch (error) {
    console.error('Ошибка загрузки статьи:', error)
  }
}

// Обработка ошибок загрузки изображений

// Используем полную дату для статьи
const formatDate = formatRelativeDate

onMounted(() => {
  loadArticle()
})
</script>

<style lang="scss" scoped>
.article-view {
  min-height: 60vh;
  padding: 32px 0 0 0;
  max-width: 928px;
  margin: 0 auto;
}

.back-to-blog {
  margin-bottom: 24px;
}

.article-title {
  color: var(--text-secondary, #62322D);
  font-family: "Cormorant Infant";
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 12px 0;
}

.article-date {
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 32px 0;
}



.badge-new {
  height: 48px;
  width: auto;
  object-fit: contain;
}

.article-content {
  display: flex;
  flex-direction: column;
}

.content-item {
  width: 100%;
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  // Отступ от заголовка до следующего текста - 20px
  &:has(.content-heading) + &:has(.content-text) {
    margin-top: -12px; // 32px - 20px = 12px компенсация
  }
  
  // Отступ от текста до следующей картинки - 20px  
  &:has(.content-text) + &:has(.image-container) {
    margin-top: -12px; // 32px - 20px = 12px компенсация
  }
  
  // Отступ между текстами - 20px
  &:has(.content-text) + &:has(.content-text) {
    margin-top: -12px; // 32px - 20px = 12px компенсация
  }
}

.image-container {
  width: 100%;
  position: relative;
}

.content-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 300px;
  background-color: #000000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  color: #ffffff;
  font-family: var(--font-primary);
  font-size: 16px;
  opacity: 0.7;
}

.content-video {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.content-embed {
  width: 100%;
  height: 400px;
  border-radius: 8px;
}

.content-heading {
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: var(--text-secondary);
  margin: 0;
}

.content-text {
  font-family: var(--font-primary);
  font-size: 20px;
  line-height: 1.6;
  color: var(--text-primary);
  margin: 0;
}

.content-heading {
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: var(--text-secondary);
  margin: 0;
}


// Адаптивность
@media (max-width: 768px) {
  .article-view {
    padding: 16px 0 0 0;
  }
  
  .article-title {
    font-size: 36px;
  }
  
  .content-heading {
    font-size: 28px;
  }
  
  .content-text {
    font-size: 18px;
  }
  
  .content-embed {
    height: 250px;
  }
}
</style>

