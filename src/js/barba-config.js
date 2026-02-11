document.addEventListener('DOMContentLoaded', function () {
    if (typeof barba === 'undefined') return;

    barba.init({
        preventRunning: true,
        transitions: [
            {
                name: 'panel-transition',

                leave: function (data) {
                    var panels = document.querySelectorAll('.transition-overlay .panel');

                    return new Promise(function (resolve) {
                        anime({
                            targets: panels,
                            scaleY: [0, 1],
                            duration: 500,
                            delay: anime.stagger(100),
                            easing: 'easeInOutCubic',
                            changeBegin: function () {
                                panels.forEach(function (p) {
                                    p.style.transformOrigin = 'bottom';
                                });
                            },
                            complete: function () {
                                data.current.container.style.opacity = 0;
                                resolve();
                            }
                        });
                    });
                },

                enter: function (data) {
                    var panels = document.querySelectorAll('.transition-overlay .panel');
                    window.scrollTo(0, 0);

                    data.next.container.style.perspective = '1200px';
                    data.next.container.style.transformStyle = 'preserve-3d';

                    return new Promise(function (resolve) {
                        anime({
                            targets: data.next.container,
                            rotateY: [5, 0],
                            opacity: [0, 1],
                            duration: 600,
                            easing: 'easeOutCubic',
                            begin: function () {
                                anime({
                                    targets: panels,
                                    scaleY: [1, 0],
                                    duration: 500,
                                    delay: anime.stagger(100),
                                    easing: 'easeInOutCubic',
                                    changeBegin: function () {
                                        panels.forEach(function (p) {
                                            p.style.transformOrigin = 'top';
                                        });
                                    }
                                });
                            },
                            complete: function () {
                                data.next.container.style.perspective = '';
                                data.next.container.style.transformStyle = '';
                                data.next.container.style.transform = '';
                                resolve();
                            }
                        });
                    });
                },

                after: function (data) {
                    var namespace = data.next.namespace;
                    var links = document.querySelectorAll('.nav-menu a');
                    links.forEach(function (link) {
                        link.classList.remove('active');
                        var href = link.getAttribute('href');
                        if (
                            (namespace === 'home' && href === 'index.html') ||
                            (namespace === 'about' && href === 'about.html') ||
                            (namespace === 'services' && href === 'services.html') ||
                            (namespace === 'contact' && href === 'contact.html')
                        ) {
                            link.classList.add('active');
                        }
                    });

                    var navbar = document.getElementById('main-nav');
                    if (namespace === 'home') {
                        navbar.classList.remove('scrolled');
                        window.addEventListener('scroll', function handler() {
                            if (window.scrollY > 80) {
                                navbar.classList.add('scrolled');
                            } else {
                                navbar.classList.remove('scrolled');
                            }
                        });
                    } else {
                        navbar.classList.add('scrolled');
                    }

                    if (typeof initLenis === 'function') {
                        initLenis();
                    }

                    initAnimations();
                    initCTAEffect();
                    initContactForm();

                    setTimeout(function () {
                        initHeroAnimations();
                    }, 100);
                }
            }
        ]
    });
});
