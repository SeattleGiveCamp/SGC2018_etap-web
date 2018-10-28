import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

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
import { FileDocumentBoxMultipleOutline, CheckboxBlankOutline, Magnify} from 'mdi-material-ui';

import {checked} from '../ducks/checklist.js';

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

    const sideList = (
      <div className={classes.list}>
        <Typography className={classes.menu} variant='h6'>Menu</Typography>
        <Typography>
          <Link to='/FieldSummaryReport' className={classes.link}>
            <List className={classes.li}>
              <Button className={classes.button} onClick={this.toggleDrawer('left', false)}>
                <FileDocumentBoxMultipleOutline />
                <Typography className={classes.listText} variant='body1'>Site Summary Form</Typography>
              </ Button>
            </List>
          </Link><Link to='/Lookup' className={classes.link}>
            <List className={classes.li}>
              <Button className={classes.button} onClick={this.toggleDrawer('left', false)}>
                <Magnify/>
                <Typography className={classes.listText} variant='body1'>Category Help</Typography>
              </ Button>
            </List>
          </Link>
        </Typography>
        <Divider />

        <div className={classes.checkboxContainer}>
          <FormControlLabel
            className={classes.checkbox}
            control={
              <Checkbox
                checked={checklist.foo}
                onChange={() => checked('foo', checklist.foo)}
                value="foo"
              />
            }
          />
          <Link to='foo' className={classes.checkboxLink} onClick={this.toggleDrawer('left', false)}>
          <Typography variant='body2'>Foo</Typography>
          </Link>
        </div>
        <Divider />

      <div className={classes.checkboxContainer}>
          <FormControlLabel
            className={classes.checkbox}
            control={
              <Checkbox
                checked={checklist.bar}
                onChange={() => checked('bar', checklist.bar)}
                value="bar"
              />
            }
          />
          <Link to='bar' className={classes.checkboxLink} onClick={this.toggleDrawer('left', false)}>
          <Typography variant='body2'>Bar</Typography>
          </Link>
        </div>
        <Divider />

      <div className={classes.checkboxContainer}>
          <FormControlLabel
            className={classes.checkbox}
            control={
              <Checkbox
                checked={checklist.baz}
                onChange={() => checked('baz', checklist.baz)}
                value="baz"
              />
            }
          />
          <Link to='baz' className={classes.checkboxLink} onClick={this.toggleDrawer('left', false)}>
          <Typography variant='body2'>Baz</Typography>
          </Link>
        </div>
        <Divider />
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

const mapStateToProps = state => ({checklist: state.checklist})

const mapDispatchToProps = {checked}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavMenu));