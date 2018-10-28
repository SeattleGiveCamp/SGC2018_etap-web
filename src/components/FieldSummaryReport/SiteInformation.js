import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';
import getLocation from '../../lib/location';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}
class SiteInformation extends Component {
  constructor(props) {
    super(props);

    getLocation()
      .then((position) => {
        this.props.setValue(position.coords.latitude, "siteInfo", "userLatitude");
        this.props.setValue(position.coords.longitude, "siteInfo", "userLongitude");

        if(Object.keys(props.state.formData.siteInfo.overallSiteBoundary).length === 0) {
          let latBounds = {
            0: {latitude: position.coords.latitude + .0005, longitude: position.coords.longitude + .0005},
            1: {latitude: position.coords.latitude - .0005, longitude: position.coords.longitude - .0005},
            2: {latitude: position.coords.latitude + .0005, longitude: position.coords.longitude - .0005},
            3: {latitude: position.coords.latitude - .0005, longitude: position.coords.longitude + .0005}
          };
          this.props.setValue(latBounds, "siteInfo", "overallSiteBoundary");
        }
      }).catch(() => {
        console.warn("no location found, using defaults");
        this.props.setValue(0, "siteInfo", "userLatitude");
        this.props.setValue(0, "siteInfo", "userLongitude");

        if(Object.keys(props.state.formData.siteInfo.overallSiteBoundary).length === 0) {
          let latBounds = {
            0: {latitude: 0, longitude: 0},
            1: {latitude: 0, longitude: 0},
            2: {latitude: 0, longitude: 0},
            3: {latitude: 0, longitude: 0}
          };
          this.props.setValue(latBounds, "siteInfo", "overallSiteBoundary");
        }
      });
  }

  createLatLongs = () => {
    const { state, classes } = this.props
    const { formData } = state

    let fields = [];
    for (let i = 0; i < Object.keys(formData.siteInfo.overallSiteBoundary).length; i++) {
      fields.push(<TextField
          label={"Lat Boundary " + (i + 1)}
          className={classes.textField}
          value={formData.siteInfo.overallSiteBoundary[i].latitude.toString()}
          onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary", i, "latitude")}
          margin="normal"
          variant='outlined'
      />);

      fields.push(<TextField
        label={"Long Boundary " + (i + 1)}
        className={classes.textField}
        value={formData.siteInfo.overallSiteBoundary[i].longitude.toString()}
        onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary", i, "longitude")}
        margin="normal"
        variant='outlined'
      />);
    }
    return fields;
  }

  render() {
    const { state, classes } = this.props
    const { formData } = state
    return (
      <div className={classes.container}>
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

          {this.createLatLongs()}
      </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteInformation));