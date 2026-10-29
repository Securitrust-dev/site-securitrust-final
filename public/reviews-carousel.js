// Carrousel des avis clients (page d'accueil). Défilement par flèches, points, swipe et
// clavier ; défilement automatique toutes les 7 s, en pause au survol, au focus ou si
// l'utilisateur a demandé moins d'animations. Les contrôles n'apparaissent que si les
// avis dépassent la largeur visible.
(function () {
  var root = document.querySelector('[data-reviews]');
  if (!root) return;
  var track = root.querySelector('.reviews-track');
  var nav = root.querySelector('.reviews-nav');
  var dotsBox = root.querySelector('.reviews-dots');
  var cards = Array.prototype.slice.call(track.querySelectorAll('.review'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timer = null, paused = false;

  function step() { return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth; }
  function index() { return Math.round(track.scrollLeft / step()); }
  function maxIndex() { return Math.max(0, Math.ceil((track.scrollWidth - track.clientWidth) / step())); }
  function go(i) {
    var last = maxIndex();
    if (i > last) i = 0;
    if (i < 0) i = last;
    track.scrollTo({ left: i * step(), behavior: reduce ? 'auto' : 'smooth' });
  }
  function renderDots() {
    var n = maxIndex() + 1;
    dotsBox.innerHTML = '';
    for (var i = 0; i < n; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Aller à l’avis ' + (i + 1));
      b.addEventListener('click', (function (k) { return function () { go(k); }; })(i));
      dotsBox.appendChild(b);
    }
    sync();
  }
  function sync() {
    var cur = index();
    Array.prototype.forEach.call(dotsBox.children, function (d, i) { d.setAttribute('aria-current', i === cur ? 'true' : 'false'); });
  }
  function layout() {
    var scrollable = track.scrollWidth > track.clientWidth + 4;
    nav.hidden = !scrollable;
    dotsBox.hidden = !scrollable;
    track.classList.toggle('is-static', !scrollable);
    if (scrollable) renderDots();
    restart();
  }
  function restart() {
    clearInterval(timer);
    if (reduce || nav.hidden) return;
    timer = setInterval(function () { if (!paused) go(index() + 1); }, 7000);
  }

  nav.addEventListener('click', function (e) {
    var b = e.target.closest('.reviews-btn');
    if (b) { go(index() + Number(b.getAttribute('data-dir'))); restart(); }
  });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
  });
  track.addEventListener('scroll', function () { window.requestAnimationFrame(sync); }, { passive: true });
  ['mouseenter', 'focusin', 'touchstart'].forEach(function (ev) { root.addEventListener(ev, function () { paused = true; }, { passive: true }); });
  ['mouseleave', 'focusout'].forEach(function (ev) { root.addEventListener(ev, function () { paused = false; }); });
  window.addEventListener('resize', layout);
  layout();
})();
