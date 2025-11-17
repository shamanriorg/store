<template>
  <div class="catalog-page">
    <div class="container container-adaptive">
      <h1 class="catalog-title">Каталог</h1>
      <p class="catalog-note">Тут можно что-нибудь купить или просто посмотреть.</p>

      <div class="catalog-grid">
        <CategoryButton
          v-for="category in categories"
          :key="category.id"
          :label="category.label"
          :hover-background="category.hoverBackground"
          :active-background="category.activeBackground"
          :fan-images="category.fanImages"
          :is-active="category.id === selectedCategory"
          @click="handleCardClick(category.id)"
        />
      </div>

      <div class="catalog-filters">
        <Filter
          v-model="selectedCategories"
          text="Категория"
          type="checkbox"
          :options="categoryFilterOptions"
        />
        <Filter
          v-model="selectedSort"
          text="Сортировка"
          type="radio"
          :options="sortOptions"
          align="left"
        />
      </div>

      <div class="catalog-placeholder">
        <span>Раздел в разработке. Следите за обновлениями!</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from '#imports'
import CategoryButton from '~/modules/catalog/CategoryButton.vue'
import Filter from '~/modules/shared/kit/Filter.vue'

// Импортируем изображения для паттернов
import pattern1 from '~/assets/images/button-pattern-1.png'
import pattern2 from '~/assets/images/button-pattern-2.png'
import pattern3 from '~/assets/images/button-pattern-3.png'

useSeoMeta({
  title: 'Каталог Shamanri — паттерны, плитка и открытки',
  description:
    'Каталог продуктов Shamanri. В ближайшее время здесь появятся паттерны, плитка, открытки и другие коллекции авторской иллюстрации Марии Матвеевой.',
  ogTitle: 'Каталог Shamanri',
  ogDescription:
    'Раздел с продуктами Shamanri находится в разработке. Совсем скоро здесь можно будет найти паттерны, плитку, открытки и другие волшебные изделия.',
  twitterCard: 'summary_large_image'
})

const route = useRoute()
const router = useRouter()

const categories = [
  {
    id: 'patterns',
    label: 'Паттерны',
    hoverBackground: '#A79D83',
    activeBackground: '#5C5034',
    fanImages: [pattern1, pattern2, pattern3]
  },
  {
    id: 'postcards',
    label: 'Открытки',
    hoverBackground: '#A37F7F',
    activeBackground: '#5C3434'
  },
  {
    id: 'tiles',
    label: 'Плитка',
    hoverBackground: '#909875',
    activeBackground: '#535C34'
  },
  {
    id: 'other',
    label: 'Разное',
    hoverBackground: '#76819B',
    activeBackground: '#34405C'
  }
]

const selectedCategory = ref<string>(categories[0].id)

// Данные для фильтров
const categoryFilterOptions = [
  { id: 'patterns', text: 'Паттерны' },
  { id: 'postcards', text: 'Открытки' },
  { id: 'tiles', text: 'Плитка' },
  { id: 'other', text: 'Разное' }
]

const sortOptions = [
  { id: 'new-to-old', text: 'От нового к старому' },
  { id: 'old-to-new', text: 'От старого к новому' },
  { id: 'cheaper', text: 'Дешевле' },
  { id: 'expensive', text: 'Дороже' }
]

const selectedCategories = ref<typeof categoryFilterOptions>([])
const selectedSort = ref<typeof sortOptions[0] | null>(sortOptions[0])

const applyCategoryFromQuery = (value?: string | string[]) => {
  const candidate = Array.isArray(value) ? value[0] : value
  if (candidate && categories.some(category => category.id === candidate)) {
    selectedCategory.value = candidate
    return true
  }
  selectedCategory.value = categories[0].id
  return false
}

const hasValidInitialCategory = applyCategoryFromQuery(route.query.category)

if (!hasValidInitialCategory) {
  router.replace({ query: { ...route.query, category: selectedCategory.value } })
}

watch(
  () => route.query.category,
  (value) => {
    applyCategoryFromQuery(value)
  }
)

const handleCardClick = async (id: string) => {
  if (selectedCategory.value === id) return
  selectedCategory.value = id

  const newQuery = { ...route.query, category: id }
  await router.replace({ query: newQuery })
}
</script>

<style scoped lang="scss">
.catalog-page {
  padding: 32px 0 0 0;
  min-height: 60vh;
}

.catalog-title {
  font-family: var(--font-secondary);
  font-weight: var(--font-secondary-weight);
  font-size: 48px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.catalog-note {
  margin-bottom: 32px;
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
}

.catalog-grid {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  width: 100%;
}

.catalog-filters {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  width: 100%;
}

@media (max-width: 1019px) {
  .catalog-grid {
    gap: 8px;
  }
}

.catalog-subtitle {
  font-family: var(--font-primary);
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 48px;
  max-width: 720px;
}

.catalog-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: var(--bg-color-ornament, #F9F5EF);
  border: 1px dashed var(--border-rest, #DDD7CF);
  border-radius: 16px;
  font-family: var(--font-primary);
  font-size: 20px;
  color: var(--text-tertiary);
  text-align: center;
}

@media (max-width: 767px) {
  .catalog-page {
    padding: 40px 0;
  }

  .catalog-title {
    font-size: 36px;
  }

  .catalog-note {
    font-size: 18px;
  }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .catalog-filters {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .catalog-subtitle {
    font-size: 20px;
    margin-bottom: 32px;
  }

  .catalog-placeholder {
    padding: 48px 16px;
    font-size: 18px;
  }
}
</style>
