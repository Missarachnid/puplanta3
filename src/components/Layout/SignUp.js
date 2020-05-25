import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {  compose  } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../Routes/Routes';

export default class SignUpPage extends React.Component {
 
  render = () => (
    <div>
      <div className='jumbotron forms-format' id='sign-up-page'>
        <h1 className='headline'>SignUp</h1>
        <SignUpForm 
        signupChange={this.props.signupChange}
        signupdata={this.props.signupdata} error={this.props.error}
        showError={this.props.showError}/>
        <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>
      </div>
    </div>
  )
}

const initial_signup = {
  username: '',
  email: '',
  passwordone: '',
  passwordtwo: ''
};

class SignUpFormBase extends Component {

  onSubmit = event => {
    const username = this.props.signupdata.username;
    const email = this.props.signupdata.email;
    const passwordone = this.props.signupdata.passwordone;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordone)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email
          });
      })
      .then(() => {
        this.props.signupChange({ ...initial_signup });
        this.props.showError(null);
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        this.props.showError( error );
      });

    event.preventDefault();
  };

  onChange = event => {
    this.props.signupChange({ ...this.props.signupdata, [event.target.name]: event.target.value });
  };

  render() {
    const username = this.props.signupdata.username;
    const email = this.props.signupdata.email;
    const passwordone = this.props.signupdata.passwordone;
    const passwordtwo = this.props.signupdata.passwordtwo;

    const isInvalid =
      passwordone !== passwordtwo ||
      passwordone === '' ||
      email === '' ||
      username === '';
    
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='username'
          value={username}
          onChange={this.onChange}
          type='text'
          placeholder='Full Name'
          className='signup-spacer'
        />
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
          className='signup-spacer'
        />
        <br></br>
        <input
          name='passwordone'
          value={passwordone}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
          className='signup-spacer'
        />
        <input
          name='passwordtwo'
          value={passwordtwo}
          onChange={this.onChange}
          type='password'
          placeholder='Confirm Password'
          className='signup-spacer'
        />
        <br></br>
        <button disabled={isInvalid} type='submit' className='signup-spacer form-button'>Sign Up</button>

        <p>
        {this.props.error ? this.props.error.message : null}
        </p>
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export { SignUpForm, SignUpLink };