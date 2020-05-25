import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from './PasswordChange';
import { Link, withRouter } from 'react-router-dom';
import {  compose  } from 'recompose';
import * as ROUTES from '../Routes/Routes';

class AccountPage extends React.Component {

  render = () => {
    return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className='jumbotron forms-format' id='account'>
        <h1 className='headline'>Welcome {authUser.email}</h1>
        <PasswordChangeForm 
          user={this.props.user}
          pwchange={this.props.pwchange}
          changePW={this.props.changePW}
          showError={this.props.showError}
          error={this.props.error}
        />
        <div>
        <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>
        <p>Please report any issues to admin@puplanta.awsapps.com</p>
      </div>
      </div>
      
      )}
    </AuthUserContext.Consumer>
    )
  }
}

const condition = authUser => !!authUser;

const Account = compose(
  withRouter, 
  withAuthorization(condition)
  
)(AccountPage);

export default Account ;