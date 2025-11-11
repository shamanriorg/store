<template>
  <div class="article-preview" v-if="article">
    <div class="article-preview-content">
      <div class="article-preview-media">
        <!-- Показываем видео, если есть previewVideo и файл существует -->
        <video 
          v-if="article.previewVideo && videoExists && !videoError"
          ref="videoElement"
          :src="`/articles/${article.id}/${article.previewVideo}`"
          class="media-video"
          autoplay
          loop
          muted
          playsinline
          preload="metadata"
          @error="videoError = true"
          @loadedmetadata="onVideoLoaded"
        ></video>
        <!-- Иначе показываем previewImage, если есть -->
        <img 
          v-else-if="previewImageSrc && !imageError"
          :src="previewImageSrc" 
          :alt="article.title" 
          class="media-image"
          @error="imageError = true"
        />
        <!-- Fallback на первую картинку из content, если нет previewImage -->
        <img 
          v-else-if="coverImage && coverImage.src && !imageError"
          :src="`/articles/${article.id}/${coverImage.src}`" 
          :alt="coverImage.alt" 
          class="media-image"
          @error="imageError = true"
        />
        <div v-else class="media-placeholder"></div>
      </div>
      <div class="article-preview-text">
        <section class="article-section">
          <h2>
            <span class="title-text">{{ article.title }}</span>
            <img 
              v-if="article.isNew"
              src="~/assets/images/badge-new.svg" 
              alt="NEW" 
              class="badge-new" 
            />
          </h2>
          <div class="article-text">
            <p v-for="(block, index) in previewTextBlocks" :key="index">
              {{ block.text }}
              <!-- Добавляем троеточие и ссылку после последнего блока -->
              <template v-if="index === previewTextBlocks.length - 1">
                ...
                <NuxtLink :to="`/blog/${article.id}`" class="read-more-link">
                  Читать далее
                  <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </NuxtLink>
              </template>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

interface Article {
  id: string
  title: string
  date: string
  isPinned: boolean
  isNew: boolean
  previewVideo?: string
  previewImage?: string
  content: Array<{
    type: string
    text?: string
    src?: string
    alt?: string
    isPreview?: boolean
  }>
}

const article = ref<Article | null>(null)
const imageError = ref(false)
const videoError = ref(false)
const videoExists = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)

// Функция для получения списка папок статей
const getArticleFolders = async (): Promise<string[]> => {
  try {
    const response = await fetch('/articles/articles-list.json')
    if (!response.ok) return []
    const data = await response.json()
    return data.articles || []
  } catch (error) {
    console.error('Ошибка загрузки списка статей:', error)
    return []
  }
}

// Загружаем закрепленную статью
onMounted(async () => {
  try {
    const folders = await getArticleFolders()
    
    // Загружаем все статьи и ищем закрепленную
    for (const folder of folders) {
      try {
        const response = await fetch(`/articles/${folder}/article.json`)
        if (!response.ok) continue
        
        const data = await response.json()
        
        if (data.isPinned) {
          article.value = data
          
          // Проверяем существование видео файла
          if (data.previewVideo) {
            const videoPath = `/articles/${data.id}/${data.previewVideo}`
            try {
              const videoCheck = await fetch(videoPath, { method: 'HEAD' })
              videoExists.value = videoCheck.ok
            } catch {
              videoExists.value = false
            }
          }
          
          break // Нашли закрепленную, прекращаем поиск
        }
      } catch (err) {
        console.warn(`Не удалось загрузить статью из ${folder}:`, err)
        continue
      }
    }
    
    if (!article.value) {
      console.warn('Закрепленная статья не найдена')
    }
  } catch (error) {
    console.error('Ошибка загрузки статей:', error)
  }
})

// Получаем previewImage путь
const previewImageSrc = computed(() => {
  if (!article.value || !article.value.previewImage) return null
  return `/articles/${article.value.id}/${article.value.previewImage}`
})

// Получаем обложку (первое изображение) как fallback
const coverImage = computed(() => {
  if (!article.value) return null
  return article.value.content.find(item => item.type === 'image')
})

// Получаем текстовые блоки для превью
const previewTextBlocks = computed(() => {
  if (!article.value) return []
  return article.value.content.filter(item => 
    item.type === 'text' && item.isPreview === true
  )
})

// Обработчик загрузки метаданных видео - запускаем воспроизведение
const onVideoLoaded = async () => {
  await nextTick()
  if (videoElement.value) {
    try {
      await videoElement.value.play()
    } catch (error) {
      console.warn('Не удалось автоматически запустить видео:', error)
    }
  }
}
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
  
  .media-image,
  .media-video,
  .media-placeholder {
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
      aspect-ratio: 1;
    }
  }
  
  .media-video {
    display: block;
    object-fit: cover;
    background-color: #000000;
  }
  
  .media-placeholder {
    background-color: #000000;
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
    line-height: 1.2;
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
    line-height: 1.2;
    color: var(--text-primary);
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

  @media (max-width: 767px) {
    h2 {
      font-size: 36px;
    }

    p {
      font-size: 20px;
    }
  }
</style>
