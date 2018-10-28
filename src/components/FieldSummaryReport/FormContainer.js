import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
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
import cookies from 'react-cookies';
import { setValue } from '../../ducks/formData';

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
    width: '95%',
    backgroundColor: '#60783A',
    color: '#ffffff',
    margin: 'none',
    minWidth: '100%',
  },
  submitButtonDisabled: {
    width: '95%',
    backgroundColor: '#60783A',
    opacity: .5,
    color: '#ffffff',
    margin: 'none',
    minWidth: '100%',
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0
  };

  componentDidMount() {
    const cookie = cookies.load("token");
    if(cookie !== undefined && cookie !== null && cookie.length > 0) {
      this.props.setValue(cookie, 'userInfo', 'token');
    }
  }

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
    const { state, classes } = this.props
    const { value } = this.state;
    const { formData } = state

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
          {formData.userInfo.token === "" ? 'Please login to submit' : ''}
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <br />
          <Button variant='outlined' disabled={formData.userInfo.token === "" ? true : false} className={formData.userInfo.token === "" ? classes.submitButtonDisabled : classes.submitButton} onClick={this.submit}>Submit</Button>
        </div>
      </Fragment>
    );
  }
}


ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScrollableTabsButtonAuto));