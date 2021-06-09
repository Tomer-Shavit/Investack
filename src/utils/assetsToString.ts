import { CryptoInput, StocksInput } from "../generated/graphql";
import { ALL_CRYPTO } from "../constants/Crypto 05-06-2021";

export const assetsToString = (
  assets: StocksInput[] | CryptoInput[],
  type: "stocks" | "crypto"
) => {
  let newList = [];
  if (type === "stocks") {
    newList = assets.map((asset) => asset.symbol);
  } else if (type === "crypto") {
    newList = assets.map((asset) => ALL_CRYPTO[asset.symbol].id);
  }
  return newList.toString();
};
