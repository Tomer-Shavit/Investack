import {
  Modal,
  ModalOverlay,
  ModalContent,
  RadioGroup,
  Stack,
  Radio,
  ModalCloseButton,
  ModalBody,
  Flex,
  Button,
  ModalHeader,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { parseInt } from "lodash";
import React, { useState } from "react";
import { useValidationToast } from "../utils/hooks/useValidationToast";
import { InputFormField } from "./InputFormField";

interface buySellModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  price: number;
  name: string;
  symbol: string;
  addFunc: (symbol: any, amount: any, purchasePrice: any) => void;
}

export const BuySellModal: React.FC<buySellModalProps> = (props) => {
  const { isOpen, onClose, amount, price, symbol, name, addFunc } = props;
  const [isSell, setIsSell] = React.useState("1");
  const [add, setAdd] = useState(0);
  let err = false;
  useValidationToast({ add, err, symbol });

  const setBetterIsSell = (nextNumber) => {
    setIsSell(nextNumber);
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />

      <ModalContent
        backgroundColor="bgDark1"
        color="textDark"
        justifyContent="center"
        alignItems="center"
        p={5}
      >
        <ModalHeader color="textDark" paddingTop="0">
          {symbol} - {name}
        </ModalHeader>
        <RadioGroup defaultValue="1" onChange={setBetterIsSell} value={isSell}>
          <Stack spacing={5} direction="row">
            <Radio colorScheme="red" value="1" fontSize="2xl" outline="none">
              Sell
            </Radio>
            <Radio colorScheme="green" value="2" fontSize="2xl">
              Buy
            </Radio>
          </Stack>
        </RadioGroup>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ amount: "", price: "" }}
            onSubmit={async (values, { setErrors }) => {
              if (parseInt(values.amount) > amount) {
                err = true;
                setErrors({ amount: `Not enough ${symbol}` });
              } else if (
                !String(values.amount).match(
                  /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
                ) ||
                !values.amount
              ) {
                err = true;
                setErrors({
                  amount: "Invalid input.",
                });
              } else if (
                !String(values.price).match(
                  /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
                ) ||
                !values.price
              ) {
                err = true;
                setErrors({
                  price: "Invalid input.",
                });
              } else {
                err = false;
                setAdd(0);
                if (isSell === "1") {
                  addFunc(symbol, -values.amount, values.price);
                } else if (isSell === "2") {
                  addFunc(symbol, values.amount, values.price);
                }
                onClose();
              }
            }}
          >
            {({ isSubmitting, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                >
                  <InputFormField
                    name="amount"
                    label="Amount:"
                    placeholder={"" + amount}
                    type="number"
                  ></InputFormField>
                  <InputFormField
                    name="price"
                    label="Price"
                    placeholder={"" + price}
                    type="number"
                  ></InputFormField>
                  <Flex justifyContent="space-around">
                    <Button
                      backgroundColor="accentDark"
                      mr={3}
                      type="submit"
                      onClick={() => setAdd(add + 1)}
                    >
                      Add Changes
                    </Button>
                    <Button variant="ghost">Cancel</Button>
                  </Flex>
                </Flex>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
