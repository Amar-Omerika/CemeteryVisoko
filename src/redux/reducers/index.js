import { combineReducers } from 'redux'

import pretragaReducer from './pretragaReducer'
import coordReducer from './coordReducer'
import podaciReducer from './podaciReducer'
import loadingReducer from './loadingActions'

const rootReducer = combineReducers({
  pretraga: pretragaReducer,
  coords:coordReducer,
  podaci:podaciReducer,
  loader:loadingReducer
})

export default rootReducer
