<template>
  <div class="cart-page">
    <div class="container container-adaptive">
      <h1 class="cart-title">Корзина</h1>
      
      <div class="cart-content">
        <div class="cart-items">
          <div class="cart-item">
            <div class="cart-item__left">
              <button class="cart-item__delete" type="button">
                <img src="/icons/trash-2-outline.svg" alt="Удалить" class="cart-item__delete-icon" />
              </button>
              <div class="cart-item__image">
                <!-- Заглушка для изображения -->
              </div>
              <div class="cart-item__info">
                <p class="cart-item__title">Название товара</p>
                <p class="cart-item__description">Небольшое описание товара</p>
              </div>
            </div>
            <div class="cart-item__right">
              <button class="cart-item__delete-mobile" type="button">
                <img src="/icons/trash-2-outline.svg" alt="Удалить" class="cart-item__delete-icon" />
              </button>
              <div class="cart-item__right-group">
                <div class="cart-item__quantity-wrapper">
                  <QuantityInput v-model="testQuantity1" />
                </div>
                <span class="cart-item__total">
                  {{ formatPrice(testQuantity1 * testPrice1) }} <span class="cart-item__currency">₽</span>
                </span>
              </div>
            </div>
          </div>
          
          <div class="cart-item__divider"></div>
          
          <div class="cart-item">
            <div class="cart-item__left">
              <button class="cart-item__delete" type="button">
                <img src="/icons/trash-2-outline.svg" alt="Удалить" class="cart-item__delete-icon" />
              </button>
              <div class="cart-item__image">
                <!-- Заглушка для изображения -->
              </div>
              <div class="cart-item__info">
                <p class="cart-item__title">Название товара 2</p>
                <p class="cart-item__description">Небольшое описание товара 2</p>
              </div>
            </div>
            <div class="cart-item__right">
              <button class="cart-item__delete-mobile" type="button">
                <img src="/icons/trash-2-outline.svg" alt="Удалить" class="cart-item__delete-icon" />
              </button>
              <div class="cart-item__right-group">
                <div class="cart-item__quantity-wrapper">
                  <QuantityInput v-model="testQuantity2" />
                </div>
                <span class="cart-item__total">
                  {{ formatPrice(testQuantity2 * testPrice2) }} <span class="cart-item__currency">₽</span>
                </span>
              </div>
            </div>
          </div>
          
          <div class="cart-total">
            <span class="cart-total__label">Итого</span>
            <span class="cart-total__amount">
              {{ formatPrice(totalAmount) }} <span class="cart-total__currency">₽</span>
            </span>
          </div>
        </div>
        
        <div class="cart-form">
          <form class="cart-form__form">
            <Input
              v-model="email"
              label="Куда отправлять товары"
              type="email"
              placeholder="name@example.com"
            />
            
            <div class="cart-form__button-wrapper">
              <Button
                variant="default"
                wfull
                :disabled="!isEmailValid"
                @click="handlePayment"
              >
                Оплатить
              </Button>
            </div>
            
            <p class="cart-form__agreement">
              Нажимая «Оплатить», вы соглашаетесь на обработку персональных данных.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '~/modules/shared/kit/Input.vue'
import Button from '~/modules/shared/kit/Button.vue'
import QuantityInput from '~/modules/shared/kit/QuantityInput.vue'

useSeoMeta({
  title: 'Корзина - Shamanri',
  description: 'Ваша корзина покупок в Shamanri'
})

const email = ref('')

// Тестовые данные
const testQuantity1 = ref(2)
const testQuantity2 = ref(1)
const testPrice1 = 2000
const testPrice2 = 1500

const isEmailValid = computed(() => {
  if (!email.value.trim()) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const totalAmount = computed(() => {
  return (testQuantity1.value * testPrice1) + (testQuantity2.value * testPrice2)
})

const handlePayment = () => {
  if (isEmailValid.value) {
    // TODO: реализовать оплату
    console.log('Оплата для email:', email.value)
  }
}
</script>

<style scoped lang="scss">
.cart-page {
  padding: 32px 0 0 0;
  min-height: 60vh;
}

.cart-title {
  font-family: var(--font-secondary);
  font-weight: var(--font-secondary-weight);
  font-size: 48px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.cart-content {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
}

.cart-items {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cart-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.cart-item__left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-item__delete {
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  .cart-item__delete-icon {
    width: 24px;
    height: 24px;
    display: block;
  }
  
  &:hover {
    opacity: 0.7;
  }
}

.cart-item__delete-mobile {
  display: none;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  .cart-item__delete-icon {
    width: 24px;
    height: 24px;
    display: block;
  }
  
  &:hover {
    opacity: 0.7;
  }
}

.cart-item__image {
  width: 128px;
  height: 150px;
  background: #000;
  border-radius: 8px;
  flex-shrink: 0;
}

.cart-item__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-item__title {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
  line-height: 1.2;
}

.cart-item__description {
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
  line-height: 1.2;
}

.cart-item__right {
  display: flex;
  align-items: center;
  gap: 0;
}

.cart-item__right-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-item__quantity-wrapper {
  flex-shrink: 0;
  width: auto;
  max-width: 200px;
  
  :deep(.quantity-input) {
    width: auto;
    max-width: 200px;
  }
}

.cart-item__total {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  white-space: nowrap;
}

.cart-item__currency {
  margin-left: 4px;
}

.cart-item__divider {
  width: 100%;
  height: 1px;
  background: var(--border-rest, #DDD7CF);
  margin: 16px 0;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 24px;
}

.cart-total__label {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
}

.cart-total__amount {
  color: var(--bg-primary-default, #A54E3B);
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  white-space: nowrap;
}

.cart-total__currency {
  margin-left: 4px;
  color: var(--bg-primary-default, #A54E3B);
  font-weight: 500;
}

.cart-form {
  flex: 1;
  min-width: 0;
}

.cart-form__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-form__button-wrapper {
  margin-top: 0;
}

.cart-form__agreement {
  color: var(--text-tertiary, #6F615B);
  text-align: center;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin: 0;
  line-height: 1.5;
}

/* Адаптивность */
@media (max-width: 1240px) {
  .cart-content {
    flex-direction: column;
  }
  
  .cart-form {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .cart-item__title {
    font-size: 16px;
  }
  
  .cart-item__description {
    font-size: 16px;
  }
  
  .cart-item__total {
    font-size: 20px;
  }
  
  .cart-total__label {
    font-size: 20px;
  }
  
  .cart-total__amount {
    font-size: 20px;
  }
}

@media (max-width: 580px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .cart-item__left {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .cart-item__delete {
    display: none;
  }
  
  .cart-item__delete-mobile {
    display: flex;
  }
  
  .cart-item__image {
    width: 128px;
    height: 150px;
    flex-shrink: 0;
  }
  
  .cart-item__info {
    flex: 1;
    min-width: 0;
  }
  
  .cart-item__right {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-left: 0;
  }
  
  .cart-item__right-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>

