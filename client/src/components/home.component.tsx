import React, { useEffect, useState } from 'react'
import userService from '../services/user.service'
import IUser from '../types/user.type'

interface Props {
    user: IUser | undefined
}

const Home: React.FC<Props> = ({ user }) => {
    const [content, setContent] = useState('')
    
    useEffect(() => {
        console.log('user', user)
        if (!user) {
            userService.getPublicContent()
                .then((response) => {
                    setContent(response.data)
                },
                (error) => {
                    const _content = (error.response && error.response.data) || error.message || error.toString()
                    setContent(_content)
                }
            )
        } else {
            setContent(`Welcome, ${user.username}`)
        }        
    }, [])

    useEffect(() => {
        if (user) setContent(`Welcome, ${user.username}`)
    }, [user])

    return (
        <div className='container'>
            <header className='jumbotron'>
                <h3>{content}</h3>
            </header>
        </div>
    )
}

export default Home