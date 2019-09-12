import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const LoginForm = ({handleInput, handleSubmit, errors}) => (
      <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: 'url(assets/img/bg-signUp.jpg)'}}>
        <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
          <h5 className="text-uppercase text-center">Bloggel Login</h5>
          <br /><br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input name="email" onChange={handleInput}  type="text" className="form-control" placeholder="Username" />
            </div>
            {
                errors.email &&
                <small className="text-danger">{errors.email}</small>
              }
            <div className="form-group">
              <input name="password"  onChange={handleInput}  type="password" className="form-control" placeholder="Password" />
              {
                errors.password &&
                <small className="text-danger">{errors.password}</small>
              }
            </div>
            <div className="form-group flexbox py-10">
              <label className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" defaultChecked />
                <span className="custom-control-indicator" />
                <span className="custom-control-description">Remember me</span>
              </label>
              <a className="text-muted hover-primary fs-13" href="#">Forgot password?</a>
            </div>
            <div className="form-group">
              <button className="btn btn-bold btn-block btn-primary" type="submit">Login</button>
            </div>
          </form>
          <hr className="w-30" />
          <p className="text-center text-muted fs-13 mt-20">Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
);

LoginForm.propTypes = {
  // bla: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

LoginForm.defaultProps = {
  // bla: 'test',
};

export default LoginForm;
