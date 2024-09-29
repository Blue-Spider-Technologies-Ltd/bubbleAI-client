import React,  { useState, useEffect } from "react";
import { PlainModalOverlay } from "../UI/Modal/Modal";
import { ButtonSubmitGreen, ButtonTransparent } from "../UI/Buttons/Buttons";
import { Grid, Rating } from '@mui/material';
import AuthInput from "../UI/Input/AuthInputs";
import { checkAuthenticatedUser } from "../../utils/client-functions";
import { SuccessFailureModal } from "../UI/Modal/Modal";
import modalCss from "../UI/Modal/Modal.module.css";
import axios from "axios";
import successImg from '../../images/success.gif';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { errorAnimation } from "../../utils/client-functions";
import { setError } from "../../redux/states";
import {jwtDecode} from 'jwt-decode';;


const Feedback = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [ratingStar, setRatingStar] = useState(0)
    const [comment, setComment] = useState("")
    const [feedbackSent, setFeedbackSent] = useState(false)
    const isAuth = localStorage?.getItem('token')
    const authUser =  jwtDecode(isAuth)
    const firstName = authUser.name.split(" ")[0]


    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    useEffect(() => {
        const isAuthenticated = async () => {
            try {
                //must await
                await checkAuthenticatedUser()
              } catch (error) {
                return navigate("/popin?resume");      
              }
        }

        isAuthenticated()
    }, [navigate])

    const submitRating = async () => {
        if(ratingStar < 0.5) {
            return errorSetter("Rating stars please?")
        }
        try {
            const data = {
                name: firstName,
                rating: ratingStar,
                comment: comment
            }
            const response = await axios.post("/dashboard/submit-feedback", data, {
                headers: {
                  "x-access-token": isAuth,
                },
            });
            setFeedbackSent(true)
        } catch (error) {
            errorSetter("Something went wrong, please try again")
        }

    }

    const cancelFeedback = () => {
        setFeedbackSent(true)
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    return (
        <div>
            {!feedbackSent ? (
                <PlainModalOverlay>
                <div className={modalCss.CheckoutLogoWrapper}>
                    <img src={successImg} alt='Bubble Ai' style={{width: '100%'}} />
                    <h4>Completed!</h4>
                </div>
                    <h2>Kindly leave me a review!</h2>
                    <p>Only your first name will be used</p>

                    
                    <Grid container>
                        <AuthInput
                        id={firstName}
                        value={firstName}
                        inputType="text"
                        inputGridSm={12}
                        mb={1}
                        required={true}
                        disabled={true}
                        />

                        <Grid item xs={12}>
                            <Rating 
                                name="half-rating" 
                                value={ratingStar} 
                                size="medium" 
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setRatingStar(newValue);
                                }} 
                            />
                        </Grid>

                        <AuthInput
                        id={comment}
                        value={comment}
                        placeholder="Kindly leave us a comment about your rating"
                        multiline={true}
                        rows={3}
                        mb={2}
                        inputGridSm={12}
                        onChange={handleCommentChange}
                        />
                    </Grid>


                    <Grid container>
                        <Grid item xs={6}>
                            <div style={{width: "90%", margin: "0 auto"}}>
                                <ButtonTransparent onClick={cancelFeedback}>
                                    No
                                </ButtonTransparent> 
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div style={{width: "90%", margin: "0 auto"}}>
                                <ButtonSubmitGreen type="button" onClick={submitRating}>
                                    Submit
                                </ButtonSubmitGreen>  
                            </div>
                        </Grid>
                    </Grid>
            
                </PlainModalOverlay>                                    
            ) : (
                <SuccessFailureModal 
                    success={true} 
                    notApaymentTextPositive="Thank You!!!"
                    notApayment={true}
                />
            )}
        </div>
        

    )
}

export default Feedback;