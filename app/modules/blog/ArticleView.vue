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
import { computed, ref, onMounted, watch } from 'vue'
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

const DEFAULT_DESCRIPTION =
  'Статья Shamanri о творчестве, природе, паттернах и вдохновении.'

// Загрузка статьи с использованием useAsyncData для SSR
const { data: articleData, error: articleError } = await useAsyncData(
  `article-${props.articleId}`,
  async () => {
    try {
      let data: any
      
      // На сервере читаем файл напрямую, на клиенте используем fetch
      if (import.meta.server) {
        const { readFileSync } = await import('fs')
        const { join } = await import('path')
        const publicPath = join(process.cwd(), 'public')
        const filePath = join(publicPath, 'articles', props.articleId, 'article.json')
        try {
          data = JSON.parse(readFileSync(filePath, 'utf-8'))
        } catch (fileError) {
          // Если файл не найден, выбрасываем 404
          throw createError({
            statusCode: 404,
            statusMessage: 'Статья не найдена'
          })
        }
      } else {
        const response = await fetch(`/articles/${props.articleId}/article.json`)
        if (!response.ok) {
          // Если статья не найдена, выбрасываем 404
          throw createError({
            statusCode: 404,
            statusMessage: 'Статья не найдена'
          })
        }
        data = await response.json()
      }
      
      // Проверяем, что данные валидны
      if (!data || typeof data !== 'object') {
        throw createError({
          statusCode: 404,
          statusMessage: 'Статья не найдена'
        })
      }
      
      return data
    } catch (error: any) {
      // Если это уже созданная ошибка, пробрасываем её дальше
      if (error?.statusCode) {
        throw error
      }
      console.error('Ошибка загрузки статьи:', error)
      throw createError({
        statusCode: 404,
        statusMessage: 'Статья не найдена'
      })
    }
  }
)

const article = computed(() => articleData.value as Article | null)

// Обработка ошибок загрузки
if (articleError.value) {
  // Если произошла ошибка, выбрасываем её для показа страницы 404
  throw articleError.value
}

function truncateText(text: string, maxLength = 160) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trim()}…`
}

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

const articleImage = computed(() => {
  if (!article.value) return null
  const firstImage = article.value.content.find(item => item.type === 'image' && item.src)
  if (firstImage?.src) {
    return `https://shamanri.ru/articles/${article.value.id}/${firstImage.src}`
  }
  return null
})

const articleKeywords = computed(() => {
  const baseKeywords = ['Shamanri', 'блог Shamanri', 'статья', 'паттерны', 'иллюстрация']
  if (article.value?.title) {
    // Извлекаем ключевые слова из заголовка
    const titleWords = article.value.title.toLowerCase().split(/\s+/)
    baseKeywords.push(...titleWords.filter(w => w.length > 3))
  }
  return baseKeywords.join(', ')
})

// Функция для установки SEO тегов
const updateSeoMeta = () => {
  if (article.value) {
    useHead({
      title: articleTitle.value,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: articleDescription.value
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: articleKeywords.value
        },
        {
          property: 'og:title',
          content: articleTitle.value
        },
        {
          property: 'og:description',
          content: articleDescription.value
        },
        ...(articleImage.value ? [{
          property: 'og:image',
          content: articleImage.value
        }] : []),
        {
          property: 'og:type',
          content: 'article'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: articleTitle.value
        },
        {
          name: 'twitter:description',
          content: articleDescription.value
        },
        ...(articleImage.value ? [{
          name: 'twitter:image',
          content: articleImage.value
        }] : [])
      ]
    })
  }
}

// SEO мета-теги
watch([article, articleTitle, articleDescription, articleImage, articleKeywords], () => {
  updateSeoMeta()
}, { immediate: true })

// Обновляем SEO теги сразу после загрузки данных
if (article.value) {
  updateSeoMeta()
}

// Данные загружаются через useAsyncData выше

// Обработка ошибок загрузки изображений

// Используем полную дату для статьи
const formatDate = formatRelativeDate

// Загружаем данные сразу для SSR (top-level await)
// Данные загружаются через useAsyncData выше
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

