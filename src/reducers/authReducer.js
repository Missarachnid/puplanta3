import { UPDATE_USER, SHOW_ERROR, SIGNUP_CHANGE, SIGNIN_CHANGE, FORGOT_PASSWORD, CHANGE_PASSWORD } from '../actions/actions';
import initialState from '../reducers/initialState';

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_USER : {
      return {
        ...state,
        user: action.payload
      }
    }
    case SHOW_ERROR : {
      return {
        ...state,
        error: action.payload
      }
    }
    case SIGNUP_CHANGE : {
      return {
        ...state,
        signupdata: action.payload
      }
    }
    case SIGNIN_CHANGE : {
      return {
        ...state,
        signindata: action.payload
      }
    }
    case FORGOT_PASSWORD : {
      return {
        ...state,
        pwforgot: action.payload
      }
    }
    case CHANGE_PASSWORD : {
      return {
        ...state,
        pwchange: action.payload
      }
    }
    default: 
      return state;
  }
};

export default authReducer;