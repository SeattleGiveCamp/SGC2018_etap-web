import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button"
import Input from '@material-ui/core/Input';
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
  },
  loginText: {
    textAlign: 'center',
  },
  fetchingUser: {
    color: '#60783A',
    position: 'fixed  ',
    marginTop: 4,
    marginLeft: 0,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  }
});

class Login extends React.Component {

  state = {
    isLoggedIn: false,
    userName: undefined,
    showPassword: false,
    fetchingUser: false,
    invalidUser: false,
  };

  handleClickShowPassword = () => {
    this.setState({showPassword : !this.state.showPassword});
  };

  submit = async () => {
    let form = { user: { userName: this.props.state.formData.userInfo.userName, password: this.props.state.formData.userInfo.password }};

    await this.setState({fetchingUser: true});
    axios.post(`${process.env.API_URL}/login`, form)
      .then(response => { 
        let userName = response.data.user.userName;
        cookies.save("token", response.data.user.token);
        window.localStorage.setItem("userName", userName);
        this.setState({ isLoggedIn: true, fetchingUser: false, invalidUser: false });
      })
      .catch(err =>   {
        if(JSON.stringify(err).includes('422') || JSON.stringify(err).includes('500')) {
          this.setState({ invalidUser: true, fetchingUser: false });
        }
      });
  }


  render() {
    const { state, classes } = this.props
    const { formData } = state
    const loginForm = (
     <div className={classes.root}>
        <Typography className={classes.loginText}variant='h5'>Login</Typography>
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
            <Button variant='outlined' className={classes.submitButton} onClick={this.submit}>Submit</Button>
            {this.state.fetchingUser && <CircularProgress size={24} className={classes.fetchingUser} />}
          </div>
      </div>
    );
    const userCard = (
        <Typography align="center" variant="headline">
          User: { window.localStorage.getItem("userName") }
        </Typography>
    );
    return(
      <div>
        { this.state.isLoggedIn || cookies.load("token") ? userCard : loginForm }
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