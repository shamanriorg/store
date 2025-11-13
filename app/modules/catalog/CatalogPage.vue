<template>
  <div class="catalog-page">
    <div class="container container-adaptive">
      <h1 class="catalog-title">Каталог</h1>
      <p class="catalog-note">Тут можно что-нибудь купить или просто посмотреть.</p>

      <div class="catalog-grid">
        <div
          v-for="category in categories"
          :key="category.id"
          :class="[
            'catalog-card',
            category.modifier && `catalog-card--${category.modifier}`,
            { 'catalog-card--active': category.id === selectedCategory }
          ]"
          @click="handleCardClick(category.id)"
        >
          <span class="catalog-card__label">{{ category.label }}</span>
          <div
            v-if="category.id === 'patterns'"
            class="catalog-card__fan"
          >
            <img
              src="~/assets/images/button-pattern-1.png"
              alt="Паттерн"
              class="catalog-card__fan-image"
            />
            <img
              src="~/assets/images/button-pattern-2.png"
              alt="Паттерн"
              class="catalog-card__fan-image"
            />
            <img
              src="~/assets/images/button-pattern-3.png"
              alt="Паттерн"
              class="catalog-card__fan-image"
            />
          </div>
        </div>
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
  { id: 'patterns', label: 'Паттерны', modifier: 'patterns' },
  { id: 'postcards', label: 'Открытки', modifier: 'postcards' },
  { id: 'tiles', label: 'Плитка', modifier: 'tiles' },
  { id: 'other', label: 'Разное', modifier: 'other' }
]

const selectedCategory = ref<string>(categories[0].id)

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
  margin-bottom: 48px;
  width: 100%;
}

.catalog-card {
  flex: 1 1 0;
  height: 236px;
  border-radius: 8px;
  border: 1px solid var(--border-rest, #DDD7CF);
  background: var(--bg-secondary-default, #EEE7DE);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 16px 40px;
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.catalog-card:hover {
  background: #A79D83;
}

.catalog-card__label {
  display: inline-block;
  transition: transform 0.3s ease;
}

.catalog-card:hover .catalog-card__label,
.catalog-card.catalog-card--active .catalog-card__label {
  transform: translateY(-20px);
}

.catalog-card__fan {
  position: absolute;
  left: 50%;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  transform: translate(-50%, 100%);
  transition: transform 0.3s ease;
  pointer-events: none;
}

.catalog-card__fan-image {
  width: 112px;
  height: auto;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.catalog-card__fan-image + .catalog-card__fan-image {
  margin-left: -48px;
}

.catalog-card:hover .catalog-card__fan,
.catalog-card.catalog-card--active .catalog-card__fan {
  transform: translate(-50%, 70%);
}

.catalog-card--patterns:hover {
  background: #A79D83;
}

.catalog-card--patterns.catalog-card--active {
  background: #5C5034;
  color: var(--text-white);
}

.catalog-card--postcards:hover {
  background: #A37F7F;
}

.catalog-card--postcards.catalog-card--active {
  background: #5C3434;
  color: var(--text-white);
}

.catalog-card--tiles:hover {
  background: #909875;
}

.catalog-card--tiles.catalog-card--active {
  background: #535C34;
  color: var(--text-white);
}

.catalog-card--other:hover {
  background: #76819B;
}

.catalog-card--other.catalog-card--active {
  background: #34405C;
  color: var(--text-white);
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
    flex-direction: column;
  }

  .catalog-card {
    height: 200px;
    font-size: 28px;
    padding-bottom: 32px;
  }

  .catalog-card__fan-image {
    width: 96px;
  }
  .catalog-card__fan-image + .catalog-card__fan-image {
    margin-left: -36px;
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
