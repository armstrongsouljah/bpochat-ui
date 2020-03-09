import axios from 'axios'
import Cookies from 'js-cookie';

export const baseUrl = 'https://bpochat-api.herokuapp.com'
const CSRF_TOKEN = Cookies.get("csrftoken");

// export const interceptor = axios.interceptors.request.use(
//   config => {
//     // Do something before request is sent
//     const token = localStorage.getItem('token')
//     config.headers.Authorization = `Bearer ${token}`
//     config.headers.Accept = `application/json`
//     return config
//   },
//   () => {}
// )

// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
class AxiosCalls {
  static getHeaders = config => {
    return {
      headers: {
        Accept: 'application/json',
        "X-CSRFToken":CSRF_TOKEN
      },
      ...config
    }
  };

  static  postUser (path, payload) {
    axios.post(`${baseUrl}/${path}`, payload)
    .then(response => {
        if(response.error){
            console.log(response.statusText)
        }
        return response

    })

    .catch(error => {
        return error.response
    })
  }
}
export default AxiosCalls

