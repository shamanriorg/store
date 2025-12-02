<template>
  <div class="quantity-input">
    <button
      type="button"
      class="quantity-input__btn quantity-input__btn--minus"
      @click="handleDecrease"
    >
      <span class="material-icons">remove</span>
    </button>
    <input
      type="number"
      :value="modelValue"
      min="0"
      class="quantity-input__input"
      @input="handleInput"
      @blur="handleBlur"
      @keydown.enter="handleBlur"
    />
    <button
      type="button"
      class="quantity-input__btn quantity-input__btn--plus"
      @click="handleIncrease"
    >
      <span class="material-icons">add</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  min?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'blur': [event: FocusEvent]
}>()

const handleIncrease = () => {
  emit('update:modelValue', props.modelValue + 1)
}

const handleDecrease = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = parseInt(target.value)
  
  // Запрещаем отрицательные числа
  if (isNaN(value) || value < props.min) {
    target.value = props.min.toString()
    return
  }
  
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  let value = parseInt(target.value)
  
  // Если значение меньше минимума, устанавливаем минимум
  if (isNaN(value) || value < props.min) {
    value = props.min
    target.value = value.toString()
  }
  
  emit('update:modelValue', value)
  emit('blur', event)
}
</script>

<style scoped lang="scss">
.quantity-input {
  display: flex;
  gap: 0;
  border-radius: var(--8, 8px);
  border: 1px solid var(--border-muted, #BAB3A9);
  padding: 0 16px;
  align-items: center;
  width: auto;
  flex-shrink: 0;
}

.quantity-input__btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-primary, #361406);
  font-size: 24px;
  padding: 0;
  
  &:hover {
    color: var(--bg-primary-default, #A54E3B);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.quantity-input__input {
  flex-grow: 0;
  flex-shrink: 0;
  width: 40px;
  text-align: center;
  border: none;
  background: transparent;
  font-family: Rubik;
  font-size: 20px;
  color: var(--text-primary, #361406);
  padding: 0;
  
  &:focus {
    outline: none;
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
}
</style>

