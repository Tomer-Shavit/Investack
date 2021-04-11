import { Box } from "@chakra-ui/layout";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  size?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  size: _,
  ...props
}) => {
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
