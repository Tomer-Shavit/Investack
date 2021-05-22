export const stocksPagination = (
  allStocks: Record<string, string>,
  counter: number
) => {
  const shownStocks = [];
  for (let i = 0; i < counter; i++) {
    let key = Object.keys(allStocks)[i];
    shownStocks.push({ [key]: allStocks[key] });
  }
  return shownStocks;
};
