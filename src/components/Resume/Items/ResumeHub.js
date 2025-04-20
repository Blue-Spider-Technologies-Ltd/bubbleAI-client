import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import AuthSideMenu from "../../UI/AuthSideMenu/AuthSideMenu";
import { ButtonSubmitGreen, ButtonThin } from "../../UI/Buttons/Buttons";
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import { Grid } from "@mui/material";
import Alert from '@mui/material/Alert';
import axios from 'axios';
import AuthInputs from "../../UI/Input/AuthInputs";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IoMdRemoveCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { VscChecklist } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { errorAnimation, successMiniAnimation, checkAuthenticatedUser, getOrdinalDate } from "../../../utils/client-functions";
import { setError, setSuccessMini, setResume, setFetching, setUserResumesAll } from "../../../redux/states";
const screenWidth = window.innerWidth



const ResumeHub = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const { error, successMini, userResumesAll, isResumeSubbed, resumeSubDuration, user } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const copyLink = useRef(null);
    const isAuth = localStorage?.getItem("token")
    const [modalOpen, setModalOpen] = useState(false)
    const [pricingOpened, setPricingOpened] = useState(false)
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [resumeForSearch, setResumeForSearch] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [resumeIndex, setResumeIndex] = useState(0)
    const [actionString, setActionString] = useState('')
    

    useEffect(() => {

        const resumeLength = Object.keys(userResumesAll).length;

        if (resumeLength < 1 ) {
            navigate('/user/dashboard/resume?customize');
        } 
        setResumeForSearch(userResumesAll)
    }, []);

    // useEffect(() => {
    //     console.log(jobDesc);
        
    // }, [jobDesc]);

    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    const toggleResumes = () => {
        setAuthMenuOpen(!authMenuOpen);
    };

    const goBackPrevPage = () => {
        navigate('/user/dashboard/resume');
    }

    const handleCopy = () => {
        if (copyLink.current) {
            const textToCopy = copyLink.current.textContent;
      
            if (navigator.clipboard) {
              navigator.clipboard.writeText(textToCopy)
                .then(() => {
                  successSetter("Link copied to clipboard");
                })
                .catch((err) => {
                  errorSetter("Failed to copy Link: ", err);
                });
            } else {
              // For older browsers
              const tempTextArea = document.createElement("textarea");
              tempTextArea.value = textToCopy;
              document.body.appendChild(tempTextArea);
              tempTextArea.select();
              document.execCommand("copy");
              document.body.removeChild(tempTextArea);
      
              successSetter("Link copied to clipboard");
            }
        }
    };

    const handleReDownload = (index) => {
        // setTrueOpened(true)
        confirm({
            title: `Open "${resumeForSearch[index].storageDetails.name}" Resume?`,
            description: `Click OK to preview`,
        })
        .then(() => {
            //set only one resume to download
            dispatch(setResume(resumeForSearch[index]))
            navigate("/user/dashboard/resume?download");
        })
        .catch(() => {
            return    
        });
    }

    const coverLetterStart = (index) => {
        setResumeIndex(index)
        setActionString("CL")
        setModalOpen(true)
    }

    const jobIntStart= async (index) => {
        setResumeIndex(index)
        setActionString("Int")
        setModalOpen(true)
    }

    const handleGenerateCL =  async () => {
        const date = getOrdinalDate()
        const myResume = userResumesAll[resumeIndex]
        
        const imgUrl = myResume?.storageDetails?.imgUrl
        const template = myResume?.storageDetails?.template

        
        const prompt = `You are the best and most professional cover letter writer in the world, 
            with 100% ATS and employment success rate from your cover letter writings. Write a stunning professional 
            cover letter tailored to the job description: ${jobDesc} and my resume resume in object form: ${JSON.stringify(myResume)}, 
            pick out the candidate name from keys firstName for First Name and lastName for Last Name within 
            the basicInfo object of the resume; pick out the candidate's work history and all other elements 
            needed to write the best cover letter from the resume object and Date: ${date}. NOTES: Do not include any 
            links or addressing or contact details or place holders e.g [Your Email] [Your Mobile] [Hiring Manager’s Name] to the cover letter. 
            Start with Date, then Dear Hiring Manager and return just the cover letter, with no explanations`
        
        try {
            dispatch(setFetching(true))
            let response = await axios.post("/cover-letter", { prompt }, {
                headers: {
                    "x-access-token": isAuth,
                },
            });
            
            localStorage.setItem("template", template)            
            localStorage.setItem("resume", JSON.stringify(myResume))            
            localStorage.setItem("imgUrl", imgUrl)
            localStorage.setItem("letter", response.data)
            dispatch(setFetching(false))
            successSetter("Your Cover Letter opens in a new tab in 3 seconds")
            //Navigate in a Cover Letter page
            setTimeout(() => {
                window.open("/cover-letter", "_blank");
            }, 3000);
        } catch (error) {
            dispatch(setFetching(false))
            errorSetter("Failed to generate Cover Letter, Try again")
        }
    }

    const handleGenerateInt =  async () => {
        const myResume = userResumesAll[resumeIndex]

        const interviewPrompt = `I am preparing for an upcoming job interview for the Job description provided (${jobDesc}), 
        and my resume used for the application is given here in string object form: (${JSON.stringify(myResume)}). 
        Please provide a detailed and comprehensive guide that includes the following:
        Common Interview Questions: List 15 typical questions I might be asked in order of descending importance, along with their corresponding correct answer, exactly as I should nswer them, using all the details I have provided and those you can find on the given company.
        Company Research: Do a research on the company provided above, its culture, values, and recent news or achievements and feed me with all the info you can find on them.
        Role-Specific Preparation: Important skills and qualifications related to the job, and how I can demonstrate my expertise in these areas during the interview.
        Behavioral Questions: Examples of behavioral questions and the STAR (Situation, Task, Action, Result) method to structure my responses.
        Questions to Ask the Interviewer: Thoughtful questions I can ask at the end of the interview to show my interest and engagement.
        Body Language and Presentation: Tips on how to present myself confidently and effectively during the interview.
        Follow-Up Strategy: Guidance on how and when to follow up after the interview.
        Thank you for your help in preparing me for this important opportunity!`

        localStorage.setItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY", interviewPrompt)
        successSetter("Your Interactive Interview Mock opens in 3 seconds")
        //Navigate in a Cask me page
        setTimeout(() => {
            window.open("/chat", "_blank");
        }, 3000);
        
    }


    const generate = (actionString) => { 
        if(!isResumeSubbed) {
            errorSetter("NOT SUBSCRIBED, Pricing will open in a NEW TAB...")
            if(!pricingOpened) {
                setPricingOpened(true)
                setTimeout(() => {
                    window.open("/pricing", "_blank")
                }, 5000);
            }
            return
        }
        if(jobDesc.length < 20) {
            errorSetter("Job Description TOO SHORT")
            return
        }

        switch (actionString) {
            case "CL":
                handleGenerateCL()
                break;
            case "Int":
                handleGenerateInt()
                break;
            default:
                errorSetter("Something broke, reload and try again")
                break;
        }
    }

    const handleDeleteResume = async (index, imgUrl) => {
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            dispatch(setFetching(false));
            return navigate("/popin?resume");      
        }
        confirm({
            title: `Delete "${resumeForSearch[index].storageDetails.name}" Resume?`,
            description: `Click OK to delete selected resume forever`,
        })
        .then(async () => {
            dispatch(setFetching(true))
            let body;
            if(imgUrl) {
                const urlParts = new URL(imgUrl);
                const pathname = urlParts.pathname;
                const pathParts = pathname.split('/');
                const fileName = pathParts[pathParts.length - 1];
                body = {
                    nameOfResume: resumeForSearch[index].storageDetails.name,
                    fileName: fileName
                }
            } else {
                body = {
                    nameOfResume: resumeForSearch[index].storageDetails.name,
                }
            }

            try {
                const response = await axios.post("/user/delete-resume", body, {
                    headers: {
                        "x-access-token": isAuth,
                    },
                });
                dispatch(setUserResumesAll(response.data.resume))
                setResumeForSearch(response.data.resume)
                dispatch(setFetching(false))
                successSetter("Resume Deleted")
            } catch (error) {
                dispatch(setFetching(false))
                errorSetter(error.response.data.error)
            }
        })
        .catch(() => {
            return    
        });
    }

    const handleSearch = (e) => {
        const newSearchString = e.target.value;
        setSearchString(newSearchString);
    
        if (newSearchString.length === 0) {
            setResumeForSearch(userResumesAll);
        } else  {
            // Filter the resumes based on the search string
            const filteredData = userResumesAll.filter(item =>
                item.storageDetails.name.toLowerCase().includes(newSearchString.toLowerCase())
            );
            setResumeForSearch(filteredData);
        }
    };


    return (
        <div className="auth-container">
            {/* For SIDE MENU */}
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
            <div style={{ width: "100%", padding: "0" }}>
                <div className="auth-bg-blob"></div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                <AuthHeader
                    authMenuOpen={authMenuOpen}
                    onClick={toggleResumes}
                    headerText="My Resumes"
                />
                <div className="error">{error}</div>
                <div className="success-mini">{successMini}</div>

                <div style={{margin: '20px auto', width: screenWidth < 900 ? '100%' : '50%'}} onClick={() => setAuthMenuOpen(false)}>
                    <AuthInputs 
                        placeholder="Search resume by name" 
                        inputType="search" 
                        mb={3} 
                        mt={5} 
                        required={true} 
                        value={searchString}
                        onChange={handleSearch}
                    />
                </div> 

                {Object.keys(userResumesAll).length < 1 ? (
                    <div style={styles.noResumes} onClick={() => setAuthMenuOpen(false)}>
                        <h4>Your Resumes Appear here</h4>
                        <div style={{width: '200px'}}>
                            <ButtonSubmitGreen onClick={goBackPrevPage}>Create Resume</ButtonSubmitGreen>
                        </div>
                    </div>
                ) : (
                    Object.keys(resumeForSearch).length < 1 ? (
                        <div style={styles.noResumes} onClick={() => setAuthMenuOpen(false)}>
                            <h4>No resume found</h4>
                        </div>
                    ) : (
                        <Grid container onClick={() => setAuthMenuOpen(false)}>
                            {resumeForSearch.map((item, index) => (
                                <Grid key={index} item xs={12} md={6} sx={styles.cardGrid}>
                                    <Card sx={styles.card}>
                                        
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>                                            
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {item?.storageDetails?.name ? item.storageDetails.name.length > 40 ? `${item.storageDetails.name.slice(0, 40)}...` : item.storageDetails.name : 'Unnamed'}
                                                </Typography>
                                                {item?.storageDetails?.resumeLink && (
                                                    <div style={styles.link} title="Copy Resume Link" onClick={handleCopy}>
                                                        <div style={{overflowX: 'hidden', whiteSpace: 'nowrap'}}>
                                                            <span>Copy Share Link</span> 
                                                            <span style={{ display: 'none'}} ref={copyLink}>
                                                                {item?.storageDetails?.resumeLink}
                                                            </span>
                                                        </div>
                                                        <div >
                                                            <ContentCopyIcon fontSize='small' />
                                                        </div>
                                                    </div>
                                                )}
                                                {item?.storageDetails?.buildDate && (
                                                    <Typography sx={styles.buildDate}>
                                                        {item?.storageDetails?.buildDate}
                                                    </Typography>
                                                )}

                                            </CardContent>


                                            <div style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-around', 
                                                paddingBottom: '1rem', 
                                                flexWrap: 'wrap', 
                                                gap: '10px', // Adjust the gap between items as needed
                                                width: '100%',
                                                margin: '0 auto'
                                            }}>
                                                <div style={{ flex: '1 1 auto' }}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid #3E8F93' 
                                                        width={'100%'} // Use 100% to fill the parent div
                                                        height='25px' 
                                                        color='black'
                                                        onClick={() => handleReDownload(index)}
                                                    >
                                                        <FaEye style={{color: "#3E8F93", fontSize: ".9rem"}} />&nbsp;&nbsp; View Resume
                                                    </ButtonThin>
                                                </div>
                                                <div style={{ flex: '1 1 auto' }}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid #987070' 
                                                        width={'100%'} // Use 100% to fill the parent div
                                                        height='25px' 
                                                        color='black'
                                                        onClick={() => coverLetterStart(index)}
                                                    >
                                                        <SlEnvolopeLetter style={{color: "#987070", fontSize: ".9rem"}} />&nbsp;&nbsp; Get Cover Ltr
                                                    </ButtonThin>
                                                </div>
                                                <div style={{ flex: '1 1 auto' }}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid black' 
                                                        width={'100%'} 
                                                        height='25px' 
                                                        color='black'
                                                        onClick={() => jobIntStart(index)}
                                                    >
                                                        <VscChecklist style={{color: "black", fontSize: ".9rem"}} />&nbsp;&nbsp; Interview Mock
                                                    </ButtonThin>
                                                </div>
                                                <div style={{ flex: '1 1 auto' }}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid rgba(158, 9, 9, 0.733)' 
                                                        width={'100%'} 
                                                        height='25px' 
                                                        color='rgba(158, 9, 9, 0.733)'
                                                        onClick={() => handleDeleteResume(index, item?.storageDetails?.imgUrl)}
                                                    >
                                                        <IoMdRemoveCircle style={{color: "rgba(158, 9, 9, 0.733)", fontSize: ".9rem"}} />&nbsp;&nbsp; Delete Resume
                                                    </ButtonThin>
                                                </div>
                                            </div>
                                        </Box>

                                    </Card>
                                </Grid>
                            ))}          
                        </Grid>
                    )

                )}

            </div>

            {modalOpen && (
                <PlainModalOverlay>
                    <div style={styles.modalInner}>
                        <div className='prev-page' onClick={() => setModalOpen(false)}>
                            <FaLongArrowAltLeft />
                        </div>
                        <h4>Paste job description into the field below.</h4>

                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem' }} severity="warning">This improves your score.</Alert>
                        </div>
                        
                        <div style={styles.descCont}>
                            <AuthInputs
                              id={"jobDesc"}
                              name="jobDesc"
                              value={jobDesc}
                              placeholder="  Full job description here..."
                              multiline={true}
                              rows={6}
                              maxRows={6}
                              inputGridSm={12}
                              onChange={(event) => setJobDesc(event.target.value)}
                            />
                        </div>

                        <div style={{width: '100%'}}>
                            <ButtonSubmitGreen onClick={() => generate(actionString)} >Generate</ButtonSubmitGreen>
                        </div>

                    </div>
                </PlainModalOverlay>
            )}
        </div>
    );
};

export default ResumeHub;

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
        padding: '10px',
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
    leftCont: { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        flexWrap: 'wrap',
        width: '100%', 
    },
    descCont: {
        width: '100%',
        margin: '15px auto',
        padding: 0
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
        height: '30vh', 
        width: '100%'
    }
}
