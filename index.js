const EU_RATE = 2150;
const NON_EU_RATE = 2350;
const FEE_RATE = 0.84;

const inputs = document.querySelectorAll('.markup, .cost');

inputs.forEach(input => {
    input.addEventListener('input', calculate);
});

function calculate() {

    const rows = document.querySelectorAll('.row:not(.header)');

    rows.forEach(row => {

        const markup = Number(
            row.querySelector('.markup').value
        );

        const cost = Number(
            row.querySelector('.cost').value
        );

        if (!cost || !markup) {
            row.querySelector('.eu').textContent = '₩0';
            row.querySelector('.non-eu').textContent = '₩0';
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