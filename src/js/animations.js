function initAnimations() {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var animType = el.dataset.anime;

                if (animType === 'fade-in') {
                    anime({
                        targets: el,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 800,
                        easing: 'easeOutCubic',
                        begin: function () {
                            el.style.opacity = '';
                            el.style.transform = '';
                        }
                    });
                }

                if (animType === 'stagger') {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                    var children = Array.from(el.children);
                    children.forEach(function (child) {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(50px) scale(0.95)';
                    });
                    anime({
                        targets: children,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        scale: [0.95, 1],
                        duration: 700,
                        delay: anime.stagger(120),
                        easing: 'easeOutCubic'
                    });
                }

                el.classList.add('animated');
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px'
    });

    document.querySelectorAll('[data-anime]').forEach(function (el) {
        if (!el.classList.contains('animated')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            observer.observe(el);
        }
    });
}

function initNavbar() {
    var navbar = document.getElementById('main-nav');
    if (!navbar) return;

    var isHome = document.querySelector('[data-barba-namespace="home"]');

    if (isHome) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }
}

function initCTAEffect() {
    document.querySelectorAll('.btn-cta').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var rect = btn.getBoundingClientRect();
            var ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            btn.appendChild(ripple);
            setTimeout(function () {
                ripple.remove();
            }, 700);
        });
    });
}

function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('.btn-submit');
        var originalText = btn.innerHTML;

        btn.innerHTML = '¡Mensaje Enviado! ✓';
        btn.style.background = 'linear-gradient(135deg, #00BCD4, #0097A7)';

        setTimeout(function () {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

function initHeroAnimations() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var elements = hero.querySelectorAll('[data-anime="fade-in"]');
    anime({
        targets: elements,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(150, { start: 300 }),
        duration: 900,
        easing: 'easeOutCubic'
    });
}

function initAll() {
    initNavbar();
    initCTAEffect();
    initContactForm();

    setTimeout(function () {
        initHeroAnimations();
        initAnimations();
    }, 100);
}

document.addEventListener('DOMContentLoaded', initAll);
