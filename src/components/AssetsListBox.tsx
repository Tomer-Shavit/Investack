import { Td, Tr } from "@chakra-ui/react";

import React, { useEffect } from "react";
import { FetchedAsset } from "../types/FetchedAsset";

interface AssetsListBoxProps {
  asset: FetchedAsset;
  value: number;
}

export const AssetsListBox: React.FC<AssetsListBoxProps> = ({
  asset,
  value,
}) => {
  return (
    <Tr color="textDark">
      <Td borderBottomColor="borderDark2">{asset?.symbol}</Td>
      <Td borderBottomColor="borderDark2">${(asset?.price * 1).toFixed(2)}</Td>
      <Td
        borderBottomColor="borderDark2"
        color={asset?.change > 0 ? "#6ede8a" : "#fe4d55"}
      >
        {(asset?.change * 1).toFixed(2)}%
      </Td>
      <Td borderBottomColor="borderDark2">{asset?.amount}</Td>
      <Td borderBottomColor="borderDark2">${(asset?.balance).toFixed(2)}</Td>
      <Td
        borderBottomColor="borderDark2"
        color={asset.value / asset.amount < asset.price ? "#6ede8a" : "#fe4d55"}
      >
        {((asset.value / asset.amount / asset.price - 1) * -100).toFixed(2)}%
      </Td>
      <Td isNumeric borderBottomColor="borderDark2" color={asset.color}>
        {((asset.balance / value) * 100).toFixed(2)}%
      </Td>
    </Tr>
  );
};
