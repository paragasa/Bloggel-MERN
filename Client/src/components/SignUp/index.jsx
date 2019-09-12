import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm';
// import { validateAll } from 'indicative';
// import Axios from 'axios'
// import config from '../../config'

/**
 * SIGN UP PAGE
 * FUNCTION FORM SUBMISSION AND LOGIN USER
 * Expectation: validation, user verification, rediect
 */

class SignUp extends React.Component{
    
    constructor() {

      super();

      this.state= {
        name: '',
        email: '',
        password: '',
        password_confirmation:'',
        errors:{},
      }
      // this.handleInput = this.handleInput.bind(this)
      // this.handleSubmit = this.handleSubmit.bind(this)
    }
    /**
     * Alter state from inputs
     */
    handleInput = (event) => {
      this.setState({
        [event.target.name] : event.target.value  //append input object
      })
    
    }
    /**
     * Param Form Submit
     * handles form validation using indicative@5.0.5
     */
    handleSubmit = async (event)=>{

      event.preventDefault();

      //insert authservice 
      try{
        const user = await this.props.registerUser(this.state);
        this.props.setAuthUser(user);
      }
      catch (errors) {
        const error_msg = errors.email   
        this.props.NotificationService.error(error_msg);
        this.setState({
          errors: errors
        });     
      }
    }
    render(){ 
      return (
          <SignUpForm
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
            errors = {this.state.errors}
          />
          );
      }
}

// Import Auth methods and app func
SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired,
}
export default SignUp;