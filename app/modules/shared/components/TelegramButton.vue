<template>
  <a 
    href="https://t.me/mveeva" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="telegram-button"
    aria-label="Написать в Telegram"
  >
    <img 
      src="~/assets/images/write-tg-btn.svg" 
      alt="Telegram" 
      class="telegram-icon"
    />
  </a>
</template>

<script setup lang="ts">
// Кнопка для связи через Telegram
</script>

<style lang="scss" scoped>
.telegram-button {
  position: fixed;
  bottom: 8px;
  right: 8px;
  width: 48px;
  height: 48px;
  background-color: var(--bg-primary-default);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background-color: var(--bg-primary-active);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.telegram-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>


