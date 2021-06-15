import { Table, Tbody, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { FetchedAsset } from "../types/FetchedAsset";
import { AssetsListBox } from "./AssetsListBox";

interface AssetsListProps {
  width: string;
  assetsPortfolio: Record<string, FetchedAsset>;
  portfolioValue: number;
  editMode: boolean;
  addFunc: (symbol: any, amount: any, purchasePrice: any) => void;
}

export const AssetsList: React.FC<AssetsListProps> = (props) => {
  const { assetsPortfolio, portfolioValue, editMode, addFunc } = props;
  return (
    <Table width={props.width}>
      <Thead>
        <Tr>
          <Th>Asset Name</Th>
          <Th>Price</Th>
          <Th>24H Change</Th>
          <Th>Shares</Th>
          <Th>Value</Th>
          <Th>Total Profit</Th>
          <Th isNumeric>Portfolio %</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.keys(assetsPortfolio).length > 0
          ? Object.keys(assetsPortfolio).map((symbol) => (
              <AssetsListBox
                addFunc={addFunc}
                asset={assetsPortfolio[symbol]}
                value={portfolioValue}
                editMode={editMode}
                key={symbol}
              ></AssetsListBox>
            ))
          : null}
      </Tbody>
      <Tfoot>
        <Tr></Tr>
      </Tfoot>
    </Table>
  );
};
