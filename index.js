// import {cards} from './cards.js';

window.addEventListener("load", () => init(), false);

function init() {
  createCopyright();
  createCart();
}

function openDropdown(event, dropdownID) {
  let element = event.target;
  // var popper = Popper.createPopper(element, document.getElementById(dropdownID), {
    //   placement: 'bottom-start'
  // });
  document.getElementById(dropdownID).classList.toggle("hidden");
}

function createCopyright() {
  const txt = `© 2020-${new Date().getFullYear()} Shamanri. Интернет-магазин авторских товаров.`
  const copyRightEl = document.getElementById('footer-copyright');
  copyRightEl.textContent = txt;
}

function createCart() {
  const cartElem = document.getElementById('cart-elem');
  if (!cartElem) {
    return;
  }
  const cart = getCart();
  if(cart.cards.length !== 0 || cart.cards.length !== 0) {
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
}

function createCartList(baseElem, prop, dict, cart) {
  cart[prop].forEach((item, index) => {
    const clone = baseElem.cloneNode(true);
    clone.querySelector("[data-prev='name']").textContent = dict[item.index].name;
    clone.querySelector("[data-prev='price']").textContent = dict[item.index].price;
    clone.querySelector("[data-prev='index']").textContent = index;
    clone.querySelector("[data-prev='prop']").textContent = prop;
    clone.querySelector("[data-prev='preview']").setAttribute('src', `img/${dict[item.index].preview}`);
    // clone.querySelector("[data-prev='count']").setAttribute('value', item.count);
    if(item.count >= 1 && item.count <= 10) {
      clone.querySelector("[data-prev='count']").value =  item.count;
    } else {
      clone.querySelector("[data-prev='count']").value = 1;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
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
  const cart = getCart();
  const foundIndex = cart[propName].findIndex(item => item.index === i);
  if(foundIndex === -1) {
    cart[propName].unshift({
      index: i,
      count: 1,
    })
    localStorage.setItem('cart', JSON.stringify(cart));
  }
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
  if(cart.cards.length === 0 && cart.cards.length === 0) {
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
    if(count>=1 && count <=10) {
      cart[propName][index].count = count;
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      elem.querySelector("[data-prev='count']").value = 1;
    }
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
    setText("[data-prev='count']", elem, modal);
    setText("[data-prev='format']", elem, modal);
    setText("[data-prev='source']", elem, modal);
    setText("[data-prev='price']", elem, modal);
    
    modal.querySelector("[data-prev='preview']").setAttribute('src',
      elem.querySelector("[data-prev='preview']").getAttribute('src'));
    
    modal.querySelector("[data-prev='link']").setAttribute('href',
      elem.querySelector("[data-prev='preview']").getAttribute('src'));
  }
  modal.classList.toggle("hidden");
  modalBack.classList.toggle("hidden");
  modal.classList.toggle("flex");
  modalBack.classList.toggle("flex");
}

function setText(selector, src, target) {
  target.querySelector(selector).textContent = src.querySelector(selector).textContent;
}