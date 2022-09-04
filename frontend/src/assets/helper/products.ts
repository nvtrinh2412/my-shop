export default  function renderProductPrice (price: number): string {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 1,
  }).format(price);

  return formattedPrice;
}


