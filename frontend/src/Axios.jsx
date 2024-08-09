import axios from 'axios'

export const url = 'http://localhost:3500'

const AxiosApi =  axios.create({
    baseURL:url,
   withCredentials:true
})


export default AxiosApi