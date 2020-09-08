import globalAxios from "../util/Api"
import Axios from 'axios'
import { FETCH_PLACES, START_LOADING } from "../constants"


export const fetchPlaces = (country) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING })
    try {
      globalAxios().get(`apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${country}`
      ).then(res => {
        dispatch({ type: FETCH_PLACES, payload: res.data.Places })

      })
    } catch (error) {
      console.log(error)
    }
  }
}
