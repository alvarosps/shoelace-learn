import axios from 'axios'
import IUser from '../types/user.type'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/schools/'

interface User {
    user?: string
}

const getSchools = (user: IUser) => {    
    return axios.get(`${API_URL}?userId=${user.id}`, {
        headers: authHeader()
    })
}



export default {
    getSchools
}