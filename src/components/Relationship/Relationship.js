import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { populateUser } from '../../utils/functions'
import { errorAnimation } from '../../utils/client-functions';
import { setError } from '../../redux/states';

const Relationship = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.stateData)

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

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
                    // console.log(error);
                    errorSetter("Reload page to fetch data")
                }
            }
        } else {
            navigate('/popin')
        }
    }, [navigate])

    
    return (
        <div>
            <div className="error">{error}</div>

        </div>
    )
}

export default Relationship;