import React from 'react';
import { Route} from 'react-router-dom';

import Auth from '../Auth';
import Locked from '../Locked';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';
import CreateArticle from '../CreateArticle';
import SingleArticle from '../SingleArticle';
import UserArticles from '../UserArticles';
import Navbar from '../Navbar';
import Footer from '../Footer';

import PropTypes from 'prop-types';
//import { Test } from './App.styles';

class App extends React.Component{

  constructor(){
      super();

      this.state = {
          authUser:null,
          articles:[],
      }
      this.setAuthUser= this.setAuthUser.bind(this)
  }

 /**
  * Component mount to get user and set auth user as well 
  */
 componentWillMount(){
    const user = localStorage.getItem('user');
    if(user){
        this.setState({
            authUser: JSON.parse(user)
        })
    }
}

  setAuthUser(authUser){
      this.setState({
          authUser
      },() => {
        localStorage.setItem('user', JSON.stringify(authUser));
        this.props.NotificationService.success('Successfull login!');
        this.props.history.push("/");
      })
  }

  //Welcome page sends Get for articles, set list articles to app state to optimeize req
  setArticles =(articles)=>{
    this.setState({
      articles,
    });
  }

  //logout
  removeAuthUser= () =>{
    localStorage.removeItem('user');
    this.setState({
      authUser:null,
    })
    this.props.NotificationService.success('Logged out!');
  }

  render(){
      const {location} = this.props; //withRouter
      return(
          <div>
              {/* NAVBAR */}
              {  
                  location.pathname !== '/login' && location.pathname !== '/register' &&
                  <Navbar 
                      authUser={this.state.authUser}
                      removeAuthUser={this.removeAuthUser}
                    />
               }

               {/* WELCOME */}
              <Route 
                  exact path="/" 
                  render={
                    props => 
                    <Welcome {...props} 
                    getArticles = {this.props.ArticleService.getArticles}
                    setArticles={this.setArticles}
                 />}    
                />
              {/* USER"S ARTICLES */}
              <Auth 
                  path="/user/articles"
                  component={UserArticles}
                  props={{
                    getUserArticles: this.props.ArticleService.getUserArticles,
                    NotificationService: this.props.NotificationService,
                    setArticles: this.setArticles,
                    token: this.state.authUser?this.state.authUser.token: null,
                    deleteArticle: this.props.ArticleService.deleteArticle,
                  }}
                  isAuthenticated={ this.state.authUser !==null}
              />
              <Auth 
                  path="/article/edit/:slug"
                  component={CreateArticle}
                  props={{
                    // getArticleCategories: this.props.ArticleService.getArticleCategories,
                    createArticle : this.props.ArticleService.createArticle,
                    token: this.state.authUser? this.state.authUser.token: null,
                    updateArticle: this.props.ArticleService.updateArticle,
                    articles: this.state.articles,
                    NotificationService: this.props.NotificationService,
                  }}
                  isAuthenticated={ this.state.authUser !==null}
              />

             {/* CREATE ARTICLE , NEW AUTH METHOD*/}
             
             <Auth 
                path="/articles/create" 
                component ={CreateArticle}
                props={{
                    // getArticleCategories: this.props.ArticleService.getArticleCategories,
                    createArticle : this.props.ArticleService.createArticle,
                    token: this.state.authUser? this.state.authUser.token: null,
                    NotificationService: this.props.NotificationService,
                }}
                isAuthenticated ={ this.state.authUser !==null}
             />
              {/* OLD ROUTE : unauthenticated
              <Route  
                path="/articles/create" 
                render= {props => 
                <CreateArticle 
                  {...props} 
                    getArticleCategories = {this.props.ArticleService.getArticleCategories}
                    createArticle = {this.props.ArticleService.createArticle}
                    token={this.state.authUser.token}
                    
                  />
               }/> */}

              {/* LOGIN */}
              <Locked 
                path="/login"
                component={Login}
                props={{
                  loginUser: this.props.AuthService.loginUser,
                  setAuthUser: this.setAuthUser,
                  NotificationService: this.props.NotificationService,
                }}
                //return if auth already, will redirect to page if true
                isAuthenticated={this.state.authUser!==null}
              />

              {/* OLD ROUTE TO LOGIN
               <Route 
                path="/login" 
                render={
                props => <Login 
                {...props} 
                loginUser={this.props.AuthService.loginUser} 
                setAuthUser={this.setAuthUser}/>
                }/> */}

               {/* Pass registerUser from auth to signup */}
              <Locked 
                path="/register"
                component={SignUp}
                props={{
                  NotificationService: this.props.NotificationService,
                  registerUser: this.props.AuthService.registerUser,
                  setAuthUser: this.setAuthUser
                }}
                //return if auth already, will redirect to page if true
                isAuthenticated={this.state.authUser!==null}
              />

              {/* OLD ROUTE TO REGISTER
              <Route 
                path="/register" render={
                props => <SignUp {...props} 
                registerUser={this.props.AuthService.registerUser} 
                setAuthUser={this.setAuthUser}/>
                }/> */}
              
              {/* SINGLE ARTICLE  */}
              <Route 
                exact path="/article/:slug" 
                render={
                  props => (
                    <SingleArticle
                      {...props}
                      getArticle= {this.props.ArticleService.getArticle}
                      articles = {this.state.articles}
                    />
                  )
                }
              />

              {/* FOOTER */}
              {  
                  location.pathname !== '/login' &&  location.pathname !== '/register' &&
                  <Footer></Footer>
               }   
          </div>
      )}
}

App.propTypes = {
  // bla: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
      push: PropTypes.func.isRequired,
  }),
  AuthService:PropTypes.objectOf(PropTypes.func).isRequired,
  AticleService: PropTypes.shape({
    getArticlegories: PropTypes.PropTypes.func.isRequired,
    getArticles: PropTypes.PropTypes.func.isRequired,
    getArticle: PropTypes.PropTypes.func.isRequired,
    deleteArticle:PropTypes.PropTypes.func.isRequired,
  }),
};

App.defaultProps = {
  // bla: 'test',
};

export default App;
