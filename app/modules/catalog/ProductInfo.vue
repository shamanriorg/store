<template>
  <div class="product-card-container__right">
    <div class="product-card-container__right-top">
      <h1 class="product-title">{{ product.title }}</h1>
      <!-- Для complex товаров показываем две цены -->
      <div v-if="product.kind === 'complex' && (product.comPrice || product.exPrice)" class="product-prices">
        <div v-if="product.comPrice" class="product-price">
          <span class="product-price__label">Коммерческая:</span>
          <span class="product-price__value">{{ formatPriceNumber(product.comPrice) }}</span>
          <span class="material-icons product-price__icon">currency_ruble</span>
        </div>
        <div v-if="product.exPrice" class="product-price">
          <span class="product-price__label">Эксклюзивная:</span>
          <span class="product-price__value">{{ formatPriceNumber(product.exPrice) }}</span>
          <span class="material-icons product-price__icon">currency_ruble</span>
        </div>
      </div>
      <!-- Для остальных товаров показываем обычную цену -->
      <div v-else-if="product.price" class="product-price">
        <span class="product-price__value">{{ formatPriceNumber(product.price) }}</span>
        <span class="material-icons product-price__icon">currency_ruble</span>
      </div>
      <div v-if="hasDescription" class="product-description">
        <div v-if="product.techDescr" class="product-description__section">
          <p v-for="(line, index) in getDescriptionLines(product.techDescr)" :key="`tech-${index}`">{{ line }}</p>
        </div>
        <div v-if="product.artDescr" class="product-description__section">
          <p v-for="(line, index) in getDescriptionLines(product.artDescr)" :key="`art-${index}`">{{ line }}</p>
        </div>
        <div v-if="product.useRecomend" class="product-description__section">
          <p v-for="(line, index) in getDescriptionLines(product.useRecomend)" :key="`use-${index}`">{{ line }}</p>
        </div>
      </div>
    </div>
    <div class="product-card-container__right-bottom">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Product {
  id: string
  title?: string
  price?: number
  comPrice?: number
  exPrice?: number
  techDescr?: string | string[]
  artDescr?: string | string[]
  useRecomend?: string | string[]
  kind?: 'digital' | 'wb' | 'complex'
  [key: string]: any
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

// Проверка наличия описания
const hasDescription = computed(() => {
  return !!(props.product?.techDescr || props.product?.artDescr || props.product?.useRecomend)
})

// Функция для преобразования description в массив строк
const getDescriptionLines = (description: string | string[] | undefined): string[] => {
  if (!description) return []
  if (Array.isArray(description)) {
    return description
  }
  // Если это строка, возвращаем её как массив с одним элементом
  return [description]
}

// Форматирование цены
const formatPriceNumber = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<style scoped lang="scss">
.product-card-container__right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 684px;
  height: 100%;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  // На адаптивных экранах убираем растягивание
  @media (max-width: 1220px) {
    min-height: auto;
    height: auto;
    justify-content: flex-start;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
}

.product-card-container__right-top {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.product-card-container__right-bottom {
  margin-top: auto;
  
  // На адаптивных экранах добавляем отступ сверху вместо margin-top: auto
  @media (max-width: 1220px) {
    margin-top: 8px;
  }
}

.product-title {
  color: var(--text-primary, #361406);
  font-family: "Cormorant Infant";
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 44px;
  }
  
  @media (max-width: 440px) {
    font-size: 40px;
  }
  
  @media (max-width: 375px) {
    font-size: 36px;
  }
}

.product-prices {
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 1;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--bg-primary-default, #A54E3B);
  font-family: Rubik;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
  
  @media (max-width: 440px) {
    font-size: 28px;
  }
  
  @media (max-width: 375px) {
    font-size: 24px;
  }
}

.product-price__label {
  color: var(--text-primary, #361406);
  font-weight: 400;
  font-size: 36px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
  
  @media (max-width: 440px) {
    font-size: 28px;
  }
  
  @media (max-width: 375px) {
    font-size: 24px;
  }
}

.product-price__value {
  font-size: 36px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
  
  @media (max-width: 440px) {
    font-size: 28px;
  }
  
  @media (max-width: 375px) {
    font-size: 24px;
  }
}

.product-price__icon {
  font-size: 36px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
  
  @media (max-width: 440px) {
    font-size: 28px;
  }
  
  @media (max-width: 375px) {
    font-size: 24px;
  }
}

.product-description {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
}

.product-description__section {
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  p {
    margin: 0 0 0.25em 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

// Адаптивность
@media (max-width: 768px) {
  .product-card-container__right {
    min-height: auto;
    height: auto;
  }
}
</style>

