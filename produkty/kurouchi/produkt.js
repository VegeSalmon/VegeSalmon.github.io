document.addEventListener('DOMContentLoaded', function () {
    const minus = document.querySelector('.qty-minus');
    const plus = document.querySelector('.qty-plus');
    const input = document.querySelector('.qty-input');
    minus.addEventListener('click', function () {
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) input.value = val - 1;
    });
    plus.addEventListener('click', function () {
        let val = parseInt(input.value, 10) || 1;
        input.value = val + 1;
    });

    document.querySelectorAll('.product-section').forEach(function (section) {
        section.setAttribute('aria-expanded', 'true');
        const header = section.querySelector('.product-section-header');
        header.addEventListener('click', function () {
            const expanded = section.getAttribute('aria-expanded') === 'true';
            section.setAttribute('aria-expanded', expanded ? 'false' : 'true');

            const arrowImg = header.querySelector('.product-section-arrow img');
            if (arrowImg) {
                arrowImg.style.transition = 'transform 0.3s';
            }
        });
    });

    const images = [
        "../../zdjecia/produkt1.png",
        "../../zdjecia/produkt2.png",
        "../../zdjecia/produkt3.png"
    ];
    let currentIndex = 0;
    const mainImg = document.getElementById('mainProductImage');
    const leftBtn = document.getElementById('arrowLeft');
    const rightBtn = document.getElementById('arrowRight');
    const thumbs = document.querySelectorAll('.product-thumb img');

    function updateMainImage(idx) {
        currentIndex = idx;
        mainImg.src = images[currentIndex];
    }

    leftBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateMainImage(currentIndex);
    });

    rightBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % images.length;
        updateMainImage(currentIndex);
    });

    thumbs.forEach(function (thumb, idx) {
        thumb.addEventListener('click', function () {
            updateMainImage(idx);
        });
    });

    updateMainImage(0);

    const recommendedProducts = [
        {
            img: "../../zdjecia/noz1.png",
            name: "Product A",
            old: "350 zł",
            promo: "300 zł"
        },
        {
            img: "../../zdjecia/noz1.png",
            name: "Product B",
            old: "400 zł",
            promo: "350 zł"
        },
        {
            img: "../../zdjecia/noz1.png",
            name: "Product C",
            old: "450 zł",
            promo: "400 zł"
        },
        {
            img: "../../zdjecia/noz1.png",
            name: "Product D",
            old: "500 zł",
            promo: "450 zł"
        },
        {
            img: "../../zdjecia/noz1.png",
            name: "Product E",
            old: "550 zł",
            promo: "500 zł"
        },
        {
            img: "../../zdjecia/noz1.png",
            name: "Product F",
            old: "600 zł",
            promo: "550 zł"
        }
    ];
    let recIndex = 0;
    let recVisible = 4;
    const recContainer = document.querySelector('.recommended-products');
    const recLeft = document.querySelector('.recommended-arrow.left');
    const recRight = document.querySelector('.recommended-arrow.right');

    function getVisibleCount() {

        const cardMinWidth = 220;
        const cardMaxWidth = 300;
        const cardDefaultWidth = 260;
        const gap = 20;

        const container = recContainer.parentElement;
        const containerWidth = container.offsetWidth - 112;

        let count = Math.floor((containerWidth + gap) / (cardDefaultWidth + gap));
        if (count < 1) count = 1;
        return count;
    }

    function renderRecommended(withAnim = false) {
        recVisible = getVisibleCount();

        if (recVisible > recommendedProducts.length) recVisible = recommendedProducts.length;

        if (withAnim) {
            recContainer.classList.add('anim-fade-out');
            setTimeout(() => {
                recContainer.innerHTML = '';
                for (let i = 0; i < recVisible; i++) {
                    const prod = recommendedProducts[(recIndex + i) % recommendedProducts.length];
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                            <a href="produkt.html">
                                <img src="${prod.img}" alt="${prod.name}">
                                <h4>${prod.name}</h4>
                                <div class="price-container">
                                    <div class="old-price">
                                        <span>${prod.old}</span>
                                        <span class="info-icon"></span>
                                    </div>
                                    <div class="promo-price">${prod.promo}</div>
                                </div>
                                <span class="zobacz-wiecej-szary">Zobacz więcej</span>
                            </a>
                        `;
                    recContainer.appendChild(card);
                }
                recContainer.classList.remove('anim-fade-out');
                recContainer.classList.add('anim-fade-in');
                setTimeout(() => {
                    recContainer.classList.remove('anim-fade-in');
                }, 300);
            }, 300);
        } else {
            recContainer.innerHTML = '';
            for (let i = 0; i < recVisible; i++) {
                const prod = recommendedProducts[(recIndex + i) % recommendedProducts.length];
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                        <a href="produkt.html">
                            <img src="${prod.img}" alt="${prod.name}">
                            <h4>${prod.name}</h4>
                            <div class="price-container">
                                <div class="old-price">
                                    <span>${prod.old}</span>
                                    <span class="info-icon"></span>
                                </div>
                                <div class="promo-price">${prod.promo}</div>
                            </div>
                            <span class="zobacz-wiecej-szary">Zobacz więcej</span>
                        </a>
                    `;
                recContainer.appendChild(card);
            }
        }
    }

    recLeft.addEventListener('click', function () {
        recVisible = getVisibleCount();
        recIndex = (recIndex - 1 + recommendedProducts.length) % recommendedProducts.length;
        renderRecommended(true);
    });
    recRight.addEventListener('click', function () {
        recVisible = getVisibleCount();
        recIndex = (recIndex + 1) % recommendedProducts.length;
        renderRecommended(true);
    });

    window.addEventListener('resize', function () {

        renderRecommended();
    });

    renderRecommended();

});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-section').forEach(function(section) {
        section.setAttribute('aria-expanded', 'false');
    });
});
