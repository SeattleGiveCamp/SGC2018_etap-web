import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {withStyles, TextField, Select, FormControl, InputLabel, OutlinedInput} from '@material-ui/core/';
import { setValue } from '../../ducks/formData';

const styles = {}

class OrgInformation extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state

    return (
      <Fragment>
        <TextField
            label="Team Leader"
            classes={classes.TextField}
            value={formData.summary.leader}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "leader")}
            margin="normal"
            variant="outlined"
        />

        <TextField
            label="Organization Name"
            classes={classes.TextField}
            value={formData.summary.organization}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "organization")}
            margin="normal"
            variant="outlined"
        />

        <TextField
            label="Weather"
            classes={classes.TextField}
            value={formData.summary.weather}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "weather")}
            margin="normal"
            variant="outlined"
        />

        <TextField
            type="date"
            label="Date"
            classes={classes.TextField}
            value={formData.summary.date}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "date")}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
        />

        <FormControl variant="outlined" style={{width:190}}>
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
            classes={classes.TextField}
            value={formData.summary.litterPickupVolunteers}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "litterPickupVolunteers")}
            margin="normal"
            variant="outlined"
            type="number"
        />

        <TextField
            label="Counting Volunteers"npm
            classes={classes.TextField}
            value={formData.summary.litterCountingVolunteers}
            onChange={(e) => this.props.setValue(e.target.value, "summary", "litterCountingVolunteers")}
            margin="normal"
            variant="outlined"
            type="number"
        />
      </Fragment>
    );
  };
};

const mapStateToProps = state => ({state});
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrgInformation));