import { LOGIN_USER, START_LOGIN_LOADING, WRONG_CREDENTIAL,STOP_LOGIN_LOADING, REMOVE_ERROR } from "../constants"

const INITIAL_STATE = {
  loading: false,
  isLoggedIn: false,
  credential_error: false
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_LOGIN_LOADING:
      return {
        ...state,
        loading: true
      }
    case STOP_LOGIN_LOADING:
      return {
        ...state,
        loading: false
      }
    case WRONG_CREDENTIAL:
      return {
        ...state,
        loading: false,
        credential_error: true,
      }
    case REMOVE_ERROR:
      return {
        ...state,
        loading: false,
        credential_error: false,
      }
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        credential_error: false,
        loading: false
      }
    default:
      return {
        ...state
      }
  }
}