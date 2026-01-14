<template>
  <div class="company-page">
    <div class="container container-adaptive">
      <h1 class="page-title">О компании</h1>
      
      <div class="info-container">
        <!-- Юридическая информация -->
        <section class="info-section">
          <h2 class="info-title">Юридическая информация</h2>
          <div class="info-content">
            <p>
              SHaMAnRI — интернет-магазин художественной продукции. Основан в 2020 году.
            </p>
            <p>
              ИНН 550313716486. Самозанятая Матвеева Мария Владимировна.
            </p>
            <p>
              SHaMAnRI® является зарегистрированным товарным знаком.
            </p>
          </div>
        </section>

        <!-- Контакты -->
        <section class="info-section">
          <h2 class="info-title">Контакты</h2>
          <div class="info-content contacts-content">
            <!-- Почтовый адрес -->
            <div class="contact-row">
              <img src="~/assets/images/star-point.svg" alt="" class="contact-icon" />
              <p class="contact-text">
                Почтовый адрес: <span class="text-medium">127495, г. Москва, до востребования</span>
              </p>
            </div>
            
            <!-- Режим работы -->
            <div class="contact-row">
              <img src="~/assets/images/star-point.svg" alt="" class="contact-icon" />
              <p class="contact-text">
                Режим работы: <span class="text-medium">будни с 11 до 19 мск</span>
              </p>
            </div>
            
            <!-- Почта -->
            <div class="contact-row">
              <img src="~/assets/images/star-point.svg" alt="" class="contact-icon" />
              <p class="contact-text">
                Почта: <span class="text-medium">shamanri@ya.ru</span>
              </p>
              <button class="icon-button" @click="copyToClipboard('shamanri@ya.ru')" title="Скопировать">
                <span class="material-icons">content_copy</span>
              </button>
            </div>
            
            <!-- Телефон -->
            <div class="contact-row">
              <img src="~/assets/images/star-point.svg" alt="" class="contact-icon" />
              <p class="contact-text">
                Для звонков: <span class="text-medium">+7 936 615 8336</span>
              </p>
              <button class="icon-button" @click="copyToClipboard('+7 936 615 8336')" title="Скопировать">
                <span class="material-icons">content_copy</span>
              </button>
            </div>
            
            <!-- Телеграм -->
            <div class="contact-row">
              <img src="~/assets/images/star-point.svg" alt="" class="contact-icon" />
              <p class="contact-text">
                Телеграм: <a href="https://t.me/shamanri_tlg" target="_blank" rel="noopener noreferrer" class="text-medium">shamanri_tlg</a>
              </p>
              <a href="https://t.me/shamanri_tlg" target="_blank" rel="noopener noreferrer" class="icon-button" title="Открыть">
                <span class="material-icons">open_in_new</span>
              </a>
            </div>
            
            <!-- Инстаграм -->
            <div class="contact-row">
              <img src="~/assets/images/star-point.svg" alt="" class="contact-icon" />
              <p class="contact-text">
                Инстаграм: <a href="https://instagram.com/shamanri_art" target="_blank" rel="noopener noreferrer" class="text-medium">shamanri_art</a>
              </p>
              <a href="https://instagram.com/shamanri_art" target="_blank" rel="noopener noreferrer" class="icon-button" title="Открыть">
                <span class="material-icons">open_in_new</span>
              </a>
            </div>
            
            <!-- ВК -->
            <div class="contact-row">
              <img src="~/assets/images/star-point.svg" alt="" class="contact-icon" />
              <a href="https://vk.com/shamanri" target="_blank" rel="noopener noreferrer" class="contact-text text-medium contact-link">ВК</a>
              <a href="https://vk.com/shamanri" target="_blank" rel="noopener noreferrer" class="icon-button" title="Открыть">
                <span class="material-icons">open_in_new</span>
              </a>
            </div>
          </div>
        </section>

        <!-- Оплата -->
        <section class="info-section">
          <h2 class="info-title">Оплата</h2>
          <div class="info-content">
            <p>
              Принимаем платежи через ЮКасса: банковские карты, Apple Pay, Google Pay, электронные кошельки и другие способы.
            </p>
            <p>
              Если платеж не проходит — свяжитесь с нами.
            </p>
            <p>
              Все данные защищены международной сертификацией. Ваша информация не передается третьим лицам.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'Shamanri — контакты и сотрудничество по паттернам и плитке',
  description:
    'Официальные контакты Shamanri: реквизиты, способы оплаты и связи для заказов паттернов, плитки, открыток и цифровых коллекций.',
  ogTitle: 'Shamanri — как связаться и оформить заказ',
  ogDescription:
    'Юридические данные и каналы связи студии Shamanri для сотрудничества по паттернам, декоративной плитке и авторским открыткам.',
  twitterCard: 'summary_large_image'
})

useHead({
  meta: [
    {
      key: 'company-keywords',
      name: 'keywords',
      content:
        'Shamanri контакты, реквизиты Shamanri, заказать паттерны, дизайнерская плитка сотрудничество, авторские открытки'
    }
  ]
})

// Функция копирования в буфер обмена
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // Можно добавить уведомление об успешном копировании
    console.log('Скопировано:', text)
  } catch (err) {
    console.error('Ошибка копирования:', err)
  }
}
</script>

<style lang="scss" scoped>
.company-page {
  min-height: 60vh;
  padding: 32px 0 0 0;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

.page-title {
  font-family: var(--font-secondary);
  font-weight: var(--font-secondary-weight);
  font-size: 48px;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-section {
  display: flex;
  flex-direction: column;
  
  .info-title {
    font-family: var(--font-secondary);
    font-weight: var(--font-secondary-weight);
    font-size: 40px;
    color: var(--text-secondary);
    margin-bottom: 20px;
  }
  
  .info-content {
    p {
      font-family: var(--font-primary);
      font-size: 24px;
      line-height: 1.2;
      color: var(--text-primary);
    }
    
    a {
      text-decoration: none;
      transition: color 0.3s ease;
      text-decoration: underline;
    }
  }
}

.contacts-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.contact-text {
  font-family: var(--font-primary);
  font-size: 24px;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0;
  
  .text-medium {
    font-weight: 500;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--text-secondary);
      text-decoration: underline;
    }
  }
}

.contact-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--text-secondary);
    text-decoration: underline;
  }
}

.text-medium {
  font-weight: 500;
}

.icon-button {
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--text-primary);
  transition: color 0.3s ease;
  text-decoration: none !important;
  
  .material-icons {
    font-size: 24px;
  }
  
  &:hover {
    color: var(--bg-primary-default);
    text-decoration: none !important;
  }
}

@media (max-width: 767px) {
  .info-section {
    .info-title {
      font-size: 36px;
    }

    .info-content {
      p {
        font-size: 20px;
      }
    }
  }

  .contact-text {
    font-size: 20px;
  }
}
</style>

