import { FETCH_FLIGHTS, FETCH_PLACES, START_LOADING } from "../constants"

const INITIAL_STATE = {
  loading: false,
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_PLACES:
      return {
        ...state,
        places_data: action.payload,
        loading: false
      }
    default:
      return {
        ...state
      }
  }
}