<template>
  <div class="category-buttons">
    <NuxtLink to="/patterns" class="category-button">
      <img
        src="~/assets/images/pattern-btn.jpg"
        alt="Паттерны"
        class="category-image"
      />
      <div class="category-overlay">
        <span class="category-title">Паттерны</span>
        <div class="arrow-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink to="/cards" class="category-button">
      <img
        src="~/assets/images/card-btn.jpg"
        alt="Открытки"
        class="category-image"
      />
      <div class="category-overlay">
        <span class="category-title">Открытки</span>
        <div class="arrow-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink to="/tiles" class="category-button">
      <img
        src="~/assets/images/tile-btn.jpg"
        alt="Плитка"
        class="category-image"
      />
      <div class="category-overlay">
        <span class="category-title">Плитка</span>
        <div class="arrow-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink to="/other" class="category-button">
      <img
        src="~/assets/images/other-btn.jpg"
        alt="Разное"
        class="category-image"
      />
      <div class="category-overlay">
        <span class="category-title">Разное</span>
        <div class="arrow-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// Компонент круглых кнопок-категорий
</script>

<style lang="scss" scoped>
.category-buttons {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
}

.category-button {
  position: relative;
  display: block;
  flex: 1;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  text-decoration: none;
  max-width: calc((1440px - 72px) / 4); // 1440px - 3 gaps (36px) - paddings (36px) / 4 buttons

  .category-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .category-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: var(--bg-primary-default);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    border-radius: 0 0 50% 50%;
    padding: 0 16px;
  }

  &:hover .category-overlay {
    transform: translateY(0);
  }

  .category-title {
    color: var(--text-white);
    font-family: var(--font-primary);
    font-size: 20px;
    font-weight: 400;
    text-align: center;
  }

  .arrow-icon {
    width: 20px;
    height: 20px;
    color: var(--text-white);
    flex-shrink: 0;
    margin-left: 4px;
    
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}

/* Адаптивность */
@media (max-width: 1020px) {
  .category-buttons {
    flex-wrap: wrap;
  }

  .category-button {
    flex: 0 0 calc(50% - 6px);
    max-width: calc(50% - 6px);

    .category-overlay {
      transform: translateY(0);
    }

    .category-title {
      font-size: 18px;
    }

    .arrow-icon {
      width: 18px;
      height: 18px;
    }
  }
}

@media (max-width: 768px) {
  .category-buttons {
    gap: 8px;
  }

  .category-button {
    .category-overlay {
      height: 40px;
    }

    .category-title {
      font-size: 16px;
    }

    .arrow-icon {
      width: 16px;
      height: 16px;
      bottom: 4px;
      right: 4px;
    }
  }
}

@media (max-width: 480px) {
  .category-buttons {
    gap: 6px;
  }

  .category-button {
    .category-overlay {
      height: 30px;
    }

    .category-title {
      font-size: 14px;
    }

    .arrow-icon {
      width: 14px;
      height: 14px;
      bottom: 3px;
      right: 3px;
    }
  }
}
</style>
