import "./import/modules";

const headerMenu = document.querySelector('.header__menu');
const burger = document.querySelector('.header__burger');
const page = document.querySelector('.page')

function toggleClass(...args) {
  for (const target of args) {
    target.classList.toggle('active');
  }
};

burger.addEventListener('click', function () {
  toggleClass(headerMenu, burger, page);
})


// scroll for block
const menuLinks = document.querySelectorAll('.menu__link');

for (const link of menuLinks) {
  if (page.classList.contains('active')) {
    link.addEventListener('click', function (e) {
      toggleClass(headerMenu, burger, page);
    })
  }
}

// Slider
// import Swiper, { Autoplay } from 'swiper';
import SwiperCore, { Navigation, Autoplay } from 'swiper/core';

// configure Swiper to use modules
SwiperCore.use([Navigation, Autoplay]);

const deliverySlider = document.querySelector('.delivery-slider');
const deliverySlides = document.querySelectorAll('.delivery-slider__slide');

if (deliverySlider) {
  new SwiperCore(deliverySlider, {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 26,
    speed: 800,
    watchOverflow: true,
    speed: 2000,
    loop: deliverySlides?.length > 9,
    autoplay: {
      delay: 0,
    },
    // loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,

    breakpoints: {
      // when window width is >= 400px
      400: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      // when window width is >= 578px
      578: {
        slidesPerView: 6,
        spaceBetween: 40,
        loop: true,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 9,
        spaceBetween: 26
      }
    }
  })
};

// counter
const counterNum = document.querySelector('.counter__num');
const counterPlus = document.querySelector('.counter__button--plus');
const counterMinus = document.querySelector('.counter__button--minus');
const counterButtonArr = [counterPlus, counterMinus];

function count(target) {
  if (target === counterButtonArr[0]) {
    counterNum.innerText = +counterNum.innerText + 1;
    return;
  }

  if (counterNum.innerText == 0) {
    return;
  }

  counterNum.innerText = +counterNum.innerText - 1;
};

try {
  for (const counterButton of counterButtonArr) {
    counterButton.addEventListener('click', function (e) {
      count(e.target);
    })
  }
} catch { }

// select 
const selects = (selectsList) => {
  const selects = document.querySelectorAll(selectsList);

  const closeAllSelect = () => {
    for (const select of selects) {
      if (select.classList.contains('select--show')) {
        select.classList.remove('select--show');
      };
    }
  };

  const showSelect = (select, index) => {
    closeAllSelect();

    selects[index].classList.add('select--show');
  };

  const closeSelect = (select, index) => {
    // select.classList.remove('select--show');
    selects[index].classList.remove('select--show');
  }

  const changeValue = function (index, btnHeaderValue) {
    selects[index].addEventListener('click', event => {
      const target = event.target;

      if (target.classList.contains('select__item')) {

        selects[index].querySelector('.select__item--active').classList.remove('select__item--active')

        target.classList.add('select__item--active');
        const targetValue = target.textContent;
        btnHeaderValue.parentElement.querySelector('.input--select').value = targetValue.trim();
        closeSelect(btnHeaderValue, index);
      }
    });
  }


  selects.forEach((select, index) => {
    select.addEventListener('click', function (e) {
      if (!select.classList.contains('select--show')) {
        showSelect(select, index);
        changeValue(index, this);
      } else {
        closeSelect(select, index);

        flag = false;
      }

    })
  });
}

selects('.select');