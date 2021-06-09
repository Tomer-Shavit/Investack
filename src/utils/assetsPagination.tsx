export const assetsPagination = (
  allAssets,
  firstIndex: number,
  lastIndex: number
) => {
  const shownAssets = [];
  for (let i = firstIndex; i < lastIndex; i++) {
    let key = Object.keys(allAssets)[i];
    shownAssets.push({ [key]: allAssets[key].name });
  }
  return shownAssets;
};
