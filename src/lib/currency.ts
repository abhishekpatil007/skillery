export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPrice = (price: number, originalPrice?: number) => {
  const formattedPrice = formatCurrency(price);
  
  if (originalPrice && originalPrice > price) {
    const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
    return {
      current: formattedPrice,
      original: formatCurrency(originalPrice),
      discount: `${discountPercentage}% off`,
    };
  }
  
  return {
    current: formattedPrice,
    original: null,
    discount: null,
  };
};

export const formatSavings = (savings: number): string => {
  return `You save ${formatCurrency(savings)}`;
};
