import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const pwchange_state = {
  passwordone: '',
  passwordtwo: ''
};

class PasswordChangeForm extends Component {
 
  onSubmit = event => {
    const pass = this.props.pwchange.passwordone

    this.props.firebase
      .doPasswordUpdate(pass)
      .then(() => {
        this.props.showError(null);
        this.props.changePW({ ...pwchange_state });
      })
      .catch(error => {
        this.props.showError( {error});
      });

    event.preventDefault();
  };

  onChange = event => {
    this.props.changePW({...this.props.pwchange, [event.target.name]: event.target.value });
  };

  render() {
    const passwordone = this.props.pwchange.passwordone;
    const passwordtwo = this.props.pwchange.passwordtwo;

    const isInvalid =
      passwordone !== passwordtwo || passwordone === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordone"
          value={passwordone}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
          className='signup-spacer'
        />
        <input
          name="passwordtwo"
          value={passwordtwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm"
          className='signup-spacer'
        />
        <br></br>
        <button disabled={isInvalid} type="submit" className='form-button signup-spacer'>
          Reset My Password
        </button>
        <p>
        {this.props.error ? this.props.error.message : null }
        </p>
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
