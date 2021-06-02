import axios from "axios";
export default async (req, res) => {
  const URL = `https://api.twelvedata.com/quote?symbol=${req.query.myStocks}&apikey=${process.env.API_KEY}`;
  const response = await axios.get(URL);
  res.status(200).json(response.data);
};
