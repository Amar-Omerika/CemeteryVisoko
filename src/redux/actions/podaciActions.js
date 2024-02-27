export const SET_PODACI = 'SET_PODACI';
export const setPodaci = ({
  imePrezime,
  datumRodjenja,
  datumStradanja,
  mjestoRodjenja,
  mjestoStradanja,
  datumUkopa,
  parcela,
  red,
  grobnoMjesto,
  idGrobnogMjesta,
}) => ({
  type: SET_PODACI,
  payload: {
    imePrezime,
    datumRodjenja,
    datumStradanja,
    mjestoRodjenja,
    mjestoStradanja,
    datumUkopa,
    parcela,
    red,
    grobnoMjesto,
    idGrobnogMjesta,
  },
});
