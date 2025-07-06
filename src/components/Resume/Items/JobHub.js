import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import AuthSideMenu from "../../UI/AuthSideMenu/AuthSideMenu";
import { SuccessFailureModal, Modal } from "../../UI/Modal/Modal";
import Feedback from "../../Dashboard/Feedback";
import { ButtonSubmitGreen } from "../../UI/Buttons/Buttons";
import { 
    errorAnimation, 
    successMiniAnimation,
    checkAuthenticatedUser,
    getOrdinalDate
} from "../../../utils/client-functions";
import { setFetching, setError, setSuccessMini, setResumeSubDuration, setIsResumeSubbed, setResumeServicesNumbers } from "../../../redux/states";
import Alert from '@mui/material/Alert';
import { TypeAnimation } from 'react-type-animation';
import { TfiNewWindow } from "react-icons/tfi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { TbReplaceFilled } from "react-icons/tb";
import iconImg from '../../../images/bubble icon.jpg';
import axios from "axios";
import { useConfirm } from 'material-ui-confirm';

import { downloadResumeDirect, downloadCoverLetterDirect } from '../../../utils/downloadResumeDirect';

//MODAL IMPORTS
import ExternalJobModal from "./ExternalJobModal";
import InternalAppJobModal from "./InternalAppJobModal";
import FieldAnswersModal from "./FieldAnswersModal";
import ResumeSelectorModal from "./ResumeSelectorModal";
import QnAModal from "./QnAModal";
import JobList from "./JobList";

 

const JobHub = () => {
    const { 
        error, 
        successMini, 
        resumeSubDuration, 
        isResumeSubbed,
        user,
        resumeServicesNumbers 
    } = useSelector((state) => state.stateData);
    const location = useLocation();

    const [jobs, setJobs] = useState([]);
    const [img, setImg] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [textColor, setTextColor] = useState('black');
    const [allResumes, setAllResumes] = useState([]);
    const [singleResume, setSingleResume] = useState({});
    const [chosenJob, setChosenJob] = useState({});
    const [actionString, setActionString] = useState('');
    const [activeResIndex, setActiveResIndex] = useState(0);
    const [isFeedbackTime, setIsFeedbackTime] = useState(false);
    const [pricingOpened, setPricingOpened] = useState(false);
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [companyUrl, setCompanyUrl] = useState("");
    const [applicants, setApplicants] = useState("");
    const [successfulAchievement, openSuccessfulAchievement] = useState(false);
    const [isFirstFreeUsed, setIsFirstFreeUsed] = useState(false);
    const [externalJobUrl, setExternalJobUrl] = useState('');
    const [expandedAppIndex, setExpandedAppIndex] = useState(null);
    const [userApplications, setUserApplications] = useState([]);
    const [applicationMap, setApplicationMap] = useState({});
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [skipCount, setSkipCount] = useState(0);
    const [hasMoreJobs, setHasMoreJobs] = useState(true);
    const [loading, setLoading] = useState(false);
    const [progressStatus, setProgressStatus] = useState('');
    const [progressPercentage, setProgressPercentage] = useState(0);

    const [resumeSelectorModalOpen, setResumeSelectorModalOpen] = useState(false);
    const [showInternalAppJobModal, setShowInternalAppJobModal] = useState(false);
    const [showExternalJobModal, setShowExternalJobModal] = useState(false);

    // --- SEMI-AUTO APPLY STATE ---
    const [showFieldAnswersModal, setShowFieldAnswersModal] = useState(false);
    const [fieldAnswers, setFieldAnswers] = useState([]);
    const [fieldAnswersUrl, setFieldAnswersUrl] = useState('');
    const [fieldAnswersJob, setFieldAnswersJob] = useState(null);

    // --- QnA Modal State for LOGIN ALGORITHM ---
    const [showQnAModal, setShowQnAModal] = useState(false);
    const [loginQnAJobDesc, setLoginQnAJobDesc] = useState('');
    const [loginQnAJobDescSaved, setLoginQnAJobDescSaved] = useState(false);
    const [loginQnAInput, setLoginQnAInput] = useState('');
    const [loginQnAList, setLoginQnAList] = useState([]); // [{question, answer}]
    const [loginQnALoading, setLoginQnALoading] = useState(false);
    const [loginQnAEditingDesc, setLoginQnAEditingDesc] = useState(false);

    const isCompanyAutoApplyTriggered = useRef(false);

    const closeModalsAndReset = () => {
        loadJobs(0) //to reset page details
        setLinkedinUrl("");
        setCompanyUrl("");
        setExternalJobUrl("");
        setFieldAnswersUrl("")
        setFieldAnswers([]);
        setActiveResIndex(0);

        setResumeSelectorModalOpen(false);
        setShowInternalAppJobModal(false);
        setShowExternalJobModal(false);
        setShowFieldAnswersModal(false);
        setShowQnAModal(false);
        setLoginQnAJobDescSaved(false);
        setLoginQnALoading(false);

        setLoginQnAJobDesc('');
        setLoginQnAInput('');
        setLoginQnAList([]);
        setSingleResume({});
        setFieldAnswersJob(null)

        isCompanyAutoApplyTriggered.current = false
    }

    const isEffectExecuted = useRef(false);
    const isFetching = useRef(false);

    const dispatch = useDispatch();
    const confirm = useConfirm();

    const navigate = useNavigate();
    const isAuth = localStorage?.getItem("token");

    const styles = {
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
        }
    }

    // Helper functions
    const errorSetter = useCallback((string) => {
        dispatch(setError(string));
        errorAnimation();
    }, [dispatch]);

    const successSetter = useCallback((string) => {
        dispatch(setSuccessMini(string));
        successMiniAnimation();
    }, [dispatch]);

    const checkIfAuth = async () => {
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            dispatch(setFetching(false));
            return navigate("/popin?job-hub");      
        }
    }

    const handleNavigateProfile = () => {
        const prevPath = location.pathname
        localStorage?.setItem("prevPath", prevPath)
        navigate("/user/dashboard/profile")
    }

     // Effects
    useEffect(() => {
        checkIfAuth()
        setImg(iconImg);
        const feedback = localStorage.getItem('feedbackTime');
        const successfulTargetAchievement = localStorage.getItem("successfulTargetAchievement")

        if(successfulTargetAchievement) {
            openSuccessfulAchievement(true)
            localStorage.removeItem("successfulTargetAchievement")
        }

        if (feedback) {
            const timer = setTimeout(() => {
                setIsFeedbackTime(true);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, []);

    const loadJobs = async (skip) => {
        if (isFetching.current) return;  //prevent multiple fetching in runtime
        isFetching.current = true;
        
        if (skip > 0) {
            setLoadingJobs(true);
        } else {
            dispatch(setFetching(true));
        }

        try {
            const response = await axios.get('/user/job-hub', {
                headers: { 
                    "x-access-token": isAuth,
                    skip: skip,
                    limit: 10
                }
            });

            if (response?.data?.status === "unauthenticated") {
                localStorage?.removeItem("token");
                return navigate("/popin?job-hub");
            }

            const data = response.data;
            setJobs(prev => skip === 0 ? data.jobs : [...prev, ...data.jobs]);
            setHasMoreJobs(data.jobs.length === 10);

            // if (skip === 0) {
                dispatch(setResumeSubDuration(data.subDuration));
                dispatch(setResumeServicesNumbers(data.resumeNumbers));
                dispatch(setIsResumeSubbed(data.resumeSub));
                setAllResumes(data.resumes);
                setIsFirstFreeUsed(data.isFirstFreeUsed);

                const apps = data.applications || [];
                setUserApplications(apps);
                
                const appMap = {};
                apps.forEach(app => {
                    if (app.jobTitle) appMap[app.jobTitle] = app;
                });
                setApplicationMap(appMap);

                if (apps.length > 0) {
                    setExpandedAppIndex(apps[0].jobTitle);
                }
            // }

        } catch (error) {
            console.error("Error loading jobs:", error);
        } finally {
            isFetching.current = false;
            setLoadingJobs(false);
            dispatch(setFetching(false));
        }
    };

    useEffect(() => {
        checkIfAuth()
        let scrollTimeout;

        const handleScroll = () => {
            if (isFetching.current || !hasMoreJobs) return; //prevent multiple fetching in runtime

            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                const scrollPosition = window.innerHeight + window.scrollY;
                const pageBottom = document.body.offsetHeight - 200;

                if (scrollPosition >= pageBottom) {
                    const newSkip = skipCount + 10;
                    setSkipCount(newSkip);
                    loadJobs(newSkip);
                }
            }, 500);
        };

        //Initial load
        if (!isEffectExecuted.current) {
            loadJobs(0);
            isEffectExecuted.current = true;
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearTimeout(scrollTimeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [skipCount]);


    useEffect(() => {
        if (showFieldAnswersModal && fieldAnswers && fieldAnswersJob && singleResume) {
            saveApplicationToBackend({
                job: fieldAnswersJob,
                method: 'company-site',
                resume: singleResume,
                qaPairs: fieldAnswers.map(f => ({ question: f.label, answer: f.value })),
            });
        }
        // eslint-disable-next-line
    }, [showFieldAnswersModal]);

    useEffect(() => {
        if (showQnAModal && loginQnAList.length > 0 && chosenJob && singleResume) {
            saveApplicationToBackend({
                job: chosenJob,
                method: 'linkedin',
                resume: singleResume,
                qaPairs: loginQnAList,
            });
        }
        // eslint-disable-next-line
    }, [showQnAModal, loginQnAList]);

    // Helper to save application to backend
    const saveApplicationToBackend = async ({ job, method, resume, qaPairs }) => {
        try {
            await axios.post('/user/save-application', {
                jobId: job?.id,
                jobTitle: job?.title,
                companyName: job?.company_name,
                applicationMethod: method,
                resumeUsed: resume?.id || resume?.storageDetails?.name,
                qaPairs: qaPairs || [],
                status: 'completed',
            }, { headers: { 'x-access-token': isAuth } });
        } catch (err) {
            errorSetter('Failed to save application.');
        }
    };

    const handleResumeSelect = (index) => {
        setSingleResume(allResumes[index]);
        //Adding plus one to allow for 0 to signify no resume selected to user
        setActiveResIndex(index + 1);
    };

    const toggleMenu = () => {
        setAuthMenuOpen(!authMenuOpen);
    };

    const goBackPrevPage = () => {
        navigate('/user/dashboard/resume');
    };



    const getResume = (description, title) => {
        checkIfAuth()
        if(!isResumeSubbed) {
            errorSetter("Upgrade your subscription to access this feature")
            if (!pricingOpened) {
                setPricingOpened(true);
                setTimeout(() => {
                    window.open('/pricing', '_blank');
                }, 5000);
            }
        } else {
            if (!isFirstFreeUsed && resumeServicesNumbers.resumeCreated >= 3) {
                errorSetter("You have reached the maximum number of free trial resumes. Please choose a plan to create more.");
                if (!pricingOpened) {
                    setPricingOpened(true);
                    setTimeout(() => {
                        window.open('/pricing', '_blank');
                    }, 5000);
                }
                return
            }
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
                    description: `You will be redirected to upload an old resume which will be automatically tailored for this job. This will 100x your chances. If you prefer not to preview and edit resume, cancel this and use the "Get this Job" button.`,
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

    const getJob = async (linkedinUrl, companyUrl, appCount, job) => {
        setLinkedinUrl(linkedinUrl);
        setCompanyUrl(companyUrl);
        setApplicants(appCount);
        setChosenJob(job);
        setShowInternalAppJobModal(true);
    };


    const chooseActStr = (action, job) => {
        setActionString(action);
        setChosenJob(job);
        setResumeSelectorModalOpen(true);
    };

    const handleGenerate = async () => {
        checkIfAuth()
        if (Object.keys(singleResume).length === 0) {
            errorSetter("Please select a resume first");
            return;
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
                
                const prompt = `You are the best professional cover letter writer in the world, 
                    with 100% success rate from your cover letter writings. Write a stunning professional 
                    cover letter that uses relevant keywords from the below job details and my resume to show how I am best-fit for the job:
                    Job Position: ${jobPosition}, 
                    Job Description: ${jobDesc}, Company Name: ${companyName}, My resume object : ${JSON.stringify(singleResume)}, 
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
                const emailPrompt = `Draft a follow-up email regarding my 
                    job application for the Job Title: ${chosenJob?.title} and Company Name: ${chosenJob?.company_name}. I would like the email to be short, professional, human-like and polite, 
                    expressing my continued interest in the position and inquiring about the status of my application. 
                    Additionally, using details from this resume string object: ${JSON.stringify(singleResume)} and the following job description: ${chosenJob?.description}, 
                    please include a very brief reminder of my relevant skills or experiences that make me a strong candidate for this role.`

                localStorage.setItem("HFLHASIGFWFIVQJKVKJJBJKVSHDVHVIVIVIVHVhvhjavcdhuchch_Int_Prep-fu-em_aghgxtdRWYRDWY", emailPrompt)
                successSetter("Your Email opens in a new tab in 3 seconds")
                //Navigate to ask me page
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

    const deleteJob = async (jobId, title) => {
        checkIfAuth()
        confirm({
            title: "Delete This Job",
            description: `Are you sure you want to remove ${title} from your job connections?`,
        })
        .then(async () => {
            try {
                await axios.post(`/user/delete-job`, {jobId}, {
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    }
                });
                // Remove job from state
                setJobs(prev => prev.filter(job => job.id !== jobId));
                successSetter("Job removed successfully");
            } catch (error) {
                errorSetter("Failed to remove job");
            }
        })
        .catch(() => {
            errorSetter('Process Terminated')
        });
    };

    // --- SEMI-AUTO APPLY HANDLERS ---
    const handleCopy = (value, isAppFormLinkOpener) => {
        navigator.clipboard.writeText(value);
        if (!isAppFormLinkOpener) {
            successSetter('Copied!');
        } else {
            successSetter('Link Copied! Now paste and open it in a new browser window and move to step (2)');
        }
    };

    
    const checkPremiumSubsAndFirstTrial = () => {
        // Check if user is subscribed and for per month or per week
        if (!isResumeSubbed || resumeSubDuration === "Per Use") {
            errorSetter("Upgrade your subscription to access this feature");
            if (!pricingOpened) {
                setPricingOpened(true);
                setTimeout(() => {
                    window.open('/pricing', '_blank');
                }, 5000);
            }
            return false;
        }
        if (!isFirstFreeUsed && resumeServicesNumbers?.jobsApplied >= 2) {
            errorSetter("You have reached the maximum number of free tier Ai job applications. Please choose a plan to do more.");
            if (!pricingOpened) {
                setPricingOpened(true);
                setTimeout(() => {
                    window.open('/pricing', '_blank');
                }, 5000);
            }
            return false;
        }

        return true
    }

    const handleCompanySiteAutoApply = async (url) => {
        checkIfAuth()
        setProgressPercentage(1)
        setProgressStatus("Starting...")
        // Check if user is subscribed and for per month or per week
        if (isCompanyAutoApplyTriggered.current) {
            errorSetter("double call triggered, reload page or navigate out and back if error persists")
            return
        }
        isCompanyAutoApplyTriggered.current = true
        if (checkPremiumSubsAndFirstTrial() === false) {
            return
        }
        const jobUrl = url || companyUrl || externalJobUrl;
        //get event progress
        const eventSource = new EventSource('/user/progress');
        //listen for SSE
        eventSource.onmessage = (event) =>  {
            const progressUpdate = JSON.parse(event.data)
            setProgressPercentage(progressUpdate.percent);
            setProgressStatus(progressUpdate.status)
        };
        setLoading(true)
        try {
            const res = await axios.post('/user/form-analysis/company-site', {
                job: chosenJob,
                resume: singleResume,
                url: jobUrl
            }, { headers: { 'x-access-token': isAuth } });
            if (res.data.pageType === 'login') {
                // If login page detected, trigger login QnA modal
                setShowFieldAnswersModal(false);
                setLoginQnAJobDesc(chosenJob.description);
                setLoginQnAJobDescSaved(true);
                setShowQnAModal(true);
                setExternalJobUrl(jobUrl);
                
                setLoading(false);
                eventSource.close()
                return;
            }
            if (res.data.pageType === 'main-form' && res.data.fields) {
                setFieldAnswers(res.data.fields);
                // setSingleResume(res.data.optimizedResume)
                setFieldAnswersUrl(jobUrl);
                setFieldAnswersJob(chosenJob);

                setShowFieldAnswersModal(true);
            } else {
                errorSetter(res.data.message || 'Failed to analyze form. Try again.');
            }
            isCompanyAutoApplyTriggered.current = false
            setLoading(false);
            eventSource.close()
        } catch (err) {
            isCompanyAutoApplyTriggered.current = false
            setLoading(false);
            eventSource.close()
            errorSetter('Failed to analyze form. Try again.');
        }
    };

    const handleGetResumeDirect = async (loginAlgorithm) => {
        checkIfAuth()
        setProgressPercentage(2)
        setProgressStatus("Starting...")
        //user can create resume as long as susbscribed, no matter the plan
        if (!isResumeSubbed) {
            errorSetter("Upgrade your subscription to tailor a resume for this job");
            if (!pricingOpened) {
                setPricingOpened(true);
                setTimeout(() => {
                    window.open('/pricing', '_blank');
                }, 5000);
            }
            return;
        }
        //check for job description before allowing resume optimization and download
        if (loginAlgorithm && loginAlgorithm === "loginAlgorithm") {
            if (!loginQnAJobDescSaved || loginQnAEditingDesc) {
                errorSetter("Save job description first");
                return;
            }

        } 
        //get event progress
        const eventSource = new EventSource('/user/progress');
        //listen for SSE
        eventSource.onmessage = (event) =>  {
            const progressUpdate = JSON.parse(event.data)
            setProgressPercentage(progressUpdate.percent);
            setProgressStatus(progressUpdate.status)
        };
        setLoading(true)

        
        try {
            const response = await axios.post('/user/resume/optimize-and-return', {
                job: chosenJob,
                resume: singleResume
            }, { headers: { 'x-access-token': isAuth } });

            if (response.data.status === "unauthenticated") {
                eventSource.close();
                setLoading(false);
                errorSetter("Session expired. Please login again.");
                localStorage?.removeItem("token");
                return navigate("/popin?job-hub");
            }

            const optimizedResume = response.data.resume;
            await downloadResumeDirect(optimizedResume);
            setLoading(false);
            eventSource.close();
            successSetter('Resume downloaded!');
        } catch (error) {
            eventSource.close();
            setLoading(false);
            errorSetter('Failed to generate/download resume.');
        }
    };

    const handleGetCoverLetterDirect = async () => {
        checkIfAuth()
        //only check for LOGIN ALGORITHM
        if(!showFieldAnswersModal) {
            if (!loginQnAJobDescSaved || loginQnAEditingDesc) {
                errorSetter("Save job description first");
                return;
            }
        }
        try {
            dispatch(setFetching(true));
            const res = await axios.post('/user/cover-letter/optimize-and-return', {
                resume: singleResume,
                job: fieldAnswersJob || chosenJob
            }, { headers: { 'x-access-token': isAuth } });
            await downloadCoverLetterDirect(res.data.coverLetter, singleResume);
            dispatch(setFetching(false));
            successSetter('Cover letter downloaded!');
        } catch (err) {
            dispatch(setFetching(false));
            errorSetter('Failed to generate/download cover letter.');
        }
    };

    const triggerLoginQnAModal = () => {
        setShowFieldAnswersModal(false);
        setShowExternalJobModal(false);
        setShowInternalAppJobModal(false);
        setShowQnAModal(true);
    };


    // submit handlers for autoapply
    const handleInternalJobModalSubmit = (method) => {
        checkIfAuth()
        // Check if user is subscribed and for per month or per week
        if (checkPremiumSubsAndFirstTrial() === false) {
            return
        }
        if (Object.keys(singleResume).length < 1) {
            errorSetter("Please select a resume first");
            return;
        }
        if (method === 'linkedin') {
            triggerLoginQnAModal();
            return;
        }
        // Company site
        setShowInternalAppJobModal(false);
        handleCompanySiteAutoApply();
    };

    
    // Helper: check if a URL is a LinkedIn job
    const isLinkedInUrl = (url) => {
        if (!url) return false;
        try {
            return url.toLowerCase().includes('linkedin.com');
        } catch {
            return false;
        }
    };

    // --- External Job Modal Submit Handler (Step 1) ---
    const handleExternalModalSubmit = async () => {
        checkIfAuth()
        // Check if user is subscribed and for per month or per week
        if (checkPremiumSubsAndFirstTrial() === false) {
            return
        }
        if (!externalJobUrl) {
            errorSetter("Please provide a valid job URL");
            return;
        }
        // Trim input to avoid whitespace issues
        const trimmedUrl = externalJobUrl.trim();
        // Try URL API for robust validation
        try {
            new URL(trimmedUrl);
        } catch (e) {
            // Fallback to regex if protocol is missing
            const normalizedUrl = trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://') 
                ? trimmedUrl 
                : `https://${trimmedUrl}`;
            // Regex to support complex query parameters
            const urlRegex = /^(https?:\/\/)((?:[\da-z-]+\.)*[\da-z-]+\.)([a-z]{2,6}(?:\.[a-z]{2})?)([/\w.-]*)*(?:\?[\w=&%+:;,\-_/]*)*(#[\w-]*)?$/i;
            if (!urlRegex.test(normalizedUrl)) {
                errorSetter("Please provide a valid job URL");
                return;
            }
        }
        // Normalize URL (add https:// if no protocol)
        let normalizedUrl = trimmedUrl;
        if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
            normalizedUrl = `https://${trimmedUrl}`;
            // Verify normalized URL
            try {
                new URL(normalizedUrl);
            } catch (e) {
                errorSetter("Invalid URL format after normalization");
                return;
            }
        }
        if (Object.keys(singleResume).length < 1) {
            errorSetter("Please select a resume first");
            return;
        }
        // Step 1: Check if LinkedIn or Company Site
        if (isLinkedInUrl(normalizedUrl)) {
            triggerLoginQnAModal();
        } else {
            // Use Company Site Algorithm
            setShowExternalJobModal(false);
            handleCompanySiteAutoApply(normalizedUrl);
        }
    };

    const handleLoginQnAInputChange = (e) => {
        setLoginQnAInput(e.target.value);
    };

    // Handler for QnA submit
    const handleLoginQnASubmit = async () => {
        checkIfAuth()
        // Check if user is subscribed and for per month or per week
        if (checkPremiumSubsAndFirstTrial() === false) {
            return
        }
        //For QnA Modal
        if(!showFieldAnswersModal) {
            if (!loginQnAInput || !loginQnAJobDesc) {
                errorSetter('Please provide a question and save job description.');
                return;
            }
            try {
                setLoginQnALoading(true);
                const res = await axios.post('/user/form-analysis/login-qna', {
                    resume: singleResume,
                    jobDescription: loginQnAJobDesc,
                    question: loginQnAInput
                }, { headers: { 'x-access-token': isAuth } });
                setLoginQnAList(prev => [...prev, { question: loginQnAInput, answer: res.data.answer }]);
                successSetter("Answer generated!")
            } catch (err) {
                errorSetter('Failed to get answer. Try again.');
            }
        } else {
            //For FieldAnswersModal
            if (!loginQnAInput) {
                errorSetter('Please provide a question.');
                return;
            }
            try {
                setLoginQnALoading(true);
                const res = await axios.post('/user/form-analysis/login-qna', {
                    resume: singleResume,
                    jobDescription: chosenJob?.description,
                    question: loginQnAInput
                }, { headers: { 'x-access-token': isAuth } });
                setFieldAnswers(prev => [...prev, { label: loginQnAInput, value: res.data.answer }]);
                successSetter("Answer generated!")
            } catch (err) {
                errorSetter('Failed to get answer. Try again.');
            }
        }

        setLoginQnAInput('');
        setLoginQnALoading(false);
    };


    // Render
    return (
        <div>
            {isFeedbackTime ? <Feedback notApaymentTextPositive="Resume Creation Completed!"/> : (
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
                            onClick={toggleMenu}
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


                        <div style={styles.animText} onClick={() => setAuthMenuOpen(false)}>
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

                        <div style={{textAlign: 'center', margin: '15px 0'}}>
                            <ButtonSubmitGreen 
                                onClick={() => setShowExternalJobModal(true)}
                                style={{maxWidth: '300px'}}
                            >
                                <MdOutlineAutoAwesome style={{fontSize: '1.2rem'}} /> &nbsp;Auto-Apply to External Jobs
                            </ButtonSubmitGreen>
                        </div>

                        <div style={{textAlign: 'right', padding: '5px 10px 5px 0', fontSize: '.75rem'}}><b style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={handleNavigateProfile}><TbReplaceFilled style={{color: "#3E8F93", fontSize: "1rem"}}/> Change job connect location here</b></div>

                        {jobs.length < 1 ? (
                            <div style={styles.noResumes} onClick={() => setAuthMenuOpen(false)}>
                                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                    <Alert sx={{padding: '0 5px', width: 'auto', margin: '0 auto', fontSize: '.9rem'}} severity="warning">You have no job connections yet.</Alert>
                                </div>
                                <div className="BodyWrapper">
                                    <div className="Segment">
                                        <Alert sx={{padding: '0 5px', margin: '0 auto'}} severity="info">Tips to getting connected</Alert>
                                    </div>
                                    
                                    <ol style={styles.list}>
                                        <li><b style={{color: '#3E8F93', textDecoration: 'underline', cursor: 'pointer'}} onClick={handleNavigateProfile}>Change job connect location</b>: your perfect fit job might not be in the previous city or country.</li>
                                        <li>Do NOT combine several job positions (using OR, AND, /) for one resume e.g Business Developer/Sales Executive.</li>
                                        <li>Ask Bubble Ai similar names recruiters might call your current job position: <a href="/chat" target="_blank" style={styles.newTabLnk}>Ask Here <TfiNewWindow /></a></li>
                                    </ol>
                                </div>
                                <h4>Optimize Resume to get Job Connections</h4>
                                <div style={{width: '200px'}}>
                                    <ButtonSubmitGreen onClick={goBackPrevPage}>Start Now &nbsp;&nbsp;<FaLongArrowAltRight /></ButtonSubmitGreen>
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => setAuthMenuOpen(false)}>
                                <JobList
                                    jobs={jobs}
                                    img={img}
                                    activeIndex={activeIndex}
                                    setActiveIndex={setActiveIndex}
                                    applicationMap={applicationMap}
                                    expandedAppIndex={expandedAppIndex}
                                    setExpandedAppIndex={setExpandedAppIndex}
                                    handleCopy={handleCopy}
                                    getJob={getJob}
                                    getResume={getResume}
                                    chooseActStr={chooseActStr}
                                    deleteJob={deleteJob}
                                    isResumeSubbed={isResumeSubbed}
                                    resumeSubDuration={resumeSubDuration}
                                    loadingJobs={loadingJobs}
                                />
                            </div>
                        )}

                    </div>

                    {resumeSelectorModalOpen && (
                        <ResumeSelectorModal
                            closeModalsAndReset={closeModalsAndReset}
                            allResumes={allResumes}
                            activeResIndex={activeResIndex}
                            handleResumeSelect={handleResumeSelect}
                            actionString={actionString}
                            handleGenerate={handleGenerate}
                        />
                    )}
                    {showInternalAppJobModal && (
                        <InternalAppJobModal
                            closeModalsAndReset={closeModalsAndReset}
                            setShowInternalAppJobModal={setShowInternalAppJobModal}
                            linkedinUrl={linkedinUrl}
                            companyUrl={companyUrl}
                            applicants={applicants}
                            allResumes={allResumes}
                            activeResIndex={activeResIndex}
                            handleResumeSelect={handleResumeSelect}
                            handleInternalJobModalSubmit={handleInternalJobModalSubmit}
                        />
                    )}
                    {showExternalJobModal && (
                        <ExternalJobModal
                            closeModalsAndReset={closeModalsAndReset}
                            setShowExternalJobModal={setShowExternalJobModal}
                            externalJobUrl={externalJobUrl}
                            handleExternalJobUrlChange={(e) => setExternalJobUrl(e.target.value)}
                            allResumes={allResumes}
                            activeResIndex={activeResIndex}
                            handleResumeSelect={handleResumeSelect}
                            handleExternalModalSubmit={handleExternalModalSubmit}
                        />
                    )}
                    {showFieldAnswersModal && (
                        <FieldAnswersModal
                            closeModalsAndReset={closeModalsAndReset}
                            fieldAnswers={fieldAnswers}
                            fieldAnswersUrl={fieldAnswersUrl}
                            handleCopy={handleCopy}
                            handleGetResumeDirect={handleGetResumeDirect}
                            handleGetCoverLetterDirect={handleGetCoverLetterDirect}
                            handleCompanySiteAutoApply={handleCompanySiteAutoApply}
                            loginQnAInput={loginQnAInput}
                            handleLoginQnAInputChange={handleLoginQnAInputChange}
                            handleLoginQnASubmit={handleLoginQnASubmit}
                            loginQnALoading={loginQnALoading}
                        />
                    )}
                    {showQnAModal && (
                        <QnAModal
                            closeModalsAndReset={closeModalsAndReset}
                            externalJobUrl={externalJobUrl}
                            linkedinUrl={linkedinUrl}
                            loginQnAJobDesc={loginQnAJobDesc}
                            handleLoginQnAJobDescChange={e => setLoginQnAJobDesc(e.target.value)}
                            loginQnAJobDescSaved={loginQnAJobDescSaved}
                            setLoginQnAJobDescSaved={setLoginQnAJobDescSaved}
                            loginQnAEditingDesc={loginQnAEditingDesc}
                            setLoginQnAEditingDesc={setLoginQnAEditingDesc}
                            loginQnAInput={loginQnAInput}
                            handleLoginQnAInputChange={handleLoginQnAInputChange}
                            loginQnAList={loginQnAList}
                            handleLoginQnASubmit={handleLoginQnASubmit}
                            loginQnALoading={loginQnALoading}
                            handleCopy={handleCopy}
                            handleGetResumeDirect={handleGetResumeDirect}
                            handleGetCoverLetterDirect={handleGetCoverLetterDirect}
                        />
                    )}
                    {successfulAchievement && 
                        <SuccessFailureModal 
                            success={successfulAchievement} 
                            successText="Congratulations, You have been rewarded!"
                            bodyText="You gained Bubble Points! Keep creating resumes and applying to jobs to earn a free sub on us."
                            buttonText="Claim Points Reward"
                            fullName={user.firstName} 
                        /> 
                    }
                    {loading && (
                        <Modal
                            header4={`RUNNING, DO NOT RELOAD`}
                            header3={progressStatus}
                            progress={progressPercentage}
                        />
                    )}
                </div>
            )}

        </div>
    );

    
};

export default React.memo(JobHub);

