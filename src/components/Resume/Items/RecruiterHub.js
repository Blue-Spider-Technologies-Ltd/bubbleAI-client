import React, { useState, useRef } from "react";
import AuthSideMenu from "../../UI/AuthSideMenu/AuthSideMenu";
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import AuthInput from "../../UI/Input/AuthInputs";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { ButtonCard, ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { 
    setHideCards,
    setError,  
    setSuccessMini
  } from "../../../redux/states";
import { errorAnimation, successMiniAnimation } from "../../../utils/client-functions";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { TbFileUpload } from "react-icons/tb";
const screenWidth = window.innerWidth



const RecruiterHub = () => {
    const dispatch = useDispatch();
    // const confirm = useConfirm();
    const { user, isResumeSubbed, error, successMini, hideCards, resumeSubDuration } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const dragDropRef = useRef();
    const dragDropRefTwo = useRef();
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const [fileOne, setFileOne] = useState(null);
      const [fileOneError, setFileOneError] = useState(false);
    const [fileTwo, setFileTwo] = useState(null);
    const [fileTwoError, setFileTwoError] = useState(false);
    
    
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

     ///////DRAG AND DROP & FILE FUNCTIONS
    const handleUploadFileOne = (e) => {
        setFileOneError(false);
        const MAX_FILE_SIZE = 2 * 1024 * 1024;
        const allowedTypes = ['.jpg', '.png', '.pdf', '.jpeg'];

        let selectedFile;
        if (e.type === "drop") {
            selectedFile = e.dataTransfer.files[0];
        } else {
            selectedFile = e.target.files[0];
        }

        if (!selectedFile) {
            errorSetter("No file detected");
            setFileOneError(true);
            return;
        }

        const fileExtension = selectedFile.name.toLowerCase().split('.').pop();
        if (!allowedTypes.includes(`.${fileExtension}`)) {
            errorSetter("Please drop only JPG, PNG, or PDF files.");
            setFileOneError(true);
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            errorSetter(`"${selectedFile.name}" exceeds the maximum file size of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
            setFileOneError(true);
            return;
        }
    
        setFileOne(selectedFile);
    };
  
    const handleDrop = (e) => {
        e.preventDefault();
        handleUploadFileOne(e)
    };  

    ///////DRAG AND DROP & FILE FUNCTIONS
    const handleUploadFileTwo = (e) => {
        setFileTwoError(false);
        const MAX_FILE_SIZE = 2 * 1024 * 1024;
        const allowedTypes = ['.jpg', '.png', '.pdf', '.jpeg'];

        let selectedFile;
        if (e.type === "drop") {
            selectedFile = e.dataTransfer.files[0];
        } else {
            selectedFile = e.target.files[0];
        }

        if (!selectedFile) {
            errorSetter("No file detected");
            setFileTwoError(true);
            return;
        }

        const fileExtension = selectedFile.name.toLowerCase().split('.').pop();
        if (!allowedTypes.includes(`.${fileExtension}`)) {
            errorSetter("Please drop only JPG, PNG, or PDF files.");
            setFileTwoError(true);
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            errorSetter(`"${selectedFile.name}" exceeds the maximum file size of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
            setFileTwoError(true);
            return;
        }
        
        setFileTwo(selectedFile);
    };
  
    const handleDropTwo = (e) => {
        e.preventDefault();
        handleUploadFileTwo(e)
    };

    const goBack = () => {
        dispatch(setHideCards(false))
        setFileOne(null)
        setFileTwo(null)
    }

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
                    <PlainModalOverlay>
                        <div style={styles.modalInner}>
                            <div className='prev-page' onClick={goBack}>
                                <FaLongArrowAltLeft />
                            </div>
                            <h4>Complete KYC to start recruiting.</h4>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">The information provided will be stored securely until verification is completed. It will not be revealed to third-party unless trusted verifiers.</Alert>

                            <Grid container>
                                <AuthInput
                                    id="Other Names"
                                    value=""
                                    label="Other Names"
                                    inputType="text"
                                    inputGridSm={12}
                                    inputGrid={6}
                                    required={true}
                                    mt={2}
                                    // onChange={handleInputChange("firstName")}
                                />
                                <AuthInput
                                    id="Last Name"
                                    value=""
                                    label="Last Name"
                                    inputType="text"
                                    inputGridSm={12}
                                    inputGrid={6}
                                    required={true}
                                    mt={2}
                                    // onChange={handleInputChange("firstName")}
                                />

                                <AuthInput
                                    id="Mobile"
                                    value=""
                                    label="Mobile"
                                    inputType="mobile"
                                    inputGridSm={12}
                                    mt={2}
                                    required={true}
                                // onChange={handleInputChange("mobile")}
                                />
                            </Grid>
                            <div 
                                style={styles.resumesCont}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => dragDropRef.current.click()}
                            >
                                <div>
                                    {fileOne ? 
                                        <div style={styles.activeResume}>{fileOne?.name} <GrStatusGood style={{color: "#3E8F93", fontSize: ".9rem"}} /> </div> 
                                        : 
                                        <div style={styles.eachResume}>Upload Gov't ID * <TbFileUpload style={{color: "rgba(0, 0, 0, 0.634)", fontSize: "1rem"}} /></div> 
                                    }
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={handleUploadFileOne}
                                        hidden
                                        ref={dragDropRef}
                                    />
                                </div>
                            </div>

                            <div 
                                style={styles.resumesCont}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDropTwo}
                                onClick={() => dragDropRefTwo.current.click()}
                            >
                                <div>
                                    {fileTwo ? 
                                        <div style={styles.activeResume}>{fileTwo?.name} <GrStatusGood style={{color: "#3E8F93", fontSize: ".9rem"}} /> </div> 
                                        : 
                                        <div style={styles.eachResume}>Upload Company Certificate * <TbFileUpload style={{color: "rgba(0, 0, 0, 0.634)", fontSize: "1rem"}} /></div> 
                                    }
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={handleUploadFileTwo}
                                        hidden
                                        ref={dragDropRefTwo}
                                    />
                                </div>
                            </div>

                            <div style={{width: '100%'}}>
                                <ButtonSubmitGreen >Submit KYC</ButtonSubmitGreen>
                            </div>

                        </div>
                    </PlainModalOverlay>
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
    resumesCont: {
        width: "100%",
        height: '45px',
        textAlign: "left",
        backgroundColor: "#c0d1d457",
        borderRadius: "20px",
        margin: '15px auto',
        wordBreak: "break-word",
        lineHeight: "1",
        padding: "5px",
        boxShadow: "inset 10px 10px 10px rgba(0, 0, 0, 0.1)"
    },
    eachResume: {
        display: 'flex',
        height: '35px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'rgba(0, 0, 0, 0.454)',
        border: '2px dashed rgba(0, 0, 0, 0.454)',
        padding: '10px',
        borderRadius: '15px',
        fontSize: '.65rem',
        cursor: 'pointer',
        transition: 'all 0.4s ease-out',
        width: '100%',
    },
    activeResume: {
        color: '#3E8F93',
        height: '35px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        border: '2px solid #3E8F93',
        padding: '10px',
        borderRadius: '15px',
        fontSize: '.65rem',
        fontWeight: '500',
        cursor: 'pointer', 
        transition: 'all 0.4s ease-in-out'
    }
}
