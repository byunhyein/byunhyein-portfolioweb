const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initializeSlider = (selector, options) => {
  const element = document.querySelector(selector);

  if (!element || typeof window.Swiper !== "function") {
    return null;
  }

  return new window.Swiper(element, {
    a11y: {
      enabled: true,
      firstSlideMessage: "첫 번째 항목입니다.",
      lastSlideMessage: "마지막 항목입니다.",
      nextSlideMessage: "다음 항목",
      prevSlideMessage: "이전 항목",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
    },
    allowTouchMove: true,
    autoHeight: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    loop: false,
    pagination: {
      clickable: true,
      el: element.querySelector(".swiper-pagination"),
    },
    slidesPerView: 1,
    speed: prefersReducedMotion ? 0 : 450,
    watchOverflow: true,
    ...options,
  });
};

initializeSlider('[data-slider="portfolio"]', {
  navigation: {
    nextEl: '[data-slider="portfolio"] .swiper-button-next',
    prevEl: '[data-slider="portfolio"] .swiper-button-prev',
  },
});

initializeSlider('[data-slider="videos"]', {
  navigation: {
    nextEl: '[data-slider="videos"] .swiper-button-next',
  },
});

const setImageLoaded = (image) => {
  image.classList.remove("is-loading");
  image.classList.add("is-loaded");
};

const setImageError = (image) => {
  image.classList.remove("is-loading");
  image.classList.add("is-error");

  if (!image.alt) {
    image.hidden = true;
  }
};

document.querySelectorAll("img").forEach((image) => {
  image.classList.add("is-loading");

  image.addEventListener("load", () => setImageLoaded(image), { once: true });
  image.addEventListener("error", () => setImageError(image), { once: true });

  if (image.complete) {
    if (image.naturalWidth > 0) {
      setImageLoaded(image);
    } else {
      setImageError(image);
    }
  }
});
