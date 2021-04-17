import {
  Flex,
  Heading,
  Button,
  FormHelperText,
  Link,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import NextLink from "next/link";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  const [password, setPassword] = useState("");
  return (
    <Flex
      background="linear-gradient(rgba(68,46,98,1) 0%, rgba(49,60,92) 100%)"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <Heading fontSize="2xl" color="textDark" marginBottom={2}>
          Sign-Up
        </Heading>
        <Flex>
          <Formik
            initialValues={{ email: "", password: "", confirmedPassword: "" }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
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
                  <InputField
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="text"
                    width="320px"
                  ></InputField>
                  <InputField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  ></InputField>
                  <InputField
                    name="confirmedPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                  ></InputField>

                  <Button
                    mt={2}
                    maxW="120px"
                    bgColor="accentDark"
                    isLoading={isSubmitting}
                    type="submit"
                    color="textDark"
                  >
                    Submit
                  </Button>
                  <Flex mt={3}>
                    <NextLink href="/login">
                      <Link color="borderDark"> Already have a user?</Link>
                    </NextLink>
                  </Flex>
                </Flex>
              </form>
            )}
          </Formik>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Register;
