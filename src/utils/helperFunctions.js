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
   baseUrl: 'https:/bpochat-api.herokuapp.com',
   localUrl:'http://localhost:8000',
   getUsername: ()=>{
    const decoded = jwtDecode(token)
    const username = decoded.user_data.split(' ')[1]
    return username
   },
   getSerVerBase: ()=>{
    const baseUrl='https://bpochat-api.herokuapp.com'
    const localUrl='http://localhost:8000'
        if (window.location.host.startsWith(localUrl)) return localUrl
        return baseUrl

   }
}