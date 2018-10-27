import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {withStyles, Typography, Input, TextField} from '@material-ui/core/'
import { setValue } from '../ducks/formData';

const styles = {}

class SiteInfo extends Component {
  render() {
    const {state, classes} = this.props
    const { formData } = state
    console.log(state);
    return (
      <Fragment>
        <Typography variant='h3'>Site Info</Typography>
        <TextField label='Leader' value={formData.summary.leader}
          onChange={(e) => this.props.setValue(e.target.value, "summary", "leader")}/>
      </Fragment>
    );
  };
};

const mapStateToProps = state => ({state});
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteInfo));