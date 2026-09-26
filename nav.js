// Mobile menu toggle, and closing the Statements dropdown when clicking elsewhere.
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        links.classList.toggle('is-open', !open);
      });
    }
    var group = document.querySelector('.nav-group');
    if (group) {
      document.addEventListener('click', function (e) {
        if (group.open && !group.contains(e.target)) group.open = false;
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && group.open) { group.open = false; group.querySelector('summary').focus(); }
      });
    }
  });
})();
