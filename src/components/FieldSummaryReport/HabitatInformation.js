import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, FormHelperText, FormControl, FormLabel } from '@material-ui/core/'
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

class HabitatInformation extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state

    return (
      <div className={classes.container}>
        <FormControl component="fieldset" className={classes.formHeading}>
          <FormLabel component="legend">Proximity to the following</FormLabel>
          <FormHelperText>Estimate distance in feet. If more than 100 feet away from site boundaries, record N/A. (Please take photos of site, including critical proximity features)</FormHelperText>
        </FormControl>
          <TextField
            label="Waterways"
            className={classes.textField}
            value={formData.habitatInformation.waterways}
            onChange={(e) => this.props.setValue(e.target.value, "habitatInformation", "waterways")}
            margin="normal"
            variant='outlined'
            type="number"
          />

          <TextField
            label="Storm Drains"
            className={classes.textField}
            value={formData.habitatInformation.stormDrains}
            onChange={(e) => this.props.setValue(e.target.value, "habitatInformation", "stormDrains")}
            margin="normal"
            variant='outlined'
            type="number"
          />

          <TextField
            label="Critical Habitat"
            className={classes.textField}
            value={formData.habitatInformation.criticalHabitat}
            onChange={(e) => this.props.setValue(e.target.value, "habitatInformation", "criticalHabitat")}
            margin="normal"
            variant='outlined'
            type="number"
          />
      </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HabitatInformation));