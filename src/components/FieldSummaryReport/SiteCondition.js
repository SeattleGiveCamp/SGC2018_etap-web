import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography, TextField} from '@material-ui/core/';
import Checkbox from '@material-ui/core/Checkbox';
import { handleChange } from '../../ducks/formData';

const styles = {
    container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}
// handleChange = name => event => {
//     this.setState({ [name]: event.target.checked });
//   };


class SiteCondition extends Component {
  render() {
    const { state, classes } = this.props;
    const { formData } = state;
    const {NotLittered,SlightlyLittered,LitteredPredominantly,HeavilyLittered} = this.state;
    const error = [NotLittered,SlightlyLittered,LitteredPredominantly,HeavilyLittered].filter(v => v).length !== 2;
    return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>    
      <FormGroup>
          <FormControlLabel
            label="Not Littered"
            value={formData.SiteCondition.trash}
            // onChange={(e) => this.props.setValue(e.target.value, "siteInfo", "siteName")}
            control={
                <Checkbox checked={NotLittered} onChange={this.handleChange('NotLittered')} value="NotLittered" />
              }
          />

          <FormControlLabel
            label="Slightly Littered"
            value={formData.SiteCondition.trash}
            control={
                <Checkbox checked={SlightlyLittered} onChange={this.handleChange('SlightlyLittered')} value="SlightlyLittered" />
              }
          />

          <FormControlLabel
            label="Littered Predominantly"
             value={formData.SiteCondition.trash}
            control={
                <Checkbox checked={LitteredPredominantly} onChange={this.handleChange('LitteredPredominantly')} value="LitteredPredominantly" />
              }
          />

          <FormControlLabel
            label="Heavily Littered"
             value={formData.SiteCondition.trash}
            control={
                <Checkbox checked={HeavilyLittered} onChange={this.handleChange('HeavilyLittered')} value="HeavilyLittered" />
              }
          />
      </FormGroup>
    </FormControl>
       </div>
    );
  };
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {handleChange};
// CheckboxesGroup.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(CheckboxesGroup);


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SiteCondition));