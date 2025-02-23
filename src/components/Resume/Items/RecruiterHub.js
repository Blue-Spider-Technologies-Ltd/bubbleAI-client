import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { ButtonCard } from "../../UI/Buttons/Buttons";
import { 
    setHideCards,
    setError,  
    setSuccessMini
  } from "../../../redux/states";
import { errorAnimation, successMiniAnimation } from "../../../utils/client-functions";
import AuthSideMenu from "../../UI/AuthSideMenu/AuthSideMenu";
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import coolImg from '../../../images/cool.png'
const screenWidth = window.innerWidth



const RecruiterHub = () => {
    const dispatch = useDispatch();
    // const confirm = useConfirm();
    const { user, isResumeSubbed, error, successMini, hideCards, resumeSubDuration } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    
    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    const selectBuildType = (str) => {
        dispatch(setHideCards(true))
        // setCreatorDisplay(str)
    }

    const toggleResumes = () => {
        setAuthMenuOpen(!authMenuOpen);
    };


  return (
    <div className="auth-container">
        <AuthSideMenu
            opened={authMenuOpen}
            hidden={!authMenuOpen}
            resumeSubDuration={resumeSubDuration}
            isResumeSubbed={isResumeSubbed}
            error={error}
            successMini={successMini}
            arrayDetails={[]}
            firstName={user.firstName}
        />
        {/* For SIDE MENU */}
        <div style={{ width: "100%", padding: "0" }}>
            <div className="auth-bg-blob"></div>
        </div>

        <div className="auth-container-inner">
            {/* for TOP MENU */}
            <AuthHeader
                authMenuOpen={authMenuOpen}
                onClick={toggleResumes}
                headerText="Ai Recruiter"
            />
            <div className="error">{error}</div>
            <div className="success-mini">{successMini}</div>

            {/* <div style={{margin: '20px auto', width: screenWidth < 900 ? '100%' : '50%'}}>
                <AuthInputs 
                    placeholder="Search for a resume" 
                    inputType="search" 
                    mb={3} 
                    mt={5} 
                    required={true} 
                    value={searchString}
                    onChange={handleSearch}
                />
            </div>  */}

            <div onClick={() => setAuthMenuOpen(false)}>
                {!hideCards ? (
                    <div className="BodyWrapper">
                        <Grid container sx={{padding: '50px 30px'}}>
                            <Grid item md={6} xs={12}>
                                <ButtonCard icon="post-job" title="Post a Vacancy" width={'350px'} onClick={() => selectBuildType("Optimize")} description="Post a vacancy to have it seen only by the most fit candidates analytically hand-picked by Bubble Ai. These features are still in development." />
                            </Grid>
                        
                            <Grid item md={6} xs={12}>
                                <ButtonCard icon="view-recruit" title="View Ai Recruits" width={'350px'} onClick={() => selectBuildType("")} description="Bubble Ai recruits not just based on keywords but also uses industry, experience and background to rank the best applicants that fits your recruitment need in your chosen location(s)." />
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <div style={styles.noResumes}>
                        <h4>Coming Soon</h4>
                        <div>
                            <img src={coolImg} width='100px' alt="Welcome" />
                        </div>
                    </div>
                )}
            </div>

 


        </div>
    </div>
  );
};

export default RecruiterHub;

const styles = {
    cardGrid: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px auto'
    },
    card: { 
        backgroundColor: '#c0d1d457',
        borderRadius: '20px',
        color: 'black',
        display: 'flex', 
        width: screenWidth < 900 ? '100%' : '90%',
    },
    buildDate: {
        marginTop: '10px',
        marginBottom: '-10px',
        textAlign: 'right',
        fontSize: '.6rem',
        width: '100%'
    },
    link: {
        borderRadius: '20px',
        color: 'rgba(0, 0, 0, 0.634)',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 250, 250, 0.625)',
        cursor: 'copy',
        margin: '5px 0',
        height: '35px',
        width: '100%',
        padding: '5px',
        zIndex: '1',
        fontSize: '.75rem',
    },
    img: {
        borderRadius: '50%',
        margin: '10px auto',
        width: '40%',
        maxWidth: '150px',
        maxHeight: '150px'
    },
    greenBtnCont: {
        width: '100px',
        height: '25px'
    },
    noResumes: {
        boxSizing: 'border-box',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '80vh', 
        width: '100%'
    },
}
