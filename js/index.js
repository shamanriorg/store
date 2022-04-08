// import {cards} from './cards.js';
let dictionary = {};
// Global not working flag
const tmpFlag = false;
const giftPackPrice = 700;

window.addEventListener("load", () => init(), false);

function init() {
  createCopyright();
  createCart();
  createBanner();
}

function openDropdown(event, dropdownID) {
  let element = event.target;
  // var popper = Popper.createPopper(element, document.getElementById(dropdownID), {
    //   placement: 'bottom-start'
  // });
  document.getElementById(dropdownID).classList.toggle("hidden");
}

function createCopyright() {
  const txt = `© 2020-${new Date().getFullYear()} SHaMAnRI. Интернет-магазин художественной продукции Марии Матвевой.`
  const copyRightEl = document.getElementById('footer-copyright');
  copyRightEl.textContent = txt;
}

function createCart() {
  dictionary.cards = cards;
  dictionary.scarfs = scarfs;
  dictionary.packs = packs;
  const cart = getCart();
  if(cart.cards.length !== 0 || cart.scarfs.length !== 0 || cart.packs.length !== 0) {
    if(window.location.pathname.includes('payok')) {
      clearCart();
      return;
    }
  }
  showCount(cart);
  const cartElem = document.getElementById('cart-elem');
  if (!cartElem) {
    return;
  }
  fillUserInfo();
  if(cart.cards.length !== 0 || cart.scarfs.length !== 0 || cart.packs.length !== 0) {
    const cartInfoEl = document.getElementById('cart-info');
    const cartPayEl = document.getElementById('cart-pay');
    const cartEmptyEl = document.getElementById('empty-cart');
    const cartClearEl = document.getElementById('clear-cart');
    cartEmptyEl.classList.add('hidden');
    cartClearEl.classList.remove('hidden');
    cartInfoEl.classList.remove('hidden');
    cartPayEl.classList.remove('hidden');
  }
  createCartList(cartElem, 'cards', cards, cart);
  createCartList(cartElem, 'scarfs', scarfs, cart);
  createCartList(cartElem, 'packs', packs, cart);
  showCount(cart);
}

