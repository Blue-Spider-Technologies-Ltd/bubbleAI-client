import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { ButtonSubmitGreen, ButtonThin } from "../../UI/Buttons/Buttons";
import { 
    errorAnimation, 
    successMiniAnimation, 
    checkAuthenticatedUser 
} from "../../../utils/client-functions";
import { setFetching, setError, setSuccessMini, setResumeSubDuration, setIsResumeSubbed } from "../../../redux/states";
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
import { TypeAnimation } from 'react-type-animation';
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

        if(!description) {
            confirm({
                title: "Description Not Available For This Job",
                description: `Click Ok if you must continue, but the resulting resume wil not be fully optimized for this job.`,
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
            localStorage.setItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXdescription", description)
            localStorage.setItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXtitle", title)
            window.open('/user/dashboard/resume', '_blank')
        }

    }

    
    const getJob = async (linkedinUrl, companyUrl) => {
        if(!companyUrl) {
            window.open(linkedinUrl, '_blank')
        }
        window.open(companyUrl, '_blank')
    }

    const deleteJob = async (id) => {

    }



  return (
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
                        () => setTextColor('rgb(177, 144, 13)'),
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
                                                        <li><span style={styles.key}>Company Name</span> <span>{isResumeSubbed ? item?.company_name : <a className="link" style={styles.unlock} href='/pricing' target="_blank">Unlock to see name</a>}</span></li>
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
                                                border='2px solid black' 
                                                width={'110px'} 
                                                height='25px' 
                                                color='black'
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
                                                onClick={() => deleteJob(item?.id)}
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
    </div>
  );

  
};



export default JobHub;


