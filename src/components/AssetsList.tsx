import { Flex, Table, Tbody, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FetchedAsset } from "../types/FetchedAsset";
import { AssetsListBox } from "./AssetsListBox";
import { Loader } from "./loader/Loader";

interface AssetsListProps {
  width: string;
  assetsPortfolio: Record<string, FetchedAsset>;
  portfolioValue: number;
  editMode?: boolean;
  addFunc?: (symbol: any, amount: any, purchasePrice: any) => void;
}

export const AssetsList: React.FC<AssetsListProps> = (props) => {
  const { assetsPortfolio, portfolioValue, editMode, addFunc } = props;
  const [myPortfolio, setMyPortfolio] = useState(
    Object.values(assetsPortfolio)
  );

  useEffect(() => {
    console.log(myPortfolio);
    // Object.values(assetsPortfolio).sort((a, b) => {
    //   console.log("a", a);
    //   console.log("b", b);
    //   return 0;
    // });
  }, []);

  // const sortColumn(prop:string) => {
  //    let newPortfolio = myPortfolio.sort((a,b) => {
  //     const assetA = a[prop]
  //     const assetB = b[prop]
  //     if(assetA>assetB){
  //       return 1
  //     }
  //     if(assetA < assetB){
  //       return -1
  //     }
  //     return 0
  //   })

  // }

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
      <Tbody position="relative">
        {Object.keys(assetsPortfolio).length > 0 ? (
          Object.keys(assetsPortfolio).map((symbol) => (
            <AssetsListBox
              addFunc={addFunc}
              asset={assetsPortfolio[symbol]}
              value={portfolioValue}
              editMode={editMode}
              key={symbol}
            ></AssetsListBox>
          ))
        ) : (
          <Flex position="absolute" left="50%">
            <Loader></Loader>
          </Flex>
        )}
      </Tbody>
      <Tfoot>
        <Tr></Tr>
      </Tfoot>
    </Table>
  );
};
