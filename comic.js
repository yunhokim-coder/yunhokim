// Full-screen viewer for the grit webtoon: swipe or scroll the track, or use the arrow buttons/keys.
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var dialog = document.querySelector('.comic-viewer');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    var track = dialog.querySelector('.comic-track');
    var slides = track.querySelectorAll('.comic-slide');
    var count = dialog.querySelector('.comic-count');

    function current() {
      return Math.round(track.scrollLeft / track.clientWidth);
    }
    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    }
    track.addEventListener('scroll', function () {
      count.textContent = (current() + 1) + ' / ' + slides.length;
    });

    document.querySelectorAll('[data-comic-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        dialog.showModal();
        track.scrollLeft = Number(btn.getAttribute('data-comic-open')) * track.clientWidth;
        track.focus();
      });
    });
    dialog.querySelector('.comic-prev').addEventListener('click', function () { go(current() - 1); });
    dialog.querySelector('.comic-next').addEventListener('click', function () { go(current() + 1); });
    dialog.querySelector('.comic-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
    });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  });
})();
