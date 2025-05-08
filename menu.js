document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const header = document.querySelector('header');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const navLinks = document.querySelectorAll('nav a');

    const isRegulaminPage = window.location.pathname.startsWith('/regulamin');

    // Obsługa hamburger menu
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            menu.classList.toggle('open');

            // Przełącz przezroczystość headera (tylko na stronie głównej)
            if (!isRegulaminPage) {
                if (menu.classList.contains('open')) {
                    header.classList.remove('transparent');
                } else if (window.scrollY === 0) {
                    header.classList.add('transparent');
                }
            }
        });
    }

    // Podświetl aktywny link w nawigacji
    const currentPage = window.location.pathname;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPage.includes(href)) {
            link.style.fontWeight = 'bold';
            link.style.color = 'red';
        } else {
            link.style.fontWeight = '';
            link.style.color = '';
        }
    });

    // Smooth scroll z uwzględnieniem wysokości headera
    if (scrollLinks.length > 0 && header) {
        const headerHeight = header.offsetHeight;
        const headerMarginBottom = parseInt(window.getComputedStyle(header).marginBottom, 10) || 0;
        const offset = headerHeight + headerMarginBottom;

        scrollLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});
