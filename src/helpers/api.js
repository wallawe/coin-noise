import axios from 'axios';

const BASE_URL = 'https://api.gdax.com/products/';

export function getPrice(currency) {
  if (!currency) return;
  return axios.get(`${BASE_URL}/${currency}-usd/ticker`);
}

export function toDollars(price) {
  return parseFloat(price).toFixed(2);
}
