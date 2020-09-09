import globalAxios from "../util/Api"
import Axios from 'axios'
import moment from 'moment'

import { FETCH_PLACES, FETCH_FLIGHTS, START_LOADING, STOP_LOADING, FETCH_COUNTIRES, PLACE_ERROR } from "../constants"


export const fetchCountires = () => {
  return (dispatch) => {
    dispatch({ type: START_LOADING })
    globalAxios().get(`apiservices/reference/v1.0/countries/en-US`
    ).then(res => {
      dispatch({ type: FETCH_COUNTIRES, payload: res.data.Countries })

    }).catch(error => {
      // dispatch({ type: PLACE_ERROR })
    })
  }
}
export const fetchPlaces = (country) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING })
    globalAxios().get(`apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${country}`
    ).then(res => {
      dispatch({ type: FETCH_PLACES, payload: res.data.Places })

    }).catch(error => {
      dispatch({ type: PLACE_ERROR })
    })
  }
}
export const fetchFlights = (data, withoutDate) => {
  let date = moment(Date()).format('YYYY-MM-DD')
  return (dispatch) => {
    dispatch({ type: START_LOADING })
    globalAxios().get(`apiservices/browseroutes/v1.0/US/USD/en-US/${data.origin}/${data.destination}/${withoutDate ? date : data.date}?inboundpartialdate=`
    ).then(res => {
      dispatch({ type: FETCH_FLIGHTS, payload: res.data })
    }).catch(error => {
      dispatch({ type: STOP_LOADING })
    })
  }
}
