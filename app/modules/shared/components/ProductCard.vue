<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-content">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-type">{{ product.type }}</p>
      <p class="product-price">{{ product.price }} ₽</p>
      <button 
        class="btn btn--primary" 
        :disabled="product.inStock === false"
        @click="addToCart"
      >
        {{ product.inStock ? 'В корзину' : 'Нет в наличии' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: string
  name: string
  type: string
  price: number
  image: string
  inStock: boolean
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

const addToCart = () => {
  // Логика добавления в корзину
  console.log('Добавлен в корзину:', props.product.name)
}
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "~/assets/main.scss" as *;

.product-card {
  background: $light-color;
  border-radius: $border-radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform $transition-duration ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .product-content {
    padding: 1rem;
  }
  
  .product-name {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: $dark-color;
  }
  
  .product-type {
    font-size: 0.9rem;
    color: color.adjust($dark-color, $lightness: 20%);
    margin-bottom: 0.5rem;
  }
  
  .product-price {
    font-size: 1.2rem;
    font-weight: 600;
    color: $primary-color;
    margin-bottom: 1rem;
  }
  
  .btn {
    width: 100%;
    
    &.btn--disabled {
      background-color: color.adjust($dark-color, $lightness: 60%);
      color: color.adjust($dark-color, $lightness: 40%);
      cursor: not-allowed;
      
      &:hover {
        background-color: color.adjust($dark-color, $lightness: 60%);
        transform: none;
      }
    }
  }
}
</style>
