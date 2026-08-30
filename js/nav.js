(function () {
  'use strict';

  var subs = Array.prototype.slice.call(document.querySelectorAll('.has-submenu'));
  if (!subs.length) { return; }

  function closeAll() {
    subs.forEach(function (li) {
      li.classList.remove('is-open');
      var btn = li.querySelector('.submenu-toggle');
      if (btn) { btn.setAttribute('aria-expanded', 'false'); }
    });
  }

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
})();
