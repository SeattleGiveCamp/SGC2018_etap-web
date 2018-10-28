import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, FormControl, InputLabel, Select, OutlinedInput } from '@material-ui/core/'
import { setValue } from '../../ducks/formData';

const styles = {}

class LandUse extends Component {
  render() {
    const { state, classes } = this.props
    const { formData } = state
    return (
      <Fragment>

         <FormControl variant="outlined" >
          <InputLabel
          >
            Land Use
          </InputLabel>
          <Select
            native
            value={formData.landUse}
            onChange={(e) => this.props.setValue(e.target.value, "landUse")}
            input={
              <OutlinedInput
                name="landUse"
                labelWidth={375}
              />
            }
          >
            <option value="" />
            <option value={10}>High density residential (>8 dwellings per acre)</option>
            <option value={20}>Low density residential (1-8 dwellings per acre)</option>
            <option value={30}>Rural residential (>1-5 acre lots)</option>
            <option value={30}>Retail and wholesale (incl. post offices and hotels)</option>
            <option value={30}>Commercial and services (incl. local govt, education, research
centers, offices, churches, hospitals, and military)</option>
            <option value={30}>Light and other industrial (incl. light and unspecified
industrial, warehousing, food processing)</option>
            <option value={30}>Heavy Industrial (incl. heavy fabrication and assembly raw
materials processing – esp. mechanical, chemical, or
heat processing)</option>
            <option value={30}>Urban park (leisure, ornamental, zoo, botanical)</option>
            <option value={30}>K-12 schools</option>
            <option value={30}>Recreational (incl. Golf courses, bike trails, etc.)</option>
            <option value={30}>Cemetery</option>
            <option value={30}>Regional/ state/ national park or wilderness</option>

          </Select>
        </FormControl>

      </Fragment>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {setValue};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandUse));