document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const menu = document.getElementById('menu');
    const isRegulaminPage = window.location.pathname.startsWith('/regulamin');

    document.body.classList.add(isRegulaminPage ? 'regulamin' : 'home');

    if (!header) return;

    if (isRegulaminPage) {
        header.classList.remove('transparent');
    } else if (window.scrollY === 0) {
        header.classList.add('transparent');
    }

    window.addEventListener('scroll', () => {

        if (menu && menu.classList.contains('open')) {
            header.classList.remove('transparent');
            return;
        }
        if (!isRegulaminPage) {
            if (window.scrollY === 0) {
                header.classList.add('transparent');
            } else {
                header.classList.remove('transparent');
            }
        }
    });

    if (menu) {
        const observer = new MutationObserver(() => {
            if (menu.classList.contains('open')) {
                header.classList.remove('transparent');
            } else if (!isRegulaminPage && window.scrollY === 0) {
                header.classList.add('transparent');
            }
        });
        observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const images = ["zdjecia/glowna.png", "zdjecia/produkt1.png", "zdjecia/produkt2.png"];
    let currentIndex = 0;

    const mainImage = document.getElementById("main-image");
    const leftArrow = document.querySelector(".arrow-left");
    const rightArrow = document.querySelector(".arrow-right");

    if (!mainImage) {
        console.error("Nie znaleziono elementu <img> z id 'main-image'.");
    }
    if (!leftArrow) {
        console.error("Nie znaleziono elementu strzałki z klasą 'arrow-left'.");
    }
    if (!rightArrow) {
        console.error("Nie znaleziono elementu strzałki z klasą 'arrow-right'.");
    }

    if (leftArrow && rightArrow && mainImage) {
        leftArrow.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            mainImage.src = images[currentIndex];
        });

        rightArrow.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            mainImage.src = images[currentIndex];
        });
    }
});