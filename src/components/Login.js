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
import cookies from 'react-cookies';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: "column" 
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class Login extends React.Component {

  state = {
    isLoggedIn: false,
    userName: undefined
  };

  handleClickShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  submit = () => {
    let form = { user: { userName: this.props.state.formData.userInfo.userName, password: this.props.state.formData.userInfo.password }};
    axios.post('https://sgc2018-etap-service.herokuapp.com/login', form)
      .then(response => { 
        let userName = response.data.user.userName;
        cookies.save("token", response.data.user.token);
        window.localStorage.setItem("userName", userName);
        this.setState({ isLoggedIn: true });
      })
      .catch(err => console.log(err));
  }

  showPassword = false;

  render() {
    const { state, classes } = this.props
    const { formData } = state
    const loginForm = (
     <div className={classes.root}>
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
            type={this.showPassword ? 'text' : 'password'}
            value={formData.userInfo.password}
            onChange={(e) => this.props.setValue(e.target.value, "userInfo", "password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>
          <br />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button variant='outlined' className={classes.submitButton} onClick={this.submit}>Submit</Button>
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