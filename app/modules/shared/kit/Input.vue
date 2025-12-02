<template>
  <label class="input-field">
    <span>{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur', $event)"
    />
  </label>
</template>

<script setup lang="ts">
interface Props {
  label: string
  type?: string
  modelValue: string
  placeholder?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false
})

defineEmits<{
  'update:modelValue': [value: string]
  'blur': [event: FocusEvent]
}>()
</script>

<style scoped lang="scss">
.input-field {
  position: relative;
  padding-top: 20px;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: var(--text-tertiary, #6F615B);
  width: 100%;

  span {
    position: absolute;
    top: 12px;
    left: 24px;
    line-height: 1;
    transform: translateY(0);
    padding: 0 2px;
    background: transparent;
    z-index: 2;

    &::before {
      content: '';
      position: absolute;
      left: -4px;
      right: -4px;
      top: 68%;
      height: 12px;
      transform: translateY(-68%);
      z-index: -1;
      border-radius: 6px;
      background: linear-gradient(
        180deg,
        #F9F5EF 0%,
        #F9F5EF 45%,
        var(--bg-secondary-reverse, #FFF) 55%,
        var(--bg-secondary-reverse, #FFF) 100%
      );
    }
  }

  input {
    font-family: Rubik;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    padding: 16px 24px;
    border-radius: 8px;
    border: 1px solid var(--border-muted, #BAB3A9);
    background: var(--bg-secondary-reverse, #FFF);
    color: var(--text-primary, #361406);
    background-origin: border-box;
    background-image:
      linear-gradient(var(--bg-secondary-reverse, #FFF), var(--bg-secondary-reverse, #FFF)) padding-box,
      linear-gradient(var(--bg-secondary-reverse, #FFF), var(--bg-secondary-reverse, #FFF)) padding-box,
      linear-gradient(var(--border-muted, #BAB3A9), var(--border-muted, #BAB3A9));
    width: 100%;
    box-sizing: border-box;

    &:focus-visible {
      outline: none;
      border: 1px solid var(--text-secondary, #62322D);
      background-image:
        linear-gradient(var(--bg-secondary-reverse, #FFF), var(--bg-secondary-reverse, #FFF)) padding-box,
        linear-gradient(var(--bg-secondary-reverse, #FFF), var(--bg-secondary-reverse, #FFF)) padding-box,
        linear-gradient(var(--text-secondary, #62322D), var(--text-secondary, #62322D));
    }
  }
}

@media (max-width: 767px) {
  .input-field {
    input {
      font-size: 20px;
    }
  }
}
</style>


