export const calcProfitPercentage = (price, value, amount) => {
  const avgCost = value / amount;
  return avgCost < price
    ? (100 * price) / avgCost - 100
    : (-100 * price) / avgCost;
};
