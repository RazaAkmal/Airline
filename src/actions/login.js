
import { START_LOGIN_LOADING,STOP_LOGIN_LOADING, REMOVE_ERROR } from '../constants'

export const login_user = () => {
  return (dispatch) => {
    dispatch({ type: START_LOGIN_LOADING })
  }
}



export const stopLoading = () => {
  return (dispatch) => {
    dispatch({ type: STOP_LOGIN_LOADING })
  }
}
export const removeError = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_ERROR })
  }
}