import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles, TextField, Select, FormControl, InputLabel, OutlinedInput, FormLabel} from '@material-ui/core/';
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
    justifyContent: 'center'
  },
  textField: {
      maxWidth: 350,
      marginTop: 10,
      marginBottom: 10,
      margin: 'auto'
  },
  formControl: {
    width: '52vw',
    maxWidth: 350,
    marginTop: 15,
    marginBottom: 10,
    margin: 'auto'
  }
});


  

class OrgInformation extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state

    return (
      <div className={classes.container}>
        <FormControl component="fieldset" className={classes.formHeading}>
          <FormLabel component="legend">Organization Information</FormLabel>
        </FormControl>
          <TextField
            label="Team Leader"
            className={classes.textField}
            value={formData.summary.leader}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "leader")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Organization Name"
            className={classes.textField}
            value={formData.summary.organization}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "organization")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Weather"
            className={classes.textField}
            value={formData.summary.weather}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "weather")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            type="date"
            label="Date"
            className={classes.formControl}
            value={formData.summary.date}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "date")}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink={true}>
              Time Spent
          </InputLabel>
            <Select
              native
              value={formData.summary.hoursSpent}
              onChange={(e) => this.props.setValue(e.target.value, "summary", "hoursSpent")}
              input={
                <OutlinedInput
                  name="Time Spent"
                  labelWidth={200}
                />
              }
            >
              <option value="" />
              <option value="1-2 Hours">1-2 Hours</option>
              <option value="3-5 Hours">3-5 Hours</option>
              <option value="5+ Hours">5+ Hours</option>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink={true}>
              Pickup Volunteers
            </InputLabel>
            <Select
              native
              value={formData.summary.litterPickupVolunteers}
              onChange={(e) => this.props.setValue(e.target.value, "summary", "litterPickupVolunteers")}
              input={
                <OutlinedInput
                  name="Pickup Volunteers"
                  labelWidth={200}
                />
              }
            >
              <option value="" />
              <option value="1-5 People">1-5 People</option>
              <option value="6-10 People">6-10 People</option>
              <option value="11-15 People">11-15 People</option>
              <option value="16-20 People">16-20 People</option>
              <option value="20-25 People">20-25 People</option>
              <option value="25+ People">25+ People</option>
            </Select>
          </FormControl>
          
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink={true}>
              Counting Volunteers
            </InputLabel>
            <Select
              native
              value={formData.summary.litterCountingVolunteers}
              onChange={(e) => this.props.setValue(e.target.value, "summary", "litterCountingVolunteers")}
              input={
                <OutlinedInput
                  name="Counting Volunteers"
                  labelWidth={200}
                />
              }
            >
              <option value="" />
              <option value="1-5 People">1-5 People</option>
              <option value="6-10 People">6-10 People</option>
              <option value="11-15 People">11-15 People</option>
              <option value="16-20 People">16-20 People</option>
              <option value="20-25 People">20-25 People</option>
              <option value="25+ People">25+ People</option>
            </Select>
          </FormControl>
        
      </div>
    );
  };
};

const mapStateToProps = state => ({state});
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrgInformation));