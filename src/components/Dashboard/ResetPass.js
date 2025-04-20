import React, {useState, useEffect,  } from 'react';
import modalCss from "../UI/Modal/Modal.module.css"
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Overlay } from '../UI/Modal/Modal';
import AuthInput from '../UI/Input/AuthInputs';
import { ButtonSubmitGreen } from "../UI/Buttons/Buttons";
import LockResetIcon from '@mui/icons-material/LockReset';
import { setError, setFetching } from '../../redux/states';
import { errorAnimation, checkAuthenticatedUser } from '../../utils/client-functions';
import PasswordChecklist from "react-multiple-password-validator"
import axios from 'axios';



const ResetPass = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { error } = useSelector((state) => state.stateData);
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmNewPass, setConfirmNewPass] = useState("")
    //page where cancel icon would lead to
    const prevPath = localStorage.getItem("prevPath")
    const [pwdChecklist, showPwdChecklist] = useState(false)
    //Set password rules parameters
    const minLength = 8
    const numberLength = 1
    const capitalLength = 1

    const errorSetter = (string) => {
      dispatch(setError(string))
      errorAnimation()
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                //must await
                await checkAuthenticatedUser()
            } catch (error) {
                localStorage.setItem("prevPath", "/user/dashboard/reset-pass")
                return navigate("/popin");      
            }
        }
        checkAuth()
    }, [navigate])

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
    
    const handleResetPass = async () => {
        const isAuth = localStorage?.getItem("token");
        try {
            checkPassword(newPass)
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            localStorage.setItem("prevPath", "/user/dashboard/reset-pass")
            return navigate("/popin");      
        }

        if(newPass !== confirmNewPass) {
            return errorSetter("New password and its confirmation do not match")
        }
        if(!isValid) {
            return errorSetter("Password too weak")
        }

        const body = {
            newPass: newPass,
            oldPass: oldPass
        }

        dispatch(setFetching(true))
        try { 
            const response = await axios.post("/dashboard/reset-pass", body, {
                headers: {
                    "x-access-token": isAuth,
                },
            })

            if (response.status === 201) {
                const prevPath = localStorage.getItem("prevPath")
                navigate(prevPath)
                localStorage.removeItem("prevPath")
                dispatch(setFetching(false))
                return
            }
            dispatch(setFetching(false))
            errorSetter("Something went wrong, try again")

        } catch (error) {
            dispatch(setFetching(false))
            if(error?.response?.status === 401) {
                dispatch(setFetching(false))
                errorSetter("Old password is wrong")
                return
            }
            dispatch(setFetching(false))
            errorSetter("Something went wrong, try again")
        }

 
    }


    const handleOldPass = (event) => {
        setOldPass(event.target.value)
    };
    const handleNewPass = (event) => {
        setNewPass(event.target.value)
    };
    const handleConfirmPass = (event) => {
        setConfirmNewPass(event.target.value)
    }

    const handleFocus = () => {
        showPwdChecklist(true);
    };
    

    return (
        <Overlay prevPath={prevPath}>
            <div className="error">{error}</div>
            <div className={modalCss.PlainModalOverlay}>
                <LockResetIcon 
                    sx={{position: "relative", top: "-10px", color: "#3E8F93", fontSize: "3rem"}} 
                />
                <div style={{position: "relative", top: "-10px"}}>
                    <h3>CHANGE PASSWORD</h3>
                    <div>
                        <Grid container>
                            <AuthInput
                                id={"oldPass"}
                                value={oldPass}
                                label="Old Password"
                                inputType="password"
                                inputGridSm={12}
                                mb={2}
                                onChange={handleOldPass} 
                            />   
                            <AuthInput
                                id={"newPass"}
                                value={newPass}
                                label="New Password"
                                inputType="password"
                                inputGridSm={12}
                                mb={2}
                                onChange={handleNewPass} 
                                onFocus={handleFocus}
                            />   
                            <AuthInput
                                id={"confirmNewPass"}
                                value={confirmNewPass}
                                label="New Password Again"
                                inputType="password"
                                inputGridSm={12}
                                mb={2}
                                onChange={handleConfirmPass} 
                                onFocus={handleFocus}
                            />  
                        </Grid>
                    </div>

                    {pwdChecklist &&
                        (
                            <div style={{width: '100%', padding: '0', margin: '0 20px 20px', fontSize: '.7rem', backgroundColor: '#c0d1d413', borderRadius: '3px'}}>
                                <PasswordChecklist
                                    iconSize={12}
                                    rules={["minLength","specialChar","number","capital","match"]}
                                    minLength={8}
                                    value={newPass}
                                    valueAgain={confirmNewPass}
                                    specialCharLength={1}
                                    numberLength={1}
                                    capitalLength={1}
                                    lowerCaseLength={1}
                                    messages={{
                                        minLength: `Password must be ${minLength} chars or above.`,
                                        specialChar: `Must have at least one "!"#$%&' ()*+,-./:;<=>?@[]^_{|}~`,
                                        number: `Must have ${numberLength} number "0123456789"`,
                                        capital: `Must have ${capitalLength} capital letter`,
                                        match: `Must match`,
                                    }}
                                />
                            </div>
                        )
                    }
                    
                    <ButtonSubmitGreen
                        type="button" 
                        onClick={handleResetPass}
                    >
                        CHANGE & CLOSE
                    </ButtonSubmitGreen>  
                      
                </div>

            </div>

        </Overlay>
    )
}

export default ResetPass;