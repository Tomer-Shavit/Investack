import { Flex } from "@chakra-ui/layout";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { StocksContext } from "../context/StocksContext";
import { AssetsListBox } from "./AssetsListBox";

interface AssetsListProps {
  width: string;
}

export const AssetsList: React.FC<AssetsListProps> = (props) => {
  const { myStocksPortfolio, stocksValue } = useContext(StocksContext);
  return (
    <Table width={props.width}>
      <Thead>
        <Tr>
          <Th>Asset Name</Th>
          <Th>Price</Th>
          <Th>24H Change</Th>
          <Th>Shares</Th>
          <Th>Value</Th>
          <Th isNumeric>Portfolio %</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.keys(myStocksPortfolio).length > 0
          ? Object.keys(myStocksPortfolio).map((symbol) => (
              <AssetsListBox
                stock={myStocksPortfolio[symbol]}
                value={stocksValue}
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
