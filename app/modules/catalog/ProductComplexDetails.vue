<template>
  <div class="product-complex-details">
    <!-- Дополнительная информация -->
    <div class="product-complex-info">
      <p class="product-complex-info__text">
        Мы хотим, чтобы вы были на 100% уверены в своем выборе! Поэтому мы бесплатно предоставляем две услуги:
      </p>
      <ol class="product-complex-info__list">
        <li class="product-complex-info__item">
          <strong>Подбор паттерна:</strong> мы поможем вам выбрать паттерн под ваш конкретный носитель, если вам нелегко определиться выбором самостоятельно.
        </li>
        <li class="product-complex-info__item">
          <strong>Визуализация на вашей модели:</strong> Пришлите нам фото или шаблон вашего изделия (футболки, платья, дивана и т.д.), и мы подготовим для вас реалистичную картинку, как будет смотреться паттерн на вашем продукте.
        </li>
      </ol>
      <h3 class="product-complex-info__title">Лицензирование и индивидуальная адаптация</h3>
      <ul class="product-complex-info__list">
        <li class="product-complex-info__item">
          При покупке коммерческой лицензии: за дополнительную плату мы можем изменить размер паттерна или его цветовую гамму(не для всех узоров), чтобы он идеально вписался в ваш проект.
        </li>
        <li class="product-complex-info__item">
          При покупке эксклюзивной лицензии (при которой паттерн удаляется из продажи и становится вашим уникальным активом) все правки по изменению размера и цветовой гаммы(не для всех узоров) выполняются бесплатно.
        </li>
      </ul>
    </div>
    
    <!-- Информация о лицензиях -->
    <div class="product-licenses">
      <div class="product-licenses__item">
        <h3 class="product-licenses__item-title">Коммерческая лицензия (Неисключительная)</h3>
        <p class="product-licenses__item-intro">
          Эта лицензия предоставляет вам широкие права на использование паттерна в ваших проектах с возможностью создания и продажи физических товаров без ограничений по тиражу.
        </p>
        <h4 class="product-licenses__item-subtitle">Что входит:</h4>
        <ul class="product-licenses__item-list">
          <li><strong>Файлы для работы:</strong> Вы получите файлы в форматах PSD, TIFF, JPG, PNG высокого разрешения, готовые к печати.</li>
          <li><strong>Срок действия:</strong> Лицензия действует 5 лет.</li>
          <li><strong>Территория:</strong> Действует по всему миру без территориальных ограничений.</li>
          <li><strong>Ваши права:</strong>
            <ul class="product-licenses__item-sublist">
              <li>Использовать паттерн в личных и коммерческих целях.</li>
              <li>Производить и продавать неограниченное количество любых физических изделий с этим паттерном (одежда, текстиль, обои, посуда и т.д.).</li>
              <li>Размещать узор на любых материалах и поверхностях.</li>
            </ul>
          </li>
        </ul>
        <p class="product-licenses__item-note">
          <strong>Индивидуальная адаптация:</strong> За дополнительную плату мы можем изменить цветовую гамму или масштаб паттерна под ваши задачи.
        </p>
        <p v-if="false" class="product-licenses__item-price">
          <strong>Стоимость:</strong> 20 000 руб.
        </p>
      </div>
      
      <div class="product-licenses__divider"></div>
      
      <div class="product-licenses__item">
        <h3 class="product-licenses__item-title">Эксклюзивная лицензия (Полное владение)</h3>
        <p class="product-licenses__item-intro">
          Это лучший выбор для тех, кто хочет получить паттерн в единоличное пользование и сделать его уникальной частью своего бренда.
        </p>
        <h4 class="product-licenses__item-subtitle">Что входит:</h4>
        <ul class="product-licenses__item-list">
          <li><strong>Все преимущества Коммерческой лицензии</strong> (без ограничений по тиражам и территориям).</li>
          <li><strong>Срок действия:</strong> Бессрочно.</li>
          <li><strong>Эксклюзивность:</strong> После покупки паттерн безвозвратно удаляется из всех моих магазинов и больше никогда не будет продан кому-либо другому.</li>
          <li><strong>Расширенные права:</strong>
            <ul class="product-licenses__item-sublist">
              <li><strong>Правка и модификация:</strong> Вы получаете право перерабатывать, видоизменять и создавать производные работы на основе паттерна.</li>
              <li><strong>Бесплатная адаптация:</strong> Мы бесплатно изменим для вас размер паттерна и цветовую гамму.</li>
            </ul>
          </li>
        </ul>
        <p class="product-licenses__item-note">
          <strong>Итог:</strong> Вы становитесь единственным владельцем прав на использование этого дизайна.
        </p>
        <p v-if="false" class="product-licenses__item-price">
          <strong>Стоимость:</strong> 50 000 руб.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент для отображения дополнительной информации и лицензий для complex товаров
</script>

<style scoped lang="scss">
.product-complex-details {
  margin-top: 32px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
}

.product-complex-info {
  padding-top: 24px;
}

.product-complex-info__text {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 16px 0;
}

.product-complex-info__title {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 20px;
  font-weight: 500;
  margin: 24px 0 16px 0;
}

.product-complex-info__list {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding-left: 20px;
}

ol.product-complex-info__list {
  list-style-type: decimal;
}

ul.product-complex-info__list {
  list-style-type: disc;
}

.product-complex-info__item {
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    font-weight: 500;
  }
}

.product-licenses {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-rest, #DDD7CF);
}

.product-licenses__item {
  &:last-child {
    margin-bottom: 0;
  }
}

.product-licenses__divider {
  height: 1px;
  background: var(--border-rest, #DDD7CF);
  margin: 24px 0;
}

.product-licenses__item-title {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 16px 0;
}

.product-licenses__item-intro {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 20px 0;
}

.product-licenses__item-subtitle {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 18px;
  font-weight: 500;
  margin: 24px 0 16px 0;
}

.product-licenses__item-list {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 16px 0;
  padding-left: 20px;
  list-style-type: disc;
}

.product-licenses__item-list li {
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    font-weight: 500;
  }
}

.product-licenses__item-sublist {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  margin: 8px 0 0 0;
  padding-left: 20px;
  list-style-type: disc;
}

.product-licenses__item-sublist li {
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    font-weight: 500;
  }
}

.product-licenses__item-note {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  margin: 16px 0;
  
  strong {
    font-weight: 500;
  }
}

.product-licenses__item-price {
  color: var(--text-primary, #361406);
  font-family: Rubik;
  font-size: 16px;
  font-weight: 400;
  margin: 16px 0 0 0;
  
  strong {
    font-weight: 500;
  }
}
</style>

