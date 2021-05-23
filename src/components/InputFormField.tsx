import { Box } from "@chakra-ui/layout";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  size?: string;
  width?: string;
};

export const InputFormField: React.FC<InputFormFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <Box width="100%" marginBottom={3}>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name} color="textDark">
          {props.label}
        </FormLabel>
        <Input
          {...field}
          id={field.name}
          type={props.type}
          placeholder={props.placeholder}
          width={props.width}
          minW="280px"
          focusBorderColor="mainDark"
          borderColor="borderDark"
          errorBorderColor="errorDark"
          color="textDark"
        />
        {error ? (
          <FormErrorMessage color="errorDark">{error}</FormErrorMessage>
        ) : null}
      </FormControl>
    </Box>
  );
};
