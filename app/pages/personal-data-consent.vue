<template>
  <div class="consent-page">
    <div class="container container-adaptive">
      <h1 class="page-title">Согласие на обработку персональных данных</h1>

      <div class="content">
        <p>
          Нажимая кнопку «Отправить» в форме обратной связи, вы подтверждаете свое
          согласие на обработку персональных данных, предоставленных вами при отправке обращения.
        </p>
        <p>
          Персональные данные обрабатываются для рассмотрения вашего обращения и связи с вами.
        </p>
        <p>
          Оператор персональных данных: SHaMAnRI. Вы можете отозвать согласие, направив обращение
          на email: <a class="link" href="mailto:shamanri@ya.ru">shamanri@ya.ru</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Согласие на обработку персональных данных — Shamanri',
  description:
    'Согласие на обработку персональных данных при отправке формы обратной связи в Shamanri.',
  ogTitle: 'Согласие на обработку персональных данных — Shamanri',
  ogDescription:
    'Согласие на обработку персональных данных при отправке формы обратной связи в Shamanri.',
  twitterCard: 'summary_large_image'
})
</script>

<style scoped lang="scss">
.consent-page {
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
  font-size: 40px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.content {
  font-family: var(--font-primary);
  font-size: 20px;
  line-height: 1.4;
  color: var(--text-primary);

  p {
    margin: 0 0 16px 0;
  }
}

.link {
  color: inherit;
  text-decoration: underline;
}

@media (max-width: 767px) {
  .page-title {
    font-size: 32px;
  }

  .content {
    font-size: 16px;
  }
}
</style>

