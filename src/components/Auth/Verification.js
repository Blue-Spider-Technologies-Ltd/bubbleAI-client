import React, { useState, useEffect } from "react";
import authCss from "./Auth.module.css";
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.png";
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
            //if no error, set verification status
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
                                    <p style={{textAlign: "center"}}>Didn't receive a code?</p>
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
                            
                            <p style={{fontSize: '.75rem', fontWeight: '600'}}>Proceed to <Link href="/popin" sx={{color: '#56A8AC', textDecoration: 'none'}}>Login</Link></p>
                        </div>
                    )}
                </div>
            </div>
        </div>        
    )
}

export default Verification;