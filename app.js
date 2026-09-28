// Portable hosting: resolve assets and the thank-you page from this script's location.
const portfolioBaseUrl = new URL('./', document.currentScript.src);
const contactRedirect = document.querySelector('[data-contact-form] input[name="_next"]');
if (contactRedirect) {
  contactRedirect.value = new URL('gracias/index.html', portfolioBaseUrl).href;
  contactRedirect.disabled = false;
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pageType = document.body.dataset.page;
const embeddedCase = pageType === 'case' && new URLSearchParams(window.location.search).has('embedded');

if (embeddedCase) document.body.classList.add('is-embedded');

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Branded loader, including a replay control in the navigation.
const preloader = document.querySelector('[data-preloader]');
let loaderInterval = 0;
let loaderFallback = 0;

function finishPreloader(delay = 150) {
  if (!preloader) return;
  const counter = preloader.querySelector('[data-preloader-count]');
  const line = preloader.querySelector('[data-preloader-line]');
  window.clearInterval(loaderInterval);
  window.clearTimeout(loaderFallback);
  if (counter) counter.textContent = '100';
  if (line) line.style.width = '100%';
  window.setTimeout(() => {
    preloader.classList.add('is-done');
    preloader.classList.remove('is-replaying');
  }, delay);
  try { sessionStorage.setItem('aa-preloader-seen', 'true'); } catch (_) { /* Storage may be unavailable. */ }
}

function playPreloader(force = false) {
  if (!preloader || (reducedMotion && !force)) {
    finishPreloader(0);
    return;
  }
  window.clearInterval(loaderInterval);
  window.clearTimeout(loaderFallback);
  const counter = preloader.querySelector('[data-preloader-count]');
  const line = preloader.querySelector('[data-preloader-line]');
  preloader.classList.remove('is-done');
  void preloader.offsetWidth;
  preloader.classList.add('is-replaying');
  if (counter) counter.textContent = '00';
  if (line) line.style.width = '0%';
  let value = 0;
  loaderInterval = window.setInterval(() => {
    value = Math.min(94, value + Math.max(2, Math.round((96 - value) * .13)));
    if (counter) counter.textContent = String(value).padStart(2, '0');
    if (line) line.style.width = `${value}%`;
  }, 62);
  loaderFallback = window.setTimeout(() => finishPreloader(), force ? 1150 : 1700);
}

if (preloader) {
  let seen = false;
  try { seen = sessionStorage.getItem('aa-preloader-seen') === 'true'; } catch (_) { /* No-op. */ }
  if (seen || reducedMotion) finishPreloader(0);
  else {
    playPreloader();
    const complete = () => window.setTimeout(() => finishPreloader(), 720);
    if (document.readyState === 'complete') complete();
    else window.addEventListener('load', complete, { once: true });
  }
}

document.querySelector('[data-replay-loader]')?.addEventListener('click', () => playPreloader(true));

// Navigation personality and compact mobile menu.
const siteHeader = document.querySelector('[data-site-header]');
const updateHeader = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const menuToggle = document.querySelector('[data-menu-toggle]');
const navDock = menuToggle?.closest('.nav-dock');
menuToggle?.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(opening));
  navDock?.classList.toggle('is-open', opening);
});
navDock?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navDock.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

// The hero archive is randomized on each load and rebuilt as three seamless rows.
const heroCollage = document.querySelector('[data-hero-collage]');
if (heroCollage) {
  const images = [...heroCollage.querySelectorAll(':scope > img')];
  for (let index = images.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [images[index], images[randomIndex]] = [images[randomIndex], images[index]];
  }
  heroCollage.replaceChildren();
  const rows = [[], [], []];
  images.forEach((image, index) => rows[index % rows.length].push(image));
  rows.forEach((rowImages, rowIndex) => {
    const row = document.createElement('div');
    const track = document.createElement('div');
    const firstSet = document.createElement('div');
    const secondSet = document.createElement('div');
    row.className = 'hero-cover-row';
    track.className = 'hero-cover-track';
    firstSet.className = 'hero-cover-set';
    secondSet.className = 'hero-cover-set';
    rowImages.forEach((image) => {
      if (rowIndex === 0) image.removeAttribute('loading');
      firstSet.append(image);
      const clone = image.cloneNode(true);
      clone.loading = 'lazy';
      clone.setAttribute('aria-hidden', 'true');
      secondSet.append(clone);
    });
    track.append(firstSet, secondSet);
    row.append(track);
    heroCollage.append(row);
  });
}

// Entrance motion stays intentionally light.
const reveals = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
  reveals.forEach((element) => revealObserver.observe(element));
}

// Home navigation state.
const navLinks = [...document.querySelectorAll('body[data-page="home"] .main-nav a[href^="#"]')];
const navSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && navSections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-28% 0px -60% 0px', threshold: [0, .2, .45] });
  navSections.forEach((section) => navObserver.observe(section));
}

// Desktop tabs become adjacent, single-open accordions on small screens.
const capabilityTabs = [...document.querySelectorAll('[role="tab"][data-capability]')];
const capabilityPanels = capabilityTabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls'))).filter(Boolean);
const capabilityList = document.querySelector('.capability-list');
const capabilityDisplay = document.querySelector('.capability-display');
const capabilityMobile = window.matchMedia('(max-width: 760px)');
let activeCapability = 0;

function activateCapability(index, moveFocus = false) {
  if (!capabilityTabs.length) return;
  const nextIndex = index === -1 && capabilityMobile.matches ? -1 : Math.max(0, Math.min(index, capabilityTabs.length - 1));
  activeCapability = nextIndex;
  capabilityTabs.forEach((tab, tabIndex) => {
    const active = tabIndex === nextIndex;
    tab.classList.toggle('is-active', active);
    if (capabilityMobile.matches) {
      tab.removeAttribute('aria-selected');
      tab.setAttribute('aria-expanded', String(active));
      tab.tabIndex = 0;
    } else {
      tab.removeAttribute('aria-expanded');
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    }
  });
  capabilityPanels.forEach((panel, panelIndex) => {
    const active = panelIndex === nextIndex;
    panel.hidden = !active;
    panel.querySelectorAll('video').forEach((video) => {
      if (!active || reducedMotion) video.pause();
      else video.play().catch(() => {});
    });
  });
  if (moveFocus && nextIndex >= 0) capabilityTabs[nextIndex].focus();
}

function arrangeCapabilities() {
  if (!capabilityList || !capabilityDisplay) return;
  const mobile = capabilityMobile.matches;
  if (mobile) capabilityList.removeAttribute('role');
  else capabilityList.setAttribute('role', 'tablist');
  capabilityTabs.forEach((tab, index) => {
    const panel = capabilityPanels[index];
    tab.querySelector('i').textContent = mobile ? '+' : '↗';
    if (mobile) {
      tab.removeAttribute('role');
      panel.setAttribute('role', 'region');
      tab.after(panel);
    } else {
      tab.setAttribute('role', 'tab');
      panel.setAttribute('role', 'tabpanel');
      capabilityDisplay.append(panel);
    }
  });
  capabilityDisplay.hidden = mobile;
  activateCapability(activeCapability);
}

arrangeCapabilities();
if (capabilityMobile.addEventListener) capabilityMobile.addEventListener('change', arrangeCapabilities);
else capabilityMobile.addListener(arrangeCapabilities);

capabilityTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    const closing = capabilityMobile.matches && activeCapability === index;
    activateCapability(closing ? -1 : index);
    if (capabilityMobile.matches && !closing) {
      window.requestAnimationFrame(() => tab.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' }));
    }
  });
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % capabilityTabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + capabilityTabs.length) % capabilityTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = capabilityTabs.length - 1;
    if (capabilityMobile.matches) capabilityTabs[nextIndex].focus();
    else activateCapability(nextIndex, true);
  });
});

// Easter egg in the about section.
const personalToggle = document.querySelector('[data-personal-toggle]');
personalToggle?.addEventListener('click', () => {
  const target = document.getElementById(personalToggle.getAttribute('aria-controls'));
  const card = personalToggle.closest('[data-personal-card]');
  const opening = personalToggle.getAttribute('aria-expanded') !== 'true';
  personalToggle.setAttribute('aria-expanded', String(opening));
  personalToggle.firstChild.textContent = opening ? 'Cerrar modo personal ' : 'Abrir modo personal ';
  if (target) target.hidden = !opening;
  card?.classList.toggle('is-open', opening);
});

// Build the broad speaker selection only inside the case route.
const speakerGallery = document.querySelector('[data-speaker-gallery]');
if (speakerGallery) {
  const count = Number(speakerGallery.dataset.count || 0);
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < count; index += 1) {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const label = document.createElement('span');
    const itemNumber = String(index + 1).padStart(3, '0');
    const speakerNumber = String(Math.floor(index / 2) + 1).padStart(2, '0');
    const type = index % 2 === 0 ? 'Presentación' : 'Reseña';
    figure.className = 'speaker-card';
    image.src = new URL(`assets/speakers/speaker-${itemNumber}.webp`, portfolioBaseUrl).href;
    image.dataset.fullsrc = new URL(`assets/speakers/full/speaker-${itemNumber}.webp`, portfolioBaseUrl).href;
    image.alt = `${type} de ponente ${speakerNumber}`;
    image.width = 460;
    image.height = 460;
    image.loading = index < 8 ? 'eager' : 'lazy';
    image.decoding = 'async';
    image.dataset.lightbox = '';
    label.textContent = `${speakerNumber} · ${type}`;
    figure.append(image, label);
    fragment.append(figure);
  }
  speakerGallery.append(fragment);

  let galleryDirection = 1;
  let galleryPaused = false;
  let galleryVisible = false;
  let lastFrame = performance.now();
  const animateGallery = (time) => {
    if (!reducedMotion && galleryVisible && !galleryPaused && time - lastFrame > 16) {
      speakerGallery.scrollLeft += 1 * galleryDirection;
      if (speakerGallery.scrollLeft + speakerGallery.clientWidth >= speakerGallery.scrollWidth - 2) galleryDirection = -1;
      if (speakerGallery.scrollLeft <= 1) galleryDirection = 1;
      lastFrame = time;
    }
    window.requestAnimationFrame(animateGallery);
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => { galleryVisible = entries[0]?.isIntersecting ?? false; }, { threshold: .15 }).observe(speakerGallery);
  } else galleryVisible = true;
  speakerGallery.addEventListener('mouseenter', () => { galleryPaused = true; });
  speakerGallery.addEventListener('mouseleave', () => { galleryPaused = false; });
  speakerGallery.addEventListener('focusin', () => { galleryPaused = true; });
  speakerGallery.addEventListener('focusout', () => { galleryPaused = false; });
  document.querySelector('[data-speaker-prev]')?.addEventListener('click', () => speakerGallery.scrollBy({ left: -speakerGallery.clientWidth * .82, behavior: 'smooth' }));
  document.querySelector('[data-speaker-next]')?.addEventListener('click', () => speakerGallery.scrollBy({ left: speakerGallery.clientWidth * .82, behavior: 'smooth' }));
  window.requestAnimationFrame(animateGallery);
}

// Muted clips play only while visible.
const autoplayVideos = [...document.querySelectorAll('[data-autoplay-video]')];
if (reducedMotion) autoplayVideos.forEach((video) => video.pause());
else if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && !video.closest('[hidden]')) video.play().catch(() => {});
      else video.pause();
    });
  }, { threshold: .35 });
  autoplayVideos.forEach((video) => videoObserver.observe(video));
}

