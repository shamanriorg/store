<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="isOpen"
        class="contact-overlay"
        @click.self="closeForm"
      >
        <div class="overlay-content">
          <div class="form-drawer" role="dialog" aria-modal="true">
            <div class="drawer-header">
              <h3 class="form-title">Форма связи</h3>
              <button
                type="button"
                class="close-btn"
                aria-label="Закрыть форму"
                @click="closeForm"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div class="drawer-body">
              <form class="contact-form" @submit.prevent="submitForm">
                <label class="form-field">
                  <span>Имя</span>
                  <input v-model="name" type="text" placeholder="Введите имя" required :disabled="isSubmitting" />
                </label>

                <label class="form-field">
                  <span>Почта</span>
                  <input v-model="email" type="email" placeholder="name@example.com" required :disabled="isSubmitting" />
                </label>

                <label class="form-field">
                  <span>Телефон</span>
                  <input v-model="phone" type="tel" placeholder="+7 (___) ___-__-__" :disabled="isSubmitting" />
                </label>

                <label class="form-field message-field">
                  <span>Сообщение</span>
                  <textarea v-model="message" placeholder="Напишите сообщение" required :disabled="isSubmitting"></textarea>
                </label>

                <!-- Сообщения об ошибке и успехе -->
                <div v-if="submitError" class="form-message form-message--error">
                  {{ submitError }}
                </div>
                <div v-if="submitSuccess" class="form-message form-message--success">
                  <div class="success-message">
                    Сообщение успешно отправлено! Спасибо за обращение.
                  </div>
                  <div class="success-note">
                    Отправка разрешена не чаще одного раза в 5 минут
                  </div>
                </div>
              </form>
            </div>

            <div class="drawer-footer">
              <Button
                class="submit-btn"
                variant="default"
                size="medium"
                :disabled="!isFormValid"
                :loading="isSubmitting"
                @click="submitForm"
              >
                {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
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
import emailjs from '@emailjs/browser'

const config = useRuntimeConfig()

const isOpen = useState('contactFormOpen', () => false)

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitSuccess = ref(false)

// Защита от спама: ограничение отправки раз в 5 минут
const RATE_LIMIT_MS = 5 * 60 * 1000 // 5 минут в миллисекундах
const STORAGE_KEY = 'contactFormLastSubmit'
const FORM_DATA_KEY = 'contactFormData'

// Проверка, можно ли отправить форму
const canSubmit = (): boolean => {
  if (typeof window === 'undefined') return true
  
  const lastSubmitTime = localStorage.getItem(STORAGE_KEY)
  if (!lastSubmitTime) return true
  
  const lastSubmit = parseInt(lastSubmitTime, 10)
  const now = Date.now()
  const timeSinceLastSubmit = now - lastSubmit
  
  return timeSinceLastSubmit >= RATE_LIMIT_MS
}

// Получение оставшегося времени до следующей отправки
const getRemainingTime = (): number => {
  if (typeof window === 'undefined') return 0
  
  const lastSubmitTime = localStorage.getItem(STORAGE_KEY)
  if (!lastSubmitTime) return 0
  
  const lastSubmit = parseInt(lastSubmitTime, 10)
  const now = Date.now()
  const timeSinceLastSubmit = now - lastSubmit
  const remaining = RATE_LIMIT_MS - timeSinceLastSubmit
  
  return remaining > 0 ? remaining : 0
}

// Форматирование времени в минуты и секунды
const formatRemainingTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  
  if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'минута' : minutes < 5 ? 'минуты' : 'минут'} ${seconds} ${seconds === 1 ? 'секунда' : seconds < 5 ? 'секунды' : 'секунд'}`
  }
  return `${seconds} ${seconds === 1 ? 'секунда' : seconds < 5 ? 'секунды' : 'секунд'}`
}

// Сохранение времени отправки
const saveSubmitTime = () => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, Date.now().toString())
}

// Сохранение данных формы в localStorage
const saveFormData = () => {
  if (typeof window === 'undefined') return
  const formData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    message: message.value
  }
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData))
}

// Загрузка данных формы из localStorage
const loadFormData = () => {
  if (typeof window === 'undefined') return
  try {
    const savedData = localStorage.getItem(FORM_DATA_KEY)
    if (savedData) {
      const formData = JSON.parse(savedData)
      name.value = formData.name || ''
      email.value = formData.email || ''
      phone.value = formData.phone || ''
      message.value = formData.message || ''
    }
  } catch (error) {
    console.error('Ошибка загрузки данных формы:', error)
  }
}

// Очистка данных формы (только для ошибок)
const clearFormData = () => {
  if (typeof window === 'undefined') return
  name.value = ''
  email.value = ''
  phone.value = ''
  message.value = ''
  localStorage.removeItem(FORM_DATA_KEY)
}

const closeForm = () => {
  isOpen.value = false
}

const resetForm = () => {
  // Не очищаем данные формы, только ошибки и статусы
  submitError.value = null
  submitSuccess.value = false
}

const submitForm = async () => {
  if (!isFormValid.value || isSubmitting.value) return

  // Проверка лимита отправки
  if (!canSubmit()) {
    const remaining = getRemainingTime()
    const formattedTime = formatRemainingTime(remaining)
    submitError.value = `Пожалуйста, подождите. Осталось: ${formattedTime}`
    return
  }

  isSubmitting.value = true
  submitError.value = null
  submitSuccess.value = false

  try {
    const serviceId = config.public.emailjs.serviceId
    const templateId = config.public.emailjs.templateId
    const publicKey = config.public.emailjs.publicKey

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS не настроен. Пожалуйста, проверьте конфигурацию.')
    }

    // Форматируем текущую дату и время
    const now = new Date()
    const formattedTime = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Moscow'
    }).format(now)

    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: name.value.trim(),
        from_email: email.value.trim(),
        phone: phone.value.trim() || 'Не указан',
        message: message.value.trim(),
        time: formattedTime
      },
      publicKey
    )

    // Сохраняем время успешной отправки
    saveSubmitTime()
    
    submitSuccess.value = true
    
    // Закрываем форму через 5 секунд после успешной отправки
    setTimeout(() => {
      closeForm()
      resetForm()
    }, 5000)
  } catch (error) {
    console.error('Ошибка отправки формы:', error)
    submitError.value = error instanceof Error 
      ? error.message 
      : 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
  } finally {
    isSubmitting.value = false
  }
}

const isFormValid = computed(() => {
  return name.value.trim().length > 0 &&
    email.value.trim().length > 0 &&
    message.value.trim().length > 0 &&
    !isSubmitting.value
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

// Сохранение данных при изменении полей
watch([name, email, phone, message], () => {
  saveFormData()
}, { deep: true })

watch(isOpen, (value) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = value ? 'hidden' : ''

  if (value) {
    // Загружаем сохраненные данные при открытии формы
    loadFormData()
  } else {
    // При закрытии только сбрасываем ошибки и статусы
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
  align-items: flex-end;
  background: rgba(28, 21, 17, 0.35);
  backdrop-filter: blur(8px);
  z-index: 1100;

  @media (max-width: 767px) {
    justify-content: center;
    align-items: flex-end;
    padding: 0;
  }
}

.overlay-content {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  height: 100vh;
  padding-left: 24px;
  padding-bottom: 0;
  pointer-events: none;

  @media (max-width: 767px) {
    justify-content: center;
    padding: 0;
    align-items: flex-end;
    width: 100vw;
    height: 100vh;
  }
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
  margin-top: 0;
  flex-shrink: 0;

  &:hover {
    background: rgba(249, 245, 239, 0.85);
  }
}

.form-drawer {
  width: 570px;
  height: 85vh;
  background: #F9F5EF;
  border-radius: 8px 0 0 8px;
  padding: 24px;
  overflow-y: auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 24px;
  pointer-events: auto;

  @media (max-width: 767px) {
    width: 100vw !important;
    height: 85vh;
    min-height: 85vh;
    max-height: 85vh;
    border-radius: 16px 16px 0 0;
    padding: 24px 20px;
  }
}

.drawer-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

  @media (max-width: 767px) {
    gap: 16px;
  }
}

.form-field {
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
    width: 100%;

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
  width: 100%;

  textarea {
    flex: 1;
    min-height: 0;
    height: 100%;
    resize: vertical;
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
  justify-content: flex-end;
  margin-top: auto;

  @media (max-width: 767px) {
    justify-content: center;
  }
}

.submit-btn {
  width: 100%;
  max-width: 240px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
}

.form-message {
  padding: 12px 16px;
  border-radius: 8px;
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 8px;

  &--error {
    background-color: #fee;
    color: #c33;
    border: 1px solid #fcc;
  }

  &--success {
    background-color: #efe;
    color: #2a7f2a;
    border: 1px solid #8bc34a;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: 500;
  }
}

.success-message {
  font-weight: 500;
  font-size: 16px;
}

.success-note {
  font-size: 14px;
  opacity: 0.85;
  margin-top: 4px;
}

</style>

