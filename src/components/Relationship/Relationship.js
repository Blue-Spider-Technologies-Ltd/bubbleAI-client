import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import { populateUser } from '../../utils/functions'

const Relationship = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")

    //Checked if user logged in/found
    useEffect(() => {
        const token = localStorage?.getItem('token')
        if(token) {
            const user = jwt_decode(token)
            if (!user) {
                localStorage?.removeItem('token')
                navigate('/popin')
            } else {
                try {
                    populateUser('/user/dashboard/relationship')
                } catch (error) {        
                    console.log(error);
                    setError("Reload page to fetch data")
                }
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

export default Relationship;