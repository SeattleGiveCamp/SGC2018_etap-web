import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, FormControl, FormLabel } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'


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
    width: '31%',
    marginLeft: 10,
  },
  weightContainer: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%',
    marginTop: 10,
    marginBottom: 10,
    margin: 'none',
    justifyContent: 'center',
    alignItems: 'center',
},
weightField: {
  marginTop: 10,
  width: '60%',
},
});

class WeightAssessment extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state
    return (
      <div className={classes.container}>
        <FormControl component="fieldset" className={classes.formHeading}>
          <FormLabel component="legend">Weight Assessment (Totals)</FormLabel>
        </FormControl>

        <div className={classes.weightContainer}>
          <TextField
            label="Total Litter Weight"
            className={classes.weightField}
            value={formData.weightAssessment.totalWeight}
            onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "totalWeight")}
            margin="normal"
            variant='outlined'
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink={true}>
              Unit
          </InputLabel>
            <Select
              native
              value={formData.weightAssessment.weightUnit}
              onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "weightUnit")}
              input={
                <OutlinedInput
                  name="unit"
                  labelWidth={75}
                />
              }
            >
              <option value=""></option>
              <option value="lbs">lbs</option>
              <option value="grams">grams</option>
              <option value="ounces">ounces</option>
              <option value="ounces">gn</option>

            </Select>
          </FormControl>
        </div>

        <div className={classes.weightContainer}>
          <TextField
            label="Total Garbage Weight"
            className={classes.weightField}
            value={formData.weightAssessment.garbageWeight}
            onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "garbageWeight")}
            margin="normal"
            variant='outlined'
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink={true}>
              Unit
          </InputLabel>
            <Select
              native
              value={formData.weightAssessment.garbageUnit}
              onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "garbageUnit")}
              input={
                <OutlinedInput
                  name="unit"
                  labelWidth={75}
                />
              }
            >
              <option value=""></option>
              <option value="lbs">lbs</option>
              <option value="grams">grams</option>
              <option value="ounces">ounces</option>
              <option value="ounces">gn</option>

            </Select>
          </FormControl>
        </div>
        

        <div className={classes.weightContainer}>
          <TextField
            label="Total Recycle Weight"
            className={classes.weightField}
            value={formData.weightAssessment.recycleWeight}
            onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "recycleWeight")}
            margin="normal"
            variant='outlined'
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink={true}>
              Unit
          </InputLabel>
            <Select
              native
              value={formData.weightAssessment.recycleUnit}
              onChange={(e) => this.props.setValue(e.target.value, "weightAssessment", "recycleUnit")}
              input={
                <OutlinedInput
                  name="unit"
                  labelWidth={75}
                />
              }
            >
              <option value=""></option>
              <option value="lbs">lbs</option>
              <option value="grams">grams</option>
              <option value="ounces">ounces</option>
              <option value="ounces">gn</option>

            </Select>
          </FormControl>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WeightAssessment));