import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import AuthSideMenu from "../../UI/AuthSideMenu/AuthSideMenu";
import { PlainModalOverlay, SuccessFailureModal } from "../../UI/Modal/Modal";
import { ButtonSubmitGreen, ButtonThin, ButtonTransparent } from "../../UI/Buttons/Buttons";
import { 
    errorAnimation, 
    successMiniAnimation, 
    checkAuthenticatedUser
} from "../../../utils/client-functions";
import { setFetching, setError, setSuccessMini } from "../../../redux/states";
import Alert from '@mui/material/Alert';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TypeAnimation } from 'react-type-animation';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { FaRobot } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import iconImg from '../../../images/bubble icon.jpg';
import axios from "axios";

const screenWidth = window.innerWidth;

const AutoApplyAgent = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const { 
        error, 
        successMini, 
        resumeSubDuration, 
        isResumeSubbed,
        user 
    } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const isAuth = localStorage?.getItem("token");
    const [jobs, setJobs] = useState([]);
    const [img, setImg] = useState('');
    const [textColor, setTextColor] = useState('black');
    const [allResumes, setAllResumes] = useState([]);
    const [singleResume, setSingleResume] = useState({});
    const [activeResIndex, setActiveResIndex] = useState(0);
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const [autoApplyModal, setAutoApplyModal] = useState(false);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [jobsInProgress, setJobsInProgress] = useState([]);
    const [completedJobs, setCompletedJobs] = useState([]);
    const [agentStatus, setAgentStatus] = useState('idle'); // idle, running, paused, completed
    const [targetJobCount, setTargetJobCount] = useState(5);
    const [pricingOpened, setPricingOpened] = useState(false);
    const [pollingIntervalId, setPollingIntervalId] = useState(null);

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
            overflow: 'hidden',
            transition: 'all 3s ease-in-out',
        },
        list: {
            fontSize: '.85rem',
            lineHeight: '1.5',
            padding: '20px',
            margin: '20px',
            width: '100%',
        },
        newTabLnk: {
            color: '#3E8F93',
            textDecoration: 'dotted',
            cursor: 'pointer',
            fontSize: '.7rem',
        },
        applicants: {
            fontSize: '.75rem',
            color: 'rgba(0, 0, 0, 0.634)',
            margin: "10px auto",
            textAlign: "center",
            width: "100%"
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
        },
        jobCheckbox: {
            width: '18px',
            height: '18px',
            marginRight: '10px'
        },
        statusBadge: {
            display: 'inline-block',
            padding: '3px 8px',
            borderRadius: '12px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            marginLeft: '10px'
        },
        statusPending: {
            backgroundColor: '#FFF3CD',
            color: '#856404'
        },
        statusInProgress: {
            backgroundColor: '#D1ECF1',
            color: '#0C5460'
        },
        statusCompleted: {
            backgroundColor: '#D4EDDA',
            color: '#155724'
        },
        progressContainer: {
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            margin: '15px 0'
        },
        progressBar: {
            height: '10px',
            borderRadius: '10px',
            backgroundColor: '#3E8F93',
            transition: 'width 0.5s ease-in-out'
        },
        agentStatusContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 0',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px'
        },
        jobCounter: {
            display: 'flex',
            justifyContent: 'space-around',
            margin: '15px 0'
        },
        counterBox: {
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            flex: '1',
            margin: '0 5px'
        },
        counterNumber: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#3E8F93'
        },
        counterLabel: {
            fontSize: '0.8rem',
            color: '#6c757d'
        }
    };

    const errorSetter = (string) => {
        dispatch(setError(string));
        errorAnimation();
    };

    const successSetter = (string) => {
        dispatch(setSuccessMini(string));
        successMiniAnimation();
    };

    const toggleResumes = () => {
        setAuthMenuOpen(!authMenuOpen);
    };

    const goBackPrevPage = () => {
        navigate('/user/dashboard/resume');
    };

    useEffect(() => {
        dispatch(setFetching(true));
        
        const fetchData = async () => {
            try {
                // Authenticate user
                await checkAuthenticatedUser();
            } catch (error) {
                dispatch(setFetching(false));
                return navigate("/popin?resume");      
            }
            
            // Get data if user is authorized by subscription
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

                const data = response?.data;
                dispatch(setFetching(false));
                
                // Set jobs and resumes
                setJobs(data?.jobs || []);
                setAllResumes(data.resumes || []);
                
                // Set application status data
                setJobsInProgress(data.jobsInProgress || []);
                setCompletedJobs(data.completedJobs || []);
                
                // Set agent status based on in-progress jobs
                if (data.jobsInProgress && data.jobsInProgress.length > 0) {
                    setAgentStatus('running');
                    
                    // Start polling for updates
                    startPollingApplicationStatus();
                    
                    // Set selected jobs based on in-progress applications
                    const inProgressJobIds = data.jobsInProgress.map(job => job.id);
                    setSelectedJobs(inProgressJobIds);
                } else {
                    setAgentStatus('idle');
                }
            } catch (error) {
                dispatch(setFetching(false));
                errorSetter("Reload page to fetch data");
            }
        };
        
        setImg(iconImg);
        fetchData();
    }, []);

    const openAutoApplyModal = () => {
        if (!isResumeSubbed) {
            errorSetter("Choose suitable plan to access this feature");
            return;
        }
        
        if (resumeSubDuration !== "Per Week" && resumeSubDuration !== "Per Month") {
            errorSetter("Upgrade to Per Week or Per Month to access this feature");
            
            setTimeout(() => {
                if (!pricingOpened) {
                    setPricingOpened(true);
                    window.open('/pricing', '_blank');
                }
            }, 5000);
            return 
        }
        
        setAutoApplyModal(true);
    };
    

    const closeAutoApplyModal = () => {
        setAutoApplyModal(false);
        setSelectedJobs([]);
    };

    const toggleJobSelection = (jobId) => {
        if (selectedJobs.includes(jobId)) {
            setSelectedJobs(selectedJobs.filter(id => id !== jobId));
        } else {
            if (selectedJobs.length < targetJobCount) {
                setSelectedJobs([...selectedJobs, jobId]);
            } else {
                errorSetter(`You can only select up to ${targetJobCount} jobs`);
            }
        }
    };

    const chooseResume = (index) => {
        setActiveResIndex(index + 1);
        setSingleResume(allResumes[index]);
    };

    const startAutoApplyAgent = async () => {
        if (selectedJobs.length === 0) {
            return errorSetter("Please select at least one job");
        }
        
        if (!singleResume || Object.keys(singleResume).length === 0) {
            return errorSetter("Please select a resume to be optimized for these applications");
        }
        
        try {
            dispatch(setFetching(true));
            
            // Make API call to start the auto-apply process
            const response = await axios.post('/user/auto-apply', {
                jobIds: selectedJobs,
                resumeId: singleResume.storageDetails.name
            }, {
                headers: {
                    "x-access-token": isAuth,
                }
            });
            

            // Update UI state
            setAgentStatus('running');
            
            // Get the selected jobs data for display
            const selectedJobsData = jobs.filter(job => selectedJobs.includes(job.id));
            setJobsInProgress(selectedJobsData);
            
            // Close the modal
            setAutoApplyModal(false);

            dispatch(setFetching(false));
            // Show success message
            successSetter("Auto Apply Agent started successfully");
            
            // Start polling for application status
            startPollingApplicationStatus();
            
        } catch (error) {
            dispatch(setFetching(false));
            if (error.response && error.response.data && error.response.data.error) {
                errorSetter(error.response.data.error);
            } else {
                errorSetter("Failed to start Auto Apply Agent. Please try again.");
            }
        }
    };
    
    // Function to poll application status
    const startPollingApplicationStatus = () => {
        // Poll every 10 seconds
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get('/user/application-status', {
                    headers: {
                        "x-access-token": isAuth,
                    }
                });
                
                const applications = response.data.applications;
                
                // Filter applications for the current session (those with jobIds in selectedJobs)
                const currentApplications = applications.filter(app => selectedJobs.includes(app.jobId));
                
                // Update in-progress and completed jobs
                const inProgress = currentApplications.filter(app => app.status === 'pending' || app.status === 'in_progress');
                
                const completed = currentApplications.filter(app => app.status === 'completed');
                
                const failed = currentApplications.filter(app => app.status === 'failed');
                
                // Update state
                setJobsInProgress(inProgress.map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    return job || { 
                        id: app.jobId,
                        title: app.jobTitle,
                        company_name: app.companyName
                    };
                }));
                
                setCompletedJobs(completed.map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    return job || { 
                        id: app.jobId,
                        title: app.jobTitle,
                        company_name: app.companyName
                    };
                }));
                
                // If all applications are completed or failed, stop polling
                if (inProgress.length === 0 && (completed.length > 0 || failed.length > 0)) {
                    clearInterval(intervalId);
                    
                    if (completed.length === currentApplications.length) {
                        setAgentStatus('completed');
                        successSetter("All applications completed successfully!");
                    } else if (failed.length === currentApplications.length) {
                        setAgentStatus('completed');
                        errorSetter("All applications failed. Please try again.");
                    } else {
                        setAgentStatus('completed');
                        successSetter(`${completed.length} applications completed, ${failed.length} failed.`);
                    }
                }
                
            } catch (error) {
                console.error('Error polling application status:', error);
            }
        }, 10000);
        
        // Store interval ID to clear it later
        setPollingIntervalId(intervalId);
    };


    const pauseAgent = async () => {
        try {
          dispatch(setFetching(true));
          
          // Make API call to pause the agent
          const response = await axios.post('/user/pause-auto-apply', {
            jobIds: selectedJobs
          }, {
            headers: {
              "x-access-token": isAuth,
            }
          });
          
          dispatch(setFetching(false));

          if (response.data.success) {
            setAgentStatus('paused');
            successSetter("Auto Apply Agent paused");
            
            // Stop polling
            if (pollingIntervalId) {
              clearInterval(pollingIntervalId);
              setPollingIntervalId(null);
            }
          } else {
            errorSetter(response.data.error || "Failed to pause Auto Apply Agent");
          }
        } catch (error) {
          dispatch(setFetching(false));
          if (error.response && error.response.data && error.response.data.error) {
            errorSetter(error.response.data.error);
          } else {
            errorSetter("Failed to pause Auto Apply Agent. Please try again.");
          }
        }
    };
      
    const resumeAgent = async () => {
        try {
          dispatch(setFetching(true));
          
          // Make API call to resume the agent
          const response = await axios.post('/user/resume-auto-apply', {
            jobIds: selectedJobs
          }, {
            headers: {
              "x-access-token": isAuth,
            }
          });
          
          dispatch(setFetching(false));
          
          if (response.data.success) {
            setAgentStatus('running');
            successSetter("Auto Apply Agent resumed");
            
            // Resume polling
            startPollingApplicationStatus();
          } else {
            errorSetter(response.data.error || "Failed to resume Auto Apply Agent");
          }
        } catch (error) {
            dispatch(setFetching(false));
            if (error.response && error.response.data && error.response.data.error) {
                errorSetter(error.response.data.error);
            } else {
                errorSetter("Failed to resume Auto Apply Agent. Please try again.");
            }
        }
    };
      
    const stopAgent = () => {
        confirm({
          title: "Stop Auto Apply Agent?",
          description: "This will stop all pending applications. Already completed applications will not be affected.",
        })
        .then(async () => {
            try {
                dispatch(setFetching(true));
            
                // Make API call to stop the agent
                const response = await axios.post('/user/stop-auto-apply', {
                        jobIds: selectedJobs
                    }, {
                    headers: {
                        "x-access-token": isAuth,
                    }
                });
            
                dispatch(setFetching(false));
            
                if (response.data.success) {
                    setAgentStatus('idle');
                    setJobsInProgress([]);
                    successSetter("Auto Apply Agent stopped");
                    
                    // Stop polling
                    if (pollingIntervalId) {
                        clearInterval(pollingIntervalId);
                        setPollingIntervalId(null);
                    }
                } else {
                    errorSetter(response.data.error || "Failed to stop Auto Apply Agent");
                }
            } catch (error) {
                dispatch(setFetching(false));
                if (error.response && error.response.data && error.response.data.error) {
                    errorSetter(error.response.data.error);
                } else {
                    errorSetter("Failed to stop Auto Apply Agent. Please try again.");
                }
            }
        })
        .catch(() => {
          // User cancelled
        });
    };
    
    // Clean up polling interval on component unmount
    useEffect(() => {
        return () => {
            if (pollingIntervalId) {
                clearInterval(pollingIntervalId);
            }
        };
    }, [pollingIntervalId]);

    const calculateProgress = () => {
        const total = selectedJobs.length;
        if (total === 0) return 0;
        return (completedJobs.length / total) * 100;
    };

    return (
        <div>
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
                        headerText="Auto Apply Agent"
                    />
                    <div className="error">{error}</div>
                    <div className="success-mini">{successMini}</div>

                    <div style={styles.animText} onClick={() => setAuthMenuOpen(false)}>
                        <TypeAnimation
                            sequence={[
                                () => setTextColor('#3E8F93'),
                                1000,
                                'Automatically Apply to Multiple Jobs',
                                1000,
                                'Save Time with Automated Applications',
                                1000,
                                'Increase Your Chances of Getting Hired',
                                1000,
                                '.',
                                1000,
                                () => setTextColor('black'),
                                'Tailored Cover Letters for Each Application',
                                1000,
                                'Optimized Resume for Each Job',
                                1000,
                                'Follow-up Emails Sent Automatically',
                                1000,
                                '.',
                                1000,
                                () => setTextColor('#987070'),
                                'Track Application Status in Real-time',
                                1000,
                                'Get Notified When Employers Respond',
                                1000,
                                'Apply to Jobs While You Sleep',
                                1000,
                                '.',
                                1000,
                            ]}
                            repeat={Infinity}
                        />
                    </div>

                    {agentStatus !== 'idle' && (
                        <div style={{padding: '0 20px'}}>
                            <div style={styles.agentStatusContainer}>
                                <div>
                                    <h4 style={{margin: '0'}}>Agent Status: 
                                        <span style={{
                                            ...styles.statusBadge, 
                                            ...(agentStatus === 'running' ? styles.statusInProgress : 
                                                agentStatus === 'completed' ? styles.statusCompleted : 
                                                styles.statusPending)
                                        }}>
                                            {agentStatus === 'running' ? 'Running' : 
                                             agentStatus === 'completed' ? 'Completed' : 
                                             'Paused'}
                                        </span>
                                    </h4>
                                    <div style={styles.progressContainer}>
                                        <div style={{
                                            ...styles.progressBar,
                                            width: `${calculateProgress()}%`
                                        }}></div>
                                    </div>
                                    <div style={{fontSize: '0.8rem', textAlign: 'right'}}>
                                        {completedJobs.length} of {selectedJobs.length} applications completed
                                    </div>
                                </div>
                                <div>
                                    {agentStatus === 'running' ? (
                                        <ButtonThin
                                            fontSize='.7rem' 
                                            border='2px solid #856404' 
                                            width={'80px'} 
                                            height='30px' 
                                            color='#856404'
                                            onClick={pauseAgent}
                                        >
                                            Pause
                                        </ButtonThin>
                                    ) : agentStatus === 'paused' ? (
                                        <ButtonThin
                                            fontSize='.7rem' 
                                            border='2px solid #0C5460' 
                                            width={'80px'} 
                                            height='30px' 
                                            color='#0C5460'
                                            onClick={resumeAgent}
                                        >
                                            Resume
                                        </ButtonThin>
                                    ) : null}
                                    
                                    <ButtonThin
                                        fontSize='.7rem' 
                                        border='2px solid rgba(158, 9, 9, 0.733)' 
                                        width={'80px'} 
                                        height='30px' 
                                        color='rgba(158, 9, 9, 0.733)'
                                        onClick={stopAgent}
                                        style={{marginLeft: '10px'}}
                                    >
                                        Stop
                                    </ButtonThin>
                                </div>
                            </div>

                            <div style={styles.jobCounter}>
                                <div style={styles.counterBox}>
                                    <div style={styles.counterNumber}>{selectedJobs.length}</div>
                                    <div style={styles.counterLabel}>Selected</div>
                                </div>
                                <div style={styles.counterBox}>
                                    <div style={styles.counterNumber}>{jobsInProgress.length}</div>
                                    <div style={styles.counterLabel}>In Progress</div>
                                </div>
                                <div style={styles.counterBox}>
                                    <div style={styles.counterNumber}>{completedJobs.length}</div>
                                    <div style={styles.counterLabel}>Completed</div>
                                </div>
                            </div>

                            <h4>Completed Applications</h4>
                            {completedJobs.length > 0 ? (
                                completedJobs.map((job, index) => (
                                    <div key={index} style={{
                                        padding: '10px',
                                        margin: '5px 0',
                                        backgroundColor: '#D4EDDA',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <strong>{job.title}</strong> at {job.company_name}
                                        </div>
                                        <span style={{
                                            ...styles.statusBadge,
                                            ...styles.statusCompleted
                                        }}>
                                            Completed
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <Alert severity="info">No completed applications yet</Alert>
                            )}

                            <h4>In Progress</h4>
                            {jobsInProgress.length > 0 ? (
                                jobsInProgress.map((job, index) => (
                                    <div key={index} style={{
                                        padding: '10px',
                                        margin: '5px 0',
                                        backgroundColor: '#D1ECF1',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <strong>{job.title}</strong> at {job.company_name}
                                        </div>
                                        <span style={{
                                            ...styles.statusBadge,
                                            ...styles.statusInProgress
                                        }}>
                                            In Progress
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <Alert severity="info">No applications in progress</Alert>
                            )}
                        </div>
                    )}

                    {agentStatus === 'idle' && jobs.length < 1 ? (
                        <div style={styles.noResumes} onClick={() => setAuthMenuOpen(false)}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Alert sx={{padding: '0 5px', width: 'auto', margin: '0 auto', fontSize: '.9rem'}} severity="warning">You have no job connections yet.</Alert>
                            </div>
                            <div className="BodyWrapper">
                                <div className="Segment">
                                    <Alert sx={{padding: '0 5px', margin: '0 auto'}} severity="info">Tips to getting connected</Alert>
                                </div>
                                
                                <ol style={styles.list}>
                                    <li>Choose a different location when creating/optimizing resume: your perfect fit job might not be in the previous city or country.</li>
                                    <li>Do NOT combine several job positions (using OR, AND, /) for one resume e.g Business Developer/Sales Executive.</li>
                                    <li>Ask Bubble Ai similar names recruiters might call your current job position.</li>
                                </ol>
                            </div>
                            <h4>Optimize Resume to get Job Connections</h4>
                            <div style={{width: '200px'}}>
                                <ButtonSubmitGreen onClick={goBackPrevPage}>Start Now &nbsp;&nbsp;<FaLongArrowAltRight /></ButtonSubmitGreen>
                            </div>
                        </div>
                    ) : agentStatus === 'idle' && (
                        <div style={{padding: '20px', textAlign: 'center'}} onClick={() => setAuthMenuOpen(false)}>
                            <div style={{margin: '20px 0'}}>
                                <FaRobot style={{fontSize: '4rem', color: '#3E8F93'}} />
                                <h3>Auto Apply Agent</h3>
                                <p>Let our AI agent automatically apply to jobs for you using your optimized resume and tailored cover letters.</p>
                            </div>
                            
                            <ButtonSubmitGreen onClick={openAutoApplyModal}>
                                <MdOutlineAutoAwesome style={{fontSize: '1.2rem'}} /> &nbsp;Start Auto Apply Agent
                            </ButtonSubmitGreen>
                            
                            <div style={{margin: '30px 0'}}>
                                <Alert severity="info" style={{textAlign: 'left'}}>
                                    <strong>How it works:</strong>
                                    <ol style={{paddingLeft: '20px', marginBottom: '0'}}>
                                        <li>Select jobs you want to apply to</li>
                                        <li>Choose your best resume</li>
                                        <li>Our agent will automatically:
                                            <ul>
                                                <li>Optimize your resume for each job</li>
                                                <li>Create tailored cover letters</li>
                                                <li>Submit applications via LinkedIn or company websites</li>
                                                <li>Send follow-up emails after application</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </Alert>
                            </div>
                        </div>
                    )}
                </div>

                {autoApplyModal && (
                    <PlainModalOverlay>
                        <div style={styles.modalInner}>
                            <div className='prev-page' onClick={closeAutoApplyModal}>
                                <FaLongArrowAltLeft />
                            </div>
                            <h4>Configure Auto Apply Agent</h4>
                            
                            
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px 0'}}>
                                <TbTargetArrow style={{fontSize: '1.2rem', marginRight: '5px'}} />
                                <span>Target: </span>
                                <select 
                                    value={targetJobCount}
                                    onChange={(e) => setTargetJobCount(parseInt(e.target.value))}
                                    style={{
                                        marginLeft: '10px',
                                        padding: '5px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc'
                                    }}
                                >
                                    <option value={3}>3 Jobs</option>
                                    <option value={5}>5 Jobs</option>
                                    <option value={10}>10 Jobs</option>
                                </select>
                            </div>
                            
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem', marginBottom: '15px'}} severity="info">
                                Select up to {targetJobCount} jobs for the agent to apply to automatically
                            </Alert>

                            <h4>Select Jobs</h4>
                            <div style={{
                                maxHeight: '200px',
                                overflowY: 'auto',
                                border: '1px solid #e0e0e0',
                                borderRadius: '5px',
                                padding: '10px',
                                marginBottom: '15px'
                            }}>
                                {jobs.map((job, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px',
                                        borderBottom: index < jobs.length - 1 ? '1px solid #e0e0e0' : 'none',
                                        backgroundColor: selectedJobs.includes(job.id) ? 'rgba(62, 143, 147, 0.1)' : 'transparent'
                                    }}>
                                        <input 
                                            type="checkbox" 
                                            style={styles.jobCheckbox}
                                            checked={selectedJobs.includes(job.id)}
                                            onChange={() => toggleJobSelection(job.id)}
                                        />
                                        <div>
                                            <div style={{fontWeight: 'bold'}}>{job.title}</div>
                                            <div style={{fontSize: '0.8rem'}}>{job.company_name} - {job.location}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h4>Select Resume</h4>
                            <div style={styles.resumesCont}>
                                {allResumes.length > 0 ? (
                                    allResumes.map((resume, index) => (
                                        <div key={index} style={activeResIndex === index + 1 ? styles.activeResume : styles.eachResume} onClick={() => chooseResume(index)}>
                                            <div>{resume?.storageDetails?.name}</div> {activeResIndex === index + 1 && <div><GrStatusGood style={{color: "#3E8F93", fontSize: ".9rem"}} /> </div>}
                                        </div>
                                    ))
                                ) : (
                                    <Alert severity="warning">No resumes found. Please create a resume first.</Alert>
                                )}
                            </div>

                            <div style={{width: '100%', marginTop: '20px'}}>
                                <ButtonSubmitGreen onClick={startAutoApplyAgent} disabled={selectedJobs.length === 0 || !singleResume || Object.keys(singleResume).length === 0}>
                                    Start Auto Apply Agent
                                </ButtonSubmitGreen>
                            </div>
                        </div>
                    </PlainModalOverlay>
                )}
            </div>
        </div>
    );
};

export default AutoApplyAgent;