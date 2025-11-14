<template>
  <div
    :class="[
      'category-button',
      { 'category-button--active': isActive }
    ]"
    :style="buttonStyles"
    @click="$emit('click')"
  >
    <span class="category-button__label">{{ label }}</span>
    <div
      v-if="fanImages && fanImages.length > 0"
      class="category-button__fan"
    >
      <img
        v-for="(image, index) in fanImages"
        :key="index"
        :src="image"
        :alt="label"
        class="category-button__fan-image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  hoverBackground?: string
  activeBackground?: string
  fanImages?: string[]
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hoverBackground: '#A79D83',
  activeBackground: '#5C5034',
  fanImages: () => [],
  isActive: false
})

defineEmits<{
  click: []
}>()

const buttonStyles = computed(() => {
  const styles: Record<string, string> = {
    '--hover-bg': props.hoverBackground
  }
  if (props.isActive) {
    styles.background = props.activeBackground
    styles.color = 'var(--text-white)'
  }
  return styles
})
</script>

<style scoped lang="scss">
.category-button {
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

.category-button:hover {
  background: var(--hover-bg);
}

.category-button__label {
  display: inline-block;
  transition: transform 0.3s ease;
}

.category-button:hover .category-button__label {
  transform: translateY(-20px);
}

.category-button.category-button--active .category-button__label {
  transform: translateY(-100px);
}

.category-button__fan {
  position: absolute;
  left: 50%;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  transform: translate(-50%, 100%);
  transition: transform 0.3s ease;
  pointer-events: none;
}

.category-button__fan-image {
  width: 112px;
  height: auto;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.category-button__fan-image:first-child,
.category-button__fan-image:last-child {
  width: 122px;
}

.category-button__fan-image + .category-button__fan-image {
  margin-left: -48px;
}

.category-button:hover .category-button__fan {
  transform: translate(-50%, 80%);
}

.category-button.category-button--active .category-button__fan {
  transform: translate(-50%, 0%);
}

@media (max-width: 1019px) {
  .category-button {
    height: 140px;
    font-size: 26px;
    padding-bottom: 24px;
  }

  .category-button__fan-image {
    width: 48px;
  }

  .category-button__fan-image:first-child,
  .category-button__fan-image:last-child {
    width: 52px;
  }

  .category-button__fan-image + .category-button__fan-image {
    margin-left: -20px;
  }

  .category-button__fan-image:first-child {
    transform: translateX(-4px);
  }

  .category-button__fan-image:last-child {
    transform: translateX(4px);
  }

  .category-button:hover .category-button__label {
    transform: translateY(-10px);
  }

  .category-button.category-button--active .category-button__label {
    transform: translateY(-50px);
  }
}
</style>

