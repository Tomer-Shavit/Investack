import { Flex } from "@chakra-ui/layout";
import { Accordion } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { StocksContext } from "../context/StocksContext";
import { stocksPagination } from "../utils/stocksPagination";
import { StockBox } from "./StockBox";

interface StockBoxesContainerProps {}

export const StockBoxesContainer: React.FC<StockBoxesContainerProps> = ({}) => {
  const { allStocks } = useContext(StocksContext);
  const [counter, setCounter] = useState(50);
  const [shownStocks, setShownStocks] = useState(
    stocksPagination(allStocks, counter)
  );

  return (
    <Accordion allowToggle>
      {shownStocks.map((stock: Record<string, string>, i) => (
        <StockBox
          bgColor={i % 2 == 0 ? "#29272e" : "#1B1A1E"}
          symbol={Object.keys(stock)[0]}
          key={i}
          fullName={Object.values(stock)[0]}
        ></StockBox>
      ))}
    </Accordion>
  );
};
