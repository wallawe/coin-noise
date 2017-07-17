export let currencyMap = {
  'btc': 'Bitcoin',
  'eth': 'Ethereum',
  'ltc': 'Litecoin'
}

export function sayCurrentPrice(currency, price) {
  if (window.responsiveVoice && window.responsiveVoice.speak) {
    window.responsiveVoice.speak(`${currencyMap[currency]}'s current price is ${price} dollars.`, "UK English Male");
  }
}
