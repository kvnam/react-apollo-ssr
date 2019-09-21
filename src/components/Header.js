import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkBtn: {
    color: '#FFF',
    textDecoration: 'none',
  }
}))

function Header(props){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         <Button color="inherit">
           <Link className={classes.linkBtn} to="/">Home</Link>
          </Button>
          {/* <Button color="inherit">
           <Link to="/">Home</Link>
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  )

}

export default Header;