import React, {useState} from "react";
import authCss from "./Auth.module.css"
import MenuBar from "../UI/Menu/Menu";
import Blob from "../UI/Blob/Blob";
import bubbleBgAuthImg from "../../images/bubblebg-auth.png"
import { Input } from "../UI/Input/Input";
import { ButtonSubmitBlack, ButtonTransparent } from "../UI/Buttons/Buttons";
import { Send, Google, Apple } from '@mui/icons-material';
import { Link, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner'
import PasswordChecklist from "react-multiple-password-validator"
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/states";
import { errorAnimation } from "../../utils/client-functions";


const screenWidth = window.innerWidth

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [pwdChecklist, showPwdChecklist] = useState(false)
    //Set password rules parameters
    const minLength = 8
    const numberLength = 1
    const capitalLength = 1

    const errorSetter = (string) => {
        setError(string)
        errorAnimation()
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (user.password.length < 8) {
            errorSetter('password too short')
            return
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
                setLoading(false)
                console.log(response.status);
                //Set email to retrieve for verification
                dispatch(setEmail(user.email))
                navigate("/verify")

            } catch (error) {
                console.log(error)
                setLoading(false)
                errorSetter(error.response.data.message)
            }

        } else {
            errorSetter('password strings do not match')
        }
    }

    const handleInputChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value});
    };

    const handleBlur = () => {
        showPwdChecklist(!pwdChecklist);
    };
      
      // Usage:
      // onBlur={handleBlur}

    return (
        <div>
            <MenuBar />
            <div className={authCss.authContainer}>

                <div style={{marginBottom: screenWidth > 900 ? '350px' : '', marginRight: '100px'}}>
                    <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />
                </div>

                <div style={{marginTop: screenWidth > 900 ? '350px' : '', marginLeft: '100px'}} >
                    <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />
                </div>

            </div>

            <div className={authCss.formContainer}>
                <div className={authCss.formInner}>
                    <h2>Get a Bubble</h2>
                    <div className="error">{error}</div>
                    <form method="post" onSubmit={handleFormSubmit}>
                        <Grid container>
                            <Input placeholder="First name..." value={user.firstName} inputType="text" inputGridSm={12} inputGrid={6} onChange={handleInputChange('firstName')} /> 
                            <Input placeholder="Last name..." value={user.lastName} inputType="text" inputGridSm={12} inputGrid={6} onChange={handleInputChange('lastName')} /> 
                        </Grid>
                        <Input placeholder="Email..." value={user.email} inputType="email" inputGridSm={12} onChange={handleInputChange('email')} /> 
                        <Input placeholder="Password..." value={user.password} inputType="password" inputGridSm={12} onChange={handleInputChange('password')} onFocus={handleBlur} onBlur={handleBlur} />
                        <Input placeholder="Confirm password..." value={user.confirmPassword} inputType="password" inputGridSm={12} onChange={handleInputChange('confirmPassword')} onFocus={handleBlur} onBlur={handleBlur} />
                        <Link href="/popin" className={authCss.pwdRec}>Login?</Link>
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
                    <p><strong>Or</strong></p>
                    <ButtonTransparent><span style={{ color: "#940101" }}><Google /></span><span>et with Google</span></ButtonTransparent>
                    <p></p>
                    <ButtonTransparent><span style={{ color: "#333333" }}><Apple /></span><span>et with Apple</span></ButtonTransparent>
                </div>
            </div>
        </div>        
    )
}
export default Register;