<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="isOpen"
        class="contact-overlay"
        @click.self="closeForm"
      >
        <div class="overlay-content">
          <button
            type="button"
            class="close-btn"
            aria-label="Закрыть форму"
            @click="closeForm"
          >
            <span aria-hidden="true">✕</span>
          </button>

          <div class="form-drawer" role="dialog" aria-modal="true">
            <div class="drawer-header">
              <h3 class="form-title">Форма связи</h3>
            </div>

            <div class="drawer-body">
              <form class="contact-form" @submit.prevent="submitForm">
                <label class="form-field">
                  <span>Имя</span>
                  <input v-model="name" type="text" placeholder="Введите имя" required />
                </label>

                <label class="form-field">
                  <span>Почта</span>
                  <input v-model="email" type="email" placeholder="name@example.com" required />
                </label>

                <label class="form-field">
                  <span>Телефон</span>
                  <input v-model="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                </label>

                <label class="form-field message-field">
                  <span>Сообщение</span>
                  <textarea v-model="message" placeholder="Напишите сообщение" required></textarea>
                </label>
              </form>
            </div>

            <div class="drawer-footer">
              <Button
                class="submit-btn"
                variant="default"
                size="medium"
                :disabled="!isFormValid"
                @click="submitForm"
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import Button from '~/modules/shared/kit/Button.vue'

const isOpen = useState('contactFormOpen', () => false)

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')

const closeForm = () => {
  isOpen.value = false
}

const resetForm = () => {
  name.value = ''
  email.value = ''
  phone.value = ''
  message.value = ''
}

const submitForm = () => {
  // TODO: подключить реальную отправку формы
  closeForm()
  resetForm()
}

const isFormValid = computed(() => {
  return name.value.trim().length > 0 &&
    email.value.trim().length > 0 &&
    message.value.trim().length > 0
})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeForm()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(isOpen, (value) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = value ? 'hidden' : ''

  if (!value) {
    resetForm()
  }
})
</script>

<style scoped lang="scss">
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.contact-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  background: rgba(28, 21, 17, 0.35);
  backdrop-filter: blur(8px);
  z-index: 1000;
}

.overlay-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  height: 100vh;
  padding-left: 24px;
}

.close-btn {
  width: 40px;
  height: 40px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #F9F5EF;
  color: var(--text-secondary);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin-top: 24px;

  &:hover {
    background: rgba(249, 245, 239, 0.85);
  }
}

.form-drawer {
  width: 570px;
  height: 100vh;
  background: #F9F5EF;
  border-radius: 8px 0 0 8px;
  padding: 24px;
  overflow-y: auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.drawer-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-title {
  margin: 0;
  font-family: "Cormorant Infant";
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-secondary, #62322D);
}

.drawer-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  min-height: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
  flex: 1;
}

.form-field {
  position: relative;
  padding-top: 20px;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: var(--text-tertiary, #6F615B);

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

  input,
  textarea {
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

    &:focus-visible {
      outline: none;
      border: 1px solid var(--text-secondary, #62322D);
      background-image:
        linear-gradient(var(--bg-secondary-reverse, #FFF), var(--bg-secondary-reverse, #FFF)) padding-box,
        linear-gradient(var(--bg-secondary-reverse, #FFF), var(--bg-secondary-reverse, #FFF)) padding-box,
        linear-gradient(var(--text-secondary, #62322D), var(--text-secondary, #62322D));
    }
  }

  textarea {
    resize: none;
    min-height: 0;
    height: 100%;
  }
}

.message-field {
  display: flex;
  flex-direction: column;
  flex: 1;

  textarea {
    flex: 1;
    min-height: 0;
    height: 100%;
  }
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 767px) {
  .form-title {
    font-size: 44px;
  }

  .form-field {
    input,
    textarea {
      font-size: 20px;
    }
  }
}

.drawer-footer {
  display: flex;
  flex-direction: column;
}

.submit-btn {
  width: 100%;
}

@media (max-width: 768px) {
  .contact-overlay {
    padding: 16px;
  }

  .overlay-content {
    gap: 12px;
  }

  .close-btn {
    width: 36px;
    height: 36px;
  }

  .form-drawer {
    width: min(100%, 480px);
    border-radius: 16px;
    height: auto;
  }
}
</style>