// Drag or Shift + wheel explores galleries without trapping the page's vertical scroll.
document.querySelectorAll('[data-strip]').forEach((strip) => {
  let dragStart = null;
  let dragMoved = false;
  strip.querySelectorAll('img').forEach((image) => { image.draggable = false; });
  strip.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    dragStart = { x: event.clientX, scroll: strip.scrollLeft };
    dragMoved = false;
  });
  window.addEventListener('pointermove', (event) => {
    if (!dragStart) return;
    const delta = event.clientX - dragStart.x;
    if (Math.abs(delta) > 5) dragMoved = true;
    if (!dragMoved) return;
    strip.classList.add('is-dragging');
    strip.scrollLeft = dragStart.scroll - delta;
    event.preventDefault();
  });
  const finishDrag = () => {
    dragStart = null;
    strip.classList.remove('is-dragging');
  };
  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', finishDrag);
  strip.addEventListener('click', (event) => {
    if (!dragMoved) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    dragMoved = false;
  }, true);
  strip.addEventListener('wheel', (event) => {
    if (!event.shiftKey) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const atStart = strip.scrollLeft <= 1;
    const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1;
    if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;
    event.preventDefault();
    strip.scrollLeft += event.deltaY;
  }, { passive: false });
});

// Featured case carousel: autoplay, drag, wheel and visible directional controls.
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  if (!track) return;
  let dragging = false;
  let startX = 0;
  let startScroll = 0;
  let paused = false;
  let autoDirection = 1;
  let lastWheel = 0;
  track.querySelectorAll('img').forEach((image) => { image.draggable = false; });
  const move = (direction) => {
    autoDirection = direction;
    const itemWidth = track.clientWidth;
    const max = track.scrollWidth - itemWidth;
    if (direction > 0 && track.scrollLeft >= max - 2) track.scrollTo({ left: 0, behavior: 'smooth' });
    else if (direction < 0 && track.scrollLeft <= 2) track.scrollTo({ left: max, behavior: 'smooth' });
    else track.scrollBy({ left: direction * itemWidth, behavior: 'smooth' });
  };
  previous?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
  track.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    if (performance.now() - lastWheel < 450) return;
    lastWheel = performance.now();
    move(event.deltaY > 0 ? 1 : -1);
  }, { passive: false });
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    dragging = true;
    paused = true;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
    track.setPointerCapture(event.pointerId);
  });
  track.addEventListener('pointermove', (event) => {
    if (dragging) track.scrollLeft = startScroll - (event.clientX - startX);
  });
  const stopDrag = () => {
    dragging = false;
    paused = carousel.matches(':hover') || carousel.contains(document.activeElement);
    track.classList.remove('is-dragging');
  };
  track.addEventListener('pointerup', stopDrag);
  track.addEventListener('pointercancel', stopDrag);
  carousel.addEventListener('mouseenter', () => { paused = true; });
  carousel.addEventListener('mouseleave', () => { if (!dragging) paused = false; });
  carousel.addEventListener('focusin', () => { paused = true; });
  carousel.addEventListener('focusout', () => { paused = carousel.matches(':hover'); });
  if (!reducedMotion) window.setInterval(() => { if (!paused && document.visibilityState === 'visible') move(autoDirection); }, 4300);
});

// Scroll-driven case progression.
const caseChapters = [...document.querySelectorAll('.case-chapter[data-case-number]')];
const caseLinks = [...document.querySelectorAll('[data-case-link]')];
const caseNavigation = document.querySelector('[data-case-navigation]');
if (caseNavigation) {
  const measureCaseNavigation = () => {
    const headerHeight = embeddedCase ? 0 : siteHeader?.getBoundingClientRect().height || 0;
    document.body.style.setProperty('--case-header-height', `${headerHeight}px`);
    document.body.style.setProperty('--case-navigation-height', `${caseNavigation.getBoundingClientRect().height}px`);
  };
  measureCaseNavigation();
  if ('ResizeObserver' in window) {
    const navigationObserver = new ResizeObserver(measureCaseNavigation);
    navigationObserver.observe(caseNavigation);
    if (siteHeader) navigationObserver.observe(siteHeader);
  } else {
    window.addEventListener('resize', measureCaseNavigation, { passive: true });
    window.addEventListener('scroll', measureCaseNavigation, { passive: true });
  }
}

