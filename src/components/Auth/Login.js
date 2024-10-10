import React, { useState, useEffect } from "react";
import authCss from "./Auth.module.css";
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.jpg";
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import { Send } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setError, setFetching } from "../../redux/states";
import { checkAuthenticatedUser, errorAnimation } from "../../utils/client-functions";
import HelpIcon from "../UI/HelpIcon/HelpIcon";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';


const screenWidth = window.innerWidth

const Login = () => {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.stateData)
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [pwdRec, setPwdRec] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const errorSetter = (string) => {
        dispatch(setError(string))
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
        setLoading(true)
        
        const userData = {
            email: data.email,
            password: data.password
        }
        try {
            const response = await axios.post('/auth/login', userData)
            let userDetails = response?.data?.user
            localStorage.setItem('token', userDetails)
            
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
            if (error.response.data.message === "Unverified User") {
                errorSetter("Unverified User, Redirecting you to verify");
                dispatch(setEmail(error?.response?.data?.email));
                setTimeout(() => {
                    navigate("/verify");
                }, 5000);
            } else {
                errorSetter(error?.response?.data?.message);
            }
        }
        setLoading(false);
        
    }

    //password recovery handler
    const handleFormSubmitPwdRecovery= async (e) => {
        e.preventDefault()
        setLoading(true)
        const email = {
            email: data.email
        }
        try {
            const response = await axios.post('/auth/pwd-recover', email)
            console.log(response);
            setLoading(false)
            dispatch(setEmail(data.email))
            //navigate to reset password
            navigate('/reset-password')

        } catch (error) {
            setLoading(false)
            errorSetter(error.response.data.message);
        }

    }

    const handleGoogleLogin = async (credentialResponse) => {
        dispatch(setFetching(true))
        try {
            const token = credentialResponse.credential
            if(token) {
                const decodedToken = jwtDecode(token)
                
                const userData = {
                    email: decodedToken.email,
                    firstName: decodedToken.given_name,
                    lastName: decodedToken.family_name,
                    password: decodedToken.jti
                }
                const response = await axios.post('/auth/google-register', userData)
                let userDetails = response?.data?.user
                localStorage.setItem('token', userDetails)
               

                dispatch(setFetching(false))

                if (queryString.length >= 1)  {
                
                    if (queryString === 'pricing') {
                        navigate(`/pricing`)
                    } else {
                        navigate(`/user/dashboard/${queryString}`)
                    }
                    
                } else {
                    navigate('/')
                }
            } else {
                dispatch(setFetching(false))
                errorSetter('Process Failed, Try Again')
            }

            
        } catch (error) {
            dispatch(setFetching(false))
            errorSetter('Bad Response, Try Again')
        }
    };


    const goToRegister = () => {
        navigate("/join-bubble")
    }

    const handleInputChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value});
    };
    return (
        <div style={{overflow: 'hidden', height: '100vh'}}>
            <MenuBar />
            <div className={authCss.authContainer}>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', marginTop: '30px', marginRight: '100px', height: "200px"}}>
                    <div style={{height: "120%", width: "120%"}}>
                        <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />          
                    </div>

                </div>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', marginTop: '80px', marginLeft: '50px', height: "300px"}}>
                    <div style={{height: "120%", width: "120%"}}>
                        <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />          
                    </div>

                </div>
            </div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner} style={{marginTop: '200px'}}>
                    <h2>{!pwdRec ? "Pop back in" : "Enter Email"}</h2>
                    <div className="error">{error}</div>
                    <form onSubmit={!pwdRec ? handleFormSubmitLogin : handleFormSubmitPwdRecovery}>
                        {!pwdRec && 
                            <div>
                                <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px'}}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        onError={() => {
                                            errorSetter('Login Failed');
                                        }}
                                        auto_select={true}
                                        shape='pill'
                                        text="continue_with"
                                        width={screenWidth < 450 ? '350px' : '470px'}
                                    />
                                </div>
                                <p><strong>OR</strong></p>
                                <hr style={{width: '90%', margin: 'auto', borderColor: '#c0d1d457'}}></hr>
                                <p></p>
                            </div>
                        }
                        <Input placeholder="Email..." inputType="email" inputGridSm={12} onChange={handleInputChange('email')} /> 
                        
                        {!pwdRec && 
                            <div>
                                <Input placeholder="Password..." inputType="password" inputGridSm={12} onChange={handleInputChange('password')} />
                                <div className={authCss.pwdRec} onClick={() => setPwdRec(true)}>forgot password?</div>
                                <div className={authCss.regOnLoginPage} onClick={goToRegister}>join Bubble?</div>
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
                            {/* <p><strong>Or</strong></p> */}
                            {/* <ButtonTransparent><span style={{ color: "#940101"}}><Google /></span><span> Login with Google</span></ButtonTransparent> */}
                            <p></p>
                            {/* <ButtonTransparent><span style={{ color: "#333333"}}><Apple /></span><span> Login with Apple</span></ButtonTransparent> */}
                        </div>
                    )}

                </div>
            </div>
            <HelpIcon />
        </div>        
    )
}

export default Login;