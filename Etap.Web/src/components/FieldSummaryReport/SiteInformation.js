import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField } from '@material-ui/core/'
import { setValue, updateInArray } from '../../ducks/formData';
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
        console.warn("setting vals");
        this.props.setValue(position.coords.latitude, "siteInfo", "userLatitude");
        this.props.setValue(position.coords.longitude, "siteInfo", "userLongitude");

        let latBounds = [
          {latitude: position.coords.latitude - .0005, longitude: position.coords.longitude - .0005},
          {latitude: position.coords.latitude + .0005, longitude: position.coords.longitude - .0005},
          {latitude: position.coords.latitude - .0005, longitude: position.coords.longitude + .0005}
        ];
        this.props.updateInArray({latitude: position.coords.latitude + .0005, longitude: position.coords.longitude + .0005}, "siteInfo", "overallSiteBoundary", 0);
        console.warn(this.props.state.siteInfo.overallSiteBoundary);
      });
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
            label="Site Boundary Latitude 1"
            className={classes.textField}
            value={formData.siteInfo.overallSiteBoundary[0].latitude}
            onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary", 0, "latitude")}
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

          {formData.siteInfo.overallSiteBoundary[0].latitude}
      </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteInformation));