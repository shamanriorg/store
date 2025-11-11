<template>
  <div class="messenger-links">
    <a href="https://t.me/shamanri_tlg" target="_blank" rel="noopener noreferrer">
      <img
        src="~/assets/images/tg-btn.svg"
        alt="Telegram"
        class="messenger-icon"
      />
    </a>
    <div class="messenger-icon messenger-icon--disabled">
      <img
        src="~/assets/images/pin-btn.svg"
        alt="Pinterest"
        class="messenger-icon__image"
      />
    </div>
    <a href="https://instagram.com/shamanri_art" target="_blank" rel="noopener noreferrer">
      <img
        src="~/assets/images/insta-btn.svg"
        alt="Instagram"
        class="messenger-icon"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
// Компонент ссылок на мессенджеры
</script>

<style lang="scss" scoped>
.messenger-links {
  display: flex;
  gap: 24px;

  a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
  }

  .messenger-icon {
    width: 124px;
    height: 124px;
    object-fit: contain;
    
    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
      
      .messenger-icon__image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: grayscale(80%) brightness(0.8);
      }
    }
  }
}
</style>
