import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';

const styles = {}

class SiteCondition extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state
    return (
      <FormGroup>
          <FormControlLabel
            label="Not Littered"
            control={
                <Checkbox checked={Not Littered} onChange={this.handleChange('Not Littered')} value="Not Littered" />
              }
          />

          <FormControlLabel
            label="Slightly Littered"
            control={
                <Checkbox checked={Slightly Littered} onChange={this.handleChange('Slightly Littered')} value="Slightly Littered" />
              }
          />

          <FormControlLabel
            label="Littered Predominantly"
            control={
                <Checkbox checked={Littered Predominantly} onChange={this.handleChange('Littered Predominantly')} value="Littered Predominantly" />
              }
          />

          <FormControlLabel
            label="Heavily Littered"
            control={
                <Checkbox checked={Heavily Littered} onChange={this.handleChange('Heavily Littered')} value="Heavily Littered" />
              }
          />
      </FormGroup>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteCondition));