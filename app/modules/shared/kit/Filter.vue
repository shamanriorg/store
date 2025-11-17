<template>
  <div class="filter" @mouseleave="closeDropdown">
    <button
      :class="[
        'filter-button',
        {
          'filter-button--active': hasSelection,
          'filter-button--radio': type === 'radio'
        }
      ]"
      @mouseenter="openDropdown"
      @click="handleButtonClick"
    >
      <span class="filter-button__text">
        <template v-if="type === 'radio' && selectedRadio">
          {{ selectedRadio.text }}
        </template>
        <template v-else>
          {{ text }}
        </template>
      </span>
      
      <span v-if="type === 'checkbox' && hasSelection" class="filter-button__badge">
        {{ selectedCount }}
      </span>
      
      <span class="filter-button__icon">
        <svg
          v-if="type === 'checkbox' && hasSelection"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else
          :class="{ 'filter-button__icon--rotated': isOpen }"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>

    <div
      v-if="isOpen"
      :class="[
        'filter-dropdown-bridge',
        {
          'filter-dropdown-bridge--align-left': align === 'left'
        }
      ]"
      @mouseenter="keepOpen"
    ></div>

    <div
      v-if="isOpen"
      :class="[
        'filter-dropdown',
        {
          'filter-dropdown--radio': type === 'radio',
          'filter-dropdown--align-left': align === 'left'
        }
      ]"
      :style="dropdownStyle"
      @mouseenter="keepOpen"
      @mouseleave="closeDropdown"
    >
      <div
        v-for="option in options"
        :key="option.id"
        :class="[
          'filter-option',
          {
            'filter-option--selected': type === 'radio' && isSelected(option),
            'filter-option--radio': type === 'radio'
          }
        ]"
        @click="handleOptionClick(option)"
      >
        <input
          v-if="type === 'checkbox'"
          type="checkbox"
          :checked="isSelected(option)"
          class="filter-option__checkbox"
          @click.stop
          @change="handleCheckboxChange(option, $event)"
        />
        <input
          v-else
          type="radio"
          :checked="isSelected(option)"
          :name="`filter-${_uid}`"
          class="filter-option__radio"
          @click.stop
          @change="handleRadioChange(option)"
        />
        <span class="filter-option__text">{{ option.text }}</span>
        <span
          v-if="type === 'radio' && isSelected(option)"
          class="filter-option__check-wrapper"
        >
          <svg
            class="filter-option__check-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface FilterOption {
  id: string | number
  text: string
}

interface Props {
  text: string
  type: 'checkbox' | 'radio'
  options: FilterOption[]
  modelValue: FilterOption[] | FilterOption | null
  align?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  align: 'right'
})

const emit = defineEmits<{
  'update:modelValue': [value: FilterOption[] | FilterOption | null]
}>()

const isOpen = ref(false)
const hoverTimeout = ref<NodeJS.Timeout | null>(null)

const selectedOptions = computed(() => {
  if (props.type === 'radio') {
    return props.modelValue ? [props.modelValue] : []
  }
  return (props.modelValue as FilterOption[]) || []
})

const selectedCount = computed(() => selectedOptions.value.length)

const hasSelection = computed(() => {
  if (props.type === 'radio') {
    return props.modelValue !== null
  }
  return selectedCount.value > 0
})

const selectedRadio = computed(() => {
  if (props.type === 'radio' && props.modelValue) {
    return props.modelValue as FilterOption
  }
  return null
})

const isSelected = (option: FilterOption): boolean => {
  return selectedOptions.value.some((item) => item.id === option.id)
}

const dropdownStyle = computed(() => {
  if (props.align === 'left') {
    return {
      left: 'auto',
      right: '0'
    }
  }
  return {
    left: '0',
    right: 'auto'
  }
})

const openDropdown = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
  isOpen.value = true
}

const closeDropdown = () => {
  hoverTimeout.value = setTimeout(() => {
    isOpen.value = false
  }, 100)
}

const keepOpen = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
}

