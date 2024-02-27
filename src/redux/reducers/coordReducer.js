import * as actions from '../actions/coordActions'

const initialState = {
  lat:null,
  long:null
}

const coordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_COORD:
      return {
        ...state,
        lat: action.payload.lat,
        long:action.payload.long
      }
    default:
      return state
  }
}

export default coordReducer
