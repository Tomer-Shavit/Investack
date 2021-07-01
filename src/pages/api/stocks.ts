import axios from "axios";
export default async (req, res) => {
  const URL = `https://api.twelvedata.com/quote?symbol=${req.query.myStocks}&apikey=${process.env.API_KEY}`;
  const response = await axios.get(URL);
  if (!req.query.myStocks.includes(",")) {
    const newData = { [response.data.symbol]: response.data };
    res.status(200).json(newData);
  } else {
    res.status(200).json(response.data);
  }
};
