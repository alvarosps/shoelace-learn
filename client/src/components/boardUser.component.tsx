import React, { useState, useEffect } from 'react'
import schoolService from '../services/school.service'
import IUser from '../types/user.type'
import SchoolItem from './schooItem.component'

interface BoardUserProps {
    user: IUser
}

const BoardUser: React.FC<BoardUserProps> = ({ user }) => {
    const [error, setError] = useState(null)
    const [schools, setSchools] = useState([])

    useEffect(() => {
        schoolService.getSchools(user).then(
            (response: any) => {
                console.log(response)
                setSchools(response.data.schools)
            },
            (error) => {
                const _error = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                setError(_error)
            }
        )
    }, [])

    const handleDeleteSchool = (_id: string) => {
        schoolService.deleteSchool(_id, user)
            .then(({ data }) => {
                console.log('delete data', data)
                setSchools(data.schools)
            })
            .catch((err: any) => setError(err.toString()))
    }

    return (
        <div className='container'>
            {error && (<header className='jumbotron'>
                <h3>{error}</h3>
            </header>)}
            {schools && schools.length > 0 && schools.map((school, index) => (
                <SchoolItem
                    school={school}
                    key={index}
                    deleteSchool={handleDeleteSchool}
                />
            ))}
        </div>
    )
}

export default BoardUser