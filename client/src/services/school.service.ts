import axios from 'axios'
import ISchool from '../types/school.type'
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

const updateSchool = async (school: ISchool, user: IUser) => {
    try {
        const schoolUpdate: Pick<ISchool, "name"| "address"> = {
            name: school.name,
            address: school.address
        }
        console.log('new data', schoolUpdate)

        const updatedSchool = await axios.request({
            method: 'PUT',
            url: `${API_URL}/${school._id}?userId=${user.id}`,
            params: schoolUpdate,
            headers: authHeader()
        })

        return updatedSchool
    } catch (error: any) {
        throw new Error(error)
    } 
}

export default {
    getSchools,
    deleteSchool,
    updateSchool
}