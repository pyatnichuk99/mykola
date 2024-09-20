"use strict"

var _functions = {};



document.addEventListener("DOMContentLoaded", () => {

 



  // rellax
  setTimeout(function () {
    if (window.screen.width > 991) {
      let rellax = new Rellax('.rellax', {});
    }
  }, 0);

  let $body = document.querySelector('body');
  setTimeout(function () {
    $body.classList.add('loaded');
  }, 500);


  // music

  let bannerMusic = document.querySelector('.banner-music');
  // bannerMusic.querySelector('audio').play();
  let audio =  bannerMusic.querySelector('audio');
  // let audio = new Audio("./audio/audio.mp3");
  bannerMusic.addEventListener('click', ()=>{
    if (audio.paused) {
      audio.play();
      bannerMusic.classList.toggle('paused');
    }
    else{
      audio.pause();
      bannerMusic.classList.toggle('paused');
    }
  });

  let stepsBtn = document.querySelectorAll('.btn-step');

  stepsBtn.forEach(stepBtn => {
    stepBtn.addEventListener('click',(event) => {
      event.preventDefault();
      let stepItem = event.target.getAttribute("data-step");
      let banners = document.querySelectorAll('.banner-home__content');
      for (let index = 0; index < banners.length; index++) {
        const banner = banners[index];
        if(stepItem == banner.getAttribute("data-step")){
          banner.classList.toggle('hide');
          banner.classList.toggle('open');
          let next = banners[index + 1];
          next.classList.toggle('open');
        }
      }
    })

  });



  var isTouchScreen =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i);
  if (isTouchScreen) document.documentElement.classList.add("touch-screen");


  _functions.getSwOptions = function (swiper) {
    var options = JSON.parse(swiper.dataset.options);
    options = !options || typeof options !== "object" ? {} : options;
    let p = swiper.closest(".swiper-entry"),
      slidesLength = swiper.querySelectorAll(
        ".swiper-wrapper>.swiper-slide"
      ).length;
    if (!options.pagination)
      options.pagination = {
        el: p.querySelector(".swiper-pagination"),
        clickable: true,
      };
    if (!options.navigation)
      options.navigation = {
        nextEl: p.querySelector(".swiper-button-next"),
        prevEl: p.querySelector(".swiper-button-prev"),
      };
    options.preloadImages = false;
    options.lazy = { loadPrevNext: true };
    options.observer = true;
    options.observeParents = true;
    options.loop = false;
    options.watchOverflow = true;
    if (!options.speed) options.speed = 500;
    options.roundLengths = false;
    if (!options.centerInsufficientSlides)
      options.centerInsufficientSlides = false;
    if (slidesLength <= 1) {
      options.loop = false;
    }
    if (isTouchScreen) options.direction = "horizontal";

    if (options.customPagination) {
      options.pagination.renderBullet = function (index, className) {
        var slide = swiper.find(".swiper-slide").eq(index);
        if (slide.dataset.video) className += " video";
        return (
          '<span class="' +
          className +
          ' custom" style="background-image: url(' +
          slide.dataset.preview +
          ')"><span></span></span>'
        );
      };
    }

    if (options.progressbar) {
      options.pagination.type = "progressbar";
    }

    if (options.customNumber) {
      options.pagination.renderBullet = function (index, className) {
        return '<span class="' + className + '">0' + (index + 1) + "</span>";
      };
    }
    return options;
  };

  _functions.initSwiper = function (el) {
    let options = _functions.getSwOptions(el);
    let swiper;
    if (options.destroy) {
      const breakpoint = window.matchMedia(options.destroy);
      const breakpointChecker = function () {
        if (breakpoint.matches === true) {
          if (swiper !== undefined) {
            swiper.destroy(true, true);
          }
          return;
        } else if (breakpoint.matches === false && swiper.destroyed) {
          swiper = new Swiper(el, options);
        }
      };
      breakpointChecker();
      breakpoint.addEventListener("change", breakpointChecker);
    } else {
      swiper = new Swiper(el, options);
    }
  };

  if (document.querySelectorAll(".swiper-entry .swiper-container").length)
    document.querySelectorAll(".swiper-entry .swiper-container")
      .forEach((element) => {
        _functions.initSwiper(element);
      });

  if (document.querySelectorAll(".swiper-thumbs").length)
    document.querySelectorAll(".swiper-thumbs").forEach((swTh) => {
      let top = swTh.querySelector(
        ".swiper-container.swiper-thumbs-top"
      ).swiper,
        bottom = swTh.querySelector(
          ".swiper-container.swiper-thumbs-bottom"
        ).swiper;
      top.thumbs.swiper = bottom;
      top.thumbs.init();
      top.thumbs.update();
  });




  function scrollAnime() {

    var reveals = document.querySelectorAll(".animate-item");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 20;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("animated");
      }
    }
  }
  window.addEventListener('scroll', function () {
    scrollAnime();
  });
  


});








