document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const header = document.querySelector('header');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const navLinks = document.querySelectorAll('nav a');


    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            menu.classList.toggle('open');

        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                menu.classList.remove('open');
            });
        });

    }

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

    navLinks.forEach(link => {
        const linkUrl = new URL(link.href, window.location.origin);
        const currentUrl = window.location.origin + window.location.pathname;
        if (linkUrl.pathname === window.location.pathname) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

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

    function updateNavMargin() {
        const nav = document.getElementById('menu');
        const header = document.querySelector('header');
        if (!nav || !header) return;

        if (window.innerWidth <= 500) {
            const headerHeight = header.offsetHeight;
            nav.style.marginTop = headerHeight + 'px';
        } else {
            nav.style.marginTop = '';
        }
    }

    window.addEventListener('resize', updateNavMargin);

    updateNavMargin();

    window.addEventListener('load', updateNavMargin);

    function setupFooterAccordion() {

        const columns = document.querySelectorAll('.footer-column, .footer-image');
        columns.forEach(col => {
            const h3 = col.querySelector('h3');
            if (!h3) return;

            function toggleAccordion(e) {
                if (window.innerWidth > 900) return;

                columns.forEach(c => {
                    if (c !== col) c.classList.remove('active');
                });
                col.classList.toggle('active');
                e.preventDefault();
            }
            h3.addEventListener('mousedown', toggleAccordion);
            h3.addEventListener('touchstart', toggleAccordion);
        });

        function closeAllOnResize() {
            if (window.innerWidth <= 900) {
                columns.forEach(col => col.classList.remove('active'));
            } else {
                columns.forEach(col => col.classList.add('active'));
            }
        }
        window.addEventListener('resize', closeAllOnResize);
        closeAllOnResize();
    }
    setupFooterAccordion();

    const pagination = document.querySelector('.pagination');
    const main = document.querySelector('main.main-container');
    const heading = document.querySelector('.centered-title');
    if (
        pagination &&
        main &&
        heading &&
        heading.textContent.trim().toLowerCase().includes('aktualności')
    ) {

        const totalPages = 13;
        let currentPage = 1;

        function renderPagination() {
            const width = window.innerWidth;
            let pagesToShow = [];

            if (width <= 500) {

                if (currentPage > 1) pagesToShow.push(currentPage - 1);
                pagesToShow.push(currentPage);
                if (currentPage < totalPages) pagesToShow.push(currentPage + 1);
            } else if (width <= 900) {

                for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                    pagesToShow.push(i);
                }
            } else {

                for (let i = Math.max(1, currentPage - 3); i <= Math.min(totalPages, currentPage + 3); i++) {
                    pagesToShow.push(i);
                }
            }

            let html = '';

            html += `<a href="#" class="arrow" data-page="${Math.max(1, currentPage - 1)}"><svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.000527213 9.01872C0.00158197 9.04493 0.00474436 9.06579 0.00658876 9.0797L0.00790865 9.08906L0.00869447 9.09708L0.0102814 9.10484C0.030835 9.2153 0.0843285 9.31639 0.163384 9.39449L8.48317 17.8387C8.58831 17.946 8.72956 18.0003 8.86765 18C9.00547 18.0003 9.14618 17.946 9.25159 17.839C9.35673 17.7317 9.41101 17.5892 9.41075 17.449C9.41101 17.3089 9.35752 17.1666 9.25211 17.0596L1.85359 9.55095L23.4593 9.55095C23.757 9.54908 23.9987 9.30489 24 9.00267C24 8.69805 23.7589 8.44958 23.4593 8.44878L1.85095 8.44878L9.25185 0.94089C9.35699 0.833642 9.41075 0.69109 9.41049 0.551213C9.41075 0.411069 9.35725 0.268519 9.25185 0.161538L9.2508 0.160468C9.14539 0.0542895 9.0052 -0.000266432 8.86738 5.84413e-07C8.7293 5.72341e-07 8.5891 0.0540224 8.4837 0.160468L8.4829 0.161273L0.154424 8.61219C0.0563954 8.71382 0.000786628 8.85049 0.000260187 8.99304L7.87226e-07 8.99518L7.87039e-07 8.99732L7.86758e-07 9.00053L7.8601e-07 9.00909L0.000527213 9.01872Z" fill="black"/></svg></a>`;

            if (pagesToShow[0] > 1) {
                html += `<a href="#" class="page" data-page="1">01</a>`;
                if (pagesToShow[0] > 2) html += `<span class="dots">...</span>`;
            }

            pagesToShow.forEach(page => {
                html += `<a href="#" class="page${page === currentPage ? ' current' : ''}" data-page="${page}">${String(page).padStart(2, '0')}</a>`;
            });

            if (pagesToShow[pagesToShow.length - 1] < totalPages) {
                if (pagesToShow[pagesToShow.length - 1] < totalPages - 1) html += `<span class="dots">...</span>`;
                html += `<a href="#" class="page" data-page="${totalPages}">${String(totalPages).padStart(2, '0')}</a>`;
            }

            html += `<a href="#" class="arrow right" data-page="${Math.min(totalPages, currentPage + 1)}"><svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.9995 8.98128C23.9984 8.95507 23.9953 8.93421 23.9934 8.9203L23.9921 8.91094L23.9913 8.90292L23.9897 8.89516C23.9692 8.7847 23.9157 8.68361 23.8366 8.60551L15.5168 0.161273C15.4117 0.0540253 15.2704 -0.000266468 15.1324 9.83317e-07C14.9945 -0.000266468 14.8538 0.0540254 14.7484 0.161006C14.6433 0.268254 14.589 0.410805 14.5893 0.55095C14.589 0.691094 14.6425 0.833379 14.7479 0.940359L22.1464 8.44905H0.540739C0.242964 8.45092 0.00131798 8.69511 0 8.99733C0 9.30195 0.241119 9.55042 0.540739 9.55122H22.1491L14.7482 17.0591C14.643 17.1664 14.5892 17.3089 14.5895 17.4488C14.5892 17.5889 14.6427 17.7315 14.7482 17.8385L14.7492 17.8395C14.8546 17.9457 14.9948 18.0003 15.1326 18C15.2707 18 15.4109 17.946 15.5163 17.8395L15.5171 17.8387L23.8456 9.38781C23.9436 9.28618 23.9992 9.14951 23.9997 9.00696L24 9.00482V9.00267V8.99946V8.99091L23.9995 8.98128Z" fill="black"/></svg></a>`;

            pagination.innerHTML = html;

            pagination.querySelectorAll('a.page, a.arrow').forEach(el => {
                el.onclick = function(e) {
                    e.preventDefault();
                    const page = parseInt(this.getAttribute('data-page'), 10);
                    if (!isNaN(page) && page !== currentPage) {
                        currentPage = page;
                        renderPagination();
                        window.scrollTo({top: 0, behavior: 'smooth'});
                    }
                };
            });
        }

        window.addEventListener('resize', renderPagination);
        renderPagination();
    }
});
