import { Icon, Td, Tr, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import { FetchedAsset } from "../types/FetchedAsset";
import { BuySellModal } from "./buySellModal";

interface AssetsListBoxProps {
  asset: FetchedAsset;
  value: number;
  editMode: boolean;
  addFunc: (symbol: any, amount: any, purchasePrice: any) => void;
}

export const AssetsListBox: React.FC<AssetsListBoxProps> = ({
  asset,
  value,
  editMode,
  addFunc,
}) => {
  const avgCost = asset.value / asset.amount;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr color="textDark" position="relative">
      <Td borderBottomColor="borderDark2" marginRight="auto">
        {asset?.symbol}
      </Td>
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
        color={asset.profitPercentage >= 0 ? "#6ede8a" : "#fe4d55"}
      >
        {asset.profitPercentage.toFixed(2)}%
      </Td>

      <Td isNumeric borderBottomColor="borderDark2" color={asset.color}>
        {((asset.balance / value) * 100).toFixed(2)}%
      </Td>
      <Td
        display={!editMode ? "none" : undefined}
        position="absolute"
        border="none"
        left="-3rem"
        cursor="pointer"
        onClick={() => {
          setTimeout(() => {
            onOpen();
          }, 200);
        }}
      >
        <Icon
          as={ICONS_TO_CLASSES["edit"]}
          color="accentDark"
          fontSize="xl"
        ></Icon>
        <BuySellModal
          isOpen={isOpen}
          addFunc={addFunc}
          onClose={onClose}
          amount={asset.amount}
          symbol={asset.symbol}
          name={asset.name}
          price={asset.price}
        ></BuySellModal>
      </Td>
    </Tr>
  );
};
