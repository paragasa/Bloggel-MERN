import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

class Login extends React.Component {
    constructor(){
      super();

      this.state = {
        email: '',
        password: '',
        errors: {}
      }
    }

  handleInput = (event) => {
    this.setState({
      [event.target.name] : event.target.value  //append input object
    })
  }
  handleSubmit = async(event) => {
    event.preventDefault();

    try{
      const user = await this.props.loginUser(this.state);
      this.props.setAuthUser(user);
    }
    catch(errors){
      const error_msg = errors.email   
      this.props.NotificationService.error(error_msg);
      this.setState({
        errors: errors
      })
    }
  }
  
  render(){
      return (<LoginForm 
        handleInput={this.handleInput}
        handleSubmit={this.handleSubmit}
        errors = {this.state.errors}
        />);
    }
        
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired,
};
export default Login;