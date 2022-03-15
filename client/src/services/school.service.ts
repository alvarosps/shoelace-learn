import axios from 'axios'
import IUser from '../types/user.type'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/schools'

interface User {
    user?: string
}

const getSchools = (user: IUser) => {    
    return axios.get(`${API_URL}?userId=${user.id}`, {
        headers: authHeader()
    })
}

const deleteSchool = async (_id: string, user: IUser) => {
    try {
        const deletedSchool = await axios.delete(`${API_URL}/${_id}?userId=${user.id}`, {
            headers: authHeader()
        })

        return deletedSchool
    } catch (error: any) {
        throw new Error(error)
    }
}

export default {
    getSchools,
    deleteSchool
}