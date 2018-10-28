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
      maxWidth: 350,
      marginTop: 10,
      marginBottom: 10,
      margin: 'none',
  },
  formControl: {
    maxWidth: 350,
    marginTop: 15,
    marginBottom: 10,
    margin: 'none',
  },
  map: {
    width: '100%', 
    height: '400px'
  }
});

var mymap;
var currentPoly;

class SiteInformation extends Component {
  componentDidMount() {
    // Creates a default map with a view somewhere in WA
    // This will move after the user adds a point to the map
    mymap = L.map('mapid').setView([47.66943521141225,-122.14679157614904], 17);

    // Adds the map to the page after it initalizes
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(mymap);
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
          onChange={(e) => { this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary", i.toString(), "latitude"); this.updateMapPolygon()}}
          margin="normal"
          variant='outlined'
      />);

      fields.push(<TextField
        label={"Long Boundary " + (i + 1)}
        className={classes.textField}
        value={formData.siteInfo.overallSiteBoundary[i].longitude.toString()}
        onChange={(e) => { this.props.setValue(e.target.value, "siteInfo", "overallSiteBoundary", i.toString(), "longitude"); this.updateMapPolygon()}} 
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

  updateMapPolygon(lat = null, long = null) {
    const { state, classes } = this.props
    const { formData } = state

    // Creates an array of type [[lat, long], [lat,long]] from the form object
    // Have to convert because the form uses an odd model to store data
    var latlongarray = [];
    for(var latlong in formData.siteInfo.overallSiteBoundary) {
      latlongarray.push([formData.siteInfo.overallSiteBoundary[latlong].latitude, formData.siteInfo.overallSiteBoundary[latlong].longitude]);
    }
    // If the user has passed in a lat, long (only when a new one is created) add it to the array
    // This avoids waiting for the state to change
    if(lat && long) latlongarray.push([lat, long]);

    // If we only have one point, check where we should center the view for the user
    // There's two ifs because there are cases where we need to pull from one location or
    // from the params
    if(latlongarray.length === 1 && lat && long) {
      mymap.setView([lat, long], 17);
    }
    else if (latlongarray.length === 1) {
      mymap.setView([latlongarray[0][0], latlongarray[0][1]], 17);
    }

    // Create a polygon using the lat/long array
    var poly = L.polygon(latlongarray);

    // If we already have a polygon, clear it out so that they don't layer over each other
    if (currentPoly) {
      currentPoly.removeFrom(mymap);
    }

    // Add the polygon to the map!
    currentPoly = poly;
    poly.addTo(mymap).bindPopup("Current cleanup site bounds");
  }

  captureCurrentLocation = () => {
    const { state, classes } = this.props
    const { formData } = state

    getLocation()
      .then((position) => {
        this.props.setValue(position.coords.latitude, "siteInfo", "userLatitude");
        this.props.setValue(position.coords.longitude, "siteInfo", "userLongitude");

        this.updateMapPolygon(position.coords.latitude, position.coords.longitude);

        let newKey = Object.keys(formData.siteInfo.overallSiteBoundary).length;
        this.props.setValue({latitude: position.coords.latitude, longitude: position.coords.longitude}, "siteInfo", "overallSiteBoundary", newKey.toString());
      }).catch((e) => {
        console.error(e);
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

      this.updateMapPolygon();
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

          {this.createLatLongs()}

          {this.createDeleteButton()}

          <div id={"mapid"} className={classes.map} ></div>

          <Button className={classes.locationButton} onClick={this.captureCurrentLocation}>
            Add Current Location
          </Button>
      </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteInformation));