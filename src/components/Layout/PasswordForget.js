import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../Routes/Routes';

export default class PasswordForgetPage extends React.Component {
  render = () => {
    return (
    <div>
      <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm 
          pwforgot={this.props.pwforgot}
          forgotPW={this.props.forgotPW}
          error={this.props.error}
          showError={this.props.showError}
        />
      </div>
    </div>
    )
  }
}

const forgot_state = {
  email: ''
};

class PasswordForgetFormBase extends Component {

  onSubmit = event => {
    const email = this.props.pwforgot.email

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.props.forgotPW({ ...forgot_state });
      })
      .catch(error => {
        this.props.showError({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.props.forgotPW({ ...forgot_state, [event.target.name]: event.target.value });
  };

  render() {
    const email = this.props.pwforgot.email;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.props.pwforgot.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit" className='form-button'>
          Reset My Password
        </button>

        {this.props.error && <p>{this.props.error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
