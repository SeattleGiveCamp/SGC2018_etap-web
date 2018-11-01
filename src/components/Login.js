import React, { Fragment } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button"
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { setValue } from "../ducks/formData";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import cookies from 'react-cookies';

const styles = theme => ({
  root: {
    marginTop: '25vh',
    display: 'flex',
    flexDirection: "column"
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  submitButton: {
    backgroundColor: '#60783A',
    color: '#ffffff',
    margin: 'none',
    minWidth: '100%',
    '&:active': {
      backgroundColor: '#4d602e',
    }
  },
  loginText: {
    textAlign: 'center',
  },
  fetchingUser: {
    color: 'orange',
    position: 'fixed  ',
    marginTop: 4,
    marginLeft: 0,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  hidden: {
    display: 'none',
  },
});

class Login extends React.Component {

  state = {
    isLoggedIn: false,
    userName: undefined,
    showPassword: false,
    fetchingUser: false,
    invalidUser: false,
    data: [],
    show: {},
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  submit = async () => {
    let form = { user: { userName: this.props.state.formData.userInfo.userName, password: this.props.state.formData.userInfo.password } };

    await this.setState({ fetchingUser: true });
    axios.post(`${process.env.API_URL}/login`, form)
      .then(response => {
        let userName = response.data.user.userName;
        cookies.save("token", response.data.user.token);
        window.localStorage.setItem("userName", userName);
        this.setState({ isLoggedIn: true, fetchingUser: false, invalidUser: false });
        location.reload();
      })
      .catch(err => {
        if (JSON.stringify(err).includes('422') || JSON.stringify(err).includes('500')) {
          this.setState({ invalidUser: true, fetchingUser: false });
        }
      });
  }

  componentDidMount() {
    if (cookies.load('token')) {
      axios.get(`${process.env.API_URL}/api/v1/litter`)
      .then(response => {
        let  show = {}
        Object.keys(response.data).forEach(ele => show[response.data[ele].siteName] = false)
        console.log(response.data);
        this.setState({ data: response.data, show})
        })
    }
  }

  showInfo = (e) => {
    console.log(this.state.show)
    this.setState({show: {...this.state.show, [e.target.id]: !this.state.show[e.target.id]}}, () => console.log(this.state))
  }

  render() {
    const { state, classes } = this.props
    const { formData } = state
    const loginForm = (
      <div className={classes.root}>
        <Typography className={classes.loginText} variant='h5'>Login</Typography>
        <FormControl >
          <InputLabel htmlFor="user-name">User Name</InputLabel>
          <Input
            id="user-name"
            value={formData.userInfo.userName}
            onChange={(e) => this.props.setValue(e.target.value, "userInfo", "userName")}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="user-password">Password</InputLabel>
          <Input
            id="user-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={formData.userInfo.password}
            onChange={(e) => this.props.setValue(e.target.value, "userInfo", "password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        {this.state.invalidUser && <Typography className={classes.errorText} variant='overline'>Invalid Username/Password</Typography>}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button variant='outlined' disabled={this.state.fetchingUser ? true : false} className={classes.submitButton} onClick={this.submit}>Submit</Button>
          {this.state.fetchingUser && <CircularProgress size={24} className={classes.fetchingUser} />}
        </div>
      </div>
    );
    const userCard = (
      <Fragment>
        <Typography align="center" variant="headline">
          User: {window.localStorage.getItem("userName")}
        </Typography>
        <div>
        <Typography align="center" variant="body1">
         click on a site to expand the data
        </Typography>
          <List>
            {this.state.data.map((ele, i) => {
              const { siteInfo, landUse, habitatInformation, generalObservation, summary, weightAssessment, categories, siteConditions, preventativeMeasures } = ele
              return (
                <ListItem key={i} style={{ display: 'inline-block' }}>
                  <Typography style={{textDecoration: 'underline', cursor: 'pointer'}} id={ele.siteName} variant='headline' onClick={this.showInfo}>{ele.siteName} </Typography>
                  <br />
                  <ul className={this.state.show[ele.siteName] ? null : classes.hidden}>
                    <li>
                      <strong>site info: </strong>
                      <ul>
                        <li>Site Name: {siteInfo.siteName}</li>
                        <li>Site Location: {siteInfo.siteLocation}</li>
                        <li>Total Site Area: {siteInfo.totalSiteArea}</li>
                        <li>Boundary Notes: {siteInfo.boundaryNotes}</li>
                        <li>Overall Site Boundaries:
                          <ul>
                          { !siteInfo.overallSiteBoundary ? 'N/A' : Object.keys(siteInfo.overallSiteBoundary).map(corner => <li key={corner} >Corner {parseInt(corner) + 1}: latitude: {siteInfo.overallSiteBoundary[corner].latitude}, longitude: {siteInfo.overallSiteBoundary[corner].longitude}</li>)}
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>org info:</strong>
                      <ul>
                        <li>Organization: {summary.organization}</li>
                        <li>Leader: {summary.leader}</li>
                        <li>Date: {summary.date}</li>
                        <li>Hours Spent: {summary.hoursSpent}</li>
                        <li>Weather: {summary.weather}</li>
                        <li>Litter Counting Volunteers: {summary.litterCountingVolunteers}</li>
                        <li>Litter Pickup Volunteers: {summary.litterPickupVolunteers}</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Site Conditions: </strong> {siteConditions.trash}
                    </li>
                    <li>
                      <strong>Weight Assessment: </strong>
                      <ul>
                        <li>Total Litter Weight: {weightAssessment.totalWeight} {weightAssessment.weightUnit}</li>
                        <li>Total Garbage Weight: {weightAssessment.garbageWeight} {weightAssessment.garbageUnit}</li>
                        <li>Total Recycle Weight: {weightAssessment.recycleWeight} {weightAssessment.recycleUnit}</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Land Use: </strong>
                        <ul>
                          {landUse.highDensity && <li>High density residential (>8 dwellings per acre)</li>}
                          {landUse.lowDensity && <li>Low density residential (1-8 dwellings per acre)</li>}
                          {landUse.ruralResidential && <li>Rural residential (>1-5 acre lots)</li>}
                          {landUse.retail && <li>Retail and wholesale (incl. post offices and hotels)</li>}
                          {landUse.commercial && <li>Commercial and services (incl. local govt, education, research centers, offices, churches, hospitals, and military)</li>}
                          {landUse.lightIndustrial && <li>Light and other industrial (incl. light and unspecified industrial, warehousing, food processing)</li>}
                          {landUse.heavyIndustrial && <li>Heavy Industrial (incl. heavy fabrication and assembly raw materials processing – esp. mechanical, chemical, or heat processing)</li>}
                          {landUse.urbanPark && <li>Urban park (leisure, ornamental, zoo, botanical)</li>}
                          {landUse.schools && <li>K-12 schools</li>}
                          {landUse.recreational && <li>Recreational (incl. Golf courses, bike trails, etc.)</li>}
                          {landUse.cemetery && <li>Cemetery</li>}
                          {landUse.park && <li>Regional/ state/ national park or wilderness</li>}
                        </ul>
                    </li>
                    <li>
                        <strong>Habitat Information: </strong>
                          <ul>
                            <li>Waterways: {habitatInformation.waterways ? habitatInformation.waterways : 'none' }</li>
                            <li>Storm Drains: {habitatInformation.stormDrains ? habitatInformation.stormDrains : 'none' }</li>
                            <li>Critical Habitat: {habitatInformation.criticalHabitat ? habitatInformation.criticalHabitat : 'none' }</li>
                          </ul>
                      </li>
                    <li>
                     <strong>Preventative Measures: </strong>
                        <ul>
                          <li>Capture Devices: {preventativeMeasures.captureDevices}</li>
                          <li>Waste Receptacles: {preventativeMeasures.wasteReceptacles}</li>
                          <li>Signage: {preventativeMeasures.signage}</li>
                          <li>Sharp Receptacles: {preventativeMeasures.sharpReceptacles}</li>
                          <li>Cigarette Receptacles: {preventativeMeasures.cigaretteReceptacles}</li>
                          <li>other: {preventativeMeasures.other}</li>
                          <li>notes: {preventativeMeasures.notes}</li>
                        </ul>
                    </li>
                    <li>
                     <strong>General Observations: </strong> {generalObservation}
                    </li>
                    <li>
                      <strong>Categories: </strong>
                      {categories && Object.keys(categories).map((category, i) => {
                        return (
                          <div key={i}>
                          <br />
                          {categories[category].type}
                          <ul>
                            <li>Total: {categories[category].total}</li>
                            <li>Double Count: {categories[category].doubleCount}</li>
                            <li>Shiny: {categories[category].shiny}</li>
                            <li>Closed Loop: {categories[category].closedLoop}</li>
                            <li>Open Container: {categories[category].openContainer}</li>
                            <li>Fouled: {categories[category].fouled}</li>
                            <li>Item Notes: {categories[category].itemNotes}</li>
                            <li>Weight: {categories[category].weight} {categories[category]['weight unit']} </li>
                          </ul>
                          </div>
                        )
                      })}
                    </li>
                  </ul>
                </ListItem>
              )
            })}
          </List>
        </div>
      </Fragment>
    );
    return (
      <div>
        {this.state.isLoggedIn || cookies.load("token") ? userCard : loginForm}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));