import React from 'react';
import {Route, Redirect}from 'react-router-dom';
import PropTypes from 'prop-types';
//import { Test } from './Auth.styles';

// AUTH FOR RENDING COMPONENT
const Locked = ({path, props, component: Component, isAuthenticated}) => {
    return <Route 
        path={path}
        render={
            routerProps => {
                if(isAuthenticated===false){
                    return <Component {...props}{...routerProps}/>
                }
                return <Redirect to="/"/>
            }
        }
    />

}

export default Locked;