export const assetsData = (assetPortfolio) => {
  return Object.keys(assetPortfolio).map(
    (symbol) => assetPortfolio[symbol].balance
  );
};
