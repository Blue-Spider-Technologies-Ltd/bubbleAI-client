import React, {useState, useEffect,  } from 'react';
import modalCss from "../UI/Modal/Modal.module.css"
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Overlay } from '../UI/Modal/Modal';
import AuthInput from '../UI/Input/AuthInputs';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { COUNTRIES } from '../../utils/countries';
import { ButtonSubmitGreen } from "../UI/Buttons/Buttons";
import { setError, setFetching } from '../../redux/states';
import { errorAnimation, checkAuthenticatedUser } from '../../utils/client-functions';
import axios from 'axios';



const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { error } = useSelector((state) => state.stateData);
    const [isResumeSubscribed, setIsResumeSubscribed] = useState(false)
    const [resumeDuration, setResumeDuration] = useState("Per Month")
    const [resumeSubExpiration, setResumeSubExpiration] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [mobile, setMobile] = useState("")
    const [stateRegion, setStateRegion] = useState("")
    const [country, setCountry] = useState("")
    //page where cancel icon would lead to
    const prevPath = localStorage.getItem("prevPath")
    const resumeSub = isResumeSubscribed ? resumeDuration : "Unsubscribed"; 
    const resumeSubExp = isResumeSubscribed ? resumeSubExpiration : "Unsubscribed"; 


    const errorSetter = (string) => {
      dispatch(setError(string))
      errorAnimation()
    }

    useEffect(() => {
        const isAuth = localStorage?.getItem("token");
        const populateProfile = async () => {
            try {
                //must await
                await checkAuthenticatedUser()
            } catch (error) {
                localStorage.setItem("prevPath", "/user/dashboard/profile")
                return navigate("/popin");      
            }
            try {
                dispatch(setFetching(true))
                const response = await axios.get("/dashboard/get-profile", {
                    headers: {
                      "x-access-token": isAuth,
                    },
                });
                const profileData = response.data.profile
                setIsResumeSubscribed(profileData.subscriptions.resume.subscribed)
                setResumeDuration(profileData.subscriptions.resume?.duration)
                setResumeSubExpiration(profileData.subscriptions.resume?.endDate)
                setFirstName(profileData.firstName)
                setLastName(profileData.lastName)
                setEmail(profileData.email)
                setDob(profileData?.dob)
                setMobile(profileData.mobile)
                setStateRegion(profileData.stateRegion)
                setCountry(profileData.country)
                
                dispatch(setFetching(false))
            } catch (error) {
                if(error?.response?.status === 401) {
                    localStorage.setItem("prevPath", "/user/dashboard/profile")
                    dispatch(setFetching(false))
                    return navigate("/popin"); 
                }
                dispatch(setFetching(false))
                errorSetter("Something went wrong, reload page")
            }

        }
        populateProfile()
    }, [navigate])
   

    const handleProfileSave = async () => {
        const isAuth = localStorage?.getItem("token");
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            localStorage.setItem("prevPath", "/user/dashboard/profile")
            return navigate("/popin");      
        }
        if (dob.length < 10 || mobile.length < 5 || stateRegion === "" || country === "" ) {
            return errorSetter("You have not made valid changes")
        } else {
            dispatch(setFetching(true))
            try {
                const body = {
                    dob: dob,
                    mobile: mobile,
                    stateRegion: stateRegion,
                    country: country
                }
                const response = await axios.post("/dashboard/edit-profile", body, {
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
                    localStorage.setItem("prevPath", "/dashboard/get-profile")
                    dispatch(setFetching(false))
                    return navigate("/popin"); 
                }
                dispatch(setFetching(false))
                errorSetter("Something went wrong, try again")
            }

        }
    }


    const handleDobChange = (event) => {
        setDob(event.target.value)
    };
    const handleMobileChange = (event) => {
        setMobile(event)
    };
    const handleStateRegionChange = (event) => {
        setStateRegion(event)
    };
    const handleCountryChange = (event) => {
        setCountry(event)
    };
    

    return (
        <Overlay prevPath={prevPath}>
            <div className="error">{error}</div>
            <div className={modalCss.PlainModalOverlay}>
                <AccountCircleIcon 
                    sx={{position: "relative", top: "-60px", color: "#3E8F93", fontSize: "3rem"}} 
                />
                <div style={{position: "relative", top: "-50px"}}>
                    <h3>EDIT PROFILE</h3>
                    <div>
                        <Grid container>
                            <Grid item xs={6}>
                                <div style={{marginBottom: "15px", marginLeft: "10px", textAlign: "left"}}>
                                    <h5>Personal Info</h5>
                                </div>
                                
                                <AuthInput
                                    id={"firstName"}
                                    value={firstName}
                                    label="First Name"
                                    inputType="text"
                                    inputGridSm={12}
                                    disabled={true}
                                    mb={2}
                                />
                                <AuthInput
                                    id={"lastName"}
                                    value={lastName}
                                    label="Last Name"
                                    inputType="text"
                                    inputGridSm={12}
                                    disabled={true}
                                    mb={2}
                                />
                                <AuthInput
                                    id={"email"}
                                    value={email}
                                    label="Your Email"
                                    inputType="email"
                                    inputGridSm={12}
                                    disabled={true}
                                    mb={2}
                                />
                                <div className="detached-label">Date of Birth</div>
                                <AuthInput
                                    id={"dob"}
                                    value={dob}
                                    inputType="date"
                                    inputGridSm={12}
                                    mb={2}
                                    required={true}
                                    onChange={handleDobChange}
                                />


                            </Grid>
                            <Grid item xs={6} sx={{borderLeft: "1px solid #c0d1d457"}}>
                                
                                <div style={{marginBottom: "15px", marginLeft: "10px", textAlign: "left"}}>
                                    <h5>Contact</h5>
                                </div>
                                <AuthInput
                                    id={"mobile"}
                                    value={mobile}
                                    label="Mobile"
                                    inputType="mobile"
                                    inputGridSm={12}
                                    mb={2}
                                    required={true}
                                    onChange={handleMobileChange}
                                />
                                <div style={{ width: "100%", color: '#EE7B1C', fontSize: '.7rem' }}>
                                    Location used to connect you to jobs
                                </div>
                                <AuthInput
                                    id={"country"}
                                    name={country}
                                    value={country}
                                    inputType="country-select"
                                    inputGridSm={12}
                                    mb={2}
                                    required={true}
                                    onChange={handleCountryChange}
                                 />
                                <AuthInput
                                    country={country}
                                    id={"stateRegion"}
                                    name={stateRegion}
                                    value={stateRegion}
                                    inputType="state-select"
                                    inputGridSm={12}
                                    mb={2}
                                    required={true}
                                    onChange={handleStateRegionChange}
                                />

                            </Grid>

                        </Grid>
                        <hr />
                        <div style={{marginBottom: "22px", marginLeft: "10px", textAlign: "left"}}>
                            <h5>Current Subscriptions</h5>
                        </div>
                        <Grid container xs={12}>

                            <AuthInput
                                id={"resumeSub"}
                                value={`${resumeSub}`}
                                label="Resume Subscription"
                                inputType="text"
                                disabled={true}
                                inputGridSm={6}
                                mb={2}
                            />

                            <AuthInput
                                id={"resumeSubExp"}
                                value={`${resumeSubExp.slice(0, 10)}`}
                                label="Expires"
                                inputType="text"
                                disabled={true}
                                inputGridSm={6}
                                mb={2}
                            />
                        </Grid>
                    </div>
                    
                    <ButtonSubmitGreen
                        type="button" 
                        onClick={handleProfileSave}
                    >
                        SAVE & CLOSE
                    </ButtonSubmitGreen>  
                      
                </div>

            </div>

        </Overlay>
    )
}

export default Profile;