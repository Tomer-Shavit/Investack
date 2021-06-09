import { Accordion, Box } from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { assetsPagination } from "../utils/assetsPagination";
import { AssetBox } from "./AssetBox";
import { Waypoint } from "react-waypoint";

interface AssetsBoxesContainerProps {
  search: string | null;
  assetDict: {};
  type: "stocks" | "crypto";
}

export const AssetsBoxesContainer: React.FC<AssetsBoxesContainerProps> = ({
  search,
  assetDict,
  type,
}) => {
  const [delayedSearch, setDelayedSearch] = useState("");
  const [counter, setCounter] = useState(50);
  const [shownAssets, setShownAssets] = useState(
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
    body = shownAssets.map((asset: Record<string, string>, i) => (
      <Box key={Object.keys(asset)[0]}>
        <AssetBox
          bgColor={i % 2 == 0 ? "#29272e" : "#1B1A1E"}
          symbol={Object.keys(asset)[0]}
          fullName={Object.values(asset)[0]}
          type={type}
        ></AssetBox>
        {i === shownAssets.length - 15 && (
          <Waypoint
            onEnter={() => {
              const newAssets = assetsPagination(
                assetDict,
                counter,
                counter + 50
              );
              setShownAssets((shownAssets) => [...shownAssets, ...newAssets]);
              setCounter(counter + 50);
            }}
          ></Waypoint>
        )}
      </Box>
    ));
  } else {
    body = Object.keys(assetDict).map((symbol) => {
      if (symbol.includes(delayedSearch.toUpperCase())) {
        return (
          <AssetBox
            bgColor="#29272e"
            symbol={symbol}
            key={symbol}
            fullName={assetDict[symbol].name}
            type={type}
          ></AssetBox>
        );
      }
    });
  }

  return <Accordion allowToggle>{body}</Accordion>;
};
