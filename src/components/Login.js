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
  submitButton: {
    backgroundColor: '#60783A',
    color: '#ffffff',
    margin: 'none',
    minWidth: '100%',
  }
});

class Login extends React.Component {

  handleClickShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  submit = () => {
    console.log("yah");
    let form = { userName: this.props.state.formData.userInfo.userName, password: this.props.state.formData.userInfo.password };
    axios.post('https://sgc2018-etap-service.herokuapp.com/login', form)
      .then(response => { this.setValue(response.data.user.token, "userInfo", "token"); console.log(response.data) })
      .catch(err => console.log(err));
  }

  showPassword = false;

  render() {
    const { state, classes } = this.props
    const { formData } = state


    return (
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
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = { setValue };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));