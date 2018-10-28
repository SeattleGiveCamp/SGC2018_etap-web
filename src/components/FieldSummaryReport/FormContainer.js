import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SiteInformation from './SiteInformation';
import SiteCondition from './SiteCondition';
import WeightAssessment from './WeightAssessment';
import LandUse from './LandUse.js';
import OrgInformation from './OrgInformation';
import Button from '@material-ui/core/Button';
import GeneralObservations from './GeneralObservations.js';
import HabitatInformation from './HabitatInformation';
import PreventativeMeasures from './PreventativeMeasures';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'auto',
  },
  submitButton: {
    backgroundColor: '#60783A',
    color: '#ffffff',
    margin: 'auto',
    width: '200px',
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  submit = () => {
    let config = {
      headers: {
        "Authorization": "Token " + this.props.state.formData.userInfo.token,
      }
    }
    
    let form = { ...this.props.state.formData, siteName: this.props.state.formData.siteInfo.siteName };
    axios.post('https://sgc2018-etap-service.herokuapp.com/api/v1/litter', form, config)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));

  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Org Info" />
              <Tab label="Site Info" />
              <Tab label="Site Condition" />
              <Tab label="Weight Assessment" />
              <Tab label="Land Use" />
              <Tab label="Habitat Info" />
              <Tab label="Preventative Measures" />
              <Tab label="General Observations" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><OrgInformation /></TabContainer>}
          {value === 1 && <TabContainer><SiteInformation /></TabContainer>}
          {value === 2 && <TabContainer><SiteCondition /></TabContainer>}
          {value === 3 && <TabContainer><WeightAssessment /></TabContainer>}
          {value === 4 && <TabContainer><LandUse /></TabContainer>}
          {value === 5 && <TabContainer><HabitatInformation /></TabContainer>}
          {value === 6 && <TabContainer><PreventativeMeasures /></TabContainer>}
          {value === 7 && <TabContainer><GeneralObservations /></TabContainer>}
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button variant='outlined' className={classes.submitButton} onClick={this.submit}>Submit</Button>
        </div>
      </Fragment>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ state });


export default connect(mapStateToProps)(withStyles(styles)(ScrollableTabsButtonAuto));