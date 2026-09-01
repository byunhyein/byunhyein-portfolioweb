const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initializeHeroMorphs = () => {
  if (typeof window.gsap !== "object" || typeof window.MorphSVGPlugin === "undefined") {
    return;
  }

  window.gsap.registerPlugin(window.MorphSVGPlugin);

  const questionPath = "M116 132C126 76 174 56 218 66C270 77 289 126 272 170C262 193 242 208 224 226C199 251 193 280 193 326";
  const exclamationPath = "M193 76C193 127 194 180 193 229C192 266 194 298 193 326";

  document.querySelectorAll(".hero-morph").forEach((container, index) => {
    const id = `hero-glass-${index}`;
    container.innerHTML = `
      <svg viewBox="0 0 390 470" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id="${id}-fill" gradientUnits="userSpaceOnUse" x1="105" y1="48" x2="275" y2="352">
            <stop offset="0" stop-color="#ffb58f" stop-opacity=".9"/>
            <stop offset=".3" stop-color="#ff9dcc" stop-opacity=".88"/>
            <stop offset=".62" stop-color="#c5a4ff" stop-opacity=".84"/>
            <stop offset="1" stop-color="#7d9fff" stop-opacity=".82"/>
          </linearGradient>
          <linearGradient id="${id}-rim" gradientUnits="userSpaceOnUse" x1="105" y1="48" x2="276" y2="354">
            <stop offset="0" stop-color="#fff" stop-opacity=".86"/>
            <stop offset=".25" stop-color="#ef80b6" stop-opacity=".66"/>
            <stop offset=".7" stop-color="#aa8ee9" stop-opacity=".62"/>
            <stop offset="1" stop-color="#6557c5" stop-opacity=".7"/>
          </linearGradient>
          <linearGradient id="${id}-volume" gradientUnits="userSpaceOnUse" x1="145" y1="0" x2="245" y2="0">
            <stop offset="0" stop-color="#fff" stop-opacity=".6"/>
            <stop offset=".45" stop-color="#fff" stop-opacity=".06"/>
            <stop offset="1" stop-color="#5546b9" stop-opacity=".32"/>
          </linearGradient>
          <radialGradient id="${id}-dot" gradientUnits="userSpaceOnUse" cx="174" cy="370" r="82">
            <stop offset="0" stop-color="#ffaad1"/>
            <stop offset=".58" stop-color="#c6a5ff"/>
            <stop offset="1" stop-color="#7c9eff"/>
          </radialGradient>
          <filter id="${id}-glow" x="-50%" y="-30%" width="200%" height="160%">
            <feGaussianBlur stdDeviation="13"/>
          </filter>
        </defs>
        <g class="hero-morph__body">
          <path class="hero-morph__path" d="${questionPath}" fill="none" stroke="#b88cff" stroke-width="91" stroke-linecap="round" opacity=".18" filter="url(#${id}-glow)"/>
          <path class="hero-morph__path" d="${questionPath}" fill="none" stroke="url(#${id}-rim)" stroke-width="84" stroke-linecap="round"/>
          <path class="hero-morph__path" d="${questionPath}" fill="none" stroke="url(#${id}-fill)" stroke-width="74" stroke-linecap="round" opacity=".9"/>
          <path class="hero-morph__path" d="${questionPath}" fill="none" stroke="url(#${id}-volume)" stroke-width="64" stroke-linecap="round" opacity=".6"/>
          <path class="hero-morph__path hero-morph__shine" d="${questionPath}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-dasharray="78 430" stroke-dashoffset="-12" opacity=".58"/>
        </g>
        <g class="hero-morph__dot">
          <circle cx="193" cy="404" r="39" fill="#b88cff" opacity=".16" filter="url(#${id}-glow)"/>
          <circle cx="193" cy="404" r="36" fill="url(#${id}-dot)" stroke="url(#${id}-rim)" stroke-width="5"/>
          <path d="M174 393C184 381 202 380 213 388" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".62"/>
        </g>
        <path class="hero-morph__question" d="${questionPath}" visibility="hidden"/>
        <path class="hero-morph__exclamation" d="${exclamationPath}" visibility="hidden"/>
      </svg>`;

    const paths = container.querySelectorAll(".hero-morph__path");
    const question = container.querySelector(".hero-morph__question");
    const exclamation = container.querySelector(".hero-morph__exclamation");
    const dot = container.querySelector(".hero-morph__dot");
    const shine = container.querySelector(".hero-morph__shine");
    const delay = Number(container.dataset.morphDelay || 0);

    const timeline = window.gsap.timeline({ repeat: -1, repeatDelay: .85, delay });
    timeline
      .to({}, { duration: .85 })
      .to(paths, {
        morphSVG: { shape: exclamation, map: "complexity" },
        duration: 1.35,
        ease: "power2.inOut",
      })
      .to(shine, { strokeDashoffset: -126, duration: 1.35, ease: "sine.inOut" }, "<")
      .to(dot, { scale: .96, transformOrigin: "193px 404px", duration: .675, yoyo: true, repeat: 1, ease: "sine.inOut" }, "<")
      .to({}, { duration: .9 })
      .to(paths, {
        morphSVG: { shape: question, map: "complexity" },
        duration: 1.35,
        ease: "power2.inOut",
      })
      .to(shine, { strokeDashoffset: -12, duration: 1.35, ease: "sine.inOut" }, "<")
      .to(dot, { scale: .96, transformOrigin: "193px 404px", duration: .675, yoyo: true, repeat: 1, ease: "sine.inOut" }, "<")
      .to({}, { duration: .9 });

    if (prefersReducedMotion) {
      timeline.pause(0);
    }
  });
};

initializeHeroMorphs();

const initializeSkillProgressAnimation = () => {
  const skillsSection = document.querySelector("#skills");

  if (!skillsSection || prefersReducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  skillsSection.dataset.skillBars = "ready";

  const replaySkillBars = () => {
    skillsSection.classList.remove("is-skill-bars-animating");
    void skillsSection.offsetWidth;
    skillsSection.classList.add("is-skill-bars-animating");
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        replaySkillBars();
      } else {
        skillsSection.classList.remove("is-skill-bars-animating");
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
};

initializeSkillProgressAnimation();

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
