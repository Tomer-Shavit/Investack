import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Icon,
  Text,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useContext } from "react";
import { ICONS_TO_CLASSES } from "../constants/icons";
import { StocksContext } from "../context/StocksContext";
import { InputFormField } from "./InputFormField";

interface StockBoxProps {
  symbol: string;
  fullName: string;
  bgColor: string;
}

export const StockBox: React.FC<StockBoxProps> = (props) => {
  const { addedStocks, addToAddedStocks } = useContext(StocksContext);
  const toast = useToast();
  const priceName = "price" + `${props.symbol}`;
  const sharesName = "shares" + `${props.symbol}`;

  return (
    <AccordionItem backgroundColor={props.bgColor} borderColor="borderDark2">
      <AccordionButton>
        <Flex alignItems="center" p={2} width="100%">
          <Icon
            as={ICONS_TO_CLASSES["plus"]}
            color="mainDark"
            marginRight={3}
          ></Icon>
          <Text color="accentDark">{props.symbol}</Text>
          <Text color="textDark">{`\xa0-\xa0` + props.fullName}</Text>
        </Flex>
      </AccordionButton>
      <AccordionPanel pb={4} color="textDark">
        <Formik
          initialValues={{ [sharesName]: "", [priceName]: "" }}
          onSubmit={(values, { setErrors }) => {}}
        >
          {({ isSubmitting }) => (
            <Form>
              <Flex
                alignItems="flex-end"
                justifyContent="space-between"
                width="100%"
              >
                <InputFormField
                  name={sharesName}
                  placeholder="E.g. 5"
                  label="Shares"
                  type="number"
                ></InputFormField>
                <InputFormField
                  name={priceName}
                  placeholder="E.g. 63.75"
                  label="Price"
                  type="number"
                ></InputFormField>
                <Button
                  width="240px"
                  marginBottom={3}
                  bgColor="accentDark"
                  type="submit"
                  color="textDark"
                  onClick={() => {
                    toast({
                      title: `${props.symbol} was added to your portfolio.`,
                      description: `Don't forget to save.`,
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                  }}
                >
                  Add
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </AccordionPanel>
    </AccordionItem>
  );
};