function createCartList(baseElem, prop, dict, cart) {
  cart[prop].forEach((item, index) => {
    const clone = baseElem.cloneNode(true);
    clone.querySelector("[data-prev='name']").textContent = dict[item.index].itype +" " + dict[item.index].name;
    clone.querySelector("[data-prev='price-item']").textContent = dict[item.index].price;
    clone.querySelector("[data-prev='index']").textContent = index;
    clone.querySelector("[data-prev='prop']").textContent = prop;
    clone.querySelector("[data-prev='preview']").setAttribute('src', `img/${dict[item.index].preview}`);
    // clone.querySelector("[data-prev='count']").setAttribute('value', item.count);
    if(prop==='scarfs') {
      item.count = 1;
      clone.querySelector("[data-prev='count']").value =  1;
      clone.querySelector("[data-prev='count']").setAttribute('max',1);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      if(item.count >= 1 && item.count <= 10) {
        clone.querySelector("[data-prev='count']").value =  item.count;
      } else {
        clone.querySelector("[data-prev='count']").value = 1;
        item.count = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    clone.querySelector("[data-prev='price']").textContent = dict[item.index].price * item.count;
    baseElem.insertAdjacentElement('afterend', clone);
    clone.classList.remove('hidden');
  })
}

function addToCart(event, i) {
  event.stopPropagation();
  let propName = 'cards';
  if(window.location.pathname.includes('scarfs')) {
    propName = 'scarfs';
  }
  if(window.location.pathname.includes('packs')) {
    propName = 'packs';
  }
  const cart = getCart();
  const foundIndex = cart[propName].findIndex(item => item.index === i);
  if(foundIndex === -1) {
    cart[propName].unshift({
      index: i,
      count: 1,
    })
    localStorage.setItem('cart', JSON.stringify(cart));
    showCount(cart);
  }
  // event.target.textContent = 'Добавлено';
}

function removeFromCart(event) {
  event.stopPropagation();
  const elem = event?.currentTarget.parentNode.parentNode;
  const index = parseInt(elem.querySelector("[data-prev='index']").textContent);
  const propName = elem.querySelector("[data-prev='prop']").textContent;
  const cart = getCart();
  //const foundIndex = cart[propName].findIndex(item => item.index === i);
  cart[propName].splice(index,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  elem.remove();
  showCount(cart);
  if(cart.cards.length === 0 && cart.scarfs.length === 0) {
    const cartInfoEl = document.getElementById('cart-info');
    const cartPayEl = document.getElementById('cart-pay');
    const cartEmptyEl = document.getElementById('empty-cart');
    const cartClearEl = document.getElementById('clear-cart');
    cartEmptyEl.classList.remove('hidden');
    cartClearEl.classList.add('hidden');
    cartInfoEl.classList.add('hidden');
    cartPayEl.classList.add('hidden');
  }
}

function clearCart(event) {
  localStorage.setItem('cart', JSON.stringify({}));
  window.location.reload();
}

function countChange(event) {
  event.stopPropagation();
  const elem = event?.currentTarget.parentNode.parentNode;
  const index = parseInt(elem.querySelector("[data-prev='index']").textContent);
  const propName = elem.querySelector("[data-prev='prop']").textContent;
  const cart = getCart();
  try {
    const count = parseInt(elem.querySelector("[data-prev='count']").value);
    const priceItem = parseInt(elem.querySelector("[data-prev='price-item']").textContent);
    if(propName==='scarfs') {
      cart[propName][index].count = 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      elem.querySelector("[data-prev='count']").value = 1;
    } else {
      if(count>=1 && count <=10) {
        cart[propName][index].count = count;
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        cart[propName][index].count = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        elem.querySelector("[data-prev='count']").value = 1;
      }
    }
    elem.querySelector("[data-prev='price']").textContent = priceItem * cart[propName][index].count;
    showCount(cart);
  } catch {

  }
}

function getCart() {
  const jsonCart = localStorage.getItem('cart');
  let cart = {};
  if(jsonCart !== null) {
    try {
      cart = JSON.parse(jsonCart);
    } catch {
      localStorage.removeItem("cart");
    } 
  }
  cart.cards = cart.cards || [];
  cart.scarfs = cart.scarfs || [];
  cart.packs = cart.packs || [];
  return cart;
}

function togglePreview(evt) {
  const elem = evt?.currentTarget;
  const modal = document.getElementById('modal-preview');
  const modalBack = document.getElementById('modal-preview-backdrop');
  if(elem) {
    setText("[data-prev='itype']", elem, modal);
    setText("[data-prev='name']", elem, modal);
    setText("[data-prev='descr']", elem, modal);
    modal.querySelector("[data-prev='preview']").setAttribute('src',
      elem.querySelector("[data-prev='preview']").getAttribute('src'));
    
    modal.querySelector("[data-prev='link']").setAttribute('href',
      elem.querySelector("[data-prev='preview']").getAttribute('src'));

    if(window.location.pathname.includes('prints')) {
      
    } else {
      setText("[data-prev='count']", elem, modal);
      setText("[data-prev='format']", elem, modal);
      setText("[data-prev='source']", elem, modal);
      setText("[data-prev='price']", elem, modal);
      
      modal.querySelector("[data-prev='add-button']").setAttribute('onclick',
        elem.querySelector("button").getAttribute('onclick'));
      if(elem.querySelector("button").disabled === true) {
        // modal.querySelector("[data-prev='add-button']").classList.add('hidden');
        modal.querySelector("[data-prev='add-button']").textContent = "Нет в наличии";
        modal.querySelector("[data-prev='add-button']").disabled = true;
      } else {
        // modal.querySelector("[data-prev='add-button']").classList.remove('hidden');
        modal.querySelector("[data-prev='add-button']").textContent = "Добавить в корзину";
        modal.querySelector("[data-prev='add-button']").disabled = false;
      }
    }
    
  }
  modal.classList.toggle("hidden");
  modalBack.classList.toggle("hidden");
  modal.classList.toggle("flex");
  modalBack.classList.toggle("flex");
}

function showEmail(event) {
  window.location.assign('info.html');
  // const emailHolder = document.getElementById('email-holder');
  // if (!emailHolder) {
  //   return;
  // }
  // emailHolder.textContent = 'shamanri@ya.ru 8 987 654 32 10';
}

function showCount(cart) {
  if(cart.cards.length !== 0 || cart.scarfs.length !== 0 || cart.packs.length !== 0) {
    let count = 0;
    cart.cards?.forEach((item) => {
      count += item.count;
    });
    cart.scarfs?.forEach((item) => {
      count += item.count;
    });
    cart.packs?.forEach((item) => {
      count += item.count;
    });
    document.getElementById('cart-count').textContent = `(${count})`;
    if(window.location.pathname.includes('cart')) {
      const pochtaDelivPrice = 150;
      const pochtaBoxDelivPrice = 400;
      let boxFlag = false;
      const sdekDelivPrice = 0;
      let singleCardsCount = 0;
      let goodsPrice = 0;
      cart.cards?.forEach((item) => {
        goodsPrice += cards[item.index].price * item.count;
        if(cards[item.index].count === 1) {
          singleCardsCount += item.count;
        }
      });
      cart.scarfs?.forEach((item) => {
        goodsPrice += scarfs[item.index].price * item.count;
        boxFlag = true;
      });
      cart.packs?.forEach((item) => {
        goodsPrice += packs[item.index].price * item.count;
        boxFlag = true;
      });
      document.getElementById('goods-count').textContent = count;
      document.getElementById('goods-price').textContent = goodsPrice;

      let discount = 0;
      const multiplier = Math.trunc(singleCardsCount / 9 );
      if(multiplier === 0) {
        if(singleCardsCount >= 5 && singleCardsCount < 7) {
          discount += 50;
        } else if(singleCardsCount >= 7 && singleCardsCount < 9) {
          discount += 100;
        }
      } else {
        discount += 200 * multiplier;
        const remainder = singleCardsCount % 9;
        if(remainder >= 5 && remainder < 7) {
          discount += 50;
        } else if(remainder >= 7 && remainder < 9) {
          discount += 100;
        }
      }

      if(discount!==0) {
        document.getElementById('goods-discount').textContent = discount;
        document.getElementById('goods-discount-text').textContent = 'RUB';
      } else {
        document.getElementById('goods-discount').textContent = '-';
        document.getElementById('goods-discount-text').textContent = '';
      }

      let totalPrice = goodsPrice - discount;

      const packEl = document.getElementById('order-pack-gift');
      if(packEl.checked) {
        document.getElementById('pack-method').textContent='Фирменная коробка'
        document.getElementById('pack-price').textContent=giftPackPrice;
        document.getElementById('pack-price-text').textContent='RUB';
        totalPrice+=giftPackPrice;
        boxFlag = true;
      } else {
        document.getElementById('pack-method').textContent=''
        document.getElementById('pack-price').textContent = '-';
        document.getElementById('pack-price-text').textContent='';
      }

      const delivEl = document.getElementById('order-delivery-pochta');
      if(delivEl.checked) {
        document.getElementById('deliv-method').textContent='Почта'
        if(!boxFlag) {
          document.getElementById('deliv-price').textContent=pochtaDelivPrice;
          totalPrice+=pochtaDelivPrice;
        } else {
          document.getElementById('deliv-price').textContent=pochtaBoxDelivPrice;
          totalPrice+=pochtaBoxDelivPrice;
        }
        document.getElementById('deliv-price-text').textContent='RUB';
        // totalPrice+=pochtaDelivPrice;
      } else {
        document.getElementById('deliv-method').textContent='СДЭК'
        document.getElementById('deliv-price').textContent = '-';
        document.getElementById('deliv-price-text').textContent='';
      }

      document.getElementById('total-price').textContent = totalPrice;
      document.getElementById('ym-total-sum').value = totalPrice;
      // + разная доставка + всего
    }
  }
}

function delivChange(event){
  const cart = getCart();
  showCount(cart);
}

function packChange(event){
  const cart = getCart();
  showCount(cart);
}

function setText(selector, src, target) {
  target.querySelector(selector).textContent = src.querySelector(selector).textContent;
}

function createBanner() {
  const tmpBannerEl = document.getElementById('header-banner-tmp');
  const testBannerEl = document.getElementById('header-banner-test');
  const checkoutButtonEl = document.getElementById('checkout');
  if(checkoutButtonEl && tmpFlag) {
    checkoutButtonEl.disabled = true
  } 
  if(!testBannerEl) {
    return;
  }
  const tmpBannerText = 'По техническим причинам в течении 2-х недель заказ и оптала товара временно недоступны.';
  const testBannerText = 'Вы находитесь на тестовой версии сайта.';
  
  // if(!window.location.pathname.includes('shamanri.art')) {
  //   testBannerEl.insertAdjacentText('afterbegin', testBannerText);
  //   testBannerEl.classList.toggle('hidden');
  // }
  if(!tmpBannerEl) {
    return;
  }
  // Global
  if(tmpFlag) {
    tmpBannerEl.textContent = tmpBannerText;
    tmpBannerEl.classList.toggle('hidden');
  }
}

function checkout() {
  if(tmpFlag) {
    return;
  }
  const formEl = document.getElementById("checkout-form");
  // const sampleProduct = document.getElementById("ym-sample-product");
  if (!formEl) {
    return;
  }

  const userEmail = document.getElementById('order-email');
  const userPhone = document.getElementById('order-phone');
  if(userEmail.value === '' || userPhone.value === '') {
    return;
  }
  const userFio = document.getElementById('order-fio');
  const userAddress = document.getElementById('order-address');
  const userComment = document.getElementById('order-comment');
  formEl.querySelector("[name='cps_email']").value = userEmail.value;
  formEl.querySelector("[name='cps_phone']").value = userPhone.value;
  formEl.querySelector("[name='custName']").value = userFio.value;
  formEl.querySelector("[name='custAddr']").value = userAddress.value;
  formEl.querySelector("[name='orderDetails']").value = userComment.value;

  const detailsEl = formEl.querySelector("[name='orderDetails']");
  cartItems = document.querySelectorAll("[data-prev='container']");
  cartItems.forEach((el) => {
    if(el.querySelector("[data-prev='name']").textContent === "") {
      return;
    }
    detailsEl.value += '\n|' + el.querySelector("[data-prev='name']").textContent + ' '
      + el.querySelector("[data-prev='price-item']").textContent + ' '
      + el.querySelector("[data-prev='count']").value;
  });

  const userPack = document.getElementById('order-pack-gift');
  if(userPack.checked) {
    detailsEl.value += '\n|' + "Упаковка Фирменная коробка" + ' ' + giftPackPrice; 
  }
  const userDeliveryPochta = document.getElementById('order-delivery-pochta');
  if(userDeliveryPochta.checked) {
    detailsEl.value += '\n|' + "Доставка Поста России" + ' ' + document.getElementById('deliv-price').textContent;
  } else {
    detailsEl.value += '\n|' + "Доставка СДЭК";
  }

  const userDiscount = document.getElementById('goods-discount');
  if(userDiscount.textContent !== '-') {
    detailsEl.value += '\n|' + "Скидка" + ' ' + userDiscount.textContent;
  }
  
  if(document.getElementById('total-price').textContent === document.getElementById('ym-total-sum').value) {
    formEl.submit();
  }
}

function userInfoChange(event, key) {
  localStorage.setItem(key, event.target.value);
}

function fillUserInfo() {
  document.getElementById('order-email').value = localStorage.getItem('email') ?? '';
  document.getElementById('order-fio').value = localStorage.getItem('fio') ?? '';
  document.getElementById('order-phone').value = localStorage.getItem('phone') ?? '';
  document.getElementById('order-address').value = localStorage.getItem('address') ?? '';
  document.getElementById('order-comment').value = localStorage.getItem('comment') ?? '';
}