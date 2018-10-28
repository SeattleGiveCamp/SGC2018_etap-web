import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';

const styles = {}

class WeightAssessment extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state
    return (
      <Fragment>
          <TextField
            label="Total Litter Weight (lbs)"
            className={classes.textField}
            value={formData.weightAssessment.totalWeight}
            onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "totalWeight")}
            margin="normal"
            variant='outlined'
            type='number'
          />

          <TextField
            label="Total Garbage Weight"
            className={classes.textField}
            value={formData.weightAssessment.garbageWeight}
            onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "garbageWeight")}
            margin="normal"
            variant='outlined'
            type='number'
          />

          <TextField
            label="Total recyclables Weight"
            className={classes.textField}
            value={formData.weightAssessment.recycleWeight}
            onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "recycleWeight")}
            margin="normal"
            variant='outlined'
            type='number'
          />

      </Fragment>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WeightAssessment));