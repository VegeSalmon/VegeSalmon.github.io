document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const menu = document.getElementById('menu');
    const isRegulaminPage = window.location.pathname.startsWith('/regulamin');

    // Ustaw klasę strony
    document.body.classList.add(isRegulaminPage ? 'regulamin' : 'home');

    if (!header) return;

    // Na stronie regulaminu nagłówek ma być zawsze nieprzezroczysty
    if (isRegulaminPage) {
        header.classList.remove('transparent');
    } else if (window.scrollY === 0) {
        header.classList.add('transparent');
    }

    // Zarządzaj przezroczystością przy scrollowaniu (tylko na stronie głównej)
    window.addEventListener('scroll', () => {
        if (!isRegulaminPage && (!menu || !menu.classList.contains('open'))) {
            if (window.scrollY === 0) {
                header.classList.add('transparent');
            } else {
                header.classList.remove('transparent');
            }
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const images = ["zdjecia/glowna.png", "zdjecia/produkt1.png", "zdjecia/produkt2.png"];
    let currentIndex = 0;

    const mainImage = document.getElementById("main-image");
    const leftArrow = document.querySelector(".arrow-left");
    const rightArrow = document.querySelector(".arrow-right");

    // Debugowanie
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