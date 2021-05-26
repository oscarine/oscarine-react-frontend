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
      throw new Error('Invalid action')
  }
}

export default reducer