function updateCaseChapter(chapter) {
  const index = caseChapters.indexOf(chapter);
  if (index < 0) return;
  const number = chapter.dataset.caseNumber || String(index + 1).padStart(2, '0');
  const name = chapter.dataset.caseName || '';
  const numberElement = document.querySelector('[data-step-number]');
  const nameElement = document.querySelector('[data-step-name]');
  const progress = document.querySelector('.case-progress i');
  if (numberElement) numberElement.textContent = number;
  if (nameElement) nameElement.textContent = name;
  if (progress) progress.style.width = `${((index + 1) / caseChapters.length) * 100}%`;
  caseLinks.forEach((link) => {
    if (link.dataset.caseLink === chapter.id) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
  });
  const mobileIndex = document.querySelector('.case-mobile-index');
  const mobileLink = mobileIndex?.querySelector('[aria-current="step"]');
  if (mobileIndex?.offsetWidth && mobileLink) {
    const left = mobileLink.offsetLeft - mobileIndex.offsetLeft;
    if (left < mobileIndex.scrollLeft || left + mobileLink.offsetWidth > mobileIndex.scrollLeft + mobileIndex.clientWidth) {
      mobileIndex.scrollTo({ left: Math.max(0, left - 16), behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }
  if (location.hash !== `#${chapter.id}`) history.replaceState(null, '', `#${chapter.id}`);
}

if (caseChapters.length) {
  const initial = caseChapters.find((chapter) => `#${chapter.id}` === location.hash) || caseChapters[0];
  updateCaseChapter(initial);
  if ('IntersectionObserver' in window) {
    const chapterObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) updateCaseChapter(active.target);
    }, { rootMargin: '-28% 0px -52% 0px', threshold: [0, .12, .28, .5] });
    caseChapters.forEach((chapter) => chapterObserver.observe(chapter));
  }
}

// Accessible image lightbox.
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

function openLightbox(image) {
  if (!lightbox || !lightboxImage || !lightboxCaption || !(image instanceof HTMLImageElement)) return;
  lightboxImage.src = image.dataset.fullsrc || image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
  lightbox.showModal();
  document.body.classList.add('is-modal');
}

document.querySelectorAll('img[data-lightbox]').forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `${image.alt}. Abrir vista ampliada.`);
  image.addEventListener('click', () => openLightbox(image));
  image.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openLightbox(image);
  });
});

function closeLightbox() {
  if (!lightbox?.open) return;
  lightbox.close();
  if (!document.querySelector('[data-case-window]')?.open) document.body.classList.remove('is-modal');
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
lightbox?.addEventListener('close', () => {
  if (!document.querySelector('[data-case-window]')?.open) document.body.classList.remove('is-modal');
});

// The case opens as an immersive window in the home page, while the route remains a direct-link fallback.
const caseWindow = document.querySelector('[data-case-window]');
const caseFrame = caseWindow?.querySelector('[data-case-frame]');
const caseWindowClose = caseWindow?.querySelector('[data-case-close]');

function closeCaseWindow() {
  if (!caseWindow?.open || caseWindow.classList.contains('is-closing')) return;
  caseWindow.classList.add('is-closing');
  window.setTimeout(() => {
    caseWindow.close();
    caseWindow.classList.remove('is-closing');
    document.body.classList.remove('is-modal');
  }, reducedMotion ? 0 : 410);
}

document.querySelectorAll('[data-case-open]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (!caseWindow || !caseFrame || typeof caseWindow.showModal !== 'function') return;
    event.preventDefault();
    const x = event.clientX || window.innerWidth * .72;
    const y = event.clientY || window.innerHeight * .46;
    caseWindow.style.setProperty('--case-x', `${x}px`);
    caseWindow.style.setProperty('--case-y', `${y}px`);
    caseWindow.classList.remove('is-closing');
    caseWindow.classList.toggle('is-loaded', caseFrame.dataset.loaded === 'true');
    if (!caseFrame.hasAttribute('src')) caseFrame.src = new URL('caso-ipa/index.html?embedded=1', portfolioBaseUrl).href;
    caseWindow.showModal();
    document.body.classList.add('is-modal');
  });
});

caseFrame?.addEventListener('load', () => {
  if (!caseFrame.hasAttribute('src')) return;
  caseFrame.dataset.loaded = 'true';
  caseWindow?.classList.add('is-loaded');
});
caseWindow?.querySelectorAll('[data-window-target]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  closeCaseWindow();
  window.setTimeout(() => document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }), reducedMotion ? 0 : 430);
}));
caseWindowClose?.addEventListener('click', closeCaseWindow);
caseWindow?.addEventListener('cancel', (event) => { event.preventDefault(); closeCaseWindow(); });
caseWindow?.addEventListener('click', (event) => { if (event.target === caseWindow) closeCaseWindow(); });
window.addEventListener('message', (event) => {
  if (!caseFrame || event.source !== caseFrame.contentWindow || event.origin !== location.origin) return;
  if (event.data?.type === 'case-close') closeCaseWindow();
  if (event.data?.type === 'case-contact') {
    closeCaseWindow();
    window.setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }), reducedMotion ? 0 : 430);
  }
});

if (embeddedCase) {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox?.open) window.parent.postMessage({ type: 'case-close' }, location.origin);
  });
  document.querySelectorAll('[data-case-contact]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    window.parent.postMessage({ type: 'case-contact' }, location.origin);
  }));
  document.querySelectorAll('a[data-home-link]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    window.parent.postMessage({ type: 'case-close' }, location.origin);
  }));
}

// WebMCP mirrors the two main exploration actions when supported.
(() => {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const reportRegistrationError = (error) => console.warn('WebMCP tool registration failed', error);

  if (capabilityTabs.length) {
    try {
      void Promise.resolve(context.registerTool({
        name: 'show_portfolio_capability',
        title: 'Mostrar capacidad del portafolio',
        description: 'Abre una capacidad profesional en la sección interactiva del portafolio y la lleva a la vista.',
        inputSchema: {
          type: 'object',
          properties: { capability: { type: 'string', enum: ['design', 'video', 'social', 'web', 'events'] } },
          required: ['capability'],
          additionalProperties: false
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
        execute(input) {
          const index = capabilityTabs.findIndex((tab) => tab.dataset.capability === input?.capability);
          if (index < 0) throw new Error('Capacidad no válida.');
          activateCapability(index);
          document.getElementById('capacidades')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
          return { capability: input.capability, visible: true };
        }
      }, { signal: lifecycle.signal })).catch(reportRegistrationError);
    } catch (error) { reportRegistrationError(error); }
  }

  if (caseChapters.length) {
    try {
      void Promise.resolve(context.registerTool({
        name: 'show_case_chapter',
        title: 'Mostrar capítulo del caso IPA',
        description: 'Navega a un capítulo específico del caso del XX Congreso IPA y actualiza el indicador visible.',
        inputSchema: {
          type: 'object',
          properties: { chapter: { type: 'string', enum: ['identidad', 'ponentes', 'salas', 'materiales', 'web', 'cobertura', 'lima', 'cusco'] } },
          required: ['chapter'],
          additionalProperties: false
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
        execute(input) {
          const chapter = document.getElementById(input?.chapter);
          if (!chapter?.matches('.case-chapter')) throw new Error('Capítulo no válido.');
          updateCaseChapter(chapter);
          chapter.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
          return { chapter: input.chapter, visible: true };
        }
      }, { signal: lifecycle.signal })).catch(reportRegistrationError);
    } catch (error) { reportRegistrationError(error); }
  }

  window.addEventListener('pagehide', () => lifecycle.abort(), { once: true });
})();
