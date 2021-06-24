import { FetchedAsset } from "../types/FetchedAsset";

export const createSortedPortfolio = (
  prop: string,
  assetsPortfolio: Record<string, FetchedAsset>,
  ascending: string
) => {
  if (prop === "symbol") {
    ascending = "descending";
  }
  let newPortfolio: FetchedAsset[] = Object.values(assetsPortfolio).sort(
    (a, b) => {
      const assetA = a[prop];
      const assetB = b[prop];
      if (ascending === "ascending") {
        if (assetA > assetB) {
          return -1;
        }
        if (assetA < assetB) {
          return 1;
        }
        return 0;
      } else {
        if (assetA > assetB) {
          return 1;
        }
        if (assetA < assetB) {
          return -1;
        }
        return 0;
      }
    }
  );
  return newPortfolio;
};
