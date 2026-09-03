const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initializeSmoothScroll = () => {
  if (prefersReducedMotion || typeof window.Lenis !== "function") {
    return null;
  }

  return new window.Lenis({
    allowNestedScroll: true,
    autoRaf: true,
    duration: .75,
    smoothWheel: true,
  });
};

const smoothScroller = initializeSmoothScroll();

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

const initializeHeroCopyInteraction = () => {
  const questionCopy = document.querySelector(".hero-copy--question");
  const questionWord = document.querySelector(".hero-word--question");
  const exclamationWord = document.querySelector(".hero-word--exclamation");
  const mainCopy = document.querySelector(".hero-copy--main");
  const mainLines = document.querySelectorAll(".hero-copy__line");
  const mainHighlight = document.querySelector(".hero-copy__highlight");

  if (!questionCopy || !questionWord || !exclamationWord || !mainCopy || !mainLines.length || !mainHighlight) {
    return;
  }

  const splitWord = (word) => {
    const text = word.textContent || "";
    word.replaceChildren(...[...text].map((character) => {
      const characterElement = document.createElement("span");
      characterElement.className = "hero-copy__char";
      characterElement.textContent = character;
      return characterElement;
    }));
  };

  splitWord(questionWord);
  splitWord(exclamationWord);

  const splitLooseText = () => {
    [...questionCopy.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      .forEach((textNode) => {
        const fragment = document.createDocumentFragment();

        [...(textNode.textContent || "")].forEach((character) => {
          const characterElement = document.createElement("span");
          characterElement.className = "hero-copy__char";
          characterElement.textContent = character === " " ? "\u00A0" : character;
          fragment.append(characterElement);
        });

        textNode.replaceWith(fragment);
      });
  };

  splitLooseText();

  const createPopParticles = (word) => ["pink", "lavender", "blue", "pink"].map((tone) => {
    const particle = document.createElement("span");
    particle.className = `hero-pop-particle hero-pop-particle--${tone}`;
    particle.setAttribute("aria-hidden", "true");
    word.append(particle);
    return particle;
  });

  const questionParticles = createPopParticles(questionWord);
  const exclamationParticles = createPopParticles(exclamationWord);
  const allPopParticles = [...questionParticles, ...exclamationParticles];
  const questionParticleTargets = [
    { left: "8%", top: "14%", x: -14, y: -12, scaleX: .9, scaleY: .9 },
    { left: "70%", top: "6%", x: 6, y: -15, scaleX: .88, scaleY: .88 },
    { left: "94%", top: "72%", x: 15, y: 6, scaleX: .8, scaleY: .8 },
    { left: "30%", top: "94%", x: -4, y: 13, scaleX: .78, scaleY: .78 },
  ];
  const exclamationParticleTargets = [
    { left: "10%", top: "16%", x: -13, y: -12, scaleX: .88, scaleY: .88 },
    { left: "76%", top: "8%", x: 8, y: -14, scaleX: .86, scaleY: .86 },
    { left: "92%", top: "73%", x: 14, y: 7, scaleX: .8, scaleY: .8 },
    { left: "28%", top: "94%", x: -5, y: 13, scaleX: .78, scaleY: .78 },
  ];

  if (prefersReducedMotion || typeof window.gsap !== "object") {
    return;
  }

  const characters = questionCopy.querySelectorAll(".hero-copy__char");
  document.documentElement.classList.add("has-hero-copy-animation");

  const playPop = (particles, targets) => {
    window.gsap.killTweensOf(particles);
    window.gsap.set(particles, {
      autoAlpha: 0,
      left: (index) => targets[index].left,
      top: (index) => targets[index].top,
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });
    window.gsap.timeline()
      .to(particles, {
        autoAlpha: (index) => index === 0 ? .9 : .76,
        x: (index) => targets[index].x,
        y: (index) => targets[index].y,
        scaleX: (index) => targets[index].scaleX,
        scaleY: (index) => targets[index].scaleY,
        duration: .12,
        stagger: .012,
        ease: "power2.out",
      })
      .to(particles, { autoAlpha: 0, scale: 0, duration: .18, stagger: .01, ease: "power2.in" }, ">-=.01");
  };

  window.gsap.set(questionCopy, { opacity: 0, y: 0 });
  window.gsap.set(mainCopy, { opacity: 0 });
  window.gsap.set(characters, { autoAlpha: 0, y: 18 });
  window.gsap.set(mainLines, { autoAlpha: 0, y: "110%" });
  window.gsap.set(mainHighlight, { scaleX: 0, transformOrigin: "left center" });
  window.gsap.set(allPopParticles, { autoAlpha: 0, x: 0, y: 0, xPercent: -50, yPercent: -50, scale: 0 });

  window.gsap.timeline({
    defaults: { ease: "power3.out" },
    repeat: -1,
  })
    .set(questionCopy, { opacity: 1 })
    .to(characters, { autoAlpha: 1, y: 0, duration: .28, stagger: .045 })
    .to(questionWord, {
      scaleX: 1.1,
      scaleY: .9,
      fontWeight: 700,
      duration: .1,
      ease: "power2.out",
      onStart: () => questionWord.classList.add("hero-word--is-emphasized"),
    })
    .to(questionWord, {
      scaleX: .96,
      scaleY: 1.04,
      duration: .14,
      ease: "elastic.out(1, .55)",
      onStart: () => playPop(questionParticles, questionParticleTargets),
    })
    .to(questionWord, { scaleX: 1.0625, scaleY: 1.0625, duration: .12 })
    .to(exclamationWord, {
      y: 9,
      scaleX: 1.1,
      scaleY: .82,
      fontWeight: 700,
      duration: .11,
      ease: "power2.in",
      onStart: () => exclamationWord.classList.add("hero-word--is-emphasized"),
    }, "<")
    .to(exclamationWord, {
      y: -5,
      scaleX: .94,
      scaleY: 1.12,
      duration: .17,
      ease: "back.out(3)",
      onStart: () => playPop(exclamationParticles, exclamationParticleTargets),
    })
    .to(exclamationWord, { y: 0, scaleX: 1.0625, scaleY: 1.0625, duration: .12, ease: "power2.out" })
    .to(questionCopy, { opacity: 0, y: -10, duration: .32 }, "+=2")
    .set(mainCopy, { opacity: 1 })
    .to(mainLines, { autoAlpha: 1, y: "0%", duration: .58, stagger: .14, ease: "power4.out" })
    .to(mainHighlight, { scaleX: 1, duration: .45, ease: "power3.out" })
    .to({}, { duration: 4.55 })
    .to(mainLines, { autoAlpha: 0, y: -18, duration: .3, stagger: .08, ease: "power2.in" })
    .set(questionCopy, { opacity: 0, y: 0 })
    .set(characters, { autoAlpha: 0, y: 18 })
    .set(mainCopy, { opacity: 0 })
    .set(mainLines, { autoAlpha: 0, y: "110%" })
    .set(mainHighlight, { scaleX: 0 })
    .set(allPopParticles, { autoAlpha: 0, x: 0, y: 0, scale: 0 });
};

initializeHeroCopyInteraction();

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

const initializeContentReveal = () => {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const revealGroups = [
    "#about > .section-title, #about > div > *",
    "#experience article",
    "#skills > .tag-list, #skills > .section-title, #skills > ul > li",
    "#portfolio > .tag, #portfolio > .section-title, #portfolio > p:not(.tag), #portfolio > .swiper",
    "#video-projects > .tag, #video-projects > p:not(.tag), #video-projects > .swiper",
    "#works > .tag, #works > .section-title, #works > p, #works > ul > li",
    "#contact .contact-card",
  ];

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.dataset.reveal = "visible";
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6%" });

  const revealItems = [];

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.dataset.reveal = "pending";
      element.style.setProperty("--reveal-delay", `${Math.min(index * 80, 480)}ms`);
      revealItems.push(element);
    });
  });

  // Let the browser paint the hidden starting state before revealing elements.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      revealItems.forEach((element) => observer.observe(element));
    });
  });
};

initializeContentReveal();

const initializeHeaderAnchorNavigation = () => {
  const header = document.querySelector(".site-header");

  document.querySelectorAll(".site-nav a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight = header?.getBoundingClientRect().height || 0;
      const destination = Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight);

      if (smoothScroller) {
        smoothScroller.scrollTo(destination, { duration: .75 });
      } else {
        window.scrollTo({
          top: destination,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }

      window.history.pushState(null, "", link.hash);
    });
  });
};

initializeHeaderAnchorNavigation();

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
