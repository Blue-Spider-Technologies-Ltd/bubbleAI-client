import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { PlainModalOverlay } from "../../UI/Modal/Modal";
import Feedback from "../../Dashboard/Feedback";
import { ButtonSubmitGreen, ButtonThin } from "../../UI/Buttons/Buttons";
import { 
    errorAnimation, 
    successMiniAnimation, 
    checkAuthenticatedUser,
    getOrdinalDate 
} from "../../../utils/client-functions";
import { setFetching, setError, setSuccessMini, setResumeSubDuration, setIsResumeSubbed } from "../../../redux/states";
import Alert from '@mui/material/Alert';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IoSparklesSharp } from "react-icons/io5";
import { VscChecklist } from "react-icons/vsc";
import { FaSuitcase } from "react-icons/fa6";
import { IoMdRemoveCircle } from "react-icons/io";
import { SlEnvolopeLetter } from "react-icons/sl";
import { MdMarkEmailRead } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import iconImg from '../../../images/bubble icon.jpg'
import axios from "axios";
const screenWidth = window.innerWidth



const JobHub = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const { 
        error, 
        successMini, 
        resumeSubDuration, 
        isResumeSubbed 
    } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const isAuth = localStorage?.getItem("token");
    const [jobs, setJobs] = useState([])
    const [img, setImg] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const [textColor, setTextColor] = useState('black');
    const [modalOpen, setModalOpen] = useState(false)
    const [allResumes, setAllResumes] = useState([])
    const [singleResume, setSingleResume] =  useState({})
    const [chosenJob, setChosenJob] =  useState({})
    const [actionString, setActionString] = useState('')
    const [activeResIndex, setActiveResIndex] = useState(0)
    const [isFeedbackTime, setIsFeedbackTime] = useState(false)
    const [pricingOpened, setPricingOpened] = useState(false)

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
            maxHeight: '500px',
            width: screenWidth < 900 ? '100%' : '90%',
            overflow: 'hidden', // Hide overflow to ensure smooth transition
            transition: 'all 3s ease-in-out',
        },
        cardLarge: { 
            backgroundColor: '#c0d1d457',
            borderRadius: '20px',
            color: 'black',
            display: 'flex', 
            maxHeight: 'none',
            width: screenWidth < 900 ? '100%' : '90%',
            overflow: 'visible', // Hide overflow to ensure smooth transition
            transition: 'all 3s ease-in-out',
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
            width: '100%',
            padding: '5px',
            zIndex: '1',
            fontSize: '.75rem',
        },
        img: {
            borderRadius: '50%',
            margin: '20px',
            maxWidth: '60px',
            maxHeight: '60px'
        },
        animText: {
            width: 'auto',
            margin: '15px auto',
            fontSize: '.85rem',
            textAlign: 'center',
            fontWeight: '600',
            color: textColor,
            backgroundColor: '#c0d1d4',
            borderRadius: '20px',
            padding: '15px 10px'
        },
        noResumes: {
            boxSizing: 'border-box',
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '30vh', 
            width: '100%'
        },
        key: {
            fontWeight: '700'
        },
        unlock: {
            textDecoration: 'underline',
            fontSize: '.7rem'
        }, 
        desc: {
            fontSize: '.74rem',
            padding: '10px 0'
        },
        modalInner: {
            width: '100%',
            textAlign: 'center'
        },
        resumesCont: {
            width: "100%",
            maxHeight: '200px',
            overflowY: 'scroll',
            textAlign: "left",
            padding: "15px 5px",
            backgroundColor: "#c0d1d457",
            borderRadius: "10px",
            margin: '15px auto',
            wordBreak: "break-word",
            lineHeight: "1",
            boxShadow: "inset 10px 10px 10px rgba(0, 0, 0, 0.1)"
        },
        eachResume: {
            width: '100%',
            border: '1px dashed black',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '.65rem',
            marginBottom: '5px',
            cursor: 'pointer',
            transition: 'all 0.4s ease-out'
        },
        activeResume: {
            color: '#3E8F93',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            border: '1px solid #3E8F93',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '.65rem',
            fontWeight: '500',
            marginBottom: '5px',
            cursor: 'pointer', 
            transition: 'all 0.4s ease-in-out'
        }
    }

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    useEffect(() => {
        const feedback = localStorage.getItem('feedbackTime');

        if (feedback) {
            const timer = setTimeout(() => {
                setIsFeedbackTime(true);
            }, 10000);

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        dispatch(setFetching(true));
        
        const populateJobs = async () => {
            try {
                //must await
                await checkAuthenticatedUser()
            } catch (error) {
                dispatch(setFetching(false));
                return navigate("/popin?resume");      
            }
          //Get Data if User is Authorized by subscription
          try {
                const response = await axios.get('/user/job-hub', {
                    headers: {
                        "x-access-token": isAuth,
                    },
                });
        
                if (response?.data?.status === "unauthenticated") {
                    localStorage?.removeItem("token");
                    return navigate("/popin?resume");
                }


                const data = response?.data

                dispatch(setResumeSubDuration(data?.subDuration));
                dispatch(setIsResumeSubbed(data?.resumeSub));
                setJobs(data?.jobs)
                setAllResumes(data.resumes)
                dispatch(setFetching(false));
    
            } catch (error) {
                dispatch(setFetching(false));
                errorSetter("Reload page to fetch data")
            }
        };
        setImg(iconImg);
        populateJobs();

    }, []);



    const goBackPrevPage = () => {
        navigate('/user/dashboard/resume');
    }

    const getResume = (description, title) => {

        if(!isResumeSubbed) {
            errorSetter("Upgrade your subscription to access this feature")
            setTimeout(() => {
                window.open('/pricing', '_blank')
            }, 5000);
        } else {
            if(!description) {
                confirm({
                    title: "Description Not Available For This Job",
                    description: `Click Ok if you must continue, but the resulting resume might not be fully optimized for this job.`,
                })
                .then(() => {
                    localStorage.setItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXdescription", description)
                    localStorage.setItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXtitle", title)
                    window.open('/user/dashboard/resume', '_blank')
                })
                .catch(() => {
                    errorSetter('Process Terminated')
                });
            } else {
                confirm({
                    title: "Optimize a resume to this Job?",
                    description: `You will be redirected to upload an old resume which will be automatically tailored for this job. This will 100x your chances.`,
                })
                .then(() => {
                    localStorage.setItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXdescription", description)
                    localStorage.setItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXtitle", title)
                    window.open('/user/dashboard/resume', '_blank')
                })
                .catch(() => {
                    errorSetter('Process Terminated')
                });
            }
        }

    }

    
    const getJob = async (linkedinUrl, companyUrl) => {
        if(!isResumeSubbed) {
            errorSetter("Upgrade your subscription to access this feature")
            setTimeout(() => {
                window.open('/pricing', '_blank')
            }, 5000);
        } else {
            if(!companyUrl) {
                window.open(linkedinUrl, '_blank')
            }
            window.open(companyUrl, '_blank')
        }
    }

    const deleteJob = async (id, jobName) => {
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            dispatch(setFetching(false));
            return navigate("/popin?resume");      
        }
        confirm({
            title: `Delete "${jobName}"?`,
            description: `Click OK to delete selected job from your hub`,
        })
        .then(async () => {
            dispatch(setFetching(true))

            const body = {
                jobId: id
            }
            
            try {
                const response = await axios.post("/user/delete-job", body, {
                    headers: {
                        "x-access-token": isAuth,
                    },
                });
                setJobs(response.data.jobs)
                dispatch(setFetching(false))
                successSetter("Job Deleted")
            } catch (error) {
                dispatch(setFetching(false))
                errorSetter(error.response.data.error)
            }
        })
        .catch(() => {
            return
        });
    }

    const chooseActStr = async (str, item) => {
        setActionString(str)
        setModalOpen(true)
        setChosenJob(item)
    }

    const chooseResume = (index) => {
        setActiveResIndex(index + 1)
        setSingleResume(allResumes[index])
    }


    const handleGenerate = async () => {

        if(!isResumeSubbed) {
            errorSetter("Upgrade your subscription to access this feature")
            if(!pricingOpened) {
                setTimeout(() => {
                    setPricingOpened(true)
                    window.open('/pricing', '_blank')
                }, 5000);
            }

        } else {
                                
            if(resumeSubDuration !== "Per Week" && resumeSubDuration !== "Per Month") {
                return errorSetter("Upgrade Subscription to access this feature")
            }

            switch (actionString) {
                case "Cover Letter":
                    const date = getOrdinalDate()
                    const companyName = chosenJob?.company_name
                    const jobDesc = chosenJob?.description
                    const jobPosition = chosenJob?.title
                    const imgUrl = singleResume?.storageDetails?.imgUrl
                    const template = singleResume?.storageDetails?.template
    
                    localStorage?.removeItem("template")            
                    localStorage?.removeItem("imgUrl")
                    localStorage?.removeItem("resume")
                    localStorage?.removeItem("letter")
                    
                    const prompt = `You are the best and most professional cover letter writer in the world, 
                        with 100% success rate from your cover letter writings. Write a stunning professional 
                        cover letter using the following details: Job Position: ${jobPosition}, 
                        Job Description: ${jobDesc}, Company Name: ${companyName}, My resume in object form: ${JSON.stringify(singleResume)}, 
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
                        localStorage.setItem("resume", JSON.stringify(singleResume))            
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

                    break;
                    
                case "Email":
                    const emailPrompt = `Please help me draft a follow-up email regarding my 
                        job application for the Job Title: ${chosenJob?.title} and Company Name: ${chosenJob?.company_name}. I would like the email to be professional and polite, 
                        expressing my continued interest in the position and inquiring about the status of my application. 
                        Additionally, using details from this resume string object: ${JSON.stringify(singleResume)} and the following job description: ${chosenJob?.description}, 
                        please include a very brief reminder of my relevant skills or experiences that make me a strong candidate for this role. Thank you!`

                    localStorage.setItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY", emailPrompt)
                    successSetter("Your Email opens in a new tab in 3 seconds")
                    //Navigate in a ask me page
                    setTimeout(() => {
                        window.open("/chat", "_blank");
                    }, 3000);

                    break;
    
                
                case "Interview":
                    const interviewPrompt = `I am preparing for an upcoming job interview for the Job Title: ${chosenJob?.title}, Company Name: ${chosenJob?.company_name}, Job Description: ${chosenJob?.description} 
                        and my resume used for the application is given here in string object form: ${JSON.stringify(singleResume)}. 
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
                    break;
            
                default:
                    break;
            }
        }
        
    }



  return (
    <div>
        {isFeedbackTime ? <Feedback notApaymentTextPositive="Resume Creation Completed!"/> : (
            <div className="auth-container">
                {/* For SIDE MENU */}
                <div style={{ width: "100%", padding: "0" }}>
                    <div className="auth-bg-blob"></div>
                </div>
                <div className='go-back' style={{position: "absolute", top: "1.3rem", left: "1rem"}}>
                    <div onClick={goBackPrevPage} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: '80px'}}>
                        <ArrowCircleLeftIcon fontSize='large' />
                    </div>
                </div>

                <div className="auth-container-inner">
                    {/* for TOP MENU */}
                    <AuthHeader
                        noAuthMenu={true}
                        headerText="My Jobs"
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

                    <div style={styles.animText}>
                        <TypeAnimation
                            sequence={[
                                () => setTextColor('#3E8F93'),
                                1000,
                                'Greater Than 90% Chance of Beating ATS',
                                1000,
                                'Greater Than 90% Chance of Interview',
                                1000,
                                'Greater Than 90% Chance of Employment',
                                1000,
                                '.',
                                1000,
                                () => setTextColor('black'),
                                'Real Company Data Used in Generating Resume',
                                1000,
                                'Real Company Data Used in Generating Cover',
                                1000,
                                'Real Company Data Used in Interview Prep',
                                1000,
                                '.',
                                1000,
                                () => setTextColor('#987070'),
                                'Enhances User Data to Generate Resume',
                                1000,
                                'Enhances User Data to Generate Cover',
                                1000,
                                'Enhances User Data in Interview Prep',
                                1000,
                                '.',
                                1000,
                            ]}
                            repeat={Infinity}
                        />
                    </div>

                    {jobs.length < 1 ? (
                        <div style={styles.noResumes}>
                            <h4>Create Resume to get Job Connections</h4>
                            <div style={{width: '200px'}}>
                                <ButtonSubmitGreen onClick={goBackPrevPage}>Create Resume</ButtonSubmitGreen>
                            </div>
                        </div>
                    ) : (
                        <Grid container>
                            {jobs.map((item, index) => (
                                <Grid key={index} item xs={12} md={6} sx={styles.cardGrid}>
                                    <Card sx={activeIndex !== index + 1 ? styles.card : styles.cardLarge}>
                                        
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={styles.img}
                                                    image={img}
                                                    alt="Avatar"
                                                />

                                                <div style={{width: '90%'}}>
                                                    <Typography component="div" variant="h5">
                                                        {item.title}
                                                    </Typography>
                                                    <div style={styles.link} >
                                                        <div>
                                                            <ul>
                                                                <li><span style={styles.key}>Company Name</span> <span>{isResumeSubbed ? item?.company_name : <a className="link" style={styles.unlock} href='/pricing' target="_blank">See company name</a>}</span></li>
                                                                <li><span style={styles.key}>Employment Type</span> <span>{item?.employment_type}</span></li>
                                                                <li><span style={styles.key}>Location</span> <span>{item?.location}</span></li>
                                                                <li><span style={styles.key}>Salary</span> <span>{item?.salary ? item.salary : "Undisclosed"}</span></li>
                                                            </ul>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </CardContent>

                                            <div style={{ margin: '20px', marginTop: '-20px' }}>
                                                <h4 style={{ margin: '0' }}>Description</h4>
                                                <div style={styles.desc}>
                                                    {activeIndex !== index + 1 
                                                        ? <>
                                                            {item.description.slice(0, 200)}... <span onClick={() => setActiveIndex(index + 1)} style={{ cursor: 'pointer', color: '#3E8F93' }}>see more</span>
                                                        </>
                                                        : <> {item.description} <span onClick={() => setActiveIndex(null)} style={{ cursor: 'pointer', color: '#3E8F93' }}>...see less</span></>}
                                                </div>
                                            </div>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-around', pl: 1, pb: 1, flexWrap: 'wrap' }}>

                                                <div style={{marginBottom: "10px"}}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid #3E8F93' 
                                                        width={'110px'} 
                                                        height='25px' 
                                                        color='black'
                                                        onClick={() => getResume(item?.description, item?.title)}
                                                    >
                                                        <FaSuitcase style={{color: "#3E8F93", fontSize: ".9rem"}} />&nbsp;&nbsp; Get Resume
                                                    </ButtonThin>
                                                </div>

                                                <div style={{marginBottom: "10px", marginRight: '3px'}}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid #987070' 
                                                        width={'110px'} 
                                                        height='25px' 
                                                        color='black'
                                                        onClick={() => chooseActStr("Cover Letter", item)}
                                                    >
                                                        <SlEnvolopeLetter style={{color: "#987070", fontSize: ".9rem"}} />&nbsp;&nbsp; Get Cover Ltr
                                                    </ButtonThin>
                                                </div>

                                                <div style={{marginBottom: "10px"}}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid #F8E231' 
                                                        width={'110px'} 
                                                        height='25px' 
                                                        color='black'
                                                        onClick={() => getJob(item?.url, item?.external_url)}
                                                    >
                                                        <IoSparklesSharp style={{color: "#F8E231", fontSize: ".9rem"}} />&nbsp;&nbsp; Get This Job 
                                                    </ButtonThin>
                                                </div>

                                                <div style={{marginBottom: "10px"}}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid #68A7AD' 
                                                        width={'110px'} 
                                                        height='25px' 
                                                        color='black'
                                                        onClick={() => chooseActStr("Email", item)}
                                                    >
                                                        <MdMarkEmailRead style={{color: "#68A7AD", fontSize: ".9rem"}} />&nbsp;&nbsp; Email Follow-up
                                                    </ButtonThin>
                                                </div>
                                                
                                                <div style={{marginBottom: "10px"}}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid black' 
                                                        width={'110px'} 
                                                        height='25px' 
                                                        color='black'
                                                        onClick={() => chooseActStr("Interview", item)}
                                                    >
                                                        <VscChecklist style={{color: "black", fontSize: ".9rem"}} />&nbsp;&nbsp; Interview Prep
                                                    </ButtonThin>
                                                </div>
                                                
                                                <div style={{marginBottom: "10px"}}>
                                                    <ButtonThin
                                                        fontSize='.6rem' 
                                                        border='2px solid rgba(158, 9, 9, 0.733)' 
                                                        width={'110px'} 
                                                        height='25px' 
                                                        color='rgba(158, 9, 9, 0.733)'
                                                        onClick={() => deleteJob(item?.id, item.title)}
                                                    >
                                                        <IoMdRemoveCircle style={{color: "rgba(158, 9, 9, 0.733)", fontSize: ".9rem"}} />&nbsp;&nbsp; Delete
                                                    </ButtonThin>
                                                </div>

                                            </Box>
                                        </Box>

                                    </Card>
                                </Grid>
                            ))}          
                        </Grid>
                    )}

                </div>

                {modalOpen && (
                    <PlainModalOverlay>
                        <div style={styles.modalInner}>
                            <div className='prev-page' onClick={() => setModalOpen(false)}>
                                <FaLongArrowAltLeft />
                            </div>
                            <h4>Choose a resume for me to optimize your {actionString}, together with this job's real data.</h4>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Using the "Get Resume" button on each job to optimize your resume per-job gives your application materials more relevance and hence, gives you a surer chance.</Alert>

                            <div style={styles.resumesCont}>
                                {allResumes.length > 0 && (
                                    allResumes.map((resume, index) => {
                                        return (
                                            <div key={index} style={activeResIndex === index + 1 ? styles.activeResume : styles.eachResume} onClick={() => chooseResume(index)}>
                                                <div>{resume?.storageDetails?.name}</div> {activeResIndex === index + 1 && <div><GrStatusGood style={{color: "#3E8F93", fontSize: ".9rem"}} /> </div>}
                                            </div>
                                        )
                                    })
                                )}
                            </div>

                            <div style={{width: '100%'}}>
                                <ButtonSubmitGreen onClick={handleGenerate} >Get {actionString}</ButtonSubmitGreen>
                            </div>

                        </div>
                    </PlainModalOverlay>
                )}

                
            </div>
        )}
    </div>

  );

  
};



export default JobHub;


