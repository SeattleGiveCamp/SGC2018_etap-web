import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, FormControl, FormLabel } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formHeading: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textField: {
      minWidth: '100%',
      marginTop: 10,
      marginBottom: 10,
      margin: 'none',
  },
  formControl: {
    minWidth: '100%',
    marginTop: 15,
    marginBottom: 10,
    margin: 'none',
  }
});

class WeightAssessment extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state
    return (
      <div className={classes.container}>
        <FormControl component="fieldset" className={classes.formHeading}>
          <FormLabel component="legend">Weight Assessment</FormLabel>
        </FormControl>
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
      </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WeightAssessment));