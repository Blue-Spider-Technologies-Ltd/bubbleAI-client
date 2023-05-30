import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import authCss from "./Auth.module.css"
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.png"
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack, ButtonTransparent } from "../UI/Buttons/Buttons";
import { Send, Google, Apple } from '@mui/icons-material';
import { Link } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';


const screenWidth = window.innerWidth

const Login = () => {
    const location = useLocation()
    const queryString = location.search.slice(1)
    const navigate = useNavigate();
    const isAuth = localStorage?.getItem('token')
    const [error, setError] = useState('')
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(isAuth) {
            navigate('/')
        }
    }, [isAuth, navigate])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const userData = {
            email: data.email,
            password: data.password
        }
        try {
            const response = await axios.post('/auth/login', userData)
            let userDetails = response.data.user
            localStorage.setItem('token', userDetails)
            userDetails = await jwt_decode(userDetails)
            // dispatch(setUser(userDetails))
            setError("")
            if (queryString !== '') return navigate(`/user/dashboard/${queryString}`)
            navigate('/')
        } catch (error) {
            setError(error.response.data.message)
        }

    }

    const handleInputChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value});
    };
    return (
        <div>
            <MenuBar />
            <div className={authCss.authContainer}>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', marginRight: '100px'}}>
                    <Blob bgImage={bubbleBgAuthImg} altText="POP back in" />
                </div>

                <div style={{marginTop: screenWidth > 900 ? '350px' : '', marginLeft: '100px'}} >
                    <Blob bgImage={bubbleBgAuthImg} altText="POP back in" />
                </div>

            </div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner} style={{marginTop: '200px'}}>
                    <h2>Pop back in</h2>
                    <div className="error">{error}</div>
                    <form onSubmit={handleFormSubmit}>
                        <Input placeholder="Email..." inputType="email" inputGridSm={12} onChange={handleInputChange('email')} /> 
                        <Input placeholder="Password..." inputType="password" inputGridSm={12} onChange={handleInputChange('password')} />
                        <Link href="/pwd-recovery" className={authCss.pwdRec}>forgot password?</Link>
                        <div >
                            <ButtonSubmitBlack type="submit"><Send /></ButtonSubmitBlack>
                        </div>
                    </form>
                    <p><strong>Or</strong></p>
                    <ButtonTransparent><span style={{ color: "#940101"}}><Google /></span><span> Login with Google</span></ButtonTransparent>
                    <p></p>
                    <ButtonTransparent><span style={{ color: "#333333"}}><Apple /></span><span> Login with Apple</span></ButtonTransparent>
                </div>
            </div>
        </div>        
    )
}

export default Login;