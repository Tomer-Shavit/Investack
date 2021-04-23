import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "../theme";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import React from "react";
import { DisplayProvider } from "../context/DisplayContext";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <DisplayProvider>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >
            <Component {...pageProps} />
          </ColorModeProvider>
        </ChakraProvider>
      </DisplayProvider>
    </ApolloProvider>
  );
}

export default MyApp;
