import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { STOCKS_COLOR_LIST } from "../constants/colorList";
import { StocksContext } from "../context/StocksContext";
import { portfolioSum } from "../utils/portfolioSum";

interface doughNutProps {}

export const DoughNut: React.FC<doughNutProps> = ({}) => {
  const { myStocksPortfolio } = useContext(StocksContext);
  const ref = useRef();
  let initValue = portfolioSum(myStocksPortfolio);
  const [priceDisp, setPriceDisp] = useState(initValue);
  const [shares, setShares] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [color, setColor] = useState("#fff");

  const chartData = {
    datasets: [
      {
        data: Object.keys(myStocksPortfolio).map(
          (symbol) => myStocksPortfolio[symbol].balance
        ),
        backgroundColor: STOCKS_COLOR_LIST,
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
            Object.keys(ctx).length === 0 &&
            Object.keys(myStocksPortfolio).length === 0
          ) {
            return;
          }
          const symbol =
            Object.keys(myStocksPortfolio)[
              ctx?.tooltip?.dataPoints[0]?.dataIndex
            ];
          setPriceDisp(ctx.tooltip.dataPoints[0].raw);
          setSymbol(symbol);
          setShares(myStocksPortfolio[symbol].shares);
          setColor(ctx.tooltip.labelColors[0].backgroundColor);
        },
      },
    },
  };

  return (
    <Flex
      onMouseOut={() => {
        setPriceDisp(initValue);
        setShares(0);
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
        {shares ? (
          <Text color="textDark" fontSize="lg">
            <Box as="span" fontSize="lg" color={color}>
              {symbol}
            </Box>
            : {shares} Shares
          </Text>
        ) : (
          <Text color="textDark2" fontSize="xl">
            {Object.keys(myStocksPortfolio).length} Assets
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
