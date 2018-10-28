import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import { setValue } from "../../ducks/formData";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {

  render() {
    const { state, classes } = this.props
    const { formData } = state

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Site Condition (Select One)</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={formData.siteConditions.trash}
            onChange={(e) => this.props.setValue(e.target.value, "siteConditions", "trash")}
          >
            <FormHelperText>Effectively no trash is observed in the assessment area. Approximately less than one piece per two car lengths on average. There may be some small pieces in the area, but they are not obvious at first glance. One individual could easily clean up all trash observed in a very short time frame.</FormHelperText>
            <FormControlLabel value="Not Littered" control={<Radio />} label="Not Littered" />
            <Divider />
            <FormHelperText>Predominantly free of trash except for a few littered areas. On average, one piece per two car lengths. The trash could be collected by one or two individuals in a short period of time.</FormHelperText>
            <FormControlLabel value="Slightly Littered" control={<Radio />} label="Slightly Littered" />
            <Divider />
            <FormHelperText> Littered except for a few clean areas. Trash is widely/evenly distributed and/or small accumulations are visible on the street, sidewalks, or inlets. At least two or three pieces per car length on average. It would take a more organized effort to remove all trash from the area.</FormHelperText>
            <FormControlLabel value="Predominantly Littered" control={<Radio />} label="Predominantly Littered" />
            <Divider />
            <FormHelperText>Trash is continuously seen throughout the assessment area,
Large piles and a strong impression of lack of concern for litter in the area. There is often significant litter along gutters. It would take a large number of people during an organized effort to remove all trash from the area.</FormHelperText>
            <FormControlLabel value="Very Littered" control={<Radio />} label="Very Littered" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RadioButtonsGroup));