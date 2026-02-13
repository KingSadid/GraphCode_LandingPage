
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('poster-fullscreen-overlay');
    const fullImg = document.getElementById('full-poster-img');
    const posters = document.querySelectorAll('.poster-item');

    if (!overlay || !fullImg || posters.length === 0) return;

    posters.forEach(poster => {
        poster.addEventListener('mouseenter', () => {
            const img = poster.querySelector('img');
            if (img) {
                const src = img.getAttribute('src');
                fullImg.src = src;
                overlay.classList.add('active');
            }
        });

        poster.addEventListener('mouseleave', () => {
            overlay.classList.remove('active');
        });
    });
});
