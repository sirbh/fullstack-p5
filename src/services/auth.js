import axios from 'axios'
const baseUrl = '/api/login'

const login = (username, password) => {
  const request = axios.post(baseUrl,{
    username,password
  })
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }