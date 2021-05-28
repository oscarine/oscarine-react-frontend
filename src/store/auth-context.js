import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
})

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null)

  const userIsLoggedIn = !!token

  const loginHandler = (token) => setToken(token)

  const logoutHandler = () => setToken(null)

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  const { children } = props

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export default AuthContext
