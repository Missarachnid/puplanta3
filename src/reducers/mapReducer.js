import { LOAD_PARKS, LOAD_STORES } from '../actions/actions';
import initialState from './initialState';

const mapReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_PARKS : {
      return {
        ...state,
        parks: action.payload
      }
    }
    case LOAD_STORES : {
      return {
        ...state,
        stores: action.payload
      }
    }
    default:
      return state
  }
}

export default mapReducer;