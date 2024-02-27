import * as actions from '../actions/loadingActions'

const initialState = {
  loading:false
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_LOADING:
      return {
        ...state,
        loading:action.loading
      }
    default:
      return state
  }
}

export default loadingReducer
