(function () {
  'use strict';

  var subs = Array.prototype.slice.call(document.querySelectorAll('.has-submenu'));

  function closeAll() {
    subs.forEach(function (li) {
      li.classList.remove('is-open');
      var btn = li.querySelector('.submenu-toggle');
      if (btn) { btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  if (subs.length) {
    subs.forEach(function (li) {
      var btn = li.querySelector('.submenu-toggle');
      if (!btn) { return; }
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var willOpen = !li.classList.contains('is-open');
        closeAll();
        if (willOpen) {
          li.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function (e) {
      var insideOpenMenu = subs.some(function (li) { return li.contains(e.target); });
      if (!insideOpenMenu) { closeAll(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeAll(); }
    });
  }

  // Masthead sits transparent over the hero below it; once the page scrolls
  // past that hero, it needs a solid ground to stay readable over light
  // content, so it picks one up here instead of carrying it all the time.
  var masthead = document.querySelector('.masthead');
  if (masthead) {
    var THRESHOLD = 24;
    var update = function () {
      masthead.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }
})();