const handleButtonClick = () => {
  if (props.type === 'checkbox' && hasSelection.value) {
    // Сброс при клике на крестик
    emit('update:modelValue', [])
    isOpen.value = false
  }
}

const handleCheckboxChange = (option: FilterOption, event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  const current = [...selectedOptions.value]
  
  if (checked) {
    current.push(option)
  } else {
    const index = current.findIndex((item) => item.id === option.id)
    if (index > -1) {
      current.splice(index, 1)
    }
  }
  
  emit('update:modelValue', current)
}

const handleRadioChange = (option: FilterOption) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const handleOptionClick = (option: FilterOption) => {
  if (props.type === 'radio') {
    handleRadioChange(option)
  } else if (props.type === 'checkbox') {
    // Переключаем состояние чекбокса при клике на опцию
    const isCurrentlySelected = isSelected(option)
    const current = [...selectedOptions.value]
    
    if (isCurrentlySelected) {
      const index = current.findIndex((item) => item.id === option.id)
      if (index > -1) {
        current.splice(index, 1)
      }
    } else {
      current.push(option)
    }
    
    emit('update:modelValue', current)
  }
}
</script>

<style scoped lang="scss">
.filter {
  position: relative;
  display: inline-block;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 8px 16px;
  border-radius: var(--24, 24px);
  border: 1px solid var(--border-rest, #DDD7CF);
  background: var(--bg-secondary-default, #EEE7DE);
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  border-color: var(--border-muted, #BAB3A9);
  background: var(--bg-secondary-active, #E4DFD7);
}

.filter-button--active {
  background: var(--bg-primary-default, #A54E3B);
  border-color: var(--bg-primary-default, #A54E3B);
  color: var(--text-reverse, #FFF);
}

.filter-button--active:hover {
  background: var(--bg-primary-active, #8E402F);
  border-color: var(--bg-primary-active, #8E402F);
}

.filter-button--radio {
  border: none;
  background: transparent;
  color: var(--text-primary, #361406);
  padding: 8px 0;
}

.filter-button--radio:hover {
  background: transparent;
  border: none;
}

.filter-button__text {
  white-space: nowrap;
}

.filter-button__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #FFF;
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 500;
  flex-shrink: 0;
}

.filter-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.filter-button__icon--rotated {
  transform: rotate(180deg);
}

.filter-dropdown-bridge {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 8px;
  background: transparent;
  z-index: 999;
}

.filter-dropdown-bridge--align-left {
  left: auto;
  right: 0;
}

.filter-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  padding: 16px;
  border-radius: 16px;
  background: var(--bg-secondary-page, #F9F5EF);
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.20), 0 2px 10px 0 rgba(0, 0, 0, 0.10);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
}

.filter-dropdown--radio {
  padding: 8px;
  gap: 0;
}

.filter-dropdown--align-left {
  left: auto;
  right: 0;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.filter-option--selected {
  background: var(--bg-secondary-active, #E4DFD7);
}

.filter-option--radio {
  flex-shrink: 0;
  padding-inline: 8px;
  padding-block: 6px;
}

.filter-option__checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid var(--bg-primary-active, #8E402F);
  background: var(--bg-secondary-page, #F9F5EF);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  transition: all 0.2s ease;
}

.filter-option__checkbox:checked {
  background: var(--bg-primary-active, #8E402F);
  border-color: var(--bg-primary-active, #8E402F);
}

.filter-option__checkbox:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 6L5 9L10 2' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.filter-option__radio {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}

.filter-option__text {
  font-family: Rubik;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--text-primary, #361406);
  flex: 1;
}

.filter-option--radio .filter-option__text {
  white-space: nowrap;
  flex: 0 1 auto;
}

.filter-option__check-wrapper {
  display: flex;
  align-items: center;
  margin-left: 12px;
  flex-shrink: 0;
}

.filter-option__check-icon {
  width: 24px;
  height: 24px;
  color: var(--text-primary, #361406);
}
</style>

