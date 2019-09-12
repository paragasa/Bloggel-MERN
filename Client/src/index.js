
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route, withRouter} from 'react-router-dom';

// Components
import App from './components/App/index';

import * as serviceWorker from './serviceWorker';
import AuthService from './services/auth'
import ArticleService from './services/article'
import NotificationService from './services/notification';

// Main Higher FUNC
const Main = withRouter((props)=>{
    return(
        <App {...props}
        AuthService= {new AuthService()} 
        ArticleService = { new ArticleService()}
        NotificationService= {new NotificationService()}
        />
    )
});


ReactDOM.render(
    
    <BrowserRouter>
       <Main></Main>
    </BrowserRouter>
    
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
