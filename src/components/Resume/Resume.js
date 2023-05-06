import React, { useEffect } from 'react'
import { Jwt } from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

const Resume = () => {
    const history = useHistory()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = Jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                return history.replace('/popin')
            }
        }
    }, [history])
    return (
        <div>

        </div>
    )
}

export default Resume;