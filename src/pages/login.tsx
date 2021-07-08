import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Formik } from "formik";
import React from "react";
import { InputFormField } from "../components/InputFormField";
import { MeDocument, useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { Card } from "../components/Card";
import NextLink from "next/link";

const Login = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  return (
    <Flex
      background="linear-gradient(rgba(68,46,98,1) 0%, rgba(49,60,92) 100%)"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Card width="25%">
        <Heading fontSize="2xl" color="textDark" marginBottom={2}>
          Log-In
        </Heading>
        <Flex>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              if (values.email.length === 0) {
                setErrors({
                  email: "Email can not be blank.",
                });
              } else if (values.password.length === 0) {
                setErrors({
                  password: "Password can not be blank.",
                });
              } else {
                const response = await login({
                  variables: { email: values.email, password: values.password },
                  refetchQueries: [{ query: MeDocument }],
                });

                if (response.data.login.errors) {
                  setErrors({
                    [response.data.login.errors[0].field]:
                      response.data.login.errors[0].error,
                  });
                } else if (response.data.login.user) {
                  router.push("/");
                }
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
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="text"
                  ></InputFormField>
                  <InputFormField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  ></InputFormField>
                  <Button
                    mt={2}
                    maxW="120px"
                    bgColor="accentDark"
                    isLoading={isSubmitting}
                    type="submit"
                    color="textDark"
                  >
                    Login
                  </Button>
                  <Flex mt={3}>
                    <NextLink href="/register">
                      <Link color="borderDark2">
                        Don't have an account yet?
                      </Link>
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

export default Login;
