const tokenPricesUrl = 'https://interview.switcheo.com/prices.json';
const tokenSelectOptions = ['USD', 'SGD', 'JPY', 'EUR', 'GBP'];

async function fetchTokenPrices() {
    const response = await fetch(tokenPricesUrl);
    const data = await response.json();

    const uniquePrices = {};
    data.forEach(item => {
        if (!uniquePrices[item.currency]) {
            uniquePrices[item.currency] = item.price;
        }
    });

    return uniquePrices;
}

document.addEventListener('DOMContentLoaded', async () => {
    const fromTokenSelect = document.getElementById('from-token');
    const toTokenSelect = document.getElementById('to-token');

    tokenSelectOptions.forEach(token => {
        fromTokenSelect.innerHTML += `<option value="${token}">${token}</option>`;
        toTokenSelect.innerHTML += `<option value="${token}">${token}</option>`;
    });

    window.tokenPrices = await fetchTokenPrices();
});

function handleSwap() {
    const fromToken = document.getElementById('from-token').value;
    const toToken = document.getElementById('to-token').value;
    const inputAmount = parseFloat(document.getElementById('input-amount').value);
    const outputAmountField = document.getElementById('output-amount');
    const errorMessage = document.getElementById('error-message');

    if (!fromToken || !toToken || !inputAmount) {
        errorMessage.textContent = 'All fields are required.';
        return;
    }

    if (!window.tokenPrices[fromToken] || !window.tokenPrices[toToken]) {
        errorMessage.textContent = 'Selected currencies are not supported.';
        return;
    }

    errorMessage.textContent = '';
    const rate = window.tokenPrices[toToken] / window.tokenPrices[fromToken];
    const outputAmount = (inputAmount * rate).toFixed(6);
    outputAmountField.value = outputAmount;

    document.getElementById('exchange-rate-info').textContent = `1 ${fromToken} = ${(rate).toFixed(6)} ${toToken} (${(window.tokenPrices[fromToken] * rate).toFixed(2)})`;
}

function swapCurrencies() {
    const fromTokenSelect = document.getElementById('from-token');
    const toTokenSelect = document.getElementById('to-token');
    const fromTokenValue = fromTokenSelect.value;
    const toTokenValue = toTokenSelect.value;

    fromTokenSelect.value = toTokenValue;
    toTokenSelect.value = fromTokenValue;

    handleSwap();
}
