import {
  Flex,
  Icon,
  Table,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import { TABLE_HEADERS } from "../constants/tableHeaders";
import { FetchedAsset } from "../types/FetchedAsset";
import { createSortedPortfolio } from "../utils/createSortedPortfolio";
import { AssetsListBox } from "./AssetsListBox";
import { ChartLoader } from "./chartLoader/chartLoader";

interface AssetsListProps {
  width: string;
  assetsPortfolio: Record<string, FetchedAsset>;
  portfolioValue: number;
  editMode?: boolean;
  type: string;
  addFunc?: (symbol: any, amount: any, purchasePrice: any) => void;
  doneLoadingStocks?: boolean;
  doneLoadingCrypto?: boolean;
}

export const AssetsList: React.FC<AssetsListProps> = (props) => {
  const {
    assetsPortfolio,
    portfolioValue,
    editMode,
    addFunc,
    doneLoadingStocks,
    doneLoadingCrypto,
    type,
  } = props;
  const [myPortfolio, setMyPortfolio] = useState<undefined | FetchedAsset[]>();
  const [ascending, setAscending] = useState(["ascending", ""]);

  let doneLoading;
  if (type === "stocks") {
    doneLoading = doneLoadingStocks;
  } else if (type === "crypto") {
    doneLoading = doneLoadingCrypto;
  } else if (type === "both") {
    if (doneLoadingCrypto && doneLoadingStocks) {
      doneLoading = true;
    } else {
      doneLoading = false;
    }
  }

  let body;
  if (!doneLoading) {
    body = <ChartLoader></ChartLoader>;
  } else {
    body = (
      <Table width={props.width}>
        <Thead>
          <Tr>
            {TABLE_HEADERS.map((header, i) => (
              <Th
                cursor="pointer"
                key={i}
                paddingRight={
                  Object.values(header)[0] === "Portfolio %" ? "0" : undefined
                }
                onClick={() => {
                  setMyPortfolio(
                    createSortedPortfolio(
                      Object.keys(header)[0],
                      assetsPortfolio,
                      ascending[0]
                    )
                  );
                  let status =
                    ascending[0] === "ascending" ? "descending" : "ascending";
                  let name = Object.values(header)[0];
                  setAscending([status, name]);
                }}
              >
                <Flex alignItems="center">
                  <Flex flexDirection="column">
                    <Icon
                      as={ICONS_TO_CLASSES["caretUp"]}
                      marginBottom="-3px"
                      color={
                        ascending[0] === "descending" &&
                        ascending[1] === Object.values(header)[0]
                          ? "#1FC7D4"
                          : undefined
                      }
                    ></Icon>
                    <Icon
                      color={
                        ascending[0] === "ascending" &&
                        ascending[1] === Object.values(header)[0]
                          ? "#1FC7D4"
                          : undefined
                      }
                      marginTop="-3px"
                      as={ICONS_TO_CLASSES["caretDown"]}
                    ></Icon>
                  </Flex>
                  <Flex marginLeft={1}>{Object.values(header)[0]}</Flex>
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody position="relative">
          {!myPortfolio
            ? Object.keys(assetsPortfolio).map((symbol) => (
                <AssetsListBox
                  addFunc={addFunc}
                  asset={assetsPortfolio[symbol]}
                  value={portfolioValue}
                  editMode={editMode}
                  key={symbol}
                ></AssetsListBox>
              ))
            : myPortfolio.map((asset) => (
                <AssetsListBox
                  addFunc={addFunc}
                  asset={asset}
                  value={portfolioValue}
                  editMode={editMode}
                  key={asset.symbol}
                ></AssetsListBox>
              ))}
        </Tbody>
        <Tfoot>
          <Tr></Tr>
        </Tfoot>
      </Table>
    );
  }

  return (
    <Flex width="100%" justifyContent="center">
      {body}
    </Flex>
  );
};
