export const SET_COORD = 'SET_COORD'

export const setCoords = ({lat,long}) => ({
  type: SET_COORD,
  payload:{
      lat,
      long
  }
})