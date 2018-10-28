import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, FormControl, FormLabel, FormControlLabel, Checkbox, Divider, FormHelperText } from '@material-ui/core/'
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
      marginTop: 15,
      marginBottom: 15,
      margin: 'auto',
  }
});

class LandUse extends Component {
  render() {
    const { state, classes } = this.props;
    const { formData } = state;
    const {landUse} = formData;
    return (
      <div className={classes.container}>
        <FormControl component="fieldset" className={classes.formHeading}>
          <FormLabel component="legend">Land Use(s)</FormLabel>
          <FormHelperText>Within the boundaries of your site (circle all that apply)</FormHelperText>
        </FormControl>
      <FormControlLabel
      className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.highDensity}
              onChange={(e) => this.props.setValue(!landUse.highDensity, "landUse", "highDensity")}
              value="highDensity"
            />
          }
          label="High density residential (>8 dwellings per acre)"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.lowDensity}
              onChange={(e) => this.props.setValue(!landUse.lowDensity, "landUse", "lowDensity")}
              value="lowDensity"
            />
          }
          label="Low density residential (1-8 dwellings per acre)"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.ruralResidential}
              onChange={(e) => this.props.setValue(!landUse.ruralResidential, "landUse", "ruralResidential")}
              value="ruralResidential"
            />
          }
          label="Rural residential (>1-5 acre lots)"
        />
                  <Divider />

        <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.retail}
              onChange={(e) => this.props.setValue(!landUse.retail, "landUse", "retail")}
              value="retail"
            />
          }
          label="Retail and wholesale (incl. post offices and hotels)"
        />
                  <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.commercial}
              onChange={(e) => this.props.setValue(!landUse.commercial, "landUse", "commercial")}
              value="commercial"
            />
          }
          label="Commercial and services (incl. local govt, education, research
            centers, offices, churches, hospitals, and military)"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.lightIndustrial}
              onChange={(e) => this.props.setValue(!landUse.lightIndustrial, "landUse", "lightIndustrial")}
              value="lightIndustrial"
            />
          }
          label="Light and other industrial (incl. light and unspecified
            industrial, warehousing, food processing)"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.heavyIndustrial}
              onChange={(e) => this.props.setValue(!landUse.heavyIndustrial, "landUse", "heavyIndustrial")}
              value="heavyIndustrial"
            />
          }
          label="Heavy Industrial (incl. heavy fabrication and assembly raw
            materials processing – esp. mechanical, chemical, or
            heat processing)"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.urbanPark}
              onChange={(e) => this.props.setValue(!landUse.urbanPark, "landUse", "urbanPark")}
              value="urbanPark"
            />
          }
          label="Urban park (leisure, ornamental, zoo, botanical)"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.schools}
              onChange={(e) => this.props.setValue(!landUse.schools, "landUse", "schools")}
              value="schools"
            />
          }
          label="K-12 schools"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.recreational}
              onChange={(e) => this.props.setValue(!landUse.recreational, "landUse", "recreational")}
              value="recreational"
            />
          }
          label="Recreational (incl. Golf courses, bike trails, etc.)"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.cemetery}
              onChange={(e) => this.props.setValue(!landUse.cemetery, "landUse", "cemetery")}
              value="cemetery"
            />
          }
          label="Cemetery"
        />
          <Divider />

             <FormControlLabel
             className={classes.formControl}
          control={
            <Checkbox
              checked={landUse.park}
              onChange={(e) => this.props.setValue(!landUse.park, "landUse", "park")}
              value="park"
            />
          }
          label="Regional/ state/ national park or wilderness"
        />
      </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandUse));