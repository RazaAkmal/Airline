import globalAxios from "../util/Api"
import Axios from 'axios'
import moment from 'moment'

import { FETCH_PLACES, FETCH_FLIGHTS, START_LOADING, STOP_LOADING, FETCH_COUNTIRES, PLACE_ERROR, RESET_STATE, FETCH_INTERNATION_PLACES } from "../constants"


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
export const fetchPlaces = (country, type) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING })
    globalAxios().get(`apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${country}`
    ).then(res => {
      if (type === "international")
        dispatch({ type: FETCH_INTERNATION_PLACES, payload: res.data.Places })
      else
        dispatch({ type: FETCH_PLACES, payload: res.data.Places })

    }).catch(error => {
      dispatch({ type: PLACE_ERROR })
    })
  }
}
export const fetchFlights = (data, withoutDate) => {
  let date = moment(new Date()).format('YYYY-MM-DD')
  return (dispatch) => {
    dispatch({ type: START_LOADING })
    // dispatch(getCordinates())
    globalAxios().get(`apiservices/browseroutes/v1.0/US/USD/en-US/${data.origin}/${data.destination}/${withoutDate ? date : moment(data.date).format('YYYY-MM-DD')}?inboundpartialdate=${data.oneway ? moment(data.inboundDate).format('YYYY-MM-DD') : ''}`
    ).then(res => {
      dispatch({ type: FETCH_FLIGHTS, payload: res.data })
    }).catch(error => {
      dispatch({ type: STOP_LOADING })
    })
  }
}
export const resetState = () => {
  return (dispatch) => {
    dispatch({ type: RESET_STATE })
  }
}


export const getCordinates = () => {
  const options = {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/geocode/v1/json',
    params: { key: 'OPENCAGE-API-Key', q: 'Berlin', language: 'en' },
    headers: {
      'x-rapidapi-host': 'opencage-geocoder.p.rapidapi.com',
      'x-rapidapi-key': '1fd29b48cfmsha93fa973c10d834p1c553djsn3871a6c7862b'
    }
  };
  return (dispatch) => {
    Axios.request(options).then(function (response) {
    }).catch(function (error) {
      console.error(error);
    });
  }
}

