import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import { FetchedAsset } from "../types/FetchedAsset";

import { assetsData } from "../utils/dounut/chartData";
import { portfolioSum } from "../utils/portfolioSum";

interface doughNutProps {
  myPortfolio: Record<string, FetchedAsset>;
  colorList: string[];
}

export const DoughNut: React.FC<doughNutProps> = (props) => {
  const ref = useRef();
  let initValue = portfolioSum(props.myPortfolio);
  const [priceDisp, setPriceDisp] = useState(initValue);
  const [amount, setAmount] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [color, setColor] = useState("#fff");

  const chartData = {
    datasets: [
      {
        data: assetsData(props.myPortfolio),
        backgroundColor: props.colorList,
        hoverOffset: 8,
        cutout: "85%",
        radius: "95%",
        borderWidth: 0,
        redraw: false,
      },
    ],
  };
  const option = {
    animation: {
      duration: 0,
    },
    interaction: {
      intersect: true,
      mode: "index",
    },
    plugins: {
      tooltip: {
        enabled: false,
        external: (ctx) => {
          if (
            typeof ctx.tooltip.dataPoints == "undefined" ||
            Object.keys(ctx).length === 0 ||
            Object.keys(props.myPortfolio).length === 0
          ) {
            return;
          }
          const symbol = Object.keys(props.myPortfolio)[
            ctx?.tooltip?.dataPoints[0]?.dataIndex
          ];
          setPriceDisp(ctx.tooltip.dataPoints[0].raw);
          setSymbol(symbol);

          setAmount(props.myPortfolio[symbol].amount);
          setColor(ctx.tooltip.labelColors[0].backgroundColor);
        },
      },
    },
  };

  return (
    <Flex
      onMouseOut={() => {
        setPriceDisp(initValue);
        setAmount(0);
      }}
      width="380px"
      overflow="visible"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Doughnut
        type="doughnut"
        ref={ref}
        redraw={false}
        data={chartData}
        options={option}
      />
      <Flex
        position="absolute"
        marginLeft="auto"
        marginRight="auto"
        left={0}
        right={0}
        textAlign="center"
        width="250px"
        justifyContent="center"
        flexDirection="column"
      >
        <Text color="textDark" fontSize="3xl" marginBottom="2px">
          ${priceDisp.toFixed(2)}
        </Text>
        {amount ? (
          <Text color="textDark" fontSize="lg">
            <Box as="span" fontSize="lg" color={color}>
              {symbol}
            </Box>
            : {amount} {props.myPortfolio ? "Shares" : "Tokens"}
          </Text>
        ) : (
          <Text color="textDark2" fontSize="xl">
            {Object.keys(props.myPortfolio).length} Assets
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
