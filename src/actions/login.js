
import { START_LOGIN_LOADING, LOGIN_USER, WRONG_CREDENTIAL, REMOVE_ERROR } from '../constants'

export const login_user = (username, password) => {
  return (dispatch) => {
    dispatch({ type: START_LOGIN_LOADING })
    if (username === "admin" && password === "admin") {
      setTimeout(() => {
        dispatch({ type: LOGIN_USER })
        localStorage.setItem('login', true)
      }, 2000)
    } else {
      setTimeout(() => {
        dispatch({ type: WRONG_CREDENTIAL })
      }, 2000)
    }
  }
}

export const removeError = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_ERROR })
  }
}