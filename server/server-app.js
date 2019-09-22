import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ServerStyleSheets, ThemeProvider} from '@material-ui/styles';
import fetch from 'node-fetch';
import { createHttpLink } from "apollo-link-http";
import { onError } from 'apollo-link-error';

import { ApolloLink } from "apollo-link";
import express from "express";

import Html from "./html";
import assets from "./assets";
import App from "../src/App";
import theme from '../src/services/theme';

const app = express();

app.use(express.static("build", { index: false}));

app.use((req, res) => {
  const cache = new InMemoryCache();
  const sheets = new ServerStyleSheets();
  // const testLink = new ApolloLink((operation, forward) => {
  //   return forward(operation);
  // });  
  //To display errors
  const errorLink = new onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        {
          console.log(`[GraphQL error]: Message: ${message}`);
          console.log(locations);
      });
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
        errorLink,
      createHttpLink({
        uri: " https://countries.trevorblades.com",
        credentials: true,
        fetch
      }),
    ]),
    cache
  });
  const application = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={{}}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StaticRouter>
    </ApolloProvider>
  );

  getDataFromTree(application).then(() => {
    const content = ReactDOMServer.renderToString(sheets.collect(application));
    const initialState = client.extract();
    const css = sheets.toString();
   
    const html = <Html content={content} css={css} assets={assets} initialState={initialState} />;
    res.send(`<!doctype html>\n${ReactDOMServer.renderToString(html)}`);
  });
  
});

export default app;
