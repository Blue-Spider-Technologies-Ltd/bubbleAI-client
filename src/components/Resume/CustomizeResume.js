import React, { useEffect, useState, memo, useRef } from "react";
import ReactPixel from 'react-facebook-pixel';
import resumeCss from "./Resume.module.css";
import depoCss from "../Depositions/Depositions.module.css"
import { useNavigate, useLocation } from "react-router-dom";
import AuthInput from "../UI/Input/AuthInputs";
import { Grid } from "@mui/material";
import { 
  errorAnimation, 
  checkAuthenticatedUser, 
  checkEmptyStringsInObj, 
  checkEmptyStringsInObjNoExempt, 
  checkEmptyStrings 
} from "../../utils/client-functions";
import { useSelector, useDispatch } from "react-redux";
import { 
  setUser, 
  setResume, 
  setFetching, 
  setUserResumesAll, 
  setError, 
  setResumeSubDuration,
  setIsResumeSubbed,
  setHideCards,
  setResumeServicesNumbers
} from "../../redux/states";
import { ButtonSubmitGreen, ButtonCard } from "../UI/Buttons/Buttons";
import axios from "axios";
import { Modal, PlainModalOverlay, SuccessFailureModal } from "../UI/Modal/Modal";
import AuthSideMenu from "../UI/AuthSideMenu/AuthSideMenu";
import AuthHeader from "../UI/AuthHeader/AuthHeader";
import { useConfirm } from "material-ui-confirm";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import ChatwootWidget from "../../utils/chatwoot";
import { LANGUAGES } from '../../utils/languages';
const langLevelsArray = [
  {name: '1'},
  {name: '2'},
  {name: '3'},
  {name: '4'},
  {name: '5'}
]

const jobTypesArray = [
  {name: 'Hybrid'},
  {name: 'Remote'},
  {name: 'On-site'}
]



const CustomizeResume = () => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { user, userResumesAll, error, successMini, isResumeSubbed, hideCards } = useSelector((state) => state.stateData);
  const navigate = useNavigate();
  const location = useLocation();
  const dragDropRef = useRef();
  const [loading, setLoading] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressStatus, setProgressStatus] = useState('Creating your Resume...');
  const [isFirstTimeUserPopUp, setIsFirstTimeUserPopUp] = useState(false)
  const [dobFirstUser, setDobFirstUser] = useState("")
  const [mobileFirstUser, setMobileFirstUser] = useState("")
  const [subDuration, setSubDuration] = useState("");
  const [basicFaded, setBasicFaded] = useState(false)
  const [eduFaded, setEduFaded] = useState(true)
  const [workFaded, setWorkFaded] = useState(true)
  const [skillFaded, setSkillFaded] = useState(true)
  const [certFaded, setCertFaded] = useState(true)
  const [pubFaded, setPubFaded] = useState(true)
  const [langFaded, setLangFaded] = useState(true)
  const [interestFaded, setInterestFaded] = useState(true)
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [creatorDisplay, setCreatorDisplay] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [jobConnectType, setJobConnectType] = useState("Hybrid")
  const [successfulAchievement, openSuccessfulAchievement] = useState(false)
  const [bubblePoints, setBubblePoints] = useState(0)

  const screenWidth = window.innerWidth
  const successfulTargetAchievement = localStorage.getItem("successfulTargetAchievement")

  const isAuth = localStorage?.getItem("token");

  const errorSetter = (string) => {
    dispatch(setError(string))
    errorAnimation()
  }

  //resume data
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    jobPosition: "",
    city: "",
    country: "",
    profSummary: "",
  });

  const advancedMatching = { 
    em: user.email
  }

  const handleNavigateProfile = () => {
    const prevPath = location.pathname
    localStorage?.setItem("prevPath", prevPath)
    navigate("/user/dashboard/profile")
  }

  const resetButtonCardBoleans = () => {
    dispatch(setHideCards(false))
  }

  const selectBuildType = (str) => {
    dispatch(setHideCards(true))
    setCreatorDisplay(str)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    resetButtonCardBoleans()
  }, []);

  const options = {
    autoConfig: true,
    debug: false, // enable logs
  };

  useEffect(() => {
    ReactPixel.init('1133510054551065', advancedMatching, options);
    ReactPixel.pageView();
  }, []);

  useEffect(() => {
    dispatch(setFetching(true));
    localStorage.removeItem("prevPath");
    const description = localStorage?.getItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXdescription")
    const jobTitle = localStorage?.getItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXtitle")
    
    
    const populateUser = async () => {
      try {
        //must await
        await checkAuthenticatedUser()
      } catch (error) {
        dispatch(setFetching(false));
        return navigate("/popin?resume");      
      }
      //Get Data if User is Authorized by subscription
      try {
        const response = await axios.get("/user/resume", {
          headers: {
            "x-access-token": isAuth,
          },
        });

        if (response?.data?.status === "unauthenticated") {
          localStorage?.removeItem("token");
          return navigate("/popin?resume");
        }

        const {
          firstName, 
          lastName, 
          email, 
          mobile,
          isFirstTimeUser, 
          jobPosition, 
          stateRegion, 
          country, 
          profSummary,
          resumeSubscriptions,
          resumes, 
          resumeTarget,
          resumeNumbers,
          jobConnectType 
        } = response?.data?.user

        const percentTargetGained = Math.round(resumeTarget.achievedTarget/resumeTarget.setTarget * 100)

        setBubblePoints(percentTargetGained)

        setBasicInfo({
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile || "",
          jobPosition: jobTitle || jobPosition || "",
          city: stateRegion || "",
          country: country || "",
          profSummary: profSummary || "",
        });
        setJobConnectType(jobConnectType || "Hybrid")
        // console.log(response.data.user);
        dispatch(setUserResumesAll(resumes))
        setIsFirstTimeUserPopUp(isFirstTimeUser)
        setSubDuration(resumeSubscriptions?.duration)
        dispatch(setIsResumeSubbed(resumeSubscriptions?.subscribed))
        dispatch(setResumeSubDuration(resumeSubscriptions?.duration))
        dispatch(setResumeServicesNumbers(resumeNumbers))
        dispatch(setUser(response.data.user));
        if(successfulTargetAchievement) {
          openSuccessfulAchievement(true)
          localStorage.removeItem("successfulTargetAchievement")
        }
        if(description) {
          selectBuildType("Optimize");
          setAdditionalInfo(description + `Above is a full job description of the job being applied for, optimize the resume to fit the job description; 
            making sure that keywords from the description appears strategically and professionally in the skills, professional 
            summary and work history of the resultant ATS friendly resume: `)
        }
        dispatch(setFetching(false));
        localStorage?.removeItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXdescription")
        localStorage?.removeItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXtitle")

      } catch (error) {
        dispatch(setFetching(false));
        errorSetter("Reload page to fetch data")
      }
    };

    populateUser();

  }, [navigate, dispatch, isAuth]);

  //to redirect user if previously unfinished resume
  useEffect(() => {
    const now = Date.now();
    const isResumePresent = localStorage?.getItem(
      "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@"
    );
    const localResume = JSON.parse(isResumePresent);

    if (localResume) {
      if (now > localResume.expiration) {
        // if expired, remove previous resumes in local storage
        localStorage?.removeItem(
          "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@"
        );
        //reload page
        window.location.reload()
      } else {
        confirm({
          title: "Continue Unfinished Resume?",
          description: `You have a previously unfinished Resume, Click Proceed to Continue Editting it or cancel to start new Resume`,
        })
        .then(() => {
          dispatch(setResume(localResume.resumeData));
          navigate("/user/dashboard/resume?preview");
        })
        .catch(() => {
          //remove previous resumes in local storage if expired
          localStorage?.removeItem(
            "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@"
          );
        });
      }

    } 
  }, [confirm, dispatch, navigate])
  

  const [linkInfo, setLinkInfo] = useState([""]);
  const [skills, addSkills] = useState([""]);
  const [interests, addInterests] = useState([""]);
  const [languages, addLanguages] = useState([
    {
      language: "",
      level: ""
    }
  ]);
  const [eduArray, addEduArray] = useState([
    {
      institution: "",
      degree: "",
      date: "",
    },
  ]);
  const [workExpArray, addWorkExpArray] = useState([
    {
      company: "",
      position: "",
      dateFrom: "",
      dateTo: "",
      currently: false,
      industry: "",
      workLink: "",
      jobDesc: "",
    },
  ]);

  const [awardArray, addAwardArray] = useState([
    {
      org: "",
      award: "",
      date: "",
    },
  ]);
  const [publications, addPublications] = useState([
    {
      title: "",
      source: "",
      date: "",
    },
  ]);

  /////////////////FIRST USER FUNCTIONS////////////////////////////////
  const handleDobFirstUserInputChange = event => {
    setDobFirstUser(event.target.value)
  }

  const handleMobileFirstUserInputChange = event => {
    setMobileFirstUser(event)
  }

  const chengeFirstTimeUserStatus = async () => {
    if (basicInfo.country === "" || basicInfo.city === "") {
      return errorSetter("Choose Country and Region")
    }
    if (dobFirstUser === "" || mobileFirstUser === "") {
      return errorSetter("Complete DoB and Mobile details")
    }
    try {
      //must await
      await checkAuthenticatedUser()
    } catch (error) {
        dispatch(setFetching(false));
        return navigate("/popin?resume");      
    }
    dispatch(setFetching(true))

    const body = {
      dob: dobFirstUser,
      mobile: mobileFirstUser,
      stateRegion: basicInfo.city,
      country: basicInfo.country
    }
    try {
      const response = await axios.post("/user/update-first-user", body, {
          headers: {
              "x-access-token": isAuth,
          },
      });
      if (response.status === 200) {
        setIsFirstTimeUserPopUp(false)
        const { dob, mobile, country, stateRegion } = response?.data; 
        setBasicInfo(prevState => ({ 
          ...prevState, 
          dob: dob, 
          mobile: mobile,
          country: country,
          stateRegion: stateRegion }))
      } else {
        errorSetter("Something went wrong, try again")
      }
      dispatch(setFetching(false))
      return
    } catch (error) {
      dispatch(setFetching(false))
      errorSetter("Something went wrong")
    }
  }


  const toggleResumes = () => {
    setAuthMenuOpen(!authMenuOpen);
  };

  //////LINK HANDLERS
  const handleAddLinks = () => {
    const newLink = "";
    if (linkInfo.length < 5) {
      return setLinkInfo([...linkInfo, newLink]);
    }
    errorSetter("You can add a maximum of 5 links")
  };
  const handleDeleteLinks = () => {
    if (linkInfo.length > 1) {
      const prevLinks = [...linkInfo];
      prevLinks.pop();
      return setLinkInfo([...prevLinks]);
    }
    errorSetter("Leave blank, don't delete");
  };
  const handleLinkChange = (event, index) => {
    const prevLinkInfo = [...linkInfo];
    prevLinkInfo[index] = event.target.value;
    setLinkInfo(prevLinkInfo);
  };

  /////////////SKILL HANDLERS
  const handleAddSkill = () => {
    const newSkill = "";
    addSkills([...skills, newSkill]);
  };
  const handleDeleteSkill = () => {
    if (skills.length > 1) {
      const prevSkills = [...skills];
      prevSkills.pop();
      return addSkills([...prevSkills]);
    }
    errorSetter("Leave blank, don't delete");
  };
  const handleSkillChange = (event, index) => {
    const prevSkills = [...skills];
    prevSkills[index] = event.target.value;
    addSkills(prevSkills);
  };

  /////////////SKILL HANDLERS
  const handleAddInterests = () => {
    const newInterest = "";
    addInterests([...interests, newInterest]);
  };
  const handleDeleteInterests = () => {
    if (interests.length > 1) {
      const prevInterests = [...interests];
      prevInterests.pop();
      return addInterests([...prevInterests]);
    }
    errorSetter("Leave blank, don't delete");
  };
  const handleInterestChange = (event, index) => {
    const prevInterests = [...interests];
    prevInterests[index] = event.target.value;
    addInterests(prevInterests);
  };

  ///EDUCATION INFO HANDLERS
  const handleAddEduInfo = () => {
    const newInfo = {
      institution: "",
      degree: "",
      date: "",
    };
    if (eduArray.length < 5) {
      return addEduArray([...eduArray, newInfo]);
    }
    errorSetter("Only add 5 relevant backgrounds");
  };
  const handleDeleteEduInfo = () => {
    if (eduArray.length > 1) {
      const prevInfo = [...eduArray];
      prevInfo.pop();
      return addEduArray([...prevInfo]);
    }
    errorSetter("Leave blank, don't delete");
  };
  const handleEduExpChange = (event, index) => {
    const prevEduExp = [...eduArray];
    switch (event.target.name) {
      case "institution":
        prevEduExp[index].institution = event.target.value;
        addEduArray(prevEduExp);
        break;
      case "degree":
        prevEduExp[index].degree = event.target.value;
        addEduArray(prevEduExp);
        break;
      case "date":
        prevEduExp[index].date = event.target.value;
        addEduArray(prevEduExp);
        break;
      default:
        addEduArray(prevEduExp);
        break;
    }
  };

  /////WORK EXP HANDLERS
  const handleAddExp = () => {
    const newInfo = {
      company: "",
      position: "",
      dateFrom: "",
      dateTo: "",
      currently: false,
      industry: "",
      workLink: "",
      jobDesc: "",
    };
    if (workExpArray.length < 6) {
      return addWorkExpArray([...workExpArray, newInfo]);
    }
    errorSetter("Only add 6 Experiences");
  };
  const handleDeleteExp = () => {
    if (workExpArray.length > 1) {
      const prevInfo = [...workExpArray];
      prevInfo.pop();
      return addWorkExpArray([...prevInfo]);
    }
    errorSetter("Add an Experience, Can't delete");
  };
  const handleWorkExpChange = (event, index) => {
    const prevWorkExp = [...workExpArray];

    switch (event.target.name) {
      case "company":
        prevWorkExp[index].company = event.target.value;
        addWorkExpArray(prevWorkExp);
        break;
      case "position":
        prevWorkExp[index].position = event.target.value;
        addWorkExpArray(prevWorkExp);
        break;
      case "industry":
        prevWorkExp[index].industry = event.target.value;
        addWorkExpArray(prevWorkExp);
        break;
      case "workLink":
        prevWorkExp[index].workLink = event.target.value;
        addWorkExpArray(prevWorkExp);
        break;
      case "dateFrom":
        prevWorkExp[index].dateFrom = event.target.value;
        addWorkExpArray(prevWorkExp);
        break;
      case "dateTo":
        prevWorkExp[index].dateTo = event.target.value;
        addWorkExpArray(prevWorkExp);
        break;      
      case "currently":
        prevWorkExp[index].currently = !prevWorkExp[index].currently;
        addWorkExpArray(prevWorkExp);
        break;
      case "jobDesc":
        prevWorkExp[index].jobDesc = event.target.value;
        addWorkExpArray(prevWorkExp);
        break;
      default:
        addWorkExpArray(prevWorkExp);
        break;
    }
  };

    /////AWARD HANDLERS
  const handleAddAward = () => {
    const newAward = {
      org: "",
      award: "",
      date: "",
    };
    if (awardArray.length < 10) {
      return addAwardArray([...awardArray, newAward]);
    }
    errorSetter("Only add 10 Awards");
  };
  const handleDeleteAward = () => {
    if (awardArray.length > 1) {
      const prevAward = [...awardArray];
      prevAward.pop();
      return addAwardArray([...prevAward]);
    }
    errorSetter("Leave blank, don't delete");
  };
  const handleAwardChange = (event, index) => {
    const prevAwards = [...awardArray];
    switch (event.target.name) {
      case "org":
        prevAwards[index].org = event.target.value;
        addAwardArray(prevAwards);
        break;
      case "award":
        prevAwards[index].award = event.target.value;
        addAwardArray(prevAwards);
        break;
      case "date":
        prevAwards[index].date = event.target.value;
        addAwardArray(prevAwards);
        break;
      default:
        addAwardArray(prevAwards);
        break;
    }
  };

  /////PUBLICATION HANDLERS
  const handleAddPublication = () => {
    const newPub = {
      title: "",
      source: "",
      date: "",
    };
    if (publications.length < 20) {
      return addPublications([...publications, newPub]);
    }
    errorSetter("Only add 20 Publications");
  };
  const handleDeletePublication = () => {
    if (publications.length > 1) {
      const prevPub = [...publications];
      prevPub.pop();
      return addPublications([...prevPub]);
    }
    errorSetter("Leave blank, don't delete");
  };
  const handlePubChange = (event, index) => {
    const prevPub = [...publications];
      switch (event.target.name) {
      case "title":
        prevPub[index].title = event.target.value;
        addPublications(prevPub);
        break;
      case "source":
        prevPub[index].source = event.target.value;
        addPublications(prevPub);
        break;
      case "date":
        prevPub[index].date = event.target.value;
        addPublications(prevPub);
        break;
      default:
        addPublications(prevPub);
        break;
    }
  };

  ///LANGUAGE HANDLERS
  const handleAddLang = () => {
    const newLang = {
      language: "",
      level: ""
    };
    if (languages.length < 5) {
      return addLanguages([...languages, newLang]);
    }
    errorSetter("5 relevant languages max");
  };
  const handleDeleteLang = () => {
    if (languages.length > 1) {
      const prevLangs = [...languages];
      prevLangs.pop();
      return addLanguages([...prevLangs]);
    }
    errorSetter("Leave blank, don't delete");
  };

  const handleLangChange = (event, index) => {
    const prevLangs = [...languages];
    switch (event.target.name) {
      case "language":
        prevLangs[index].language = event.target.value;
        addLanguages(prevLangs);
        break;
      case "level":
        prevLangs[index].level = event.target.value;
        addLanguages(prevLangs);
        break;
      default:
        addLanguages(prevLangs);
        break;
    }
  };

  const handleJobConnectType = (event) => {
      if (event.target.value === undefined || event.target.value === "") {
        errorSetter("Select a Job Connect Type");
        return;
      }
    setJobConnectType(event.target.value);

    const setConnTypeOnDB = async () => {
      try {
        await axios.post("/user/set-job-connect-type", 
          {jobConnectType: event.target.value}, 
          {
            headers: {
              "x-access-token": isAuth,
            },
          }
        );
        
      } catch (error) {
        console.error("Error setting job connect type:", error);
        errorSetter("Failed to set job connect type");
      }
    }

    setConnTypeOnDB();
  };

  const handleInputChange = (prop) => (event) => {
    //if data is mobile number
    if (prop === "mobile") {
      return setBasicInfo({ ...basicInfo, [prop]: "+" + event });
    }
    if (prop === "country" || prop === "city") {
      setBasicInfo({
        ...basicInfo,
        [prop]: event
      });
      return
    }
    setBasicInfo({
      ...basicInfo,
      [prop]: event.target.value,
    });
  };


  ////SEGMENT VISIBILITY/ANIMATION HANDLERS
  const basicInfoForward = (arg) => {
    //check if required fields are filled
    const { mobile, jobPosition, city, country } = basicInfo
    if ( mobile === "") {
      errorSetter("Enter Mobile to continue");
      return;
    }
    if (jobPosition === "") {
      errorSetter("Enter Job Position to continue");
      return;
    }
    if (city === "" || city === "State/Region" || country === "" || country === "Country") {
      errorSetter("Choose Country first, then choose State/Region next, to continue");
      return;
    }
    setBasicFaded(true)
    switch (arg) {
      case "forward":
        setEduFaded(false)
        break;
    
      default:
        setEduFaded(false)
        break;
    }
  }

  const eduInfoForwardOrBackward = (arg) => {  
    setEduFaded(true)
    switch (arg) {
      case "forward":
        //check if required fields are filled
        if (checkEmptyStringsInObjNoExempt(eduArray) === false ) {
          setEduFaded(false)
          return errorSetter("Complete required fields in this section to continue");    
        }
        setWorkFaded(false)
        break;
      case "backward":
        setBasicFaded(false);
        break;
    
      default:
        
        break;
    }
  }

  const workExpForwardOrBackward = (arg) => {
    setWorkFaded(true)
    switch (arg) {
      case "forward":
        //check if required fields are filled, exempting some keys
        if (checkEmptyStringsInObj(workExpArray, "jobDesc", "workLink", "dateTo", "currently") === false ) {
          setWorkFaded(false)
          errorSetter("Complete required fields in this section to continue");
          return;
        }
        setSkillFaded(false)
        break;
      case "backward":
        setEduFaded(false)
        break;
    
      default:
        break;
    }
  }

  const skillsForwardOrBackward = (arg) => {
    setSkillFaded(true)
    switch (arg) {
      case "forward":
        //check if required fields are filled, exempting two keys
        if (checkEmptyStrings(skills) === false ) {
          setSkillFaded(false)
          errorSetter("Complete required fields in this section to continue");
          return;
        }
        setCertFaded(false)
        break;
      case "backward":
        setWorkFaded(false)
        break;
    
      default:
        break;
    }
  }

  const certsForwardOrBackward = (arg) => {
    setCertFaded(true)
    switch (arg) {
      case "forward":
        setPubFaded(false)
        break;
      case "backward":
        setSkillFaded(false)
        break;
    
      default:
        break;
    }
  }

  const pubForwardOrBackward = (arg) => {
    setPubFaded(true)
    switch (arg) {
      case "forward":
        setLangFaded(false)
        break;
      case "backward":
        setCertFaded(false)
        break;
    
      default:
        break;
    }
  }

  const langForwardOrBackward = (arg) => {
    setLangFaded(true)
    switch (arg) {
      case "forward":
        setInterestFaded(false)
        document.getElementById("submit-button").style.display = ""
        break;
      case "backward":
        setPubFaded(false)
        break;
    
      default:
        break;
    }
  }

  const interestsBackward = (arg) => {
    setInterestFaded(true)
    switch (arg) {
      case "backward":
        setLangFaded(false)
        document.getElementById("submit-button").style.display = "none"
        break;
    
      default:
        break;
    }
  }



  ///////DRAG AND DROP & FILE FUNCTIONS
  const handleUploadFile = (e) => {
    setFileError(false);
    const MAX_FILE_SIZE = 14 * 1024 * 1024;
    const allowedTypes = ['.doc', '.docx', '.pdf', '.txt'];

    let selectedFile;
    if (e.type === "drop") {
      selectedFile = e.dataTransfer.files[0];
    } else {
      selectedFile = e.target.files[0];
    }

    if (!selectedFile) {
      errorSetter("No file detected");
      setFileError(true);
      return;
    }

    const fileExtension = selectedFile.name.toLowerCase().split('.').pop();
    if (!allowedTypes.includes(`.${fileExtension}`)) {
      errorSetter("Please drop only PDF, DOC, or TXT files.");
      setFileError(true);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      errorSetter(`"${selectedFile.name}" exceeds the maximum file size of ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      setFileError(true);
      return;
    }
  
    setFile(selectedFile);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    handleUploadFile(e)
  };

  const handleFileResumeOptimize = async () => {
    try {
      //must await
      await checkAuthenticatedUser()
    } catch (error) {
      return navigate("/popin?resume");      
    }
    if (!file) {
      errorSetter("Upload Resume to continue")
      return
    }
    if (!basicInfo.jobPosition) {
      errorSetter("Input Job Position")
      return
    }

    if (!basicInfo.country) {
      errorSetter("Choose Country first, then choose State/Region next, to continue")
      return
    }
    if (!basicInfo.city) {
      errorSetter("Choose Country first, then choose State/Region next, to continue")
      return
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('firstName', basicInfo.firstName);
    formData.append('street', basicInfo.street);
    formData.append('city', basicInfo.city);
    formData.append('country', basicInfo.country);
    formData.append('jobPosition', basicInfo.jobPosition);
    formData.append('additionalInfo', additionalInfo);
    //get event progress
    const eventSource = new EventSource('/user/progress');
    //listen for SSE
    eventSource.onmessage = (event) =>  {
      const progressUpdate = JSON.parse(event.data)
      setProgressPercentage(progressUpdate.percent);
      setProgressStatus(progressUpdate.status)
    };

    try {
      setLoading(true);
      dispatch(setResume({}));
      const response = await axios.post(
        "/user/optimize-uploaded-resume",
        formData,
        {
          headers: {
            "x-access-token": isAuth,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 500) {
        setLoading(false);
        errorSetter("Throttling, try again after a while");
        return
      }

      const dataObject = response.data.resumeData;
      
      // Convert the string to a JavaScript object
      const myObject = (new Function(`return (${dataObject})`)());

      const now = new Date().getTime();
      
      //save a copy for later incase user doesn't finish now
      let resumeObjforLocal = {
        resumeData: myObject,
        expiration: now + 168 * 60 * 60 * 1000, //current time + 1 week in milliseconds
      };
      localStorage.setItem(
        "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@",
        JSON.stringify(resumeObjforLocal)
      );

      setLoading(false);
      eventSource.close();
      navigate("/user/dashboard/resume?preview");
    } catch (error) {
      setLoading(false);
      errorSetter("Throttling, try again after a while");
      eventSource.close();
    }
  }


  const handleCreateFromScratch = async (e) => {

    e.preventDefault();
    setLoading(true);
    dispatch(setResume({}));
    const resumeData = {
      basicInfo: basicInfo, //Object
      linkInfo: linkInfo, //Array
      skills: skills, //Array
      interests: interests, //Array
      eduArray: eduArray, //Array
      workExpArray: workExpArray, //Array
      awardArray: awardArray, //Array
      publications: publications, //Array
      languages: languages, //Array
    };

    //get event progress
    const eventSource = new EventSource('/user/progress');
    //listen for SSE
    eventSource.onmessage = (event) =>  {
      const progressUpdate = JSON.parse(event.data)
      setProgressPercentage(progressUpdate.percent);
      setProgressStatus(progressUpdate.status)
    };

    try {
      const response = await axios.post("/user/customize-resume", resumeData, {
        headers: {
          "x-access-token": isAuth,
        },
      });
      if (response.status === 500) {
        setLoading(false);
        errorSetter("Throttling, try again after a while");
        return
      }

      const now = new Date().getTime();
      //save a copy for later incase user doesn't finish now
      let resumeObjforLocal = {
        resumeData: response.data.resumeData,
        expiration: now + 168 * 60 * 60 * 1000, //current time + 1 week in milliseconds
      };
      localStorage.setItem(
        "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@",
        JSON.stringify(resumeObjforLocal)
      );
      setLoading(false);
      eventSource.close();
      navigate("/user/dashboard/resume?preview");
    } catch (error) {
      setLoading(false);
      errorSetter("Throttling, try again after a while");
      eventSource.close();
    }
  };

  const renderDragAndDrop = () => (
    <div
      className={`${depoCss.DragnDrop}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => dragDropRef.current.click()}
      style={{ border: fileError ? '4px dashed rgb(216, 7, 7)' : '4px dashed #c0d1d4' }}
    >
      {file ? (
        <>
          <h1>{file.name}</h1>
          <h4 style={{ color: fileError ? 'rgb(216, 7, 7)' : '#56A8AC' }}>selected</h4>
        </>
      ) : (
        <>
          <h2>Drag & Drop File</h2>
          <h4>or</h4>
          <h2>Tap to Upload</h2>
        </>
      )}
      <input
        type="file"
        accept=".doc,.docx,.pdf,.txt"
        onChange={handleUploadFile}
        hidden
        ref={dragDropRef}
      />
    </div>
  );


  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', marginTop: '7px' }}>
      {/* TRACK */}
        <CircularProgress 
          variant="determinate" 
          thickness={5} 
          value={100}
          sx={{
            color: '#c0d1d4',
            position: 'absolute'
          }} 
        />
        {/* MAIN PROGRESS */}
        <CircularProgress 
          variant="determinate" 
          thickness={5} 
          sx={{
            color: 'black',
            '& .MuiCircularProgress-circleDeterminate': {
              stroke: bubblePoints <= 50 ? '#EE7B1C' : '#56A8AC'
            },
          }} 
          {...props} 
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ color: bubblePoints <= 50 ? '#EE7B1C' : '#56A8AC', fontWeight: '600' }}
          >
            {bubblePoints}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div className="auth-container">
      {/* For SIDE MENU */}
      <AuthSideMenu
        opened={authMenuOpen}
        hidden={!authMenuOpen}
        resumeSubDuration={subDuration}
        isResumeSubbed={isResumeSubbed}
        arrayDetails={userResumesAll}
        error={error}
        successMini={successMini}
        firstName={basicInfo.firstName}
      />

      <div style={{ width: "100%", padding: "0" }}>
        <div className="auth-bg-blob"></div>
      </div>

      <div className="auth-container-inner">
        {/* for TOP MENU */}
        <AuthHeader
          authMenuOpen={authMenuOpen}
          onClick={toggleResumes}
          headerText="Create Resume"
        />

        <div className="error">{error}</div>

        <div className="BodyWrapper" onClick={() => setAuthMenuOpen(false)}>
          <div className="BuildNavigator">
            <div className="ActiveNav">
              <span>1</span>Customise
            </div>
            <div onClick={() => navigate("/user/dashboard/resume?preview")}>
              <span>2</span>Preview
            </div>
            <div onClick={() => navigate("/user/dashboard/resume?download")}>
              <span>3</span>Download
            </div>
          </div>

          {!hideCards ? (
            <Grid container sx={{padding: '10px 15px'}}>

              <div style={styles.noResumes} onClick={() => setAuthMenuOpen(false)}>
                <div className={screenWidth > 900 ? "Segment" : undefined}>
                    <div className="Segment">
                        <Alert 
                          sx={{padding: '0 5px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            width: '100%', 
                            '& .MuiAlert-icon': {
                              color: bubblePoints <= 50 ? '#EE7B1C' : '#56A8AC'
                            }
                          }} 
                          severity="info"
                        >
                          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px'}}>
                            <div><h3>Bubble Points Gained:</h3> </div> <div><CircularProgressWithLabel value={bubblePoints} /></div>
                          </div>

                        </Alert>
                    </div>
                    
                    <ol style={styles.list}>
                        <li>Gain 100% Bubble Points to get a FREE WEEK/MONTH immediately.</li>
                        <li>Free trial users not eligible.</li>
                        <li>Subscribe to PER WEEK/MONTH to be eligible.</li>
                    </ol>
                </div>
                <h4>Optimize resumes & apply to jobs to start gaining Bubble Points</h4>
      
              </div>
              <Grid item md={6} xs={12}>
                  <ButtonCard icon="optimize-resume" title="Optimize Old Resume" width={'350px'} onClick={() => selectBuildType("Optimize")} description="Have an old resume? This option will help you optimize it to ATS and industry standards in seconds, with the right keywords and metrics." />
              </Grid>
          
              <Grid item md={6} xs={12}>
                  <ButtonCard icon="new-resume" title="Create From Scratch" width={'350px'} onClick={() => selectBuildType("")} description="New to the Job market or just want to start afresh? Fill a short profile in 2 minutes and I will generate a professional resume in seconds." />
              </Grid>
            </Grid>
          ) : (
            <form method="post" onSubmit={handleCreateFromScratch}>

              <div className='explanation-points'>
                  <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">The + and - buttons are to add and delete applicable input fields or sections</Alert>
                  <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">All fields with * are required</Alert>
                  <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Location on this page appears on your resume. For <b style={{color: '#3E8F93', textDecoration: 'underline', cursor: 'pointer'}} onClick={handleNavigateProfile}>job connect location</b>, change <b style={{color: '#3E8F93', textDecoration: 'underline', cursor: 'pointer'}} onClick={handleNavigateProfile}>Location in Profile</b> </Alert>
                  <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Have Questions? Please use the chatbot</Alert>
              </div>

              {!basicFaded && (
                <div className='prev-page' onClick={resetButtonCardBoleans} >
                  <FaLongArrowAltLeft size='1rem' /> &nbsp;&nbsp;&nbsp;back
                </div>
              )}

              {/* DRAG N DROP TO REWRITE RESUME */}

              {creatorDisplay === "Optimize" ? (
                <div className={`Segment ${basicFaded ? 'Faded' : 'Faded-in'}`}>
                  <h4>Optimize an old CV</h4>

                  {renderDragAndDrop()}

                  <Grid container mt={5}>
                    <AuthInput
                      id={"basicInfojobPosition"}
                      name={basicInfo.jobPosition}
                      value={basicInfo.jobPosition}
                      label="Job Position to optimise CV to"
                      inputType="text"
                      inputGridSm={12}
                      inputGrid={3}
                      mb={2}
                      required={true}
                      onChange={handleInputChange("jobPosition")}
                    />
                    <AuthInput 
                      value={jobConnectType} 
                      id="jobConnectType" 
                      name="jobConnectType" 
                      label={"Type of Job Connection"} 
                      inputType="select2" 
                      inputGridSm={12} 
                      inputGrid={3} 
                      mb={2} 
                      list={jobTypesArray} 
                      onChange={(event) => handleJobConnectType(event)}
                    />
                    <AuthInput
                      id={"basicInfo.country"}
                      name={basicInfo.country}
                      value={basicInfo.country}
                      inputType="country-select"
                      inputGridSm={12}
                      inputGrid={3}
                      mb={2}
                      onChange={handleInputChange("country")}
                    />
                    <AuthInput
                      country={basicInfo.country}
                      id={"basicInfo.city"}
                      name={basicInfo.city}
                      value={basicInfo.city}
                      inputType="state-select"
                      inputGridSm={12}
                      inputGrid={3}
                      mb={2}
                      onChange={handleInputChange("city")}
                    />
                    <AuthInput
                      id={"additionalInfo"}
                      name="additionalInfo"
                      value={additionalInfo}
                      placeholder="[Optional] Tell me what to specifically add or remove or you can paste job requirements. E.g Certificate of Excellence, Awarded by Bubble Ai Foundation on 20th July 2024 OR Delete work history with Blanket Designs OR [Paste job description here] "
                      multiline={true}
                      maxRows={5}
                      inputGridSm={12}
                      onChange={(event) => setAdditionalInfo(event.target.value)}
                    />
                  </Grid>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ width: "150px"}}>
                    </div>
                    <div style={{ width: "150px"}}>
                      <ButtonSubmitGreen type="button" onClick={handleFileResumeOptimize}>
                        Optimize &nbsp;&nbsp;<IoSparklesSharp style={{color: "#F8E231", fontSize: "1.5rem"}} />
                      </ButtonSubmitGreen>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* BASIC INFO */}
                  <div id="basic-info" className={`Segment ${basicFaded ? "Faded" : "Faded-in"}`}>
                    <h4>Generate CV from scratch</h4>
                    <Grid container>
                      <AuthInput
                        id={"basicInfo.firstName"}
                        value={basicInfo.firstName}
                        inputType="text"
                        inputGridSm={12}
                        inputGrid={6}
                        mb={2}
                        required={true}
                        disabled={subDuration !== "Per Month" && subDuration !== "Per Use"}
                        onChange={handleInputChange("firstName")}
                      />
                      <AuthInput
                        id={"basicInfo.lastName"}
                        value={basicInfo.lastName}
                        inputType="text"
                        inputGridSm={12}
                        inputGrid={6}
                        mb={2}
                        required={true}
                        disabled={subDuration !== "Per Month" && subDuration !== "Per Use"}
                        onChange={handleInputChange("lastName")}
                      />
                      <AuthInput
                        id={"basicInfo.email"}
                        value={basicInfo.email}
                        inputType="email"
                        inputGridSm={12}
                        inputGrid={4}
                        mb={0}
                        required={true}
                        disabled={false}
                        onChange={handleInputChange("email")}
                      />
                      <AuthInput
                        id={"basicInfo.mobile"}
                        value={basicInfo.mobile}
                        label="Mobile"
                        inputType="mobile"
                        inputGridSm={12}
                        inputGrid={4}
                        mb={2}
                        mt={screenWidth < 900 && 2}
                        required={true}
                        onChange={handleInputChange("mobile")}
                      />
                      <AuthInput
                        id={"basicInfo.jobPosition"}
                        value={basicInfo.jobPosition}
                        label="Job Position"
                        inputType="text"
                        inputGridSm={12}
                        inputGrid={4}
                        mb={2}
                        required={true}
                        onChange={handleInputChange("jobPosition")}
                      />
                      <AuthInput 
                        value={jobConnectType} 
                        id="jobConnectType2" 
                        name="jobConnectType2" 
                        label={"Type of Job Connection"} 
                        inputType="select2" 
                        inputGridSm={12} 
                        inputGrid={4} 
                        mb={2} 
                        list={jobTypesArray} 
                        onChange={(event) => handleJobConnectType(event)}
                      />
                      <AuthInput
                        id={"basicInfo.country"}
                        name={basicInfo.country}
                        value={basicInfo.country}
                        inputType="country-select"
                        inputGridSm={12}
                        inputGrid={4}
                        mb={2}
                        onChange={handleInputChange("country")}
                      />
                      <AuthInput
                        country={basicInfo.country}
                        id={"basicInfo.city"}
                        name={basicInfo.city}
                        value={basicInfo.city}
                        inputType="state-select"
                        inputGridSm={12}
                        inputGrid={4}
                        mb={2}
                        onChange={handleInputChange("city")}
                      />

                      {linkInfo.map((info, index) => {
                        return (
                          <AuthInput
                            key={index}
                            label="[Optional] Add a link e.g linkedin, github or your website"
                            id={info + index}
                            value={info}
                            inputType="text"
                            inputGridSm={8}
                            inputGrid={8}
                            mb={2}
                            required={false}
                            onChange={(event) => handleLinkChange(event, index)}
                          />
                        );
                      })}

                      <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{ marginRight: "10px" }}
                          className="delete"
                          title="Delete Link"
                          onClick={handleDeleteLinks}
                        >
                          -
                        </div>
                        <div
                          className="add"
                          title="Add More Links"
                          onClick={handleAddLinks}
                        >
                          +
                        </div>
                      </Grid>
                      
                      {/* <AuthInput
                        id={basicInfo.profSummary}
                        value={basicInfo.profSummary}
                        placeholder="[Optionally] write a professional summary and see how I optimise it for you. Leave blank to allow me craft something beautiful"
                        multiline={true}
                        rows={2}
                        inputGridSm={12}
                        mb={2}
                        onChange={handleInputChange("profSummary")}
                      /> */}
                    </Grid>

                    {/* Visibility Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <div style={{ width: "150px"}}>
                      </div>
                      <div style={{ width: "150px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => basicInfoForward("forward")}>
                          Education &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                      </div>
                    </div>
                  </div>

                  {/* EDUCATION INFO */}
                  <div id="edu-info" className={`Segment ${eduFaded ? "Faded" : "Faded-in"}`}>
                    <h4>Education Info (most recent first)</h4>
                    <div>
                      {eduArray.map((info, index) => {
                        return (
                          <Grid container key={index} className="segment">
                            <AuthInput
                              name="institution"
                              id={info.institution}
                              value={info.institution}
                              label="Name of Institution"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={4}
                              mb={2}
                              required={true}
                              onChange={(event) => handleEduExpChange(event, index)}
                            />
                            <AuthInput
                              name="degree"
                              id={info.degree + index}
                              value={info.degree}
                              label="Degree Obtained & Course"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={4}
                              mb={2}
                              required={true}
                              onChange={(event) => handleEduExpChange(event, index)}
                            />
                            <label className={resumeCss.DetachedLabels} mr={4}>
                              Graduation Date *
                            </label>
                            <AuthInput
                              name="date"
                              id={info.date + index}
                              value={info.date}
                              placeholder="Graduation Date"
                              inputType="date"
                              inputGridSm={8}
                              inputGrid={2}
                              required={true}
                              onChange={(event) => handleEduExpChange(event, index)}
                            />
                          </Grid>
                        );
                      })}
                      <div className={resumeCss.CenteredElem}>
                        <div
                          style={{ marginRight: "10px" }}
                          className="delete"
                          title="Delete Educational Info"
                          onClick={handleDeleteEduInfo}
                        >
                          -
                        </div>
                        <div
                          className="add"
                          title="Add Educational Info"
                          onClick={handleAddEduInfo}
                        >
                          +
                        </div>
                      </div>
                    </div>

                    {/* Visibility Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <div className='prev-page' onClick={() => {eduInfoForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft size='1rem' /> &nbsp;&nbsp;&nbsp;prev
                      </div>
                      <div style={{ width: "150px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                          eduInfoForwardOrBackward('forward')
                        }}>
                          Experiences &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                      </div>
                    </div>
                  </div>

                  {/* WORK EXPERIENCE */}
                  <div id="work-exp" className={`Segment ${workFaded ? "Faded" : "Faded-in"}`}>
                    <h4>Work & Volunteering Experience (most recent first)</h4>
                    <div>
                      {workExpArray.map((info, index) => {
                        return (
                          <Grid container className="segment" key={index}>
                            <AuthInput
                              name="company"
                              id={info.company}
                              value={info.company}
                              label="Company/Org. Name"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={3}
                              mb={2}
                              required={true}
                              onChange={(event) => handleWorkExpChange(event, index)}
                            />
                            <AuthInput
                              name="position"
                              id={info.position + index}
                              value={info.position}
                              label="Position Held"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={3}
                              mb={2}
                              required={true}
                              onChange={(event) => handleWorkExpChange(event, index)}
                            />
                            <AuthInput
                              name="industry"
                              id={info.industry + index}
                              value={info.industry}
                              label="Industry e.g IT"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={3}
                              mb={2}
                              required={true}
                              onChange={(event) => handleWorkExpChange(event, index)}
                            />
                            <AuthInput
                              name="workLink"
                              id={info.workLink + index}
                              value={info.workLink}
                              label="Related Link"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={3}
                              mb={2}
                              onChange={(event) => handleWorkExpChange(event, index)}
                            />
                            <div
                              style={{
                                width: "50%",
                                margin: "0 auto 5px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <label className={resumeCss.DetachedLabels}>
                                  From *
                                </label>
                                <AuthInput
                                  name="dateFrom"
                                  id={info.dateFrom + "jaaj" + index}
                                  value={info.dateFrom}
                                  placeholder="Start Date"
                                  inputType="date"
                                  inputGridSm={12}
                                  inputGrid={12}
                                  required={true}
                                  onChange={(event) =>
                                    handleWorkExpChange(event, index)
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <label
                                  className={resumeCss.DetachedLabels}
                                  style={{ marginRight: "10px" }}
                                >
                                  To *
                                </label>
                                <AuthInput
                                  name="dateTo"
                                  id={info.dateTo + "mab" + index}
                                  value={info.dateTo}
                                  placeholder="End Date"
                                  inputType="date"
                                  inputGridSm={12}
                                  disabled={info.currently}
                                  inputGrid={12}
                                  onChange={(event) =>
                                    handleWorkExpChange(event, index)
                                  }
                                />

                              </div>
                            </div>
                            <div style={{width: "100%", textAlign: "center"}}>
                              <AuthInput
                                name="currently"
                                id={"info.currently" + index}
                                value={info.currently}
                                label="I currently work here"
                                inputType="checkbox"
                                inputGridSm={12}
                                mb={2}
                                onChange={(event) =>
                                  handleWorkExpChange(event, index)
                                }
                              />
                            </div>
                            <AuthInput
                              id={info.jobDesc}
                              name="jobDesc"
                              value={info.jobDesc}
                              placeholder="I will craft out job descriptions with the right keywords after careful analysis. You can edit it in the Preview section."
                              multiline={true}
                              rows={2}
                              disabled={true}
                              inputGridSm={12}
                              onChange={(event) => handleWorkExpChange(event, index)}
                            />
                          </Grid>
                        );
                      })}
                      <div className={resumeCss.CenteredElem}>
                        <div
                          style={{ marginRight: "10px" }}
                          className="delete"
                          title="Delete Experience"
                          onClick={handleDeleteExp}
                        >
                          -
                        </div>
                        <div
                          className="add"
                          title="Add Experience"
                          onClick={handleAddExp}
                        >
                          +
                        </div>
                      </div>
                    </div>

                    {/* Visibility Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <div className='prev-page' onClick={() => {workExpForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft size='1rem' /> &nbsp;&nbsp;&nbsp;prev
                      </div>
                      <div style={{ width: "150px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                          workExpForwardOrBackward('forward')
                        }}>
                          Skills &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                      </div>
                    </div>
                  </div>

                  {/* RELEVANT SKILLS */}
                  <div id="skills" className={`Segment ${skillFaded ? "Faded" : "Faded-in"}`}>
                    <h4>Relevant Skills</h4>
                    <div className='explanation-points'>
                      <Alert sx={{padding: '0 5px', fontSize: '.7rem', marginBottom: "10px", justifyContent: "center"}} severity="info">Write a skill and i will suggest others in the preview section for you, or use the + button to add several skills and I will optimize them with the right keywords.</Alert>
                    </div>
                    <Grid container>
                      <Grid container item xs={9}>
                        {skills.map((skill, index) => {
                          return (
                            <AuthInput
                              key={index}
                              id={skill + index}
                              value={skill}
                              label="Add a Skill"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={6}
                              mb={2}
                              required={true}
                              onChange={(event) => handleSkillChange(event, index)}
                            />
                          );
                        })}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ marginRight: "10px" }}
                          className="delete"
                          title="Delete Skill"
                          onClick={handleDeleteSkill}
                        >
                          -
                        </div>
                        <div
                          className="add"
                          title="Add a Skill"
                          onClick={handleAddSkill}
                        >
                          +
                        </div>
                      </Grid>
                    </Grid>

                    {/* Visibility Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <div className='prev-page' onClick={() => {skillsForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft size='1rem' /> &nbsp;&nbsp;&nbsp;prev
                      </div>
                      <div style={{ width: "150px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                          skillsForwardOrBackward('forward')
                        }}>
                          Certifications &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                      </div>
                    </div>
                  </div>

                  {/* CERT AND AWARDS */}
                  <div id="certs" className={`Segment ${certFaded ? "Faded" : "Faded-in"}`}>
                    <h4>Certifications, Awards & Accomplishments [Optional]</h4>
                    <div>
                      <Grid
                        container
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        {awardArray.map((info, index) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              md={5}
                              mb={2}
                              className="segment"
                              key={index}
                            >
                              <AuthInput
                                name="org"
                                id={info.org + index}
                                value={info.org}
                                label="Awarding Organization"
                                inputGridSm={12}
                                inputType="text"
                                mb={2}
                                onChange={(event) => handleAwardChange(event, index)}
                              />
                              <AuthInput
                                name="award"
                                id={info.award + index}
                                value={info.award}
                                label="Award Received"
                                inputGridSm={12}
                                inputType="text"
                                mb={2}
                                onChange={(event) => handleAwardChange(event, index)}
                              />
                              <label className={resumeCss.DetachedLabels}>
                                Date Awarded
                              </label>
                              <AuthInput
                                name="date"
                                id={info.date + index}
                                value={info.date}
                                placeholder="Date Awarded"
                                inputGridSm={12}
                                inputType="date"
                                onChange={(event) => handleAwardChange(event, index)}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                      <div className={resumeCss.CenteredElem}>
                        <div
                          style={{ marginRight: "10px" }}
                          className="delete"
                          title="Delete Award"
                          onClick={handleDeleteAward}
                        >
                          -
                        </div>
                        <div
                          className="add"
                          title="Add Award"
                          onClick={handleAddAward}
                        >
                          +
                        </div>
                      </div>
                    </div>

                    {/* Visibility Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <div className='prev-page' onClick={() => {certsForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft size='1rem' /> &nbsp;&nbsp;&nbsp;prev
                      </div>
                      <div style={{ width: "150px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                          certsForwardOrBackward('forward')
                        }}>
                          Publications &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                      </div>
                    </div>
                  </div>

                  {/* PUBLICATIONS */}
                  <div id="publications" className={`Segment ${pubFaded ? "Faded" : "Faded-in"}`}>
                    <h4>Publications & Projects [Optional]</h4>
                    <div>
                      <Grid
                        container
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        {publications.map((info, index) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              md={5}
                              mb={2}
                              className="segment"
                              key={index}
                            >
                              <AuthInput
                                name="title"
                                id={info.title + index}
                                value={info.title}
                                label="Title"
                                inputGridSm={12}
                                inputType="text"
                                mb={2}
                                onChange={(event) => handlePubChange(event, index)}
                              />
                              <AuthInput
                                name="source"
                                id={info.source + index}
                                value={info.source}
                                label="Source"
                                inputGridSm={12}
                                inputType="text"
                                mb={2}
                                onChange={(event) => handlePubChange(event, index)}
                              />
                              <label className={resumeCss.DetachedLabels}>
                                Date Awarded{" "}
                              </label>
                              <AuthInput
                                name="date"
                                value={info.date + index}
                                id={info.date}
                                placeholder="Date Awarded"
                                inputGridSm={12}
                                inputType="date"
                                onChange={(event) => handlePubChange(event, index)}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                      <div className={resumeCss.CenteredElem}>
                        <div
                          style={{ marginRight: "10px" }}
                          className="delete"
                          title="Delete Publication"
                          onClick={handleDeletePublication}
                        >
                          -
                        </div>
                        <div
                          className="add"
                          title="Add Publication"
                          onClick={handleAddPublication}
                        >
                          +
                        </div>
                      </div>
                    </div>

                    {/* Visibility Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <div className='prev-page' onClick={() => {pubForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft size='1rem' /> &nbsp;&nbsp;&nbsp;prev
                      </div>
                      <div style={{ width: "150px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                          pubForwardOrBackward('forward')
                        }}>
                          Languages &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                      </div>
                    </div>
                  </div>

                  {/* LANGUAGES */}
                  <div id="languages" className={`Segment ${langFaded ? "Faded" : "Faded-in"}`}>
                    <h4>Language Proficiency [Optional]</h4>
                    <Grid container>
                      {languages.map((language, index) => {
                        return (
                          <Grid container item xs={12} md={6} key={index}>                              
                            <AuthInput 
                              value={language.language} 
                              name="language"
                              label="Language" 
                              inputType="select2" 
                              inputGridSm={9} 
                              mb={2} 
                              list={LANGUAGES} 
                              onChange={(event) => handleLangChange(event, index)}
                            />
                            <AuthInput 
                              value={language.level + index} 
                              name="level"
                              label="Level" 
                              inputType="select2" 
                              inputGridSm={3} 
                              mb={2} 
                              list={langLevelsArray} 
                              onChange={(event) => handleLangChange(event, index)}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px"
                      }}
                    >
                      <div
                        style={{ marginRight: "10px" }}
                        className="delete"
                        title="Delete Language"
                        onClick={handleDeleteLang}
                      >
                        -
                      </div>
                      <div
                        className="add"
                        title="Add Language"
                        onClick={handleAddLang}
                      >
                        +
                      </div>
                    </div>

                    {/* Visibility Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <div className='prev-page' onClick={() => {langForwardOrBackward('backward')}}>
                        <FaLongArrowAltLeft size='1rem' /> &nbsp;&nbsp;&nbsp;prev
                      </div>
                      <div style={{ width: "150px"}}>
                        <ButtonSubmitGreen type="button" onClick={() => {
                          langForwardOrBackward('forward')
                        }}>
                          Hobbies &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                      </div>
                    </div>
                  </div>

                  {/* INTERESTS */}
                  <div id="interests" className={`Segment ${interestFaded ? "Faded" : "Faded-in"}`}>
                    <h4>Interests/Hobbies</h4>
                    <Grid container>
                      <Grid container item xs={9}>
                        {interests.map((interest, index) => {
                          return (
                            <AuthInput
                              id={interest + index}
                              key={index}
                              value={interest}
                              label="Add an Interest"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={6}
                              mb={2}
                              required={true}
                              onChange={(event) => handleInterestChange(event, index)}
                            />
                          );
                        })}
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ marginRight: "10px" }}
                          className="delete"
                          title="Delete an Interest"
                          onClick={handleDeleteInterests}
                        >
                          -
                        </div>
                        <div
                          className="add"
                          title="Add an Interest"
                          onClick={handleAddInterests}
                        >
                          +
                        </div>
                      </Grid>
                    </Grid>

                    {/* Visibility Buttons */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "left",
                        marginBottom: "20px",
                      }}
                    >
                      <div className='prev-page' onClick={() => {interestsBackward('backward')}}>
                        <FaLongArrowAltLeft size='1rem' /> &nbsp;&nbsp;&nbsp;prev
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "right",
                      marginBottom: "20px",
                    }}
                  >
                    <div id="submit-button" style={{ width: "190px", display: "none" }}>
                      <ButtonSubmitGreen>
                          Build & Preview &nbsp;&nbsp;<IoSparklesSharp style={{color: "#F8E231", fontSize: "1.5rem"}} />
                      </ButtonSubmitGreen>
                    </div>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>
      </div>

      {loading && (
        <Modal
          header4={`Hello ${user.firstName}`}
          header3={progressStatus}
          progress={progressPercentage}
        />
      )}


      {isFirstTimeUserPopUp  && (
          <PlainModalOverlay>
            <h2>Welcome {basicInfo.firstName}!</h2>
            <p>Kindly fill out the following, and I'll get you started</p>
            <div style={{ width: "100%", marginBottom: "1rem" }}>
              <div className={resumeCss.DetachedLabels} style={{color: '#EE7B1C'}}>
                Country* : (will be used to connect you to jobs so choose a country with remote jobs if remote is your preference.) You can always change this in your profile.
              </div>
            </div>
            <AuthInput
              id={"basicInfo.country"}
              name={basicInfo.country}
              value={basicInfo.country}
              inputType="country-select"
              inputGridSm={12}
              inputGrid={3}
              mb={2}
              onChange={handleInputChange("country")}
            />
            <AuthInput
              country={basicInfo.country}
              id={"basicInfo.city"}
              name={basicInfo.city}
              value={basicInfo.city}
              inputType="state-select"
              inputGridSm={12}
              inputGrid={3}
              mb={2}
              onChange={handleInputChange("city")}
            />
            <div style={{ width: "100%" }}>
              <div className={resumeCss.DetachedLabels}>
                Date of Birth *
              </div>
            </div>
            <AuthInput
              id={"dobFirstUser"}
              value={dobFirstUser}
              placeholder="Date of Birth"
              inputType="date"
              inputGridSm={12}
              inputGrid={3}
              mb={2}
              required={true}
              onChange={event => handleDobFirstUserInputChange(event)}
            />

            <div style={{ width: "100%" }}>
              <div className={resumeCss.DetachedLabels}>
                Your Phone Number *
              </div>
            </div>
            <AuthInput
              id={"mobileFirstUser"}
              value={mobileFirstUser}
              label="Mobile"
              inputType="mobile"
              inputGridSm={12}
              inputGrid={4}
              mb={2}
              required={true}
              onChange={event => handleMobileFirstUserInputChange(event)}
            /> 
            <div style={{width: "100%", padding: "0 30%", marginTop: "2rem"}}>
              <ButtonSubmitGreen type="button" onClick={() => chengeFirstTimeUserStatus()}>
                Continue
              </ButtonSubmitGreen>  
            </div>        
          </PlainModalOverlay>
      )}

      {successfulAchievement && 
          <SuccessFailureModal 
              success={successfulAchievement} 
              successText="Congratulations, You have been rewarded!"
              bodyText="You received Bubble Points! keep using Bubble Ai to reach your target and EARN an extra week/month of access, Good luck!"
              buttonText="Claim Points Reward"
              fullName={user.firstName} 
          /> 
      }

      <ChatwootWidget />
    </div>
  );
};

export default memo(CustomizeResume);


const styles = {
  list: {
      fontSize: '.85rem',
      lineHeight: '1.5',
      padding: '0 30px',
      width: '100%',
  },
  noResumes: {
      boxSizing: 'border-box',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%'
  },
}
