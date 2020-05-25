import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../../App.css';
import Navigation from './Navigation';
import Footer from './Footer';
import Main from './Main'; 
import { connect } from 'react-redux';
import { withAuthentication } from '../Session';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import {
  LOAD_PARKS,
  LOAD_STORES,
  UPDATE_USER,
  TOGGLE_MENU,
  SHOW_ERROR,
  SIGNUP_CHANGE,
  SIGNIN_CHANGE,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD
} from '../../actions/actions';

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    parks: state.mapReducer.parks,
    stores: state.mapReducer.stores,
    menu: state.menuReducer.menu,
    error: state.authReducer.error,
    signupdata: state.authReducer.signupdata,
    signindata: state.authReducer.signindata,
    pwforgot: state.authReducer.pwforgot,
    pwchange: state.authReducer.pwchange
  }
}

const mapDispatchToProps = dispatch => ({
  loadParks: (parksData) => {
    dispatch({type: LOAD_PARKS, payload: parksData})
  },
  loadStores: (storesData) => {
    dispatch({type: LOAD_STORES, payload: storesData})
  },
  updateUser: (userData) => {
    dispatch({type: UPDATE_USER, payload: userData})
  },
  toggleMenu: () => {
    dispatch({type: TOGGLE_MENU})
  },
  showError: (err) => {
    dispatch({type: SHOW_ERROR, payload: err})
  },
  signupChange: (signupData) => {
    dispatch({type: SIGNUP_CHANGE, payload: signupData})
  },
  signinChange: (signinData) => {
    dispatch({type: SIGNIN_CHANGE, payload: signinData})
  },
  forgotPW: (emailData) => {
    dispatch({type: FORGOT_PASSWORD, payload: emailData})
  },
  changePW: (passData) => {
    dispatch({type: CHANGE_PASSWORD, payload: passData})
  }
});


class App extends React.Component {
  componentWillMount(){

    let getParkData = () => {
      let ref = this.props.firebase.parks();
      ref.on('value', snapshot => {
        const parkItems = snapshot.val();
        const parkArr = Object.keys(parkItems).map(i => parkItems[i]);
        this.props.loadParks(parkArr);
      });
    }

    let getStoreData = () => {
      let ref = this.props.firebase.stores();
      ref.on('value', snapshot => {
        const storeItems = snapshot.val();
        const storeArr = Object.keys(storeItems).map(i => storeItems[i]);
        this.props.loadStores(storeArr);
      });
    }
    getParkData();
    getStoreData();
  }

  render = () => {
    return (
    <BrowserRouter>
    <div id='app'>
      <Navigation 
        user={this.props.user}
        updateUser={this.props.updateUser}
        toggleMenu={this.props.toggleMenu}
        menu={this.props.menu}
        error={this.props.error}
        showError={this.props.showError}
        
      />   
      <Main 
        parks={this.props.parks}
        user={this.props.user}
        stores={this.props.stores}
        updateUser={this.props.updateUser}
        error={this.props.error}
        showError={this.props.showError}
        signupChange={this.props.signupChange}
        signinChange={this.props.signinChange}
        signupdata={this.props.signupdata}
        signindata={this.props.signindata}
        pwforgot={this.props.pwforgot}
        forgotPW={this.props.forgotPW}
        pwchange={this.props.pwchange}
        changePW={this.props.changePW}
      />
      <Footer />
    </div>
      
    </BrowserRouter>
    )
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthentication, withFirebase)(App);