export const SET_IME = 'SET_IME'
export const SET_PREZIME='SET_PREZIME'
export const SET_IME_OCA='SET_IME_OCA'

export const setIme = (ime) => ({
  type: SET_IME,
  ime,
})

export const setPrezime = (prezime) => ({
    type: SET_PREZIME,
    prezime,
  })

  export const setImeOca = (imeOca) => ({
    type: SET_IME_OCA,
    imeOca,
  })