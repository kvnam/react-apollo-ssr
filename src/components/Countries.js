import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const getCountries = gql`
  query{
    countries{
      name
      code
      continent{
        code
        name
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '60vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countriesContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `1.2rem`,
    padding: '5rem 0',
  },
  paper:{
    padding: '2rem',
    width: '40%'
  },
  listItem:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
}));

function Countries(props){
    const { loading, data, error } = props;
    const classes = useStyles();
    let countriesList = [];
    if(loading || error){
      return <div className={classes.loadingContainer}>
        <CircularProgress color="secondary" />
      </div>
    }
    if(data && data.countries){
      countriesList = data.countries.map(country => {
        return (
          <ListItem key={country.name}>
            <ListItemText className={classes.listItem}>
            {country.name} &nbsp;&nbsp;
            <Link to={{
              pathname: "/country",
              state: {
                countryCode: country.code
              }
              }}>View details</Link>
            </ListItemText>
          </ListItem>
        )
      });
      //Just display the first 10 countries for now
      countriesList = countriesList.splice(0, 10);
    }
    return (
      <div className={classes.countriesContainer}>
        <Paper className={classes.paper}>
        <List>
          {countriesList}
        </List>
        </Paper>
      </div>
    )
}

export default graphql(getCountries)(Countries);