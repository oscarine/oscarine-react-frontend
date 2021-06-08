export const initialState = {
  items: [],
  loading: false,
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'RESPONSE':
      return {
        items: action.shopItems,
        loading: false,
        error: null
      }
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.errorMessage
      }
    default:
      throw new Error('Invalid action')
  }
}

export default reducer
