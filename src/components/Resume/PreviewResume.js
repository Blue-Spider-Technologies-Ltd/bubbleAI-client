import React, { useEffect, useState } from "react";
import resumeCss from "./Resume.module.css";
import { useNavigate } from "react-router-dom";
import AuthInput from "../UI/Input/AuthInputs";
import { Grid, Rating } from "@mui/material";
import { errorAnimation } from "../../utils/client-functions";
import { useSelector, useDispatch } from "react-redux";
import { setResume, setFetching, setError, setIsResumeSubbed, setResumeServicesNumbers } from "../../redux/states";
import { ButtonSubmitGreen, ButtonThin, ButtonTransparentSquare } from "../UI/Buttons/Buttons";
import Alert from '@mui/material/Alert';
import { IoIosUnlock } from "react-icons/io";
import { TfiNewWindow } from "react-icons/tfi";
import { GiGraduateCap } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { Modal, Overlay } from "../UI/Modal/Modal";
import ResumePricing from "../Pricing/ResumePricing"
import { CheckoutSummaryModal } from "../UI/Modal/Modal";
import ProtectedContent from "../UI/ProtectedContent/ProtectedContent ";
// import AuthHeader from "../UI/AuthHeader/AuthHeader";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { LANGUAGES } from '../../utils/languages';

const langLevelsArray = [
  {name: '1'},
  {name: '2'},
  {name: '3'},
  {name: '4'},
  {name: '5'}
]
const screenWidth = window.innerWidth



const styles = {
  reorderBtn: {
    height: '20px',
    border: '20px',
    borderRadius: '20px',
  },
  reorderDltBtn: {
    height: '20px',
    border: '20px',
    borderRadius: '20px',
    color: 'rgb(169, 28, 28)'
  },
  reorderGroup: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: '30%',
    height: '20px',
    margin: '30px 0 0',
    marginLeft: 'auto',
  }
}


