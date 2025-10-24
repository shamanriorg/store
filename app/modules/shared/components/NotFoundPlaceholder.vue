<template>
  <div class="not-found-placeholder">
    <div class="container container-adaptive">
      <h1 class="placeholder-title">Страница, которой (пока) нет</h1>
      <p class="placeholder-date">Между вчера и завтра</p>
      <div class="placeholder-content">
        <p class="content-text">
          Между замыслом и его воплощением лежит тихая пустота. Эта страница — именно она.
        </p>
        <p class="content-text">
          Мы отправили экспедицию за содержанием, но оно заблудилось в лабиринте наших черновиков. Возможно, оно пьёт кофе с потерянной парой носков и той самой блестящей идеей, что посетила вас позавчера вечером.
        </p>
        <p class="content-text">
          Не грустите. Иногда отсутствие — самая честная и многообещающая форма присутствия. А пока вы здесь, закройте глаза и представьте, что могло бы быть на этом месте. Самый полезный справочник, самая вдохновляющая история, самая простая инструкция...
        </p>
        <p class="content-text">
          Вот видите? Уже теплее. Мы ещё вернёмся, чтобы написать это вместе.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент не требует дополнительной логики
</script>

<style lang="scss" scoped>
.not-found-placeholder {
  min-height: 60vh;
  padding: 32px 0;
  max-width: 928px;
  margin: 0 auto;
}

.placeholder-title {
  color: var(--text-secondary, #62322D);
  font-family: "Cormorant Infant";
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0 0 12px 0;
}

.placeholder-date {
  color: var(--text-tertiary, #6F615B);
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 0 32px 0;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
}

.content-text {
  font-family: var(--font-primary);
  font-size: 20px;
  line-height: 1.6;
  color: var(--text-primary);
  margin: 0 0 20px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
}

// Адаптивность
@media (max-width: 768px) {
  .not-found-placeholder {
    padding: 16px 0;
  }
  
  .placeholder-title {
    font-size: 36px;
  }
  
  .content-text {
    font-size: 18px;
  }
}
</style>
