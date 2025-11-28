<template>
  <div class="ornament-banner">
    <div class="ornament-background">
      <div class="ornament-top"></div>

      <div class="banner-content">
        <div class="banner-text-container" :style="containerStyle">
          <template v-if="texts.length">
            <p v-for="(text, index) in texts" :key="index" class="ornament-text">
              {{ text }}
            </p>
          </template>
          <slot v-else />
        </div>
      </div>

      <div class="ornament-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type OrnamentBannerProps = {
  texts?: string[]
  maxWidth?: string
  gap?: string
}

const props = withDefaults(defineProps<OrnamentBannerProps>(), {
  texts: () => [],
  maxWidth: '800px',
  gap: '16px'
})

const containerStyle = computed(() => ({
  '--ornament-max-width': props.maxWidth,
  '--ornament-gap': props.gap
}))
</script>

<style scoped lang="scss">
.ornament-banner {
  width: 100%;
}

.ornament-background {
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background-color: var(--bg-color-ornament);
  
  @media (max-width: 375px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}

.ornament-top,
.ornament-bottom {
  height: 20px;
  background-image: url('~/assets/images/ornament.png');
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: center;
  width: 100%;
}

.ornament-bottom {
  transform: rotate(180deg);
}

.banner-content {
  padding: 64px 0;
  text-align: center;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 48px 0;
  }
}

.banner-text-container {
  max-width: var(--ornament-max-width);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: var(--ornament-gap);

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
}

.ornament-text {
  font-family: var(--font-secondary);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0;
}

@media (max-width: 767px) {
  .ornament-text {
    font-size: 24px;
  }
}
</style>
