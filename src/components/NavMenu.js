import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FileDocumentBoxMultipleOutline, Magnify, AccountCircle } from 'mdi-material-ui';

import { checked } from '../ducks/checklist.js';
import { itemListObj } from '../ducks/checklist.js';

const styles = theme => {

  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return {

    list: {
      width: '90vw',
      marginTop: 10,
    },
    li: {
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      width: '100%',
      justifyContent: 'left',
      paddingLeft: 40,
    },
    listText: {
      marginLeft: 20,
    },
    menu: {
      textAlign: 'center',
    },
    liLogout: {
      position: 'fixed',
      top: '90vh',
      width: '100%',
    },
    logoutButton: {
      paddingLeft: 0,
      width: '100%',
    },
    link: {
      textDecoration: 'none',
    },
    menuIcon: {
      color: '#ffffff',
    },
    hamburger: {
      marginRight: 20,
    },
    checkbox: {
      marginLeft: 28,
    },
    checkboxContainer: {
      display: 'inline-flex',
      flexDirection: 'row',
    },
    checkboxLink: {
      display: 'flex',
      alignItems: 'center',
    },
  };
};



class NavMenu extends React.Component {
  state = {
    left: false,
    openPreferencesDialog: false,
    openFavoritesDialog: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleClose = () => {
    this.setState({ openPreferencesDialog: false, openFavoritesDialog: false });
  };

  openPreferencesDialog = () => {
    this.setState({ openPreferencesDialog: true });
  }

  openFavoritesDialog = () => {
    this.setState({ openFavoritesDialog: true });
  }



  render() {
    const { classes, checklist, checked } = this.props;

    // {type:'Bags', id:1}
    // in order to handle if the arrangement changes, give each item an ID

    const sideList = (
      <div className={classes.list}>
        <Typography className={classes.menu} variant='h4'>Menu</Typography>
        <Typography>
          <Link to='/Login' className={classes.link}>
            <List className={classes.li}>
              <Button className={classes.button} onClick={this.toggleDrawer('left', false)}>
                <AccountCircle />
                <Typography className={classes.listText} variant='body1'>Login</Typography>
              </ Button>
            </List>
          </Link>
          <Link to='/FieldSummaryReport' className={classes.link}>
            <List className={classes.li}>
              <Button className={classes.button} onClick={this.toggleDrawer('left', false)}>
                <FileDocumentBoxMultipleOutline />
                <Typography className={classes.listText} variant='body1'>Site Summary Form</Typography>
              </ Button>
            </List>
          </Link>
          <Link to='/Lookup' className={classes.link}>
            <List className={classes.li}>
              <Button className={classes.button} onClick={this.toggleDrawer('left', false)}>
                <Magnify />
                <Typography className={classes.listText} variant='body1'>Category Help</Typography>
              </ Button>
            </List>
          </Link>
        </Typography>
        <Divider />

        {itemListObj.map(ele => {
          return (
            <div key={ele.id}>
              <div className={classes.checkboxContainer}>
                <FormControlLabel
                  className={classes.checkbox}
                  control={
                    <Checkbox
                      checked={checklist[ele.type]}
                      onChange={() => checked(ele.type, checklist[ele.type])}
                      value={ele.type}
                    />
                  }
                />
                <Link to={`${ele.id}`} className={classes.checkboxLink} onClick={this.toggleDrawer('left', false)}>
                  <Typography variant='body2'>{ele.type}</Typography>
                </Link>
              </div>
              <Divider />
            </div>
          )
        })
        }
      </div >
    );


    return (
      <div className={classes.navMenu}>
        <IconButton className={classes.hamburger} onClick={this.toggleDrawer('left', true)} >
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({ checklist: state.checklist })

const mapDispatchToProps = { checked }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavMenu));