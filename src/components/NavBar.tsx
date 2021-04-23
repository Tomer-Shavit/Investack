import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  let body;

  const getUsername = (email: string): string => {
    return email.split("@")[0];
  };

  if (loading) {
    body = null;
  } else if (!data.me?.user?.email && !loading) {
    body = (
      <Flex justifyContent="space-between">
        <NextLink href="/register">
          <Link color="textDark" paddingRight={3}>
            Sign-Up
          </Link>
        </NextLink>
        <NextLink href="/login">
          <Link color="textDark">Login</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex>
        <Text color="textDark" paddingRight={3}>
          Hi, {getUsername(data.me.user.email)}
        </Text>
        <Link
          color="textDark"
          onClick={() => {
            logout();
            router.reload();
          }}
        >
          Logout
        </Link>
      </Flex>
    );
  }

  return (
    <Flex
      backgroundColor="bgDark2"
      justifyContent="center"
      alignItems="center"
      h="64px"
      paddingLeft={8}
      paddingRight={8}
      position="fixed"
      width="100%"
      zIndex="10"
    >
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <Flex p={3}>
          <NextLink href="/">
            <Text color="textDark" fontSize="3xl" cursor="pointer">
              Investack
            </Text>
          </NextLink>
        </Flex>
        {body}
      </Flex>
    </Flex>
  );
};
