export const initialState = {
  shops: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SHOPS' :
      return {
        ...state,
        shops: action.shopData
      }
    default:
      return state
  }
}

export default reducer
