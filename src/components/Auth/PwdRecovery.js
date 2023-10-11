import React, { useState, useEffect } from "react";
import authCss from "./Auth.module.css";
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.png";
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack } from "../UI/Buttons/Buttons";
import { Link } from "@mui/material";
import { Send, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-multiple-password-validator"


const screenWidth = window.innerWidth

const PwdRecovery = () => {
    const { email } = useSelector(state => state.stateData)
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [pwdChecklist, showPwdChecklist] = useState(false)
    const [isPwdChanged, setIsPwdChanged] = useState(false)
    const [data, setData] = useState({
        email: email || '',
        code: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    //Set password rules parameters
    const minLength = 8
    const numberLength = 1
    const capitalLength = 1
    
    //If email is not set for reset
    useEffect(() => {
        if (email === "") {
            navigate('/popin')
        } 
    }, [email, navigate]);

    //Login submit handler
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        const recoveryData = {
            email: data.email,
            code: data.code,
            newPassword: data.newPassword
        }
        try {
            //Alert user if paswords do not match
            if (data.newPassword !== data.confirmNewPassword) {
                setError("passwords do not match")
            } else {
                const response = await axios.post('/auth/new-password', recoveryData)
                console.log(response.statusText);
                //show success modal
                setIsPwdChanged(true);
            }

        } catch (error) {
            setLoading(false)
            console.log(error.response.data.mesage);
            setError(error.response.data.message)
        }

    }

    const handleBlur = () => {
        showPwdChecklist(!pwdChecklist);
    };

    const handleInputChange = (prop) => (event) => {
        setError("")
        setData({ ...data, [prop]: event.target.value});
    };
    return (
        <div>
            <MenuBar />
            <div className={authCss.authContainer}>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', marginRight: '100px'}}>
                    <Blob bgImage={bubbleBgAuthImg} altText="Password Recovery" />
                </div>

                <div style={{marginTop: screenWidth > 900 ? '350px' : '', marginLeft: '100px'}} >
                    <Blob bgImage={bubbleBgAuthImg} altText="Password Recovery" />
                </div>

            </div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner} style={{marginTop: '200px'}}>
                {!isPwdChanged ? (
                    <div>
                        <h2>Enter code</h2>
                        <div className="error">{error}</div>
                        <form onSubmit={handleFormSubmit}>
                            <Input placeholder="Code..." value={data.code} inputType="text" inputGridSm={12} onChange={handleInputChange('code')} /> 
                            <h2>Set new password</h2>
                            <Input placeholder="New password..." value={data.newPassword} inputType="password" inputGridSm={12} onChange={handleInputChange('newPassword')} onFocus={handleBlur} onBlur={handleBlur} />
                            <Input placeholder="Confirm password..." value={data.confirmNewPassword} inputType="password" inputGridSm={12} onChange={handleInputChange('confirmNewPassword')} onFocus={handleBlur} onBlur={handleBlur} />

                            {pwdChecklist &&
                                (
                                    <div style={{width: '90%', padding: '5px', margin: '0 20px 20px', fontSize: '.7rem', backgroundColor: '#c0d1d413', borderRadius: '3px'}}>
                                        <PasswordChecklist
                                            iconSize={12}
                                            rules={["minLength","specialChar","number","capital","match"]}
                                            minLength={8}
                                            value={data.newPassword}
                                            valueAgain={data.confirmNewPassword}
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
                    </div>
                ) : (
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#56A8AC'}} >
                            <CheckCircle fontSize="large" /> 
                            <h2>Password Changed</h2>
                        </div>
                        
                        <p style={{fontSize: '.75rem', fontWeight: '600'}}>Proceed to <Link href="/popin" sx={{color: '#56A8AC', textDecoration: 'none'}}>Login</Link></p>
                    </div>
                )}
                    

                </div>
            </div>
        </div>        
    )
}

export default PwdRecovery;