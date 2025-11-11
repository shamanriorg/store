<template>
  <div class="ornament-banner">
    <div class="ornament-top"></div>

    <div class="banner-content">
      <div class="banner-text-container">
        <p class="ornament-text">
          Наша философия — гармония вместо идеальности.
        </p>
        <p class="ornament-text">
          Я не стремлюсь к стерильной точности линий и выверенным композициям. Моя цель —
          передать настроение, поймать и сохранить красоту старого дерева, утреннего
          тумана, узора на крыле бабочки.
        </p>
        <p class="ornament-text">
          Мне кажется очень важным вглядываться пристальнее в окружающий нас невероятный
          мир. Я любуюсь и восхищаюсь его разнообразием и рациональностью, и верю, что мы
          можем научиться у природы и животных гармонии и балансу, чтобы перенести их во всё,
          что мы делаем, в каждый миг жизни.
        </p>
      </div>
    </div>

    <div class="ornament-bottom"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.ornament-banner {
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

.ornament-top {
  height: 20px;
  background-image: url('~/assets/images/ornament.png');
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: center;
  width: 100%;
}

.banner-content {
  background-color: var(--bg-color-ornament);
  padding: 64px 0;
  text-align: center;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 48px 0;
  }
}

.banner-text-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
}

.ornament-text {
  font-family: var(--font-secondary);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
  margin: 0;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
}

.ornament-bottom {
  height: 20px;
  background-image: url('~/assets/images/ornament.png');
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: center;
  transform: rotate(180deg);
  width: 100%;
}
</style>

