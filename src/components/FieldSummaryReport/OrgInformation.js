import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {withStyles, TextField, Select, FormControl, InputLabel, OutlinedInput} from '@material-ui/core/';
import { setValue } from '../../ducks/formData';

const styles = {
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
  },
  formControl: {
    width: '52vw',
    maxWidth: 350,
    marginTop: 15,
    marginBottom: 10,
    margin: 'auto',
}
}

class OrgInformation extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state

    return (
      <div className={classes.container}>
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

        <TextField
            label="Pickup Volunteers"
            className={classes.textField}
            value={formData.summary.litterPickupVolunteers}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "litterPickupVolunteers")}
            margin="normal"
            variant="outlined"
            type="number"
        />

        <TextField
            label="Counting Volunteers"npm
            className={classes.textField}
            value={formData.summary.litterCountingVolunteers}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "litterCountingVolunteers")}
            margin="normal"
            variant="outlined"
            type="number"
        />
      </div>
    );
  };
};

const mapStateToProps = state => ({state});
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrgInformation));