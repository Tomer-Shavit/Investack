import { Flex } from "@chakra-ui/layout";
import { Accordion, Box } from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { StocksContext } from "../context/StocksContext";
import { assetsPagination } from "../utils/stocksPagination";
import { StockBox } from "./StockBox";
import { Waypoint } from "react-waypoint";

interface StockBoxesContainerProps {
  search: string | null;
  assetDict: {};
}

export const StockBoxesContainer: React.FC<StockBoxesContainerProps> = ({
  search,
  assetDict,
}) => {
  const [delayedSearch, setDelayedSearch] = useState("");
  const [counter, setCounter] = useState(50);
  const [shownStocks, setShownStocks] = useState(
    assetsPagination(assetDict, 0, 50)
  );
  let body;

  const debouncedText = useCallback(
    debounce((_searchVal: string | null) => {
      setDelayedSearch(_searchVal);
    }, 1000),
    []
  );

  useEffect(() => debouncedText(search), [debouncedText, search]);

  if (!delayedSearch) {
    body = shownStocks.map((stock: Record<string, string>, i) => (
      <Box key={Object.keys(stock)[0]}>
        <StockBox
          bgColor={i % 2 == 0 ? "#29272e" : "#1B1A1E"}
          symbol={Object.keys(stock)[0]}
          fullName={Object.values(stock)[0]}
        ></StockBox>
        {i === shownStocks.length - 15 && (
          <Waypoint
            onEnter={() => {
              const newStocks = assetsPagination(
                assetDict,
                counter,
                counter + 50
              );
              setShownStocks((shownStocks) => [...shownStocks, ...newStocks]);
              setCounter(counter + 50);
            }}
          ></Waypoint>
        )}
      </Box>
    ));
  } else {
    body = Object.keys(assetDict).map((stock) => {
      if (stock.includes(delayedSearch.toUpperCase())) {
        return (
          <StockBox
            bgColor="#29272e"
            symbol={stock}
            key={stock}
            fullName={assetDict[stock].name}
          ></StockBox>
        );
      }
    });
  }

  return <Accordion allowToggle>{body}</Accordion>;
};
