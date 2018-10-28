import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, FormControl, FormLabel, FormHelperText } from '@material-ui/core/'
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
        maxWidth: 350,
        marginTop: 10,
        marginBottom: 10,
        margin: 'auto',
    }
});

class PreventativeMeasures extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state

    return (
        <div className={classes.container}>
          <FormControl component="fieldset" className={classes.formHeading}>
            <FormLabel component="legend">Preventative measures</FormLabel>
            <FormHelperText>Indicate a number to all that apply</FormHelperText>
          </FormControl>

          <TextField
            label="Capture Devices"
            className={classes.textField}
            value={formData.preventativeMeasures.captureDevices}
            onChange={(e) => this.props.setValue(e.target.value, "preventativeMeasures", "captureDevices")}
            margin="normal"
            variant='outlined'
            type="number"
          />

          <TextField
            label="Waste Receptacles"
            className={classes.textField}
            value={formData.preventativeMeasures.wasteReceptacles}
            onChange={(e) => this.props.setValue(e.target.value, "preventativeMeasures", "wasteReceptacles")}
            margin="normal"
            variant='outlined'
            type="number"
          />

          <TextField
            label="Signage"
            className={classes.textField}
            value={formData.preventativeMeasures.signage}
            onChange={(e) => this.props.setValue(e.target.value, "preventativeMeasures", "signage")}
            margin="normal"
            variant='outlined'
            type="number"
          />

          <TextField
            label="Sharp Receptacles"
            className={classes.textField}
            value={formData.preventativeMeasures.sharpReceptacles}
            onChange={(e) => this.props.setValue(e.target.value, "preventativeMeasures", "sharpReceptacles")}
            margin="normal"
            variant='outlined'
            type="number"
          />

          <TextField
            label="Cigarette Receptacles"
            className={classes.textField}
            value={formData.preventativeMeasures.cigaretteReceptacles}
            onChange={(e) => this.props.setValue(e.target.value, "preventativeMeasures", "cigaretteReceptacles")}
            margin="normal"
            variant='outlined'
            type="number"
          />

          <TextField
            label="Other (policies, etc.)"
            className={classes.textField}
            value={formData.preventativeMeasures.other}
            onChange={(e) => this.props.setValue(e.target.value, "preventativeMeasures", "other")}
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PreventativeMeasures));