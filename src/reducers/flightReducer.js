import { FETCH_FLIGHTS, PLACE_ERROR, FETCH_PLACES, START_LOADING, STOP_LOADING, FETCH_COUNTIRES } from "../constants"

const INITIAL_STATE = {
  loading: false,
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
        error: true
      }
    case FETCH_COUNTIRES:
      return {
        ...state,
        countries_data: action.payload,
        flight_list: '',
        place_error: false,
        loading: false,
        error: false
      }
    case FETCH_PLACES:
      return {
        ...state,
        places_data: action.payload,
        flight_list: '',
        place_error: false,
        loading: false,
        error: false
      }
    case PLACE_ERROR:
      return {
        ...state,
        place_error: true,
        loading: false,
        error: false
      }
    case FETCH_FLIGHTS:
      return {
        ...state,
        flight_list: action.payload,
        loading: false,
        error: false
      }
    default:
      return {
        ...state
      }
  }
}