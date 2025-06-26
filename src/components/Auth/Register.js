import React, {useState, useEffect} from "react";
import authCss from "./Auth.module.css"
import modalCss from "../UI/Modal/Modal.module.css"
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.jpg"
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import { Send } from '@mui/icons-material';
import { Link, Grid, Rating } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'
import PasswordChecklist from "react-multiple-password-validator"
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setError, setFetching } from "../../redux/states";
import { errorAnimation, fetchIp } from "../../utils/client-functions";
import Carousel from "react-multi-carousel";
import { reviewDetails } from '../../utils/reviews';
import ChatwootWidget from "../../utils/chatwoot";
import SHA256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import { init, track } from 'fbq';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
// import base64 from 'crypto-js/enc-base64';




//Option for carousel in resume template section
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 700 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 700, min: 0 },
        items: 1
    }
};

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error } = useSelector(state => state.stateData)
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [pwdChecklist, showPwdChecklist] = useState(false)
    //Set password rules parameters
    const minLength = 8
    const numberLength = 1
    const capitalLength = 1
    const screenWidth = window.innerWidth

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    useEffect(() => {
        const isAuth = localStorage?.getItem('token')
        const prevPath = localStorage?.getItem('prevPath')
        if (isAuth) {
            if(prevPath) {
                navigate(prevPath)
            }
            navigate('/')
        }
    })

    let isValid = false;
    const checkPassword = (password) => {
        const specialChars = /[!#$%&'()*+,-./:;<=>?@[\]^_{|}~]/;
        const numbers = /[0-9]/;
    
        if (password.length >= 8 && specialChars.test(password) && numbers.test(password)) {
            isValid = true;
        } else {
            isValid = false;
        }
    };

    async function sendToFacebookConversionAPI(data) {
        try {
            const res = await fetch('https://graph.facebook.com/v20.0/1133510054551065/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer EAAGOA8VGfuwBO5tWGc2njMdXV5CqSBsyFQCCwEdXcgdZB4ZAG6uZAldREnbZAROzBZCyZAVRkOxxWpKC83rVjDBL0TKq90mnc9pZAma45pFioO5h5INQr6FcE2qHWcF9Oqfwqd6LWE0WcYsFTaIzliSmWWMw9szljshEMom12ahJsB41SAZCOclWVI6aJiBtPJCv3QZDZD`
                },
                body: JSON.stringify({
                    "data": [
                        data
                    ],
                })
            });
            
        } catch (error) {
            // console.error('Error sending data to Facebook Conversion API:', error);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        checkPassword(user.password)
        
        if(!isValid) {
            return errorSetter("Password too weak")
        }

        if (user.password === user.confirmPassword){
            const userData = {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
            }

            try {
                const response = await axios.post('/auth/register', userData)

                const eventId = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
                const clientIp = await fetchIp();
                const fbConversionApiData = {
                    "event_name": "CompleteRegistration",
                    "event_id": eventId,
                    "event_time": Math.floor(Date.now() / 1000),
                    "action_source": "website",
                    "event_source_url": window.location.href,
                    "user_data": {
                        "fn": [
                            SHA256(user?.firstName).toString()
                        ],
                        "ln": [
                            SHA256(user?.lastName).toString()
                        ],
                        "ph": [
                            null
                        ],
                        "em": [
                            SHA256(user.email).toString()
                        ],
                        "client_user_agent": navigator.userAgent,
                        "client_ip_address": clientIp
                    }
                }
                init('1133510054551065');
                track('CompleteRegistration', { eventID: eventId });

                // Call the function with the provided data
                await sendToFacebookConversionAPI(fbConversionApiData);

                setLoading(false)
                //Set email to retrieve for verification
                dispatch(setEmail(user.email))
                navigate("/verify")

            } catch (error) {
                setLoading(false)
                errorSetter(error?.response?.data?.message)
            }

        } else {
            errorSetter('password strings do not match')
            setLoading(false)
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
                const eventId = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
                const clientIp = await fetchIp();
                const fbConversionApiData = {
                    "event_name": "CompleteRegistration",
                    "event_id": eventId,
                    "event_time": Math.floor(Date.now() / 1000),
                    "action_source": "website",
                    "event_source_url": window.location.href,
                    "user_data": {
                        "fn": [
                            SHA256(decodedToken?.given_name).toString()
                        ],
                        "ln": [
                            SHA256(decodedToken?.family_name).toString()
                        ],
                        "ph": [
                            null
                        ],
                        "em": [
                            SHA256(decodedToken.email).toString()
                        ],
                        "client_user_agent": navigator.userAgent,
                        "client_ip_address": clientIp
                    }
                }
                init('1133510054551065');
                track('CompleteRegistration', { eventID: eventId });

                // Call the function with the provided data
                await sendToFacebookConversionAPI(fbConversionApiData);

                dispatch(setFetching(false))

                navigate('/')
            } else {
                dispatch(setFetching(false))
                errorSetter('Process Failed, Try Again')
            }

            
        } catch (error) {
            dispatch(setFetching(false))
            console.log(error)
            errorSetter('Bad Response, Try Again')
        }
    };

    const handleInputChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value});
    };

    const handleBlur = () => {
        showPwdChecklist(true);
    };
      
      // Usage:
      // onBlur={handleBlur}

    return (
        <div>
            <MenuBar />
            <div className={authCss.authContainer}>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', height: "350px", marginLeft: '50px'}}>
                    <div style={{height: screenWidth > 900 ? "120%" : "100%", width: screenWidth > 900 ? "120%" : "100%"}}>
                        <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />          
                    </div>

                </div>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', height: "300px", marginTop: '200px'}}>
                    <div style={{height: screenWidth > 900 ? "120%" : "100%", width: screenWidth > 900 ? "110%" : "100%"}}>
                        <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />          
                    </div>
                </div>
 
                {screenWidth > 900 && (<div style={{height: "10%", width: "10%", marginTop: '30%',}}>
                    <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />          
                </div>)}


            </div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner}>
                    <h2>Get a Bubble</h2>
                    <div className="error">{error}</div>
                    <div className="description-box">
                        <p>Career coaches and CV writers often try to fake-fit you to limited available jobs they know about. Bubble Ai, on the other hand analyzes your history to find JOBS THAT FIT YOU, giving you over 90% chance due to its authentic approach. 
                        Transform your career in minutes with Bubble Ai's powerful <strong>resume</strong>, <strong>cover letters</strong> and <strong>application automation tools</strong>. </p>
                        <p><strong>REGISTER NOW</strong> to benefit from our ongoing giveaways, get the perfect resume and apply to fitted high-paying jobs in choice locations specially curated for you.</p>
                    </div>

                    <div style={{width: '100%', textAlign: 'center'}}>
                        <Grid container>
                            <Grid item xs={12} md={5} mt={5}>
                                {/* <img src={refundImg} alt='Refund Guaranteed' style={{width: '60px', borderRadius: '50%'}} /> */}

                                <div style={{marginTop: screenWidth > 900 ? "20px" : "-10px"}}>
                                    <h5 style={{fontSize: '.8rem'}}>A better life</h5>
                                    <h2>GUARANTEED</h2>
                                    <a 
                                        href='/how-i-work' 
                                        target='_blank'
                                        style={{fontSize: '.65rem', color: '#3E8F93', position: 'relative', top: '-20px'}}
                                    >
                                        How I Work
                                    </a>
                                </div>
                            </Grid>
                            <Grid item  xs={12} md={7}>
                                <div className='Segment'>
                                    <Carousel
                                        autoPlay={true}
                                        autoPlaySpeed={10000}
                                        transitionDuration={1000}
                                        arrows={false}
                                        responsive={responsive}
                                        swipeable={true}
                                        draggable={true}
                                        ssr={true} // render carousel on server-side.
                                        infinite={true}
                                        keyBoardControl={true}
                                        customTransition="all .5"
                                        containerClass="carousel-container"
                                        dotListClass="custom-dot-list-style"
                                        itemClass="carousel-item-padding-40-px"
                                        focusOnSelect={true}
                                    >

                                        {reviewDetails?.map((detail, index) => {
                                            return (
                                                <div key={index} style={{height: screenWidth < 900 ? "100px" : "auto"}}>
                                                    <div style={{fontSize: '.7rem', display: 'flex', justifyContent: 'center', width: '100%'}}>
                                                        <div style={{width: '40px', borderRadius: '50%', overflow: 'hidden'}}>
                                                            <img src={detail?.img} alt={detail?.name} width='100%' />
                                                        </div>
                                                        <div style={{marginLeft: '10px'}}>
                                                            <div style={{fontSize: '.67rem', fontWeight: '700', color: '#5fbec5'}}>
                                                                {detail?.name}
                                                            </div>
                                                            <div>
                                                                <Rating name="read-only" value={detail?.rating} size="small" precision={0.5} readOnly />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={modalCss.reviewCarousel}>
                                                        <p>
                                                            {detail?.review}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                </div>
                            </Grid>
                        </Grid>
                    </div> 

                    <form method="post" onSubmit={handleFormSubmit}>
                    
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
                        <Grid container>
                            <Input id="firstName" placeholder="First name..." value={user.firstName} inputType="text" inputGridSm={12} inputGrid={6} onChange={handleInputChange('firstName')} /> 
                            <Input id="lastName" placeholder="Last name..." value={user.lastName} inputType="text" inputGridSm={12} inputGrid={6} onChange={handleInputChange('lastName')} /> 
                        </Grid>
                        <Input id="email" placeholder="Email..." value={user.email} inputType="email" inputGridSm={12} onChange={handleInputChange('email')} /> 
                        <Input id="password" placeholder="Password..." value={user.password} inputType="password" inputGridSm={12} onChange={handleInputChange('password')} onFocus={handleBlur} />
                        <Input id="confirmPassword" placeholder="Confirm password..." value={user.confirmPassword} inputType="password" inputGridSm={12} onChange={handleInputChange('confirmPassword')} onFocus={handleBlur} />
                        <Link href="/popin" className={authCss.pwdRec}>Login?</Link>
                        <p className="description-box">By proceeding with the registration, you agree to Bubble <a className="link" href="/privacy" target="_blank">User Agreement</a></p>
                        {pwdChecklist &&
                            (
                                <div style={{width: '90%', padding: '5px', margin: '0 20px 20px', fontSize: '.7rem', backgroundColor: '#c0d1d413', borderRadius: '3px'}}>
                                    <PasswordChecklist
                                        iconSize={12}
                                        rules={["minLength","specialChar","number","capital","match"]}
                                        minLength={8}
                                        value={user.password}
                                        valueAgain={user.confirmPassword}
                                        specialCharLength={1}
                                        numberLength={1}
                                        capitalLength={1}
                                        lowerCaseLength={1}
                                        messages={{
                                            minLength: `Password must be ${minLength} chars or above.`,
                                            specialChar: `Password must have at least one "!"#$%&' ()*+,-./:;<=>?@[]^_{|}~`,
                                            number: `Password must have ${numberLength} number "0123456789"`,
                                            capital: `Password must have ${capitalLength} capital letter`,
                                            match: `Passwords must match`,
                                        }}
                                    />
                                </div>
                            )
                        }
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

                    <p></p>
                    {/* <ButtonTransparent onClick={handleGoogleLogin}><span style={{ color: "#333333" }}><Apple /></span><span>et with Apple</span></ButtonTransparent> */}
                </div>
            </div>
            <ChatwootWidget />
        </div>        
    )
}
export default Register;