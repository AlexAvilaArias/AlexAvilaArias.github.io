// A full repeat is always wider than its viewport; the second repeat covers the seam.
export function repeatCount(viewportWidth, patternWidth) {
  if (!(patternWidth > 0)) return 1;
  return Math.max(1, Math.ceil((viewportWidth + 1) / patternWidth));
}

function mountMarquees() {
  const clone = (node) => window.PortfolioLanguage?.clone(node) || node.cloneNode(true);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-marquee]').forEach((marquee) => {
    const track = marquee.querySelector('.marquee-track');
    const seed = clone(marquee.querySelector('.marquee-group'));
    let animation;
    let duration = 1;
    let observedWidth = 0;
    let resizeFrame = 0;

    const build = () => {
      const phase = animation ? (Number(animation.currentTime || 0) % duration) / duration : 0;
      animation?.cancel();
      const group = clone(seed);
      window.PortfolioLanguage?.translate(group);
      track.replaceChildren(group);
      const width = group.getBoundingClientRect().width;
      const repeats = repeatCount(marquee.clientWidth, width);
      for (let index = 1; index < repeats; index += 1) {
        [...group.children].slice(0, seed.children.length).forEach((child) => group.append(clone(child)));
      }
      const distance = group.getBoundingClientRect().width;
      if (!distance) return;
      track.append(clone(group));
      observedWidth = marquee.clientWidth;
      duration = (distance / Number(marquee.dataset.speed || 48)) * 1000;
      track.style.setProperty('--marquee-distance', `${-distance}px`);
      track.style.setProperty('--marquee-duration', `${duration}ms`);
      if (reducedMotion.matches) return;
      if (typeof track.animate === 'function') {
        animation = track.animate([
          { transform: 'translate3d(0,0,0)' },
          { transform: `translate3d(${-distance}px,0,0)` }
        ], { duration, iterations: Infinity, easing: 'linear' });
        animation.currentTime = phase * duration;
      } else track.classList.add('marquee-fallback');
    };

    const scheduleBuild = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(build);
    };
    build();
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => {
        if (marquee.clientWidth !== observedWidth) scheduleBuild();
      }).observe(marquee);
    } else window.addEventListener('resize', scheduleBuild, { passive: true });
    document.fonts?.ready.then(scheduleBuild);
    window.addEventListener('portfolio:languagechange', scheduleBuild);
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', scheduleBuild);
    else reducedMotion.addListener(scheduleBuild);
    document.addEventListener('visibilitychange', () => {
      if (!animation) return;
      if (document.hidden) animation.pause();
      else if (!reducedMotion.matches) animation.play();
    });
  });
}

export const gamePieces = [
  {
    image: new URL('assets/credential-attendee.webp', import.meta.url).href,
    alt: 'Pieza gráfica del XX Congreso IPA',
    client: 'Instituto Peruano de Arbitraje',
    options: ['Identificar a los asistentes', 'Presentar el sitio web', 'Anunciar una ponencia'],
    correct: 0,
    hint: 'Pista: acompaña a cada persona durante el congreso.',
    detail: 'Una credencial del XX Congreso IPA: la identidad del evento también se lleva puesta.'
  },
  {
    image: new URL('assets/speaker-intro.webp', import.meta.url).href,
    alt: 'Gráfica con un especialista del congreso IPA',
    client: 'Instituto Peruano de Arbitraje',
    options: ['Orientar hacia una sala', 'Presentar a un ponente', 'Acreditar la asistencia'],
    correct: 1,
    hint: 'Pista: esta pieza se publicaba junto con una reseña.',
    detail: 'Una de las presentaciones de los 91 ponentes: diseño y contenido para redes sociales.'
  },
  {
    image: new URL('assets/ipa-day-one-poster.jpg', import.meta.url).href,
    alt: 'Fotograma del video del XX Congreso IPA',
    client: 'Instituto Peruano de Arbitraje',
    options: ['Mostrar una tarifa', 'Ubicar a los participantes', 'Resumir una jornada en video'],
    correct: 2,
    hint: 'Pista: une momentos del evento, movimiento y ritmo.',
    detail: 'El resumen de la primera jornada: selección de momentos, edición y ritmo audiovisual.'
  },
  {
    image: new URL('assets/csc-web.webp', import.meta.url).href,
    alt: 'Vista de un proyecto digital para Carlos Soto y Asociados',
    client: 'Carlos Soto y Asociados',
    options: ['Presentar el estudio en la web', 'Proyectar un panel académico', 'Diseñar una credencial'],
    correct: 0,
    hint: 'Pista: aquí se puede navegar y conocer al estudio.',
    detail: 'Diseño web y actualización de contenidos para Carlos Soto y Asociados.'
  }
];

export function createPieceGame(pieces) {
  let index = 0;
  let score = 0;
  let attempts = 0;
  let solved = false;
  return {
    get state() { return { index, score, attempts, solved, done: index === pieces.length }; },
    answer(option) {
      if (index === pieces.length || solved || !Number.isInteger(option) || option < 0 || option >= pieces[index].options.length) return null;
      attempts += 1;
      solved = option === pieces[index].correct;
      if (solved && attempts === 1) score += 1;
      return { correct: solved, score };
    },
    next() {
      if (!solved) return false;
      index += 1;
      attempts = 0;
      solved = false;
      return true;
    }
  };
}

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

function mountPieceGame() {
  const language = window.PortfolioLanguage || {
    text(target, source, values = {}) { target.textContent = source.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match); },
    attribute(target, name, source) { target.setAttribute(name, source); }
  };
  const root = document.querySelector('[data-piece-game]');
  if (!root) return;
  const image = root.querySelector('[data-game-image]');
  const client = root.querySelector('[data-game-client]');
  const counter = root.querySelector('[data-game-counter]');
  const progress = root.querySelector('[data-game-progress]');
  const choices = root.querySelector('[data-game-choices]');
  const feedback = root.querySelector('[data-game-feedback]');
  const next = root.querySelector('[data-game-next]');
  const round = root.querySelector('[data-game-round]');
  const result = root.querySelector('[data-game-result]');
  const replay = root.querySelector('[data-game-replay]');
  let deck;
  let game;

  const renderRound = (focus = false) => {
    const { index } = game.state;
    const piece = deck[index];
    root.classList.remove('is-solved');
    image.src = piece.image;
    language.attribute(image, 'alt', piece.alt);
    language.text(client, piece.client);
    language.text(counter, 'Pieza {number} / {total}', { number: index + 1, total: deck.length });
    progress.value = index;
    feedback.textContent = '';
    feedback.removeAttribute('data-tone');
    next.hidden = true;
    choices.replaceChildren();
    shuffled(piece.options.map((label, option) => ({ label, option }))).forEach(({ label, option }) => {
      const button = document.createElement('button');
      button.type = 'button';
      language.text(button, label);
      button.addEventListener('click', () => {
        const answer = game.answer(option);
        if (!answer) return;
        if (!answer.correct) {
          button.disabled = true;
          button.classList.add('is-wrong');
          feedback.dataset.tone = 'hint';
          language.text(feedback, piece.hint);
          choices.querySelector('button:not(:disabled)')?.focus({ preventScroll: true });
          return;
        }
        button.classList.add('is-correct');
        choices.querySelectorAll('button').forEach((choice) => { choice.disabled = true; });
        feedback.dataset.tone = 'success';
        language.text(feedback, piece.detail);
        root.classList.add('is-solved');
        progress.value = index + 1;
        language.text(next.firstChild, index === deck.length - 1 ? 'Ver resultado ' : 'Siguiente pieza ');
        next.hidden = false;
        next.focus({ preventScroll: true });
      });
      choices.append(button);
    });
    if (focus) choices.querySelector('button')?.focus({ preventScroll: true });
  };

  const restart = (focus = false) => {
    deck = shuffled(gamePieces);
    game = createPieceGame(deck);
    round.hidden = false;
    result.hidden = true;
    root.classList.remove('is-finished');
    renderRound(focus);
  };
  next.addEventListener('click', () => {
    if (!game.next()) return;
    if (!game.state.done) return renderRound(true);
    round.hidden = true;
    result.hidden = false;
    root.classList.add('is-finished');
    root.querySelector('[data-game-score]').textContent = `${game.state.score} / ${deck.length}`;
    replay.focus({ preventScroll: true });
  });
  replay.addEventListener('click', () => restart(true));
  restart();
}

if (typeof document !== 'undefined') {
  mountMarquees();
  mountPieceGame();
}
