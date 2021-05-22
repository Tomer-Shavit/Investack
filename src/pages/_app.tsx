import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "../theme";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import React from "react";
import { DisplayProvider } from "../context/DisplayContext";
import { StocksProvider } from "../context/StocksContext";
import "focus-visible/dist/focus-visible";
import { Global, css } from "@emotion/react";

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

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
        <StocksProvider>
          <ChakraProvider resetCSS theme={theme}>
            <ColorModeProvider
              options={{
                useSystemColorMode: true,
              }}
            >
              <Global styles={GlobalStyles} />
              <Component {...pageProps} />
            </ColorModeProvider>
          </ChakraProvider>
        </StocksProvider>
      </DisplayProvider>
    </ApolloProvider>
  );
}

export default MyApp;
