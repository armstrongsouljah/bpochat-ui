import jwtDecode from 'jwt-decode'
const token = localStorage.getItem('token')

export default{
    validateToken : ()=> {
    const decoded = jwtDecode(token)
    return Date.now()/1000 < decoded.exp
  },
   config: ()=> {
       return {
           headers: {
               'Authorization': `Bearer ${token}`
           }
       }
   },
   baseUrl: 'https:/bpochat-api.herokuapp.com'
}