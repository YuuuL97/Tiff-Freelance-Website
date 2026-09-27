/* Progressive enhancement for the landing page's horizontal card rows. */
(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-carousel]').forEach((section) => {
    const track = section.querySelector('.card-track');
    const controls = section.querySelector('.carousel-controls');
    if (!track || !controls) return;
    const previous = controls.querySelector('[data-direction="previous"]');
    const next = controls.querySelector('[data-direction="next"]');
    const update = () => {
      const maximum = track.scrollWidth - track.clientWidth;
      controls.hidden = maximum < 2;
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maximum - 2;
    };
    controls.addEventListener('click', (event) => {
      const button = event.target.closest('[data-direction]');
      if (!button) return;
      const firstCard = track.firstElementChild;
      const distance = firstCard.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
      track.scrollBy({ left: button.dataset.direction === 'next' ? distance : -distance, behavior: motion.matches ? 'instant' : 'smooth' });
    });
    track.addEventListener('scroll', update, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
    else window.addEventListener('resize', update, { passive: true });
    update();
  });
})();
