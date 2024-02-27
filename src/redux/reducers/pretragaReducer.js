import * as actions from '../actions/pretragaActions'

const initialState = {
  ime: '',
  prezime:'',
  imeOca:''
}

const pretragaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_IME:
      return {
        ...state,
        ime: action.ime,
      }
      case actions.SET_PREZIME:
        return {
          ...state,
          prezime: action.prezime,
        }
    case actions.SET_IME_OCA:
        return {
            ...state,
            imeOca: action.imeOca,
        }
    default:
      return state
  }
} // TODO; fixati bug sa mijenjanem vrijednosti u redux storeu

export default pretragaReducer
