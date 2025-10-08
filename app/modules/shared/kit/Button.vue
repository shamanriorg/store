<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <!-- Иконка слева -->
    <span 
      v-if="leftIcon" 
      class="btn__icon btn__icon--left material-icons"
    >
      {{ leftIcon }}
    </span>
    
    <!-- Содержимое кнопки -->
    <span class="btn__content">
      <slot />
    </span>
    
    <!-- Иконка справа -->
    <span 
      v-if="rightIcon" 
      class="btn__icon btn__icon--right material-icons"
    >
      {{ rightIcon }}
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'active' | 'transparent'
  size?: 'xs' | 'small' | 'medium'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  leftIcon?: string
  rightIcon?: string
  wfull?: boolean
  noPadding?: boolean
  fontWeight?: 400 | 500
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'medium',
  disabled: false,
  type: 'button',
  wfull: false,
  noPadding: false,
  fontWeight: 500
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  // Прозрачная кнопка по умолчанию small, но можно переопределить на xs
  const effectiveSize = props.variant === 'transparent' && props.size === 'medium' ? 'small' : props.size
  
  return [
    'btn',
    `btn--${props.variant}`,
    { [`btn--${effectiveSize}`]: effectiveSize !== 'medium' },
    { 'btn--with-icon': props.leftIcon || props.rightIcon },
    { 'btn--wfull': props.wfull },
    { 'btn--no-padding': props.noPadding },
    { 'btn--disabled': props.disabled }
  ]
})
</script>

<style lang="scss" scoped>
/* Базовые стили кнопки */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--btn-height);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  border: none;
  border-radius: var(--btn-border-radius);
  font-size: var(--btn-font-size);
  font-weight: v-bind('props.fontWeight');
  font-family: var(--font-primary);
  text-decoration: none;
  cursor: pointer;
  transition: var(--btn-transition);
  position: relative;
  overflow: hidden;
  width: auto; /* По умолчанию не растягивается */
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Варианты кнопок на основе макета */
  &--default {
    background-color: var(--bg-primary-default);
    color: var(--text-white); /* Белый текст */
    
    &:hover:not(:disabled) {
      background-color: var(--bg-primary-active);
    }
  }
  
  &--active {
    background-color: var(--bg-primary-active);
    color: var(--text-white); /* Белый текст */
    
    &:hover:not(:disabled) {
      background-color: var(--bg-primary-default);
    }
  }
  
  &--transparent {
    background-color: var(--bg-transparent);
    color: var(--text-primary); /* Темный текст */
    border: none; /* Убираем обводку */
    
    &:hover:not(:disabled) {
      background-color: var(--bg-transparent); /* Фон остается прозрачным */
      color: var(--text-secondary); /* Только цвет текста меняется */
    }
  }
  
  /* Свойство wfull для полной ширины */
  &--wfull {
    width: 100%;
  }
  
  /* Убираем отступы */
  &--no-padding {
    padding: 0;
  }
  
  /* Размеры */
  &--xs {
    height: 40px;
    padding: 8px 12px;
    font-size: 16px;
    color: var(--text-tertiary);
  }
  
  &--small {
    height: 40px;
    padding: 8px 12px;
  }
  
  /* С иконкой */
  &--with-icon {
    gap: 8px;
    
    .btn__icon {
      width: 20px;
      height: 20px;
    }
  }
}

/* Стили для иконок */
.btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &--left {
    margin-right: 8px;
  }
  
  &--right {
    margin-left: 8px;
  }
}

/* Стили для содержимого кнопки */
.btn__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
