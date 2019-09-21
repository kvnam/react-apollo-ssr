import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

console.log(' Browser Apollo client called ');
const cache = new InMemoryCache().restore(window.__APOLLO_STATE__); 
const client = new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({
      uri: " https://countries.trevorblades.com",
    })
  ]),
  cache,
  ssrForceFetchDelay: 100,
});
console.log(`CACHE in client is `);
console.log(cache);
console.log(client);
export default client;