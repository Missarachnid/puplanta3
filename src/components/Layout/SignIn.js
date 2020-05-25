import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../Routes/Routes';

export default class SignInPage extends React.Component {
  render = () => (
    <div  className='jumbotron forms-format' id='sign-in-page'>
      <h1 className='headline'>Sign In</h1>
      <SignInForm 
      signinChange={this.props.signinChange} 
      signindata={this.props.signindata}
      showError={this.props.showError}
      error={this.props.error}
      />
      <PasswordForgetLink />
      <SignUpLink />
  </div>
  )
}

const SIGNIN_STATE = {
  email: '',
  password: ''
};

class SignInFormBase extends Component {

  onSubmit = event => {
    const email = this.props.signindata.email;
    const password = this.props.signindata.password;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.showError(null);
        this.props.signinChange({ ...SIGNIN_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.props.showError( error );
      });

    event.preventDefault();
  };

  onChange = event => {
    this.props.signinChange({ ...this.props.signindata, [event.target.name]: event.target.value });
  };

  render() {
    const email = this.props.signindata.email;
    const password = this.props.signindata.password;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} >
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
          className='signin-spacer'
        />
        <br></br>
        <input
          name='password'
          value={password}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
          className='signin-spacer'
        />
        <br></br>
        <button disabled={isInvalid} type='submit' className='signin-spacer form-button'>
          Sign In
        </button>
        <p>
        {this.props.error ? this.props.error.message : null}
        </p>
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export { SignInForm };