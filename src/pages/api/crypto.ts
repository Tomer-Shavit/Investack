import axios from "axios";
export default async (req, res) => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${req.query.myCrypto}`;
  const response = await axios.get(URL);
  res.status(200).json(response.data);
};
