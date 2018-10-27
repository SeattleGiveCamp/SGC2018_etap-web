import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {withStyles, Typography} from '@material-ui/core/'

const styles = {}

class Template extends Component {
  render() {
    const {state, classes} = this.props
    console.log(state);
    return (
      <Fragment>
        <Typography variant='h3'>Template</Typography>
      </Fragment>
    );
  };
};

const mapStateToProps = state => ({state});
const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Template));