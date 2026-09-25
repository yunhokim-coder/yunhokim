// Overview-first collection pages (Research, Publications, Projects, Beyond Academia).
// The page opens on a list of summary cards; following a card's link (#id) shows only
// that entry's full column. Without JavaScript every entry simply stays visible.
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('collection-js');

  var baseTitle = document.title;
  var lastOpen = null;

  function findDetail(hash) {
    if (!hash) return null;
    var target = document.getElementById(hash);
    if (!target) return null;
    var detail = target.closest('[data-detail]');
    return detail ? { detail: detail, target: target } : null;
  }

  function route() {
    var hash = decodeURIComponent(window.location.hash.slice(1));
    var match = findDetail(hash);
    var details = document.querySelectorAll('[data-detail]');

    for (var i = 0; i < details.length; i++) {
      details[i].classList.toggle('is-open', !!match && details[i] === match.detail);
    }
    root.classList.toggle('is-detail', !!match);

    if (match) {
      lastOpen = match.detail.id;
      var heading = match.detail.querySelector('h2');
      document.title = (heading ? heading.textContent.trim() + ' | ' : '') + baseTitle;
      // Open at the top of the column unless the link points somewhere inside it.
      if (match.target === match.detail || match.target === heading) {
        window.scrollTo(0, 0);
      } else {
        match.target.scrollIntoView();
      }
      return;
    }

    document.title = baseTitle;
    if (lastOpen) {
      // Coming back from a column: return to that entry's card in the overview.
      var card = document.querySelector('[data-card-for="' + lastOpen + '"]');
      lastOpen = null;
      if (card) card.scrollIntoView({ block: 'center' });
    }
  }

  function addBackLinks() {
    var overview = document.getElementById('overview');
    if (!overview) return;
    var label = overview.getAttribute('data-back-label') || 'Back to overview';
    var details = document.querySelectorAll('[data-detail]');
    for (var i = 0; i < details.length; i++) {
      ['afterbegin', 'beforeend'].forEach(function (position) {
        var back = document.createElement('a');
        back.className = 'detail-back detail-back--' + (position === 'afterbegin' ? 'top' : 'bottom');
        back.href = '#overview';
        back.textContent = '← ' + label;
        details[i].insertAdjacentElement(position, back);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    addBackLinks();
    route();
  });
  window.addEventListener('hashchange', route);
  // The browser's own jump to the URL's #anchor happens after DOMContentLoaded; re-apply.
  window.addEventListener('load', route);
})();
