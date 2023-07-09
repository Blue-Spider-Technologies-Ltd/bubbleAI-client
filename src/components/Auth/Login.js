import React, { useState, useEffect } from "react";
import authCss from "./Auth.module.css";
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.png";
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack, ButtonTransparent } from "../UI/Buttons/Buttons";
import { Send, Google, Apple } from '@mui/icons-material';
import { Link } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'


const screenWidth = window.innerWidth

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('token')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const queryString = location.search.slice(1)

    useEffect(() => {
        if(isAuth) {
            if (queryString.length >= 1)  {
                navigate(`/user/dashboard/${queryString}`)
            } else {
                navigate('/')
            }
        }
    }, [isAuth, navigate, queryString])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        const userData = {
            email: data.email,
            password: data.password
        }
        try {
            const response = await axios.post('/auth/login', userData)
            console.log(response);
            let userDetails = response.data.user
            localStorage.setItem('token', userDetails)
            setError("")
            setLoading(false)
            if (queryString.length >= 1)  {
                navigate(`/user/dashboard/${queryString}`)
            } else {
                navigate('/')
            }
        } catch (error) {
            setLoading(false)
            console.log(error.response.data.mesage);
            setError(error.response.data.message)
        }

    }

    const handleInputChange = (prop) => (event) => {
        setError("")
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
                        <div>
                            <ButtonSubmitBlack type="submit">{!loading ? <Send /> : 
                                <ThreeCircles
                                    height="25"
                                    width="25"
                                    color="#FFFFFF"
                                    visible={true}
                                    ariaLabel="three-circles-rotating"
                                />}
                            </ButtonSubmitBlack>
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