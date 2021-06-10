import axios from "axios";
export default async (req, res) => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${req.query.myCrypto}`;
  const response = await axios.get(URL);
  if (response.status === 200) {
    const newRes = createFetchedCrypto(response.data);
    res.status(200).json(newRes);
  }
};

const createFetchedCrypto = (crypto) => {
  const dict = {};
  crypto.forEach((crypto) => {
    dict[crypto.symbol.toUpperCase()] = {
      id: crypto.id,
      symbol: crypto.symbol.toUpperCase(),
      name: crypto.name,
      price: crypto.current_price,
      change: crypto.price_change_percentage_24h,
    };
  });
  return dict;
};
