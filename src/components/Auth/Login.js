import React, { useState, useEffect } from "react";
import authCss from "./Auth.module.css";
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.png";
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack, ButtonTransparent } from "../UI/Buttons/Buttons";
import { Send, Google, Apple } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/states";
import { checkAuthenticatedUser, errorAnimation } from "../../utils/client-functions";


const screenWidth = window.innerWidth

const Login = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [pwdRec, setPwdRec] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const errorSetter = (string) => {
        setError(string)
        errorAnimation()
    }

    //get query string and remove question mark
    const queryString = location.search.slice(1)

    useEffect(() => {

        const isUserAuthenticated = async () => {
            try {
                await checkAuthenticatedUser()
                if (queryString.length >= 1)  {
                    if (queryString === 'pricing') {
                        navigate(`/pricing`)
                    } else {
                        navigate(`/user/dashboard/${queryString}`)
                    }
                } else {
                    navigate('/')
                }
            } catch (error) {
                navigate(`/popin?${queryString}`)
                return
            }
        }

        isUserAuthenticated()
    }, [navigate, queryString])

    //Login submit handler
    const handleFormSubmitLogin = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        
        const userData = {
            email: data.email,
            password: data.password
        }
        try {
            const response = await axios.post('/auth/login', userData)
            let userDetails = response?.data?.user
            localStorage.setItem('token', userDetails)
            setError("")
            
        console.log(loading);
            setLoading(false)
            //If user was redirected to login from a page because of a service request to a protected route
            if (queryString.length >= 1)  {
                
                if (queryString === 'pricing') {
                    navigate(`/pricing`)
                } else {
                    navigate(`/user/dashboard/${queryString}`)
                }
                
            } else {
                navigate('/')
            }
        } catch (error) {
            setLoading(false)
            console.log(error?.response?.data?.mesage);
            errorSetter(error?.response?.data?.message);
        }

    }

    //password recovery handler
    const handleFormSubmitPwdRecovery= async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        const email = {
            email: data.email
        }
        try {
            const response = await axios.post('/auth/pwd-recover', email)
            console.log(response);
            setError("");
            setLoading(false)
            dispatch(setEmail(data.email))
            //navigate to reset password
            navigate('/reset-password')

        } catch (error) {
            setLoading(false)
            console.log(error.response.data.mesage);
            errorSetter(error.response.data.message);
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
                    <h2>{!pwdRec ? "Pop back in" : "Enter Email"}</h2>
                    <div className="error">{error}</div>
                    <form onSubmit={!pwdRec ? handleFormSubmitLogin : handleFormSubmitPwdRecovery}>
                        <Input placeholder="Email..." inputType="email" inputGridSm={12} onChange={handleInputChange('email')} /> 
                        
                        {!pwdRec && 
                            <div>
                                <Input placeholder="Password..." inputType="password" inputGridSm={12} onChange={handleInputChange('password')} />
                                <div className={authCss.pwdRec} onClick={() => setPwdRec(true)}>forgot password?</div>
                            </div>
                        }
                        <div> 
                            <ButtonSubmitBlack disabled={loading} type="submit">{!loading ? <Send /> : 
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
                    {!pwdRec && (
                        <div>
                            <p><strong>Or</strong></p>
                            <ButtonTransparent><span style={{ color: "#940101"}}><Google /></span><span> Login with Google</span></ButtonTransparent>
                            <p></p>
                            <ButtonTransparent><span style={{ color: "#333333"}}><Apple /></span><span> Login with Apple</span></ButtonTransparent>
                        </div>
                    )}

                </div>
            </div>
        </div>        
    )
}

export default Login;