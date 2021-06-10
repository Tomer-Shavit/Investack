export const portfolioSum = (portfolio) => {
  let sum = 0;
  Object.keys(portfolio).forEach((symbol) => {
    sum += portfolio[symbol].balance;
  });
  return sum;
};