const PreviewResume = () => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { user, resume, error, showCheckout, isResumeSubbed, resumeServicesNumbers } = useSelector((state) => state.stateData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const errorSetter = (string) => {
    dispatch(setError(string))
    errorAnimation()
  }

  const isAuth = localStorage?.getItem("token");
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
  const [linkInfo, setLinkInfo] = useState([]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [eduArray, setEduArray] = useState([]);
  const [workExpArray, setWorkExpArray] = useState([]);
  const [awardArray, setAwardArray] = useState([]);
  const [publications, setPublications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [seniority, setSeniority] = useState({ level: 0 });
  const [isSubscribed, setIsSubscribed] = useState(true);



  useEffect(() => {
    dispatch(setFetching(true));
    const now = Date.now();
    const authUser = jwtDecode(isAuth);
    const isResumePresent = localStorage?.getItem(
      "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@"
    );

    if (isAuth && now < authUser.expiration) {
      const localResume = JSON.parse(isResumePresent);

      if (!localResume) {
        localStorage?.removeItem(
          "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@"
        );
        navigate("/user/dashboard/resume?customize");
      } else {
        // if resume is found in local storage
        dispatch(setResume(localResume.resumeData));
      }
    } else {
      localStorage?.removeItem("token");
      navigate("/popin?resume");
    }
  }, [isAuth, navigate, dispatch]);

  useEffect(() => {
    // when user coming from customize page
    setBasicInfo(resume.basicInfo && resume.basicInfo);
    setLinkInfo(resume.linkInfo && resume.linkInfo);
    setSkills(resume.skills && resume.skills);
    setInterests(resume.interests && resume.interests);
    setEduArray(resume.eduArray && resume.eduArray);
    setWorkExpArray(resume.workExpArray && resume.workExpArray);
    setAwardArray(resume.awardArray && resume.awardArray);
    setPublications(resume.publications && resume.publications);
    setLanguages(resume.languages && resume.languages);
    setSeniority(resume.seniority && resume.seniority);
    dispatch(setFetching(false));
  }, [dispatch, resume]);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getSub = () => {
      axios.get('/user/get-subscription', {
        headers: { "x-access-token": isAuth },
      })
      .then((response) => {
        dispatch(setIsResumeSubbed(response.data?.resumeSubscriptions));
        dispatch(setResumeServicesNumbers(response.data?.resumeNumbers));
      })
      .catch((error) => {
        dispatch(setIsResumeSubbed(false));
      });
    };

    getSub()
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      const screenWidth = window.innerWidth;
      const scrollMeter = screenWidth < 900 ? 0.7 : 0.5;
  
      if (scrollPosition > (scrollMeter * viewHeight)) {
        if (!isResumeSubbed) {
          errorSetter("Looks like you are not subscribed. Choose a plan to complete your CV");
          setIsSubscribed(false);
        } 
        
        // Check if user exists before accessing properties
        else if (user && !user.isFirstFreeUsed && resumeServicesNumbers?.resumeCreated >= 3) {
          errorSetter("You have reached the maximum number of free tier resumes. Please choose a plan to create more.");
          setIsSubscribed(false);
        }
        window.removeEventListener('scroll', handleScroll);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isResumeSubbed, user, resumeServicesNumbers?.resumeCreated, errorSetter, setIsSubscribed]);

  

  const handleDeleteLinks = (index) => {
    confirm({ title: `Proceed to delete link? ${linkInfo[index]}` })
      .then(() => {
        const prevLinks = [...linkInfo];
        prevLinks.splice(index, 1);
        setLinkInfo(prevLinks);
      })
      .catch(() => errorSetter("Not Deleted"));
  };

  const handleDeleteSkills = (index) => {
    confirm({ title: `Proceed to delete skill? ${skills[index]}` })
      .then(() => {
        const prevSkills = [...skills];
        prevSkills.splice(index, 1);
        setSkills(prevSkills);
      })
      .catch(() => errorSetter("Not Deleted"));
  };

  const handleDeleteInterests = (index) => {
    confirm({ title: `Proceed to delete interest? ${interests[index]}` })
      .then(() => {
        const prevInterests = [...interests];
        prevInterests.splice(index, 1);
        setInterests(prevInterests);
      })
      .catch(() => errorSetter("Not Deleted"));
  };

  const handleEduExpChange = (event, index) => {
    const updatedEduArray = eduArray.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      }
      return item;
    });
    setEduArray(updatedEduArray);
  };
  const deleteEduItem = (index) => {
    confirm({ title: `Delete Education item?` })
    .then(() => {
      setEduArray((prevItems) => prevItems.filter((_, i) => i !== index));
    })
    .catch(() => errorSetter("Not Deleted"));
  };
  const moveEduUp = (index) => {
    if (index > 0) {
      setEduArray((prevItems) => {
        const newItems = [...prevItems];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(index - 1, 0, movedItem);
        return newItems;
      });
    }
  };
  const moveEduDwn = (index) => {
    if (index < eduArray.length - 1) {
      setEduArray((prevItems) => {
        const newItems = [...prevItems];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(index + 1, 0, movedItem);
        return newItems;
      });
    }
  };


  //     /////WORK EXP HANDLERS
  const handleWorkExpChange = (event, index) => {
    const updatedWorkExpArray = workExpArray.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      }
      return item;
    });
  
    setWorkExpArray(updatedWorkExpArray);
  };
  const deleteWorkExp = (index) => {
    confirm({ title: `Delete Experience item?` })
    .then(() => {
      setWorkExpArray((prevItems) => prevItems.filter((_, i) => i !== index));
    })
    .catch(() => errorSetter("Not Deleted"));
  };
  const moveExpUp = (index) => {
    if (index > 0) {
      setWorkExpArray((prevItems) => {
        const newItems = [...prevItems];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(index - 1, 0, movedItem);
        return newItems;
      });
    }
  };
  const moveExpDwn = (index) => {
    if (index < workExpArray.length - 1) {
      setWorkExpArray((prevItems) => {
        const newItems = [...prevItems];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(index + 1, 0, movedItem);
        return newItems;
      });
    }
  };

  const handleAwardChange = (event, index) => {
    const updatedAwardArray = awardArray.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      }
      return item;
    });
    setAwardArray(updatedAwardArray)
  };
  const deleteAward = (index) => {
    confirm({ title: `Delete Award item?` })
    .then(() => {
      setAwardArray((prevItems) => prevItems.filter((_, i) => i !== index));
    })
    .catch(() => errorSetter("Not Deleted"));
  };
  const moveAwardUp = (index) => {
    if (index > 0) {
      setAwardArray((prevItems) => {
        const newItems = [...prevItems];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(index - 1, 0, movedItem);
        return newItems;
      });
    }
  };
  const moveAwardDwn = (index) => {
    if (index < awardArray.length - 1) {
      setAwardArray((prevItems) => {
        const newItems = [...prevItems];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(index + 1, 0, movedItem);
        return newItems;
      });
    }
  };


  const handlePubChange = (event, index) => {
    const updatedPubs = publications.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      }
      return item;
    });
    setPublications(updatedPubs)
  };
  const deletePub = (index) => {
    confirm({ title: `Delete Publication item?` })
    .then(() => {
      setPublications((prevItems) => prevItems.filter((_, i) => i !== index));
    })
    .catch(() => errorSetter("Not Deleted"));
  };
  const movePubUp = (index) => {
    if (index > 0) {
      setPublications((prevItems) => {
        const newItems = [...prevItems];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(index - 1, 0, movedItem);
        return newItems;
      });
    }
  };
  const movePubDwn = (index) => {
    if (index < publications.length - 1) {
      setPublications((prevItems) => {
        const newItems = [...prevItems];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(index + 1, 0, movedItem);
        return newItems;
      });
    }
  };

  const handleLangChange = (event, index) => {
    const updatedLang = languages.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      }
      return item;
    });
    setLanguages(updatedLang)
  };
  const deleteLang = (index) => {
    confirm({ title: `Delete Language?` })
    .then(() => {
      setLanguages((prevItems) => prevItems.filter((_, i) => i !== index));
    })
    .catch(() => errorSetter("Not Deleted"));
  };

  const handleUnlockEdit = () => {
    window.open('/pricing')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resumeData = {
      basicInfo: basicInfo, //Object
      linkInfo: linkInfo, //Array
      skills: skills, //Array
      eduArray: eduArray, //Array
      workExpArray: workExpArray, //Array
      awardArray: awardArray, //Array
      interests: interests, //Array
      publications: publications, //Array
      languages: languages, //Array
      seniority: seniority, //Object
    };

    try {
      dispatch(setResume(resumeData));
      //save a copy for later incase user doesn't finish now
      const now = new Date().getTime();
      let resumeObjforLocal = {
        resumeData: resumeData,
        expiration: now + 24 * 60 * 60 * 1000, //current time + 24hr in milliseconds
      };
      localStorage.setItem(
        "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@",
        JSON.stringify(resumeObjforLocal)
      );
      setLoading(false);
      navigate("/user/dashboard/resume?download");
    } catch (error) {
      errorSetter("Try again");
    }
  };

  // const toggleResumes = () => {
  //   setAuthMenuOpen(!authMenuOpen);
  // };

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




  return (
    <ProtectedContent>
      <div className="auth-container">
        {/* For SIDE MENU */}
        {/* <AuthSideMenu
          opened={authMenuOpen}
          seacrhBarPlaceholder="Search by resume name"
          hidden={!authMenuOpen}
        /> */}

        <div style={{ width: "100%", padding: "0" }}>
          <div className="auth-bg-blob"></div>
        </div>

        <div className="auth-container-inner">
          {/* for TOP MENU */}
          {/* <AuthHeader
            authMenuOpen={authMenuOpen}
            onClick={toggleResumes}
            headerText="Preview Resume"
          /> */}

          <div className="BodyWrapper">
            <div className="BuildNavigator">
              <div onClick={() => navigate("/user/dashboard/resume")}>
                <span>1</span>Customise
              </div>
              <div className="ActiveNav">
                <span>2</span>Preview
              </div>
              <div onClick={() => navigate("/user/dashboard/resume?download")}>
                <span>3</span>Download
              </div>
            </div>
            <form method="post" onSubmit={handleFormSubmit}>
              <div className="error">{error}</div>
              <div className='explanation-points'>
                  <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">On the job description field, make sure each point is separated by a semi colon (<b>;</b>) (if you decide to edit it) to enable proper formatting on the download page.</Alert>
                  <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Always read the generated resume carefully and make edits to imprint your personal touch.</Alert>
              </div>

              {seniority && (
                <div className="Segment">
                  <h4>Your Resume Level</h4>
                  <Alert severity="info">This segment will not be displayed on your final resume. It serves only as a mini guide to help grow your career quickly.</Alert>
                    
                    
                      <Grid container>  

                        <Grid item xs={12} md={4} p={2} >
                          <div><strong>Level:</strong> </div> <div><Rating name="read-only" value={seniority.level} size="large" precision={1} readOnly /></div>   
                        </Grid>

                        <Grid item xs={12} md={4} p={2} >
                          <div><strong>Description:</strong> </div> 
                          <div style={{fontSize: ".8rem"}}>Based on my analysis of your certifications, work experience and education, your resume level is <strong>{seniority?.description}</strong>. This can be further <strong>improved on by</strong> gaining more certifications, courses, projects or volunteering for experience.</div>   
                        </Grid>

                        <Grid item xs={12} md={4} p={2} >
                          <div><strong>Recommended Certification/Course:</strong> </div> 
                          <div style={{fontSize: ".8rem", margin: "10px auto", display: "flex", alignItems: "center"}}>
                            <div>
                              <GiGraduateCap style={{color: "#EE7B1C", fontSize: "1.3rem"}} />
                            </div> &nbsp; &nbsp; 
                            {(!isResumeSubbed || !user?.isFirstFreeUsed) ? (
                              <ButtonThin 
                                onClick={handleUnlockEdit} 
                                width={'150px'} 
                                height='20px' 
                                color='#EE7B1C' 
                                border="2px solid #EE7B1C"
                              >
                                Unlock Insights &nbsp; &nbsp;<IoIosUnlock />
                              </ButtonThin>
                            ) : (
                              <div><strong>{seniority?.courseRecommendation}</strong></div>
                            )}
                            
                          </div>   

                          {/* <ButtonThin onClick={() => {window.open(seniority?.courseLink, '_blank', 'noopener,noreferrer')}} width={'120px'} height='20px' color='#EE7B1C' border="2px solid #EE7B1C">
                            View course &nbsp; &nbsp;<TfiNewWindow />
                          </ButtonThin> */}
                        </Grid>
                      </Grid>
                </div>
              )}
              <div className="Segment">
                <Grid container>
                  <Grid item md={2} >

                  </Grid>
                  <Grid item xs={12} md={8}>
                    <h4>Basic Info</h4>
                  </Grid>
                  {!isResumeSubbed && (
                    <Grid item md={2} xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: screenWidth < 900 && '10px'}}>
                      <ButtonThin onClick={handleUnlockEdit} width={'120px'} height='20px' color='#EE7B1C'>
                        unlock editing <IoIosUnlock />
                      </ButtonThin>
                    </Grid>
                  )}
                </Grid>

                <Grid container>
                  <AuthInput
                    id={"basicInfo?.firstName"}
                    value={basicInfo?.firstName}
                    inputType="text"
                    inputGridSm={12}
                    inputGrid={4}
                    mb={2}
                    required={true}
                    disabled={!isResumeSubbed}
                    onChange={handleInputChange("firstName")}
                  />
                  <AuthInput
                    id={"basicInfo?.lastName"}
                    value={basicInfo?.lastName}
                    inputType="text"
                    inputGridSm={12}
                    inputGrid={4}
                    mb={2}
                    required={true}
                    disabled={!isResumeSubbed}
                    onChange={handleInputChange("lastName")}
                  />
                  <AuthInput
                    id={"basicInfo?.email"}
                    value={basicInfo?.email}
                    inputType="email"
                    inputGridSm={12}
                    inputGrid={4}
                    mb={0}
                    required={true}
                    disabled={!isResumeSubbed}
                    onChange={handleInputChange("email")}
                  />
                  <AuthInput
                    id={"basicInfo?.mobile"}
                    value={basicInfo?.mobile}
                    label="Mobile"
                    inputType="mobile"
                    inputGridSm={12}
                    inputGrid={5}
                    mb={2}
                    required={true}
                    disabled={!isResumeSubbed}
                    onChange={handleInputChange("mobile")}
                  />
                  <AuthInput
                    id={"basicInfo?.jobPosition"}
                    value={basicInfo?.jobPosition}
                    label="Job Position (NOT editable)"
                    inputType="text"
                    inputGridSm={12}
                    inputGrid={7}
                    mb={2}
                    required={true}
                    disabled={true}
                  />
                  <AuthInput
                    id={"basicInfo?.country"}
                    name={basicInfo?.country}
                    value={basicInfo?.country}
                    inputType="country-select"
                    inputGridSm={12}
                    inputGrid={6}
                    mb={2}
                    disabled={!isResumeSubbed}
                    onChange={handleInputChange("country")}
                  />
                  <AuthInput
                    country={basicInfo.country}
                    id={"basicInfo?.city"}
                    name={basicInfo?.city}
                    value={basicInfo?.city}
                    inputType="state-select"
                    inputGridSm={12}
                    inputGrid={6}
                    mb={2}
                    disabled={!isResumeSubbed}
                    onChange={handleInputChange("city")}
                  />


                  <div style={{textAlign: 'center', width: '100%'}}>
                    <h4>Ai Generated Prof. Summary</h4>
                  </div>
                  <AuthInput
                    id={"basicInfo?.profSummary"}
                    value={basicInfo?.profSummary}
                    label="AI Generated Prof. Summary"
                    multiline={true}
                    rows={2}
                    inputGridSm={12}
                    mb={2}
                    onChange={handleInputChange("profSummary")}
                    disabled={!isResumeSubbed}
                  />
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {linkInfo?.length > 0 && (
                      <div>
                        <div className={resumeCss.DetachedLabels}>Your Links</div>

                        <div
                          style={{
                            padding: "5px",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {linkInfo?.map((link, index) => {
                            return (
                              <span key={index} className="array-item">
                                {link}
                                <span
                                  className="itemDelete"
                                  title="Delete Link"
                                  onClick={() => {
                                    handleDeleteLinks(index);
                                  }}
                                >
                                  X
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>
              {skills?.length > 0 && (
                <div className="Segment">
                  <h4>Relevant Skills</h4>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{
                        padding: "5px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {skills?.map((skill, index) => {
                        return (
                          <span key={index} className="array-item">
                            {skill}
                            <span
                              className="itemDelete"
                              title="Delete Skill"
                              onClick={() => {
                                handleDeleteSkills(index);
                              }}
                            >
                              X
                            </span>
                          </span>
                        );
                      })}
                    </Grid>
                  </Grid>
                </div>
              )}
              {eduArray ? (
                <div className="Segment">
                  
                  <Grid container>
                    <Grid item md={2} >

                    </Grid>
                    <Grid item xs={12} md={8}>
                      <h4>Education Info</h4>
                    </Grid>
                    {!isResumeSubbed && (
                      <Grid item md={2} xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: screenWidth < 900 && '10px'}}>
                        <ButtonThin onClick={handleUnlockEdit} width={'120px'} height='20px' color='#EE7B1C'>
                          unlock editing <IoIosUnlock />
                        </ButtonThin>
                      </Grid>
                    )}
                  </Grid>

                  <div>
                    {eduArray?.map((info, index) => {
                      return (
                        <Grid container key={index} className="segment">

                          <Grid container xs={12}>
                            <AuthInput
                              id={"info.institution" + index}
                              name="institution"
                              value={info.institution}
                              label="Name of Institution"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={4}
                              mb={2}
                              required={true}
                              disabled={!isResumeSubbed}
                              onChange={(event) => handleEduExpChange(event, index)}
                            />
                            <AuthInput
                              name="degree"
                              id={"info.degree" + index}
                              value={info.degree}
                              label="Degree Obtained"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={4}
                              mb={2}
                              required={true}
                              disabled={!isResumeSubbed}
                              onChange={(event) => handleEduExpChange(event, index)}
                            />
                            <label className={resumeCss.DetachedLabels} mr={4}>
                              Graduation Date *
                            </label>
                            <AuthInput
                              id={"date" + index}
                              name="date"
                              value={info.date}
                              placeholder="Graduation Date"
                              inputType="date"
                              inputGridSm={8}
                              inputGrid={2}
                              required={true}
                              disabled={!isResumeSubbed}
                              onChange={(event) => handleEduExpChange(event, index)}
                            />
                          </Grid>
                          
                        {eduArray?.length > 1 && (
                          <Grid
                            item
                            xs={3}
                            sx={styles.reorderGroup}
                          >
                            <ButtonTransparentSquare 
                              style={styles.reorderDltBtn}
                              title="delete item"
                              type='button'
                              onClick={() => deleteEduItem(index)}
                            >
                              <MdDeleteForever />
                            </ButtonTransparentSquare>

                            <ButtonTransparentSquare 
                              style={styles.reorderBtn}
                              title="move up"
                              type='button'
                              onClick={() => moveEduUp(index)}
                            >
                              <FaLongArrowAltUp /> 
                            </ButtonTransparentSquare>

                            <ButtonTransparentSquare 
                              style={styles.reorderBtn}
                              title="move down"
                              type='button'
                              onClick={() => moveEduDwn(index)}
                            >
                              <FaLongArrowAltDown /> 
                            </ButtonTransparentSquare>
                          </Grid>
                        )}
                        </Grid>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {workExpArray && (
                <div className="Segment">
                  <Grid container>
                    <Grid item md={2} >

                    </Grid>
                    <Grid item xs={12} md={8}>
                      <h4>Work & Volunteering Experience</h4>
                    </Grid>
                    {!isResumeSubbed && (
                      <Grid item md={2} xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: screenWidth < 900 && '10px'}}>
                        <ButtonThin onClick={handleUnlockEdit} width={'120px'} height='20px' color='#EE7B1C'>
                          unlock editing <IoIosUnlock />
                        </ButtonThin>
                      </Grid>
                    )}
                  </Grid>                  
                  <div>
                    {workExpArray?.map((info, index) => {
                      return (
                        <Grid container className="segment" key={index}>
                      
                          <Grid container xs={12}>
                            <AuthInput
                              name="company"
                              id={info.company + index}
                              value={info.company}
                              label="Company/Org. Name"
                              inputType="text"
                              inputGridSm={12}
                              inputGrid={3}
                              mb={2}
                              required={true}
                              onChange={(event) =>
                                handleWorkExpChange(event, index)
                              }
                              disabled={!isResumeSubbed}
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
                              onChange={(event) =>
                                handleWorkExpChange(event, index)
                              }
                              disabled={!isResumeSubbed}
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
                              onChange={(event) =>
                                handleWorkExpChange(event, index)
                              }
                              disabled={!isResumeSubbed}
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
                              onChange={(event) =>
                                handleWorkExpChange(event, index)
                              }
                              disabled={!isResumeSubbed}
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
                                  id={"info.dateFrom" + index}
                                  value={info.dateFrom}
                                  placeholder="Start Date"
                                  inputType="date"
                                  inputGridSm={12}
                                  inputGrid={12}
                                  required={true}
                                  onChange={(event) =>
                                    handleWorkExpChange(event, index)
                                  }
                                  disabled={!isResumeSubbed}
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
                                  id={"info.dateTo" + index}
                                  value={info.dateTo}
                                  placeholder="End Date"
                                  inputType="date"
                                  inputGridSm={12}
                                  inputGrid={12}
                                  required={true}
                                  onChange={(event) =>
                                    handleWorkExpChange(event, index)
                                  }
                                  disabled={info.currently}
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
                                disabled={true}
                              />
                            </div>

                            <div style={{textAlign: 'center', width: '100%'}}>
                              <h4>Ai Generated Job Description</h4>
                            </div>
                            <AuthInput
                              name="jobDesc"
                              label="Job Description"
                              id={info.jobDesc}
                              value={info.jobDesc}
                              multiline={true}
                              rows={2}
                              inputGridSm={12}
                              onChange={(event) =>
                                handleWorkExpChange(event, index)
                              }
                              disabled={!isResumeSubbed}
                            />
                          </Grid>

                          {workExpArray?.length > 1 && (
                            <Grid
                              item
                              xs={3}
                              sx={styles.reorderGroup}
                            >
                              <ButtonTransparentSquare 
                                style={styles.reorderDltBtn}
                                title="delete item"
                                type='button'
                                onClick={() => deleteWorkExp(index)}
                              >
                                <MdDeleteForever />
                              </ButtonTransparentSquare>

                              <ButtonTransparentSquare 
                                style={styles.reorderBtn}
                                title="move up"
                                type='button'
                                onClick={() => moveExpUp(index)}
                              >
                                <FaLongArrowAltUp /> 
                              </ButtonTransparentSquare>

                              <ButtonTransparentSquare 
                                style={styles.reorderBtn}
                                title="move down"
                                type='button'
                                onClick={() => moveExpDwn(index)}
                              >
                                <FaLongArrowAltDown /> 
                              </ButtonTransparentSquare>
                            </Grid>
                          )}
                        </Grid>
                      );
                    })}
                  </div>
                </div>
              )}

              {awardArray.length > 0 && (
                <div className="Segment">
                  <Grid container>
                    <Grid item md={2} >

                    </Grid>
                    <Grid item xs={12} md={8}>
                      <h4>Awards & Accomplishments</h4>
                    </Grid>
                    {!isResumeSubbed && (
                      <Grid item md={2} xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: screenWidth < 900 && '10px'}}>
                        <ButtonThin onClick={handleUnlockEdit} width={'120px'} height='20px' color='#EE7B1C'>
                          unlock editing <IoIosUnlock />
                        </ButtonThin>
                      </Grid>
                    )}
                  </Grid>
                  <div>
                    <Grid
                      container
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      {awardArray?.map((info, index) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={5}
                            mb={2}
                            className="segment"
                            key={index}
                          >
                            <Grid item xs={12}>
                              <AuthInput
                                name="org"
                                id={info.org + index}
                                value={info.org}
                                label="Awarding Organization"
                                inputGridSm={12}
                                inputType="text"
                                mb={2}
                                disabled={!isResumeSubbed}
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
                                disabled={!isResumeSubbed}
                                onChange={(event) => handleAwardChange(event, index)}
                              />
                              <label className={resumeCss.DetachedLabels}>
                                Date Awarded
                              </label>
                              <AuthInput
                                name="date"
                                id={"info.dateakanla" + index}
                                value={info.date}
                                placeholder="Date Awarded"
                                inputGridSm={12}
                                inputType="date"
                                disabled={!isResumeSubbed}
                                onChange={(event) => handleAwardChange(event, index)}
                              />
                            </Grid>

                            {awardArray?.length > 1 && (
                              <Grid
                                item
                                xs={4}
                                sx={styles.reorderGroup}
                              >
                                <ButtonTransparentSquare 
                                  style={styles.reorderDltBtn}
                                  title="delete item"
                                  type='button'
                                  onClick={() => deleteAward(index)}
                                >
                                  <MdDeleteForever />
                                </ButtonTransparentSquare>

                                <ButtonTransparentSquare 
                                  style={styles.reorderBtn}
                                  title="move up"
                                  type='button'
                                  onClick={() => moveAwardUp(index)}
                                >
                                  <FaLongArrowAltUp /> 
                                </ButtonTransparentSquare>

                                <ButtonTransparentSquare 
                                  style={styles.reorderBtn}
                                  title="move down"
                                  type='button'
                                  onClick={() => moveAwardDwn(index)}
                                >
                                  <FaLongArrowAltDown /> 
                                </ButtonTransparentSquare>
                              </Grid>
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                </div>
              )}

              {publications?.length > 0 && (
                <div className="Segment">
                  
                  <Grid container>
                    <Grid item md={2} >

                    </Grid>
                    <Grid item xs={12} md={8}>
                      <h4>Publications & Projects</h4>
                    </Grid>
                    {!isResumeSubbed && (
                      <Grid item md={2} xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: screenWidth < 900 && '10px'}}>
                        <ButtonThin onClick={handleUnlockEdit} width={'120px'} height='20px' color='#EE7B1C'>
                          unlock editing <IoIosUnlock />
                        </ButtonThin>
                      </Grid>
                    )}
                  </Grid>
                  <div>
                    <Grid
                      container
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      {publications?.map((info, index) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={5}
                            mb={2}
                            className="segment"
                            key={index}
                          >
                            <Grid item xs={12}>
                              <AuthInput
                                name="title"
                                id={info.title}
                                value={info.title}
                                label="Publication Title"
                                inputGridSm={12}
                                inputType="text"
                                mb={2}
                                disabled={!isResumeSubbed}
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
                                disabled={!isResumeSubbed}
                                onChange={(event) => handlePubChange(event, index)}
                              />
                              <label className={resumeCss.DetachedLabels}>
                                Date Awarded{" "}
                              </label>
                              <AuthInput
                                name="date"
                                id={"info.datepub" + index}
                                value={info.date}
                                placeholder="Date Awarded"
                                inputGridSm={12}
                                inputType="date"
                                disabled={!isResumeSubbed}
                                onChange={(event) => handlePubChange(event, index)}
                              />
                            </Grid>
                            

                            {publications.length > 1 && (
                              <Grid
                                item
                                xs={4}
                                sx={styles.reorderGroup}
                              >
                                <ButtonTransparentSquare 
                                  style={styles.reorderDltBtn}
                                  title="delete item"
                                  type='button'
                                  onClick={() => deletePub(index)}
                                >
                                  <MdDeleteForever />
                                </ButtonTransparentSquare>

                                <ButtonTransparentSquare 
                                  style={styles.reorderBtn}
                                  title="move up"
                                  type='button'
                                  onClick={() => movePubUp(index)}
                                >
                                  <FaLongArrowAltUp /> 
                                </ButtonTransparentSquare>

                                <ButtonTransparentSquare 
                                  style={styles.reorderBtn}
                                  title="move down"
                                  type='button'
                                  onClick={() => movePubDwn(index)}
                                >
                                  <FaLongArrowAltDown /> 
                                </ButtonTransparentSquare>
                              </Grid>
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                </div>
              )}

              {interests?.length > 0 && (
                <div className="Segment">
                  <h4>Interests</h4>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{
                        padding: "5px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {interests.map((interest, index) => {
                        return (
                          <span key={index} className="array-item">
                            {interest}
                            <span
                              className="itemDelete"
                              title="Delete Interest"
                              onClick={() => {
                                handleDeleteInterests(index);
                              }}
                            >
                              X
                            </span>
                          </span>
                        );
                      })}
                    </Grid>
                  </Grid>
                </div>
              )}


              {languages?.length > 0 && (
                <div className="Segment">
                  <h4>Languages</h4>
                  <Grid container>                      
                    {languages.map((language, index) => {
                      return (
                        <Grid container xs={12} md={6} key={index}>                              
                          <AuthInput 
                            id={language.language} 
                            value={language.language} 
                            name="language"
                            label="Language" 
                            inputType="select2" 
                            inputGridSm={8} 
                            mb={2} 
                            list={LANGUAGES} 
                            disabled={!isResumeSubbed}
                            onChange={(event) => handleLangChange(event, index)}
                          />
                          <AuthInput 
                            id={language.level + index} 
                            value={language.level} 
                            name="level"
                            label="Level" 
                            inputType="select2" 
                            inputGridSm={2} 
                            mb={2} 
                            list={langLevelsArray} 
                            disabled={!isResumeSubbed}
                            onChange={(event) => handleLangChange(event, index)}
                          />
                          <Grid item xs={2} pt={1}>
                            <ButtonTransparentSquare 
                              style={styles.reorderDltBtn}
                              title="delete item"
                              type='button'
                              onClick={() => deleteLang(index)}
                            >
                              <MdDeleteForever />
                            </ButtonTransparentSquare>
                          </Grid>
                        </Grid>
                      );
                      })}
                  </Grid>
                </div>
              )}


              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "right",
                  marginBottom: "20px",
                }}
              >
                <div style={{ width: "150px" }}>
                  <ButtonSubmitGreen>
                    <span style={{ marginRight: "5px", paddingTop: "1px" }}>
                      Finish
                    </span>
                  </ButtonSubmitGreen>
                </div>
              </div>
            </form>
          </div>
        </div>
        {loading && (
          <Modal
            header4={`Hello ${basicInfo.firstName}`}
            header3="Preping Resume for download..."
          />
        )}

        
        {!isSubscribed && (
          <Overlay prevPath="/user/dashboard/resume">
            <ResumePricing />
          </Overlay>
        )}

        
        {showCheckout && <CheckoutSummaryModal />}
      </div>
    </ProtectedContent>
  );
};

export default PreviewResume;
