export default function renderProductPrice(price: number | undefined): string {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 1,
  }).format(price || 0);

  return formattedPrice;
}
