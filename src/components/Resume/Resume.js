import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Resume = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const populateUser = async () => {
        try {
            const data = await axios.get('/user/dashboard/resume', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error);
            setError("Reload page to fetch data")
        }
    }
    //Checked if user logged in/found
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate('/popin')
            } else {
                populateUser()
            }
        } else {
            navigate('/popin')
        }
    }, [navigate])
    return (
        <div>
            <span>{error}</span>
        </div>
    )
}

export default Resume;