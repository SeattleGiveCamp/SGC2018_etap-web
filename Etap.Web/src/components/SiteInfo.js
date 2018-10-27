import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {withStyles, Typography, Input, TextField} from '@material-ui/core/'
import { actionCreator } from '../ducks/formData';

const styles = {}

class SiteInfo extends Component {
  render() {
    const {state, classes} = this.props
    const { formData } = state
    console.log(state);
    return (
      <Fragment>
        <Typography variant='h3'>Site Info</Typography>
        <TextField label='Leader' value={formData.leader} onChange={(e) => actionCreator(e.target.value, "summary", "leader")}/>
      </Fragment>
    );
  };
};

const mapStateToProps = state => ({state});
const mapDispatchToProps = {actionCreator};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteInfo));