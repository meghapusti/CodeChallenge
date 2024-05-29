const tokenPricesUrl = 'https://interview.switcheo.com/prices.json';
const tokenSelectOptions = ['SWTH', 'ETH', 'BTC']; // Mocked token list

async function fetchTokenPrices() {
  const response = await fetch(tokenPricesUrl);
  const data = await response.json();
  return data;
}

document.addEventListener('DOMContentLoaded', async () => {
  const fromTokenSelect = document.getElementById('from-token');
  const toTokenSelect = document.getElementById('to-token');
  
  // Populate token select options
  tokenSelectOptions.forEach(token => {
    fromTokenSelect.innerHTML += `<option value="${token}">${token}</option>`;
    toTokenSelect.innerHTML += `<option value="${token}">${token}</option>`;
  });

  // Fetch token prices
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
    errorMessage.textContent = 'Selected tokens are not supported.';
    return;
  }

  errorMessage.textContent = '';
  const rate = window.tokenPrices[toToken] / window.tokenPrices[fromToken];
  const outputAmount = (inputAmount * rate).toFixed(6);
  outputAmountField.value = outputAmount;
}
