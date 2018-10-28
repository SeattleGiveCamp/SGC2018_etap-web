import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField, Button, FormLabel, FormControl } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';
import getLocation from '../../lib/location';

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
  locationButton: {
    border: '1px solid rgba(0, 0, 0, 0.23)'
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

class SiteInformation extends Component {
  createLatLongs = () => {
    const { state, classes } = this.props
    const { formData } = state

    let fields = [];
    for (let i = 0; i < Object.keys(formData.siteInfo.overallSiteBoundary).length; i++) {
      fields.push(<TextField
          label={"Lat Boundary " + (i + 1)}
          className={classes.textField}
          value={formData.siteInfo.overallSiteBoundary[i].latitude.toString()}
          onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary", i.toString(), "latitude")}
          margin="normal"
          variant='outlined'
      />);

      fields.push(<TextField
        label={"Long Boundary " + (i + 1)}
        className={classes.textField}
        value={formData.siteInfo.overallSiteBoundary[i].longitude.toString()}
        onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary", i.toString(), "longitude")}
        margin="normal"
        variant='outlined'
      />);
    }
    return fields;
  }

  createDeleteButton = () => {
    const { state, classes } = this.props
    const { formData } = state

    let fields = [];
    if (Object.keys(this.props.state.formData.siteInfo.overallSiteBoundary).length > 0) {
      fields.push(<Button className={classes.locationButton} onClick={this.removeLocation}>
        Remove Last Location
      </Button>)
    }
    return fields;
  }

  captureCurrentLocation = () => {
    const { state, classes } = this.props
    const { formData } = state

    getLocation()
      .then((position) => {
        this.props.setValue(position.coords.latitude, "siteInfo", "userLatitude");
        this.props.setValue(position.coords.longitude, "siteInfo", "userLongitude");

        let newKey = Object.keys(formData.siteInfo.overallSiteBoundary).length;
        this.props.setValue({latitude: position.coords.latitude, longitude: position.coords.longitude}, "siteInfo", "overallSiteBoundary", newKey.toString());
      }).catch(() => {
        console.warn("no location found, using defaults");
        this.props.setValue(0, "siteInfo", "userLatitude");
        this.props.setValue(0, "siteInfo", "userLongitude");

        let newKey = Object.keys(formData.siteInfo.overallSiteBoundary).length;
        this.props.setValue({latitude: 0, longitude: 0}, "siteInfo", "overallSiteBoundary", newKey.toString());
      });
  }

  removeLocation = () => {
    const { state, classes } = this.props
    const { formData } = state

    let lastKey = Object.keys(formData.siteInfo.overallSiteBoundary).length;

    if(lastKey > 0) {
      delete this.props.state.formData.siteInfo.overallSiteBoundary[lastKey-1];
      // very jank method to force the page to refresh
      this.props.setValue(this.props.state.formData.siteInfo.userLongitude, "siteInfo", "userLongitude");
    }
  }

  render() {
    const { state, classes } = this.props
    const { formData } = state
    return (
      <div className={classes.container}>
        <FormControl component="fieldset" className={classes.formHeading}>
          <FormLabel component="legend">Site Information</FormLabel>
        </FormControl>
          <TextField
            label="Site Name"
            className={classes.textField}
            value={formData.siteInfo.siteName}
            onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "siteName")}
            margin="normal"
            variant='outlined'
          />

          <TextField
            label="Site Location"
            className={classes.textField}
            value={formData.siteInfo.siteLocation}
            onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "siteLocation")}
            margin="normal"
            variant='outlined'
          />

          <TextField
            label="Notes"
            className={classes.textField}
            value={formData.siteInfo.boundaryNotes}
            onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "boundaryNotes")}
            margin="normal"
            variant='outlined'
          />

          <TextField
            label="Total Sq. Ft."
            className={classes.textField}
            value={formData.siteInfo.totalSiteArea}
            onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "totalSiteArea")}
            margin="normal"
            variant='outlined'
          />

          {/* <div id="mapid" style="width: 600px; height: 400px;"></div> */}

          {this.createLatLongs()}

          <Button className={classes.locationButton} onClick={this.captureCurrentLocation}>
            Add Current Location
          </Button>

          {this.createDeleteButton()}
      </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteInformation));