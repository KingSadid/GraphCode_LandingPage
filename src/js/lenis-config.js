let lenisInstance = null;

function initLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: function (t) {
      return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    },
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false
  });

  var parallaxElements = document.querySelectorAll('.parallax');

  function raf(time) {
    lenisInstance.raf(time);

    if (parallaxElements.length > 0) {
      var scrollY = lenisInstance.scroll;
      parallaxElements.forEach(function (el) {
        var speed = parseFloat(el.dataset.speed) || 0.1;
        var rect = el.getBoundingClientRect();
        var offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
        el.style.transform = 'translateY(' + (-offset) + 'px)';
      });
    }

    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function getLenis() {
  return lenisInstance;
}

document.addEventListener('DOMContentLoaded', function () {
  initLenis();
});
