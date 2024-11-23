import React, { useEffect, useState, memo, useRef } from "react";
import ReactPixel from 'react-facebook-pixel';
import resumeCss from "./Resume.module.css";
import depoCss from "../Depositions/Depositions.module.css"
import { useNavigate } from "react-router-dom";
import AuthInput from "../UI/Input/AuthInputs";
import { Grid } from "@mui/material";
import { errorAnimation, checkAuthenticatedUser, checkEmptyStringsInObj, checkEmptyStringsInObjNoExempt, checkEmptyStrings } from "../../utils/client-functions";
import { useSelector, useDispatch } from "react-redux";
import { 
  setUser, 
  setResume, 
  setFetching, 
  setUserResumesAll, 
  setError, 
  setResumeSubDuration,
  setIsResumeSubbed } from "../../redux/states";
import { ButtonSubmitGreen, ButtonOutlineGreenWithDiffStyle } from "../UI/Buttons/Buttons";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from "axios";
import { Modal, PlainModalOverlay } from "../UI/Modal/Modal";
import AuthSideMenu from "../UI/AuthSideMenu/AuthSideMenu";
import AuthHeader from "../UI/AuthHeader/AuthHeader";
import { useConfirm } from "material-ui-confirm";
import Alert from '@mui/material/Alert';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import ChatwootWidget from "../../utils/chatwoot";



const CustomizeResume = () => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { user, userResumesAll, error, successMini, isResumeSubbed } = useSelector((state) => state.stateData);
  const navigate = useNavigate();
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
  const [interestFaded, setInterestFaded] = useState(true)
  const [countryid, setCountryid] = useState(0);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  // const screenWidth = window.innerWidth


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
    dob: "",
    mobile: "",
    jobPosition: "",
    street: "",
    city: "",
    country: "",
    profSummary: "",
  });

  const advancedMatching = { 
    em: user.email
  }


  useEffect(() => {
    window.scrollTo(0, 0);
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
          dob, 
          mobile,
          isFirstTimeUser, 
          jobPosition, 
          streetCity, 
          stateRegion, 
          country, 
          profSummary,
          resumeSubscriptions,
          resumes
        } = response?.data?.user

        setBasicInfo({
          firstName: firstName,
          lastName: lastName,
          email: email,
          dob: dob || "",
          mobile: mobile || "",
          jobPosition: jobTitle || jobPosition || "",
          street: streetCity || "",
          city: stateRegion || "",
          country: country || "",
          profSummary: profSummary || "",
        });
        // console.log(response.data.user);
        dispatch(setUserResumesAll(resumes))
        setIsFirstTimeUserPopUp(isFirstTimeUser)
        setSubDuration(resumeSubscriptions?.duration)
        dispatch(setIsResumeSubbed(resumeSubscriptions?.subscribed))
        dispatch(setResumeSubDuration(resumeSubscriptions?.duration))
        dispatch(setUser(response.data.user));
        dispatch(setFetching(false));

      } catch (error) {
        dispatch(setFetching(false));
        errorSetter("Reload page to fetch data")
      }
    };

    populateUser();

    if(description) {
      setAdditionalInfo(`The following is a full job description of the job i am applying for, optimize the resume to fit the job description; 
        making sure that keywords from the description appears strategically and professionally in the skills, professional 
        summary and work history of the resultant ATS friendly resume: ` + description)
    }
    localStorage?.removeItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXdescription")
    localStorage?.removeItem("ha76arf(**gu9jgkgg8a02bGAKgaigFrSlp08VcgxJG4xXtitle")

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
      mobile: mobileFirstUser
    }
    try {
      const response = await axios.post("/user/update-first-user", body, {
          headers: {
              "x-access-token": isAuth,
          },
      });
      if (response.status === 200) {
        setIsFirstTimeUserPopUp(false)
        const { dob, mobile } = response?.data; 
        setBasicInfo(prevState => ({ 
          ...prevState, 
          dob: dob, 
          mobile: mobile }))
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

  const handleFormSubmit = async (e) => {

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

  const handleInputChange = (prop) => (event) => {
    //if data is mobile number
    if (prop === "mobile") {
      return setBasicInfo({ ...basicInfo, [prop]: "+" + event });
    }
    if (prop === "country") {
      setCountryid(event.id)
      setBasicInfo({
        ...basicInfo,
        [prop]: event.name,
      });
      return
    }
    if (prop === "city") {
      setBasicInfo({
        ...basicInfo,
        [prop]: event.name,
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
    const { dob, mobile, jobPosition, street, city, country } = basicInfo
    if (dob === "") {
      errorSetter("Complete Date of Birth to continue");
      return;
    }
    if ( mobile === "") {
      errorSetter("Enter Mobile to continue");
      return;
    }
    if (jobPosition === "") {
      errorSetter("Enter Job Position to continue");
      return;
    }
    if (street === "") {
      errorSetter("Enter City/District to continue");
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

    switch (arg) {
      case "forward":
        //check if required fields are filled
        if (checkEmptyStringsInObjNoExempt(eduArray) === false ) {
          return errorSetter("Complete required fields in this section to continue");    
        }
        setEduFaded(true)
        setWorkFaded(false)
        break;
      case "backward":
        setEduFaded(true)
        setBasicFaded(false);
        break;
    
      default:
        
        break;
    }
  }

  const workExpForwardOrBackward = (arg) => {
    switch (arg) {
      case "forward":
        //check if required fields are filled, exempting some keys
        if (checkEmptyStringsInObj(workExpArray, "jobDesc", "workLink", "dateTo", "currently") === false ) {
          errorSetter("Complete required fields in this section to continue");
          return;
        }
        setWorkFaded(true)
        setSkillFaded(false)
        break;
      case "backward":
        setWorkFaded(true)
        setEduFaded(false)
        break;
    
      default:
        break;
    }
  }

  const skillsForwardOrBackward = (arg) => {

    switch (arg) {
      case "forward":
        //check if required fields are filled, exempting two keys
        if (checkEmptyStrings(skills) === false ) {
          errorSetter("Complete required fields in this section to continue");
          return;
        }
        setSkillFaded(true)
        setCertFaded(false)
        break;
      case "backward":
        setSkillFaded(true)
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
        setInterestFaded(false)
        document.getElementById("submit-button").style.display = ""
        break;
      case "backward":
        setCertFaded(false)
        break;
    
      default:
        break;
    }
  }

  const interestsBackward = (arg) => {
    setInterestFaded(true)
    switch (arg) {
      case "backward":
        setPubFaded(false)
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
      errorSetter("No file detected")
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
          <h2>Click to Select</h2>
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

        <div className="BodyWrapper" onClick={() => setAuthMenuOpen(false)}>
          <div className="BuildNavigator">
            <div className="ActiveNav">
              <span>1</span>Customise
            </div>
            <div>
              <span>2</span>Preview
            </div>
            <div>
              <span>3</span>Download
            </div>
          </div>

          <form method="post" onSubmit={handleFormSubmit}>
            <div className="error">{error}</div>
            <div className='explanation-points'>
                <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">The + and - buttons are to add and delete applicable input fields or sections</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">All fields with * are required</Alert>
                <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Have questions? <a className="link" target="_blank" href="/chat" style={{textDecoration: "underline"}}>Ask me anything!</a></Alert>
            </div>


            {/* DRAG N DROP TO REWRITE RESUME */}
            <div className={`Segment ${basicFaded ? 'Faded' : 'Faded-in'}`}>
              <h4>Optimize an old CV</h4>

              {renderDragAndDrop()}

              <Grid container mt={5}>
                <AuthInput
                  id={basicInfo.jobPosition}
                  value={basicInfo.jobPosition}
                  label="Job Position to optimise CV to"
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={12}
                  mb={2}
                  required={true}
                  onChange={handleInputChange("jobPosition")}
                />
                <div style={{ width: "100%", marginBottom: "15px", textAlign: "center" }}>
                  <div className={resumeCss.DetachedLabels}>
                    Location (used for job search & on CV)
                  </div>
                </div>
                <AuthInput
                  id={basicInfo.street}
                  value={basicInfo.street}
                  label="City/District"
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  onChange={handleInputChange("street")}
                />
                <AuthInput
                  id={basicInfo.country}
                  value={basicInfo.country}
                  placeholder={basicInfo.country ? basicInfo.country : "Country"}
                  inputType="country-select"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  onChange={handleInputChange("country")}
                />
                <AuthInput
                  id={basicInfo.city}
                  value={basicInfo.city}
                  countryid={countryid}
                  placeholder={basicInfo.city ? basicInfo.city : "State/Region"}
                  inputType="state-select"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  onChange={handleInputChange("city")}
                />
                <AuthInput
                  id={additionalInfo}
                  name="additionalInfo"
                  value={additionalInfo}
                  placeholder="[Optional] Tell me what to specifically add or remove or you can paste job requirements. E.g Certificate of Excellence, Awarded by Bubble Ai Foundation on 20th July 2024 OR Delete work history with Blanket Designs OR [Paste job description here] "
                  multiline={true}
                  rows={3}
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






            <div style={{textAlign: "center"}} className={`${basicFaded ? "Faded" : "Faded-in"}`}>
              <p></p>
              <h1>OR</h1>
              <p></p>
            </div>





            
            
            {/* BASIC INFO */}
            <div id="basic-info" className={`Segment ${basicFaded ? "Faded" : "Faded-in"}`}>
              <h4>Generate CV from scratch</h4>
              <Grid container>
                <AuthInput
                  id={basicInfo.firstName}
                  value={basicInfo.firstName}
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  disabled={subDuration !== "Per Month" && subDuration !== "Per Use"}
                  onChange={handleInputChange("firstName")}
                />
                <AuthInput
                  id={basicInfo.lastName}
                  value={basicInfo.lastName}
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  disabled={subDuration !== "Per Month" && subDuration !== "Per Use"}
                  onChange={handleInputChange("lastName")}
                />
                <AuthInput
                  id={basicInfo.email}
                  value={basicInfo.email}
                  inputType="email"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={0}
                  required={true}
                  disabled={false}
                  onChange={handleInputChange("email")}
                />
                <div style={{ width: "100%" }}>
                  <div className={resumeCss.DetachedLabels}>
                    Date of Birth * (Might not be visible on resume)
                  </div>
                </div>
                <AuthInput
                  id={basicInfo.dob}
                  value={basicInfo.dob}
                  placeholder="Date of Birth"
                  inputType="date"
                  inputGridSm={12}
                  inputGrid={3}
                  mb={2}
                  required={true}
                  onChange={handleInputChange("dob")}
                />
                <AuthInput
                  id={basicInfo.mobile}
                  value={basicInfo.mobile}
                  label="Mobile"
                  inputType="mobile"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  onChange={handleInputChange("mobile")}
                />
                <AuthInput
                  id={basicInfo.jobPosition}
                  value={basicInfo.jobPosition}
                  label="Job Position"
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={5}
                  mb={2}
                  required={true}
                  onChange={handleInputChange("jobPosition")}
                />
                <div style={{ width: "100%", marginBottom: '15px', textAlign: "center"  }}>
                  <div className={resumeCss.DetachedLabels}>
                    Location (for job search & on CV)
                  </div>
                </div>
                <AuthInput
                  id={basicInfo.street}
                  value={basicInfo.street}
                  label="City/District"
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  onChange={handleInputChange("street")}
                />
                <AuthInput
                  id={basicInfo.country}
                  value={basicInfo.country}
                  placeholder={basicInfo.country ? basicInfo.country : "Country"}
                  inputType="country-select"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  onChange={handleInputChange("country")}
                />
                <AuthInput
                  id={basicInfo.city}
                  value={basicInfo.city}
                  countryid={countryid}
                  placeholder={basicInfo.city ? basicInfo.city : "State/Region"}
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
                      id={info}
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
                        id={info.degree}
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
                        id={info.date}
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
                    <FaLongArrowAltLeft />
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
                        id={info.position}
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
                        id={info.industry}
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
                        id={info.workLink}
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
                            id={info.DateFrom}
                            value={info.DateFrom}
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
                            id={info.dateTo}
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
                          id={info.currently}
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
                    <FaLongArrowAltLeft />
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
                        id={skill}
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
                    <FaLongArrowAltLeft />
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
                          id={info.org}
                          value={info.org}
                          label="Awarding Organization"
                          inputGridSm={12}
                          inputType="text"
                          mb={2}
                          onChange={(event) => handleAwardChange(event, index)}
                        />
                        <AuthInput
                          name="award"
                          id={info.award}
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
                          id={info.date}
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
                    <FaLongArrowAltLeft />
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
                          id={info.title}
                          value={info.title}
                          label="Title"
                          inputGridSm={12}
                          inputType="text"
                          mb={2}
                          onChange={(event) => handlePubChange(event, index)}
                        />
                        <AuthInput
                          name="source"
                          id={info.source}
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
                          value={info.date}
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
                    <FaLongArrowAltLeft />
                </div>
                <div style={{ width: "150px"}}>
                  <ButtonSubmitGreen type="button" onClick={() => {
                    pubForwardOrBackward('forward')
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
                        id={interest}
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
                    <FaLongArrowAltLeft />
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
          </form>
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
            <h2>Hey {basicInfo.firstName}, I am enthused to have you here!</h2>
            <p>Kindly fill out the following information for regulatory purposes, and then I'll get you started</p>
            <div style={{ width: "100%" }}>
              <div className={resumeCss.DetachedLabels}>
                Date of Birth *
              </div>
            </div>
            <AuthInput
              id={dobFirstUser}
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
              id={mobileFirstUser}
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

      <ChatwootWidget />
    </div>
  );
};

export default memo(CustomizeResume);
