import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://oscarine.herokuapp.com'
})

export default instance
