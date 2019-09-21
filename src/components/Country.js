import React from 'react';
import { graphql, compose } from 'react-apollo';
import MediaQuery from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';

const getCountry = gql`
  query country($code: String){
    country(code: $code){
      code
      name
      languages{
        name
      }
      continent{
        name
      }
      emoji
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
    justifyContent: 'center'
  },
  countryContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `1.2rem`
  },
  paper:{
    padding: '5rem',
  }
}));

function Country(props){
    const { loading, data, error } = props;
    const classes = useStyles();
    let country = {};
    if(loading || error || !data || !data.country){
      return <div className={classes.loadingContainer}>
        <CircularProgress color="secondary" />
      </div>
    }
    if(data && data.country){
      country = data.country;
    }
    return(
      <div className={classes.countryContainer}>
        <Paper className={classes.paper}>
        <MediaQuery query="(max-width: 900px)">
          <Typography variant="h2" color="primary">{country.name}</Typography>
          <Typography variant="headline" color="primary">Continent</Typography>
          <Typography variant="body1" color="primary">{country.continent.name}</Typography><br />
          <Typography variant="body1" color="primary">{country.emoji}</Typography>
          <Typography variant="headline" color="primary">Languages</Typography>
          {country.languages.map(language => <Typography variant="body1" color="secondary">language.name</Typography>)}
        </MediaQuery>
        <MediaQuery query="(min-width: 901px)">
          <Typography variant="h2" color="primary">{country.name}</Typography>
          <Typography variant="body1" color="primary">{country.currency}</Typography>
          <Typography variant="headline" color="primary">Continent</Typography>
          <Typography variant="body1" color="primary">{country.continent.name}</Typography>
          <Typography variant="headline" color="primary">Languages</Typography>
          {country.languages.map(language => <Typography variant="body1" color="secondary">{language.name}</Typography>)}
        </MediaQuery>
        </Paper>
      </div>
    )
}

export default graphql(getCountry, {
  options: (ownProps) => ({
    variables: {
      code: ownProps.location && ownProps.location.state ? ownProps.location.state.countryCode : 'NA'
    }
  })
})(Country);