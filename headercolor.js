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
