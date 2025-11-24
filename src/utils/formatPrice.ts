export const formatPrice = (price: string, currency: string) => {
  const num = parseFloat(price);
  const symbol = currency === 'usd' ? '$' : 'mdl';
  return `${num.toLocaleString('ru-RU')} ${symbol}`;
};
