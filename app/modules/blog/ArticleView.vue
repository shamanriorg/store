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
            :src="`/articles/${article.id}/${item.src}`" 
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
          :src="item.src ? `/articles/${article.id}/${item.src}` : undefined"
          :poster="item.poster ? `/articles/${article.id}/${item.poster}` : undefined"
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

        <!-- Ссылка -->
        <p 
          v-else-if="item.type === 'link' && item.href"
          class="content-link"
        >
          <a
            v-if="item.external"
            :href="item.href"
            class="link-inline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.text }}
          </a>
          <NuxtLink
            v-else
            :to="item.href"
            class="link-inline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.text }}
          </NuxtLink>
        </p>
      </div>
    </div>
    </div>
  </div>

  <NotFoundPlaceholder v-else />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { formatRelativeDate } from '~/modules/shared/utils/dateUtils'
import Button from '~/modules/shared/kit/Button.vue'
import NotFoundPlaceholder from '~/modules/shared/components/NotFoundPlaceholder.vue'
import { useSeoMeta } from '#imports'

interface ContentItem {
  type: 'text' | 'heading' | 'image' | 'video' | 'video-embed' | 'link'
  text?: string
  src?: string
  alt?: string
  url?: string
  poster?: string
  href?: string
  external?: boolean
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
const DEFAULT_DESCRIPTION =
  'Статья Shamanri о творчестве, природе, паттернах и вдохновении.'

const articleTitle = computed(() => article.value?.title ?? 'Статья Shamanri')

const articleDescription = computed(() => {
  if (!article.value) return DEFAULT_DESCRIPTION

  if (article.value.annotation) {
    return truncateText(article.value.annotation)
  }

  const previewBlock = article.value.content.find(
    (item) => item.type === 'text' && item.isPreview && item.text
  )
  if (previewBlock?.text) {
    return truncateText(previewBlock.text)
  }

  const firstTextBlock = article.value.content.find(
    (item) => item.type === 'text' && item.text
  )
  if (firstTextBlock?.text) {
    return truncateText(firstTextBlock.text)
  }

  return DEFAULT_DESCRIPTION
})

useSeoMeta({
  title: articleTitle,
  description: articleDescription,
  ogTitle: articleTitle,
  ogDescription: articleDescription,
  twitterCard: 'summary_large_image'
})

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

function truncateText(text: string, maxLength = 160) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trim()}…`
}
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

.content-link {
  font-family: var(--font-primary);
  font-size: 20px;
  line-height: 1.6;
  margin: 0;
}

.link-inline {
  color: inherit;
  text-decoration: underline;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    color: var(--text-secondary);
  }
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
  .content-embed {
    height: 250px;
  }
}

@media (max-width: 767px) {
  .article-title {
    font-size: 44px;
  }

  .content-heading {
    font-size: 28px;
  }

  .article-content .content-text {
    font-size: 20px;
  }
}
</style>

