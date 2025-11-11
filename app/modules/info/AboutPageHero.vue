<template>
  <div class="about-hero">
    <div class="about-hero-content">
      <div class="about-hero-image">
        <img
          src="~/assets/images/about-shamanri.jpg"
          alt="Shamanri"
          class="mary-image"
        />
      </div>

      <div class="about-hero-text">
        <section class="about-section about-section-hero">
          <h2>SHAMANRI: искусство, в котором живёт душа мира.</h2>
          <div class="hero-text">
            <p>
              Этот проект — личная сказка, начавшаяся в 2020 году. Меня зовут Мария
              Матвеева, я художник-самоучка. У меня нет диплома художественного ВУЗа, но
              есть непреодолимая тяга к красоте во всех ее проявлениях. Я верю, что у всего
              вокруг есть душа, и стараюсь сохранить в рисунках ее бесконечные проявления.
            </p>
            <p>Shamanri – это:</p>
            <ul class="hero-list">
              <li>Бесшовные паттерны, где все танцует и переплетается.</li>
              <li>Новогодние иллюстрации, дарящие ощущение чуда.</li>
              <li>Стикеры, открытки и сказки — капельки волшебства для повседневности.</li>
              <li>
                Тактильные воплощения: ткани, платки, шопперы и даже плитка, чтобы моё
                искусство можно было не только увидеть, но и потрогать.
              </li>
            </ul>
            <p>Но самыми любимыми моими направлениями остаются волшебные узоры и новогодние иллюстрации.</p>
          </div>
        </section>
      </div>
    </div>

    <div class="ornament-section">
      <AboutOrnamentBanner />
    </div>
  </div>
</template>

<script setup lang="ts">
import AboutOrnamentBanner from '~/modules/info/AboutOrnamentBanner.vue'
</script>

<style scoped lang="scss">
.about-hero {
  margin-bottom: 64px;
}

.about-hero-content {
  display: flex;
  gap: 16px;
  margin-bottom: 64px;

  @media (max-width: 1190px) {
    flex-direction: column;
  }
}

.about-hero-image {
  flex-shrink: 0;

  .mary-image {
    width: 688px;
    height: 688px;
    object-fit: cover;
    border-radius: 8px;

    @media (max-width: 1190px) {
      width: 100%;
      height: auto;
      min-width: 343px;
      min-height: 343px;
      max-width: 100%;
    }
  }
}

.about-hero-text {
  flex: 1;
  display: flex;
  align-items: flex-start;

  @media (max-width: 1190px) {
    align-items: stretch;
  }
}

.about-section {
  h2 {
    font-family: var(--font-secondary);
    font-weight: var(--font-secondary-weight);
    font-size: 40px;
    color: var(--text-secondary);
    margin-bottom: 24px;
    line-height: 1.2;
  }

  p {
    font-family: var(--font-primary);
    font-size: 24px;
    line-height: 1.2;
    color: var(--text-primary);
  }
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-list {
  font-family: var(--font-primary);
  font-size: 24px;
  line-height: normal;
  color: var(--text-primary);
  padding-left: 24px;
  margin: 0;

  li {
    margin-bottom: 12px;

    &::marker {
      color: var(--bg-primary-default);
    }
  }
}

.ornament-section {
  margin-bottom: 64px;
}
</style>

