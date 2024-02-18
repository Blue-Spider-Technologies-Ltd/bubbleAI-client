import React, { useEffect, useState } from "react";
import resumeCss from "./Resume.module.css";
import { useNavigate } from "react-router-dom";
import AuthInput from "../UI/Input/AuthInputs";
import { Grid } from "@mui/material";
import { COUNTRIES } from "../../utils/countries";
import { useSelector, useDispatch } from "react-redux";
import { setResume, setFetching } from "../../redux/states";
import { ButtonSubmitGreen } from "../UI/Buttons/Buttons";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Modal } from "../UI/Modal/Modal";
import AuthSideMenu from "../UI/AuthSideMenu/AuthSideMenu";
import AuthHeader from "../UI/AuthHeader/AuthHeader";
import { useConfirm } from "material-ui-confirm";
import jwt_decode from "jwt-decode";

const PreviewResume = () => {
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { resume } = useSelector((state) => state.stateData);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [userResumes, setUserResumes] = useState([])

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
  //scroll to page top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(setFetching(true));
    const resumeLength = Object.keys(resume).length;
    const now = Date.now();
    const authUser = jwt_decode(isAuth);
    const isResumePresent = localStorage?.getItem(
      "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@"
    );

    // console.log(resume);
    if (isAuth && now < authUser.expiration) {
      const localResume = JSON.parse(isResumePresent);
      //When user returning from download page
      if (resumeLength <= 0) {
        if (!localResume) {
          localStorage?.removeItem(
            "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@"
          );
          navigate("/user/dashboard/resume?customize");
        } else {
          //if resume is found in local storage
          dispatch(setResume(localResume.resumeData));
          setBasicInfo(
            localResume.resumeData.basicInfo && localResume.resumeData.basicInfo
          );
          setLinkInfo(
            localResume.resumeData.linkInfo && localResume.resumeData.linkInfo
          );
          setSkills(
            localResume.resumeData.skills && localResume.resumeData.skills
          );
          setInterests(
            localResume.resumeData.interests && localResume.resumeData.interests
          );
          setEduArray(
            localResume.resumeData.eduInfo && localResume.resumeData.eduInfo
          );
          setWorkExpArray(
            localResume.resumeData.workExpInfo &&
              localResume.resumeData.workExpInfo
          );
          setAwardArray(
            localResume.resumeData.awardInfo && localResume.resumeData.awardInfo
          );
          setPublications(
            localResume.resumeData.publications &&
              localResume.resumeData.publications
          );
          dispatch(setFetching(false));
          return;
        }
      }
      //when user coming from customize page
      setBasicInfo(resume.basicInfo && resume.basicInfo);
      setLinkInfo(resume.linkInfo && resume.linkInfo);
      setSkills(resume.skills && resume.skills);
      setInterests(resume.interests && resume.interests);
      setEduArray(resume.eduInfo && resume.eduInfo);
      setWorkExpArray(resume.workExpInfo && resume.workExpInfo);
      setAwardArray(resume.awardInfo && resume.awardInfo);
      setPublications(resume.publications && resume.publications);
      dispatch(setFetching(false));
    } else {
      localStorage?.removeItem("token");
      navigate("/popin");
    }
  }, [isAuth, navigate, dispatch, resume]);

  useEffect(() => {
    if (!eduArray) setError("Reload page to get complete data");
  }, [eduArray]);

  //////LINK HANDLERS
  const handleDeleteLinks = (index) => {
    confirm({ description: `Proceed to delete link? ${linkInfo[index]}` })
      .then(() => {
        const prevLinks = [...linkInfo];
        prevLinks.splice(index, 1);
        setLinkInfo(prevLinks);
      })
      .catch(() => setError("Not Deleted"));
  };

  const handleDeleteSkills = (index) => {
    confirm({ description: `Proceed to delete skill? ${skills[index]}` })
      .then(() => {
        const prevSkills = [...skills];
        prevSkills.splice(index, 1);
        setSkills(prevSkills);
      })
      .catch(() => setError("Not Deleted"));
  };

  const handleDeleteInterests = (index) => {
    confirm({ description: `Proceed to delete interest? ${interests[index]}` })
      .then(() => {
        const prevInterests = [...interests];
        prevInterests.splice(index, 1);
        setInterests(prevInterests);
      })
      .catch(() => setError("Not Deleted"));
  };

  //     /////WORK EXP HANDLERS
  const handleWorkExpChange = (event, index) => {
    const prevWorkExp = [...workExpArray];
    prevWorkExp[index].jobDesc = event.target.value;
    setWorkExpArray(prevWorkExp);
  };

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
      console.log(error);
      setError("Try again");
    }
  };

  const toggleResumes = () => {
    setAuthMenuOpen(!authMenuOpen);
  };

  const handleInputChange = (prop) => (event) => {
    setBasicInfo({ ...basicInfo, [prop]: event.target.value });
  };

  return (
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
        <AuthHeader
          authMenuOpen={authMenuOpen}
          onClick={toggleResumes}
          headerText="Create My Resume"
        />

        <div className="BodyWrapper">
          <div className="BuildNavigator">
            <div>
              <span>1</span>Customise
            </div>
            <div className="ActiveNav">
              <span>2</span>Preview AI Build
            </div>
            <div>
              <span>3</span>Download
            </div>
          </div>
          <form method="post" onSubmit={handleFormSubmit}>
            <div className="error">{error}</div>
            <div className="Segment">
              <h4>Basic Info</h4>
              <Grid container>
                <AuthInput
                  value={basicInfo.firstName}
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  disabled={true}
                />
                <AuthInput
                  value={basicInfo.lastName}
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  disabled={true}
                />
                <AuthInput
                  value={basicInfo.email}
                  inputType="email"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={0}
                  required={true}
                  disabled={true}
                />
                <div style={{ width: "100%" }}>
                  <div className={resumeCss.DetachedLabels}>
                    Date of Birth *
                  </div>
                </div>
                <AuthInput
                  value={basicInfo.dob}
                  placeholder="Date of Birth"
                  inputType="date"
                  inputGridSm={12}
                  inputGrid={2}
                  mb={2}
                  required={true}
                  disabled={true}
                />
                <AuthInput
                  value={basicInfo.mobile}
                  label="Mobile"
                  inputType="mobile"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  disabled={true}
                />
                <AuthInput
                  value={basicInfo.jobPosition}
                  label="Job Position"
                  inputType="text"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  disabled={true}
                />
                <AuthInput
                  value={basicInfo.street}
                  label="Street Name"
                  inputType="text"
                  inputGridSm={7}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  disabled={true}
                />
                <AuthInput
                  value={basicInfo.city}
                  label="City"
                  inputType="text"
                  inputGridSm={5}
                  inputGrid={4}
                  mb={2}
                  required={true}
                  disabled={true}
                />
                <AuthInput
                  value={basicInfo.country}
                  label="Country"
                  inputType="select2"
                  inputGridSm={12}
                  inputGrid={4}
                  mb={2}
                  list={COUNTRIES}
                  required={true}
                  disabled={true}
                />
                <AuthInput
                  value={basicInfo.profSummary}
                  label="AI Generated Prof. Summary"
                  multiline={true}
                  rows={2}
                  inputGridSm={12}
                  mb={2}
                  onChange={handleInputChange("profSummary")}
                />
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {linkInfo.length > 0 && (
                    <div>
                      <div className={resumeCss.DetachedLabels}>Your Links</div>

                      <div
                        style={{
                          padding: "5px",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {linkInfo.map((link, index) => {
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
            {skills.length > 0 && (
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
                    {skills.map((skill, index) => {
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
                <h4>Education Info</h4>
                <div>
                  {eduArray.map((info, index) => {
                    return (
                      <Grid container key={index} className="segment">
                        <AuthInput
                          name="institution"
                          value={info.institution}
                          label="Name of Institution"
                          inputType="text"
                          inputGridSm={12}
                          inputGrid={4}
                          mb={2}
                          required={true}
                          disabled={true}
                        />
                        <AuthInput
                          name="degree"
                          value={info.degree}
                          label="Degree Obtained"
                          inputType="text"
                          inputGridSm={12}
                          inputGrid={4}
                          mb={2}
                          required={true}
                          disabled={true}
                        />
                        <label className={resumeCss.DetachedLabels} mr={4}>
                          Graduation Date *
                        </label>
                        <AuthInput
                          name="date"
                          value={info.date}
                          placeholder="Graduation Date"
                          inputType="date"
                          inputGridSm={8}
                          inputGrid={2}
                          required={true}
                          disabled={true}
                        />
                      </Grid>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {workExpArray && (
              <div className="Segment">
                <h4>Work & Volunteering Experience</h4>
                <div>
                  {workExpArray.map((info, index) => {
                    return (
                      <Grid container className="segment" key={index}>
                        <AuthInput
                          name="company"
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
                          disabled={true}
                        />
                        <AuthInput
                          name="position"
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
                          disabled={true}
                        />
                        <AuthInput
                          name="industry"
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
                        />
                        <AuthInput
                          name="workLink"
                          value={info.workLink}
                          label="Related Link"
                          inputType="text"
                          inputGridSm={12}
                          inputGrid={3}
                          mb={2}
                          onChange={(event) =>
                            handleWorkExpChange(event, index)
                          }
                          disabled={true}
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
                              value={info.DateFrom}
                              placeholder="Start Date"
                              inputType="date"
                              inputGridSm={12}
                              inputGrid={12}
                              required={true}
                              onChange={(event) =>
                                handleWorkExpChange(event, index)
                              }
                              disabled={true}
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
                              value={info.dateTo}
                              placeholder="End Date"
                              inputType="date"
                              inputGridSm={12}
                              inputGrid={12}
                              required={true}
                              onChange={(event) =>
                                handleWorkExpChange(event, index)
                              }
                              disabled={true}
                            />
                          </div>
                        </div>
                        <AuthInput
                          name="jobDesc"
                          label="Job Description"
                          value={info.jobDesc}
                          multiline={true}
                          rows={2}
                          inputGridSm={12}
                          onChange={(event) =>
                            handleWorkExpChange(event, index)
                          }
                        />
                      </Grid>
                    );
                  })}
                </div>
              </div>
            )}

            {awardArray && (
              <div className="Segment">
                <h4>Awards [If any]</h4>
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
                            value={info.org}
                            label="Awarding Organization"
                            inputGridSm={12}
                            inputType="text"
                            mb={2}
                            disabled={true}
                          />
                          <AuthInput
                            name="award"
                            value={info.award}
                            label="Award Received"
                            inputGridSm={12}
                            inputType="text"
                            mb={2}
                            disabled={true}
                          />
                          <label className={resumeCss.DetachedLabels}>
                            Date Awarded
                          </label>
                          <AuthInput
                            name="date"
                            value={info.date}
                            placeholder="Date Awarded"
                            inputGridSm={12}
                            inputType="date"
                            disabled={true}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </div>
            )}

            {publications.length > 0 && (
              <div className="Segment">
                <h4>Publications [If any]</h4>
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
                            value={info.title}
                            label="Publication Title"
                            inputGridSm={12}
                            inputType="text"
                            mb={2}
                            disabled={true}
                          />
                          <AuthInput
                            name="source"
                            value={info.source}
                            label="Source"
                            inputGridSm={12}
                            inputType="text"
                            mb={2}
                            disabled={true}
                          />
                          <label className={resumeCss.DetachedLabels}>
                            Date Awarded{" "}
                          </label>
                          <AuthInput
                            name="date"
                            value={info.date}
                            placeholder="Date Awarded"
                            inputGridSm={12}
                            inputType="date"
                            disabled={true}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </div>
            )}

            {interests.length > 0 && (
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
                    Finish{" "}
                  </span>{" "}
                  <ArrowForwardIosIcon fontSize="inherit" />
                </ButtonSubmitGreen>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loading && (
        <Modal
          header4={`Hello ${basicInfo.firstName}`}
          header3="Readying your Resume for download..."
        />
      )}
    </div>
  );
};

export default PreviewResume;
