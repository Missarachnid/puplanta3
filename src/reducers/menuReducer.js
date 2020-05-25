import { TOGGLE_MENU } from '../actions/actions';
import initialState from './initialState';

const menuReducer = (state = initialState, action) => {
  switch(action.type){
    case TOGGLE_MENU : {
      return {
        ...state,
        menu: !state.menu
      }
    }
    
    default:
      return state
  }
}

export default menuReducer;