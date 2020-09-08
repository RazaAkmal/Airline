import { combineReducers } from 'redux';
import loginReducer from './loginReducer'
import fligtReducer from './flightReducer'

export default combineReducers({
  login: loginReducer,
  flight: fligtReducer
})