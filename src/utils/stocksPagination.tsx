export const stocksPagination = (
  allStocks: Record<string, string>,
  firstIndex: number,
  lastIndex: number
) => {
  const shownStocks = [];
  for (let i = firstIndex; i < lastIndex; i++) {
    let key = Object.keys(allStocks)[i];
    shownStocks.push({ [key]: allStocks[key] });
  }
  return shownStocks;
};
