/* =========================
    일반 계산기
========================= */

const EU_RATE = 2150;
const NON_EU_RATE = 2350;
const FEE_RATE = 0.86;

const inputs = document.querySelectorAll(
    '.markup, .cost'
);

inputs.forEach(input => {
    input.addEventListener('input', calculate);
});

function calculate(){

    const rows = document.querySelectorAll(
        '.row:not(.header)'
    );

    rows.forEach(row => {

        const markup = Number(
            row.querySelector('.markup').value
        );

        const cost = Number(
            row.querySelector('.cost').value
        );

        if(!cost || !markup){

            row.querySelector('.eu')
                .textContent = '₩0';

            row.querySelector('.non-eu')
                .textContent = '₩0';

            return;
        }

        const euPrice = Math.round(
            (cost * markup * EU_RATE) / FEE_RATE
        );

        const nonEuPrice = Math.round(
            (cost * markup * NON_EU_RATE) / FEE_RATE
        );

        row.querySelector('.eu').textContent =
            '₩' + euPrice.toLocaleString();

        row.querySelector('.non-eu').textContent =
            '₩' + nonEuPrice.toLocaleString();
    });
}

calculate();

/* =========================
    200만원 이상 가방 계산
========================= */

const luxuryInputs = document.querySelectorAll(
    '#luxuryMarkup, #luxuryCost'
);

luxuryInputs.forEach(input => {
    input.addEventListener('input', calculateLuxury);
});

function calculateLuxury(){

    const markup = Number(
        document.getElementById('luxuryMarkup').value
    );

    const cost = Number(
        document.getElementById('luxuryCost').value
    );

    /* 기준금액 */
    const basePrice =
        cost * markup * 1850;

    document.querySelector('.luxury-base')
        .textContent =
        '₩' + Math.round(basePrice).toLocaleString();

    if(!cost || !markup){

        document.querySelector('.luxury-eu')
            .textContent = '₩0';

        document.querySelector('.luxury-non-eu')
            .textContent = '₩0';

        return;
    }

    /* 유럽 */

    const euBase =
        cost * markup * 1850;

    const euTax = 0;

    const euVat =
        euBase * 0.1;

    const euExtra =
        euBase * 0.05;

    const euAdditional =
        euBase > 2000000
        ? (euBase + euTax - 2000000) * 0.2
        : 0;

    const euMisc =
        euAdditional * 0.3 + 50000;

    const euFinalBuy =
        euBase +
        euTax +
        euVat +
        euExtra +
        euAdditional +
        euMisc;

    const euFinalSell =
        euFinalBuy / 0.86;

    /* 비유럽 */

    const nonEuBase =
        cost * markup * 1850;

    const nonEuTax =
        nonEuBase * 0.08;

    const nonEuVat =
        nonEuBase * 0.1;

    const nonEuExtra =
        nonEuBase * 0.05;

    const nonEuAdditional =
        nonEuBase > 2000000
        ? (nonEuBase + nonEuTax - 2000000) * 0.2
        : 0;

    const nonEuMisc =
        nonEuAdditional * 0.3 + 50000;

    const nonEuFinalBuy =
        nonEuBase +
        nonEuTax +
        nonEuVat +
        nonEuExtra +
        nonEuAdditional +
        nonEuMisc;

    const nonEuFinalSell =
        nonEuFinalBuy / 0.86;

    document.querySelector('.luxury-eu')
        .textContent =
        '₩' + Math.round(euFinalSell).toLocaleString();

    document.querySelector('.luxury-non-eu')
        .textContent =
        '₩' + Math.round(nonEuFinalSell).toLocaleString();
}

calculateLuxury();