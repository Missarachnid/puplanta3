import React from 'react';
import * as ROUTES from '../Routes/Routes';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import Home from './Home';
import About from './About';
import Stores from './Stores';
import Parks from './Parks';
import Account from './Account';
import SignIn from './SignIn';
import PasswordForgetPage from './PasswordForget';
import SignUpPage from './SignUp';
import ParkInfo from './ParkInfo';
import StoreInfo from './StoreInfo';
import Privacy from './Privacy';

class Main extends React.Component {

  render = () => {
    return (
      <div className='container' id='main'>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.ABOUT} component={About} />
          <Route path={ROUTES.PARKS} render={props => 
        <Parks 
        parks={this.props.parks}
        user={this.props.user}
        />}
      />
      <Route path={ROUTES.PARK_ID} render={props => 
        <ParkInfo parks={this.props.parks} />} />
      <Route path={ROUTES.STORES} render={props => 
        <Stores
          user={this.props.user}
          stores={this.props.stores}
          />}
        />
      <Route path={ROUTES.STORE_ID} render={props => 
        <StoreInfo stores={this.props.stores} />} />
      <Route path={ROUTES.SIGN_IN} render={props => 
        <SignIn 
          signinChange={this.props.signinChange} 
          signindata={this.props.signindata}
          showError={this.props.showError}
          error={this.props.error}
        />} 
      />
      <Route path={ROUTES.SIGN_UP} render={props => 
        <SignUpPage 
        signupChange={this.props.signupChange}
        signupdata={this.props.signupdata}
        showError={this.props.showError}
        error={this.props.error}
        />} />
      <Route path={ROUTES.PRIVACY} component={Privacy} />
      <Route path={ROUTES.PASSWORD_FORGET} 
      render={props => 
      <PasswordForgetPage 
        pwforgot={this.props.pwforgot}
        forgotPW={this.props.forgotPW}
        showError={this.props.showError}
        error={this.props.error}
      /> } />
      <Route path={ROUTES.ACCOUNT} render={props => 
      <Account
        user={this.props.user}
        pwchange={this.props.pwchange}
        changePW={this.props.changePW}
        showError={this.props.showError}
        error={this.props.error}
        />} />
        </Switch>
    </div>
    );
  }
}

export default withRouter(Main);