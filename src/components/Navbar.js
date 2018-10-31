import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import cookies from 'react-cookies';
import NavMenu from './NavMenu';

const styles = theme => {

  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return {
    appBar: {
      backgroundColor: '#60783A',
      boxShadow: 'none',
      marginBottom: '0vh',
    },
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
      color: '#ffffff',
      fontSize: 24,
    },
    logoutButton: {
      color: '#ffffff',
      float: 'right',
    },
  };
};

class Navbar extends Component {

  state = {
    homeSlide: false,
    projectsSlide: false,
    aboutSlide: false,
    photosSlide: false,
  }

  itemOnHover = (item) => {
    this.setState({ [item]: true });
  }

  itemOnLeave = (item) => {
    this.setState({ [item]: false });
  }

  logout = () => {
    cookies.remove('token');
    window.localStorage.removeItem('userName');
    location.reload();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <NavMenu />
            <Typography variant="h6" className={classes.grow}>E-ETAP</Typography>
            <Button onClick={this.logout} className={classes.logoutButton}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


export default withStyles(styles)(Navbar);