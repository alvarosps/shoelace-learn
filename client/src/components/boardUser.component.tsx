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

    

    return (
        <div className='container'>
            {error && (<header className='jumbotron'>
                <h3>{error}</h3>
            </header>)}
            {schools && schools.length > 0 && schools.map((school, index) => (
                <SchoolItem school={school} key={index} />
            ))}
        </div>
    )
}

export default BoardUser