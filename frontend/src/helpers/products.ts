export default function renderProductPrice(price = 0): string {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 1,
  }).format(price);

  return formattedPrice;
}
