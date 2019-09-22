import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import client from './services/apolloClient';
import './index.css';
import App from './App';
import theme from './services/theme';
import * as serviceWorker from './serviceWorker';

function Main(props){
  useEffect(() => {
    const muiStyles = document.querySelector('#mui-ssr');
   
    if(muiStyles){
      muiStyles.parentNode.removeChild(muiStyles);
    }
  }, []);

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

ReactDOM.hydrate(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
