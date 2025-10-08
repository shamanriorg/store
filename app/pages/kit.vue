<template>
  <div class="kit-page">
    <div class="container">
      <h1 class="page-title">
        <span class="material-icons title-icon" style="color: #A54E3B; font-size: 2rem;">palette</span>
        Design Kit
      </h1>
      <p class="page-subtitle">Демонстрация компонентов и элементов интерфейса</p>
      
      <!-- Демо кнопок -->
      <section class="button-demo">
        <h2>Демо кнопок из Kit (точные цвета из макета)</h2>
        
        <div class="button-grid">
          <!-- Основные варианты -->
          <div class="button-group">
            <h3>Основные варианты</h3>
            <Button variant="default" @click="handleClick">Default Button</Button>
            <Button variant="active" @click="handleClick">Active Button</Button>
            <Button variant="transparent" @click="handleClick">Transparent Button</Button>
          </div>
          
          <!-- Размеры -->
          <div class="button-group">
            <h3>Размеры</h3>
            <Button size="small" @click="handleClick">Small</Button>
            <Button size="medium" @click="handleClick">Medium</Button>
            <Button size="large" @click="handleClick">Large</Button>
          </div>
          
          <!-- С иконками -->
          <div class="button-group">
            <h3>С иконками</h3>
            <Button left-icon="shopping_cart" @click="handleClick">В корзину</Button>
            <Button right-icon="arrow_forward" @click="handleClick">Далее</Button>
            <Button left-icon="favorite" right-icon="star" @click="handleClick">Избранное</Button>
          </div>
          
          <!-- Ширина -->
          <div class="button-group">
            <h3>Управление шириной</h3>
            <Button @click="handleClick">Обычная ширина</Button>
            <Button wfull @click="handleClick">Полная ширина (wfull)</Button>
            <Button variant="transparent" wfull @click="handleClick">Transparent + wfull</Button>
          </div>
          
          <!-- Состояния -->
          <div class="button-group">
            <h3>Состояния</h3>
            <Button @click="handleClick">Обычная</Button>
            <Button disabled @click="handleClick">Отключена</Button>
            <Button variant="transparent" @click="handleClick">Transparent</Button>
          </div>
          
          <!-- Комбинированные варианты -->
          <div class="button-group">
            <h3>Комбинированные</h3>
            <Button variant="active" size="large" left-icon="check" @click="handleClick">Подтвердить</Button>
            <Button variant="default" size="small" right-icon="delete" @click="handleClick">Удалить</Button>
            <Button variant="transparent" left-icon="warning" wfull @click="handleClick">Внимание (wfull)</Button>
          </div>
        </div>
        
        <!-- Информация о цветах -->
        <div class="color-info">
          <h3>Цвета из макета Figma:</h3>
          <div class="color-samples">
            <div class="color-sample">
              <div class="color-box" style="background-color: #A54E3B;"></div>
              <span>Default: #A54E3B</span>
            </div>
            <div class="color-sample">
              <div class="color-box" style="background-color: #8E402F;"></div>
              <span>Active: #8E402F</span>
            </div>
            <div class="color-sample">
              <div class="color-box" style="background-color: transparent; border: 1px solid #d1d5db;"></div>
              <span>Transparent</span>
            </div>
          </div>
          
          <div class="text-colors">
            <h4>Цвета текста:</h4>
            <div class="color-samples">
              <div class="color-sample">
                <div class="color-box" style="background-color: #361406;"></div>
                <span>Text Primary: #361406</span>
              </div>
              <div class="color-sample">
                <div class="color-box" style="background-color: #62322D;"></div>
                <span>Text Secondary: #62322D</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Импортируем кнопку из kit
import Button from '~/modules/shared/kit/Button.vue'

const handleClick = (event: MouseEvent) => {
  console.log('Кнопка нажата:', event)
}
</script>

<style lang="scss" scoped>
.kit-page {
  padding: 2rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #A54E3B;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  flex-shrink: 0;
}

.page-subtitle {
  font-size: 1.25rem;
  text-align: center;
  color: #6b7280;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.button-demo {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #1f2937;
    font-size: 1.875rem;
  }
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.button-group {
  h3 {
    margin-bottom: 1rem;
    color: #374151;
    font-size: 1.125rem;
  }
  
  .btn {
    margin-bottom: 0.75rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.color-info {
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
  
  h3 {
    text-align: center;
    margin-bottom: 1rem;
    color: #374151;
  }
  
  h4 {
    text-align: center;
    margin: 1.5rem 0 1rem;
    color: #374151;
  }
}

.color-samples {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.color-sample {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  .color-box {
    width: 60px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
  }
  
  span {
    font-size: 0.875rem;
    color: #6b7280;
    font-family: monospace;
  }
}

.text-colors {
  margin-top: 2rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .button-grid {
    grid-template-columns: 1fr;
  }
  
  .button-demo {
    padding: 1.5rem;
  }
  
  .color-samples {
    flex-direction: column;
    align-items: center;
  }
}
</style>
