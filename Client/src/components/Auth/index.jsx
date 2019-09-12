import React from 'react';
import {Route, Redirect}from 'react-router-dom';
import PropTypes from 'prop-types';
//import { Test } from './Auth.styles';

// AUTH FOR RENDING COMPONENT
const Auth = ({path, props, component: Component, isAuthenticated}) => {
  return(
    <Route
      path = {path}
      render={
        routerProps =>{
          // Check if logged in
          if(isAuthenticated){
            return <Component {...props} {...routerProps}/>
          }
          //return if not logged
          return <Redirect to="/login"/>
        }
      }
     />
  )
  }

Auth.propTypes = {
  // bla: PropTypes.string,
};

Auth.defaultProps = {
  // bla: 'test',
};

export default Auth;
