import * as actions from '../actions/podaciActions';

const initialState = {
  imePrezime: '',
  datumRodjenja: '',
  datumStradanja: '',
  mjestoRodjenja: '',
  mjestoStradanja: '',
  datumUkopa: '',
  parcela: '',
  red: '',
  grobnoMjesto: '',
  idGrobnogMjesta: '',
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PODACI: {
      return {
        ...state,
        imePrezime: action.payload.imePrezime,
        datumRodjenja: action.payload.datumRodjenja,
        datumStradanja: action.payload.datumStradanja,
        mjestoRodjenja: action.payload.mjestoRodjenja,
        mjestoStradanja: action.payload.mjestoStradanja,
        datumUkopa: action.payload.datumUkopa,
        parcela: action.payload.parcela,
        red: action.payload.red,
        grobnoMjesto: action.payload.grobnoMjesto,
        idGrobnogMjesta: action.payload.idGrobnogMjesta,
      };
    }

    default:
      return state;
  }
};

export default dataReducer;
