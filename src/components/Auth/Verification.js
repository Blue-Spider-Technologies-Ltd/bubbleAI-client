import React, { useState, useEffect } from "react";
import authCss from "./Auth.module.css";
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.jpg";
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import { Send} from '@mui/icons-material';
import { Link } from "@mui/material";
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { errorAnimation } from "../../utils/client-functions";
import { setError } from "../../redux/states";
import { setEmail } from "../../redux/states";


const screenWidth = window.innerWidth

const Verification = () => {
    const { email, error } = useSelector(state => state.stateData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: email || "",
        code: ""
    });
    const [verified, setVerified] = useState(false);
    const [count, setCount] = useState(60);
    const [isZero, setIsZero] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [couponCode, setCouponCode] = useState("")

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    //If email is not set for verification
    useEffect(() => {
        console.log(location.search.slice(6));
        if (email === "" && location.search.slice(6) === "") {
            navigate('/join-bubble')
        } 
        if (location.search.slice(6) !== "") {
            setData({
                ...data,
                email: location.search.slice(6)
            })
        }
    }, [email, navigate, location]);

    //set email verification countdown
    useEffect(() => {
        if (count > 0) {
          const timer = setTimeout(() => setCount(count - 1), 1000);
          return () => clearTimeout(timer);
        } else {
          setIsZero(true);
        }
    }, [count]);

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/auth/verify', data)
            setLoading(false)
            //check for predefined errors that might not be caught by error handler
            if (response.data.status === "error") {
                errorSetter(response.data.message)
                return
            }
            
            setCouponCode(response.data.couponCode)
            setFirstName(response.data.firstName)
            setVerified(true)
            

        } catch (error) {
            setLoading(false)
            errorSetter(error.response.data.message)
        }

    }

    const handleReset = async () => {
        setCount(60);
        setIsZero(false);
        //send email resend request
        try {
            const response = await axios.post('/auth/resend-email-code', data)
            console.log(response);
        } catch (error) {
            errorSetter(error.response.message)
        }
    };

    const handleInputChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value});
    };
    return (
        <div>
            <MenuBar />
            <div className={authCss.authContainer}>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', marginRight: '100px'}}>
                    <Blob bgImage={bubbleBgAuthImg} altText="Verify" />
                </div>

                <div style={{marginTop: screenWidth > 900 ? '350px' : '', marginLeft: '100px'}} >
                    <Blob bgImage={bubbleBgAuthImg} altText="Verify" />
                </div>

            </div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner} style={{marginTop: '200px'}}>
                    {!verified ? (
                        <div>
                            <h2>Verify Email</h2>
                            <span>Verification code sent to email below</span>
                            <div className="error">{error}</div>
                            <div style={{fontSize: '.8rem', color: '#56A8AC', marginBottom: '10px'}}>{data.email}</div>
                                <div style={{margin: '10px 0', fontSize: '.8rem'}}>
                                    <p style={{textAlign: "center"}}>Didn't receive a code? <strong>Check spam</strong></p>
                                    <span>
                                        <button disabled={!isZero} className={isZero ? authCss.enabledResendBtn :  authCss.disabledResendBtn} onClick={handleReset}>Resend</button>
                                        {!isZero && <span>code in <span style={{backgroundColor: '#c0d1d453', padding: '3px', borderRadius: '5px', color: '#3E8F93'}}>{count}</span> seconds</span>}
                                    </span> 
                                </div>
                            <form onSubmit={handleFormSubmit}>

                                <Input placeholder="Verification Code" value={data.code} inputType="password" inputGridSm={12} onChange={handleInputChange('code')} required />
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
                        </div>
                    ) : (
                        <div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#56A8AC'}} >
                                <CheckCircleIcon fontSize="large" /> 
                                <h2>Account Verified</h2>
                            </div>
                            
                            <div style={styles.container}>
                                <div>
                                    <p>Dear {firstName},</p>
                                    <h2>YOUR WELCOME GIFT!</h2>
                                </div>
                                <p>To boost your chances, this is an <strong>OFFER LIMITED FOR 3 DAYS</strong>, of a 30% DISCOUNT coupon with code: <span style={{fontSize: '1.5rem', fontWeight: 600, color: '#3E8F93'}}>{couponCode}</span> on our PER WEEK PLAN only.</p>
                                <p>You can create an unlimited number of CVs for the week, unlimited number of cover letters, and unlimited applications to high-paying jobs tailored to your specifications, guaranteeing you a JOB INTERVIEW WITHIN A WEEK.</p>
                                
                                <div style={{textAlign: 'center', lineHeight: 2}}>
                                    <h2>Your Next Steps:</h2>
                                    <a href='/pricing' style={styles.link} target="_blank">Redeem Discount</a> <br />
                                    <a href='/user/dashboard/resume' style={styles.link} target="_blank">Try FOR FREE</a> <br />
                                    <a href='/user/dashboard/resume' style={styles.link} target="_blank">Apply to 5 Jobs in 10mins</a> <br />
                                    <a href='/chat' style={styles.link} target="_blank">Free Interview Prep</a> <br />
                                    <a href='/chat' style={styles.link} target="_blank">Create Content Script Free</a> <br />
                                    <a href='/chat' style={styles.link} target="_blank">Free Research with Bubble Ai</a> <br />
                                    <a href='https://www.instagram.com/reel/C8pHqBfIuUY/?igsh=MW9qYnV0em40YW1zdw==' style={styles.link} target="_blank" rel="noreferrer">Earn with Bubble Ai</a> 
                                </div> 
                                
                                <p></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>        
    )
}

const styles = {
    container: {
      width: "100%",
      textAlign: "center !important",
      padding: "5px",
      backgroundColor: "#c0d1d457",
      borderRadius: "10px",
      wordBreak: "break-word",
      lineHeight: "1",
      boxShadow: "inset 10px 10px 10px rgba(0, 0, 0, 0.1)"
    },
    link: {
        fontSize: ".9rem",
        fontWeight: '600',
        color: 'rgb(177, 144, 13)',
        textDecoration: 'none'
    }
}

export default Verification;