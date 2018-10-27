import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {withStyles, Typography, Input, TextField} from '@material-ui/core/'
import { setValue } from '../ducks/formData';

const styles = {}

class CategoryInfo extends Component {
  render() {
    const {state, classes} = this.props
    const { formData } = state
    console.log(state);
    return (
      <Fragment>
        <Typography variant='h3'>whatever</Typography>
        <TextField label='Leader' value={formData.leader} onChange={(e) => setValue(e.target.value, "categories", "category", "group")}/>
      </Fragment>
    );
  };
};

const mapStateToProps = state => ({state});
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteInfo));