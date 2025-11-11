<template>
  <div class="ornament-banner">
    <div class="ornament-top"></div>

    <div class="banner-content">
      <div class="banner-text-container">
        <p class="ornament-text">
          Адепт неспешной жизни и гармонии во всем, чего мы касаемся, я стараюсь сохранить
          ощущение единства с миром и целостности в том, что делаю. Это очень важно - видеть
          красивое в травинках и собачьих носах, радужных переливах на спинке жука,
          разросшемся лишайнике, осенних грибах и куполах старых церквей. Во всем вокруг.
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

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
}

.ornament-text {
  font-family: var(--font-primary);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 767px) {
  .ornament-text {
    font-size: 24px;
  }
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

