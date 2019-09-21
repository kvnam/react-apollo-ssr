import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from 'node-fetch';
import { createHttpLink } from "apollo-link-http";
import { onError } from 'apollo-link-error';

import { ApolloLink } from "apollo-link";
import express from "express";

import Html from "./html";
import assets from "./assets";
import App from "../src/App";

const app = express();

app.use(express.static("build", { index: false}));

app.use((req, res) => {
  console.log('Root path called ', req.url);
  //res.send(`<!doctype html><head><title>Test</title><body><h1>HELLO!!</h1></body></html`);
  const cache = new InMemoryCache();
  const testLink = new ApolloLink((operation, forward) => {
    console.log(`In test link query fired ${operation.name}`);
    console.log(operation);
    return forward(operation);
  });  
  //To display errors
  const errorLink = new onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        {console.log(`[GraphQL error]: Message: ${message}, `);
        console.log(locations);
      });
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
        testLink,
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
        <App />
      </StaticRouter>
    </ApolloProvider>
  );
  console.log("In path /");

  getDataFromTree(application).then(() => {
    console.log(`Get data from tree returned `);
    const content = ReactDOMServer.renderToString(application);
    const initialState = client.extract();
    //console.log(content);
    //console.log(assets.css);
    const html = <Html content={content} assets={assets} initialState={initialState} />;
    res.send(`<!doctype html>\n${ReactDOMServer.renderToString(html)}`);
  });
  
});

export default app;
