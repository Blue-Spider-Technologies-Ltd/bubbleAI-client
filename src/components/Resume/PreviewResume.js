import React, { useEffect, useState } from 'react'
import resumeCss from './Resume.module.css'
import { useNavigate, Link } from 'react-router-dom'
import logoImg from "../../images/bubble-logo.png"
import { AuthInput } from '../UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { COUNTRIES } from '../../utils/countries';
import { useSelector, useDispatch } from "react-redux";
import { setResume } from "../../redux/states";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Modal from '../UI/Modal/Modal';
import { Rings, Watch } from 'react-loader-spinner'
const screenWidth = window.innerWidth

const PreviewResume = () => {
    const dispatch = useDispatch()
    const { resume } = useSelector(state => state.stateData)
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [prevResumes, showPrevResumes] = useState(false)

    const isAuth = localStorage?.getItem('token')
    //resume data
    const [basicInfo, setBasicInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        mobileCode: "",
        mobile: "",
        jobPosition: "",
        street: "",
        city: "",
        country: "",
        profSummary: ""
    })
    const [linkInfo, setLinkInfo] = useState([])
    const [skills, setSkills] = useState([])
    const [interests, setInterests] = useState([])
    const [eduArray, setEduArray] = useState([])
    const [workExpArray, setWorkExpArray] = useState([])
    const [awardArray, setAwardArray] = useState([])
    const [publications, setPublications] = useState([])
    useEffect(() => {
        const resumeLength = Object.keys(resume).length
        console.log(resume);
        if (isAuth) {
            if (resumeLength <= 0) {
                navigate('/user/dashboard/resume?customize')
            }
            setBasicInfo(resume.basicInfo && resume.basicInfo)
            setLinkInfo(resume.linkInfo && resume.linkInfo)
            setSkills(resume.skills && resume.skills)
            setInterests(resume.interests && resume.interests)
            setEduArray(resume.eduInfo && resume.eduInfo)
            setWorkExpArray(resume.workExpInfo && resume.workExpInfo)
            setAwardArray(resume.awardInfo && resume.awardInfo)
            // setPublications(resume.awardInfo)

        } else {
            navigate('/popin')
        }
    }, [isAuth, navigate, resume])

    useEffect(() => {
        const now = new Date().getTime();
        let resumeObjforLocal = {
            resumeData : resume,
            expiration: now + 24 * 60 * 60 * 1000, //current time + 24hr in milliseconds
        }
        localStorage.setItem('5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@', JSON.stringify(resumeObjforLocal));
    }, [resume])


    const toggleResumes = () => {
        showPrevResumes(!prevResumes)
    }

    //////LINK HANDLERS
    const handleDeleteLinks = (index) => {
        //to fix react confirm bug
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Proceed to delete link? ${linkInfo[index]}`)) {
            const prevLinks = [...linkInfo];
            prevLinks.splice(index, 1);
            setLinkInfo(prevLinks);
        }
    };

    const handleDeleteSkills = (index) => {
        //to fix react confirm bug
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Proceed to delete skill? ${skills[index]}`)) {
            const prevSkills = [...skills];
            prevSkills.splice(index, 1);
            setSkills(prevSkills);
        }
    };

    const handleDeleteInterests = (index) => {
        //to fix react confirm bug
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Proceed to delete interest? ${interests[index]}`)) {
            const prevInterests = [...interests];
            prevInterests.splice(index, 1);
            setInterests(prevInterests);
        }
    };

    //     /////WORK EXP HANDLERS
    const handleWorkExpChange = (event, index) => {
        const prevWorkExp = [...workExpArray];     
        prevWorkExp[index].jobDesc = event.target.value
        setWorkExpArray(prevWorkExp)
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const resumeData = {
            basicInfo: basicInfo,           //Object
            linkInfo: linkInfo,             //Array
            skills: skills,                 //Array
            eduArray: eduArray,             //Array
            workExpArray: workExpArray,     //Array
            awardArray: awardArray,         //Array
            // publications: publications      //Array
        }

        try {
            dispatch(setResume(resumeData))
            setLoading(false)
            navigate('/user/dashboard/resume?download')
        } catch (error) {
            console.log(error)
            setError("Try again")
        }
    }

    const handleInputChange = (prop) => (event) => {
        setBasicInfo({ ...basicInfo, [prop]: event.target.value });
    };

    return (
        <div className={resumeCss.Resume}>

            <div style={{ width: '100%', padding: '0' }}>
                <div className={resumeCss.ResumeBlob}>
                </div>
            </div>

            <div className={resumeCss.ResumeInner}>
                <div className={resumeCss.ResumeInnerHeader}>
                    <div className={resumeCss.showResumes} onClick={toggleResumes}>
                        My Resumes
                    </div>
                    <h3>Create my Resume</h3>
                    <Link to='/'>
                        <img src={logoImg} alt='Bubble Ai' className="authLogo" />
                    </Link>
                </div>

                <div className={resumeCss.BodyWrapper}>
                    <div className={resumeCss.BuildNavigator}>
                        <div><span>1</span>Customise</div>
                        <div className={resumeCss.ActiveNav}><span>2</span>Preview AI Build</div>
                        <div><span>3</span>Download</div>
                    </div>
                    <form method="post" onSubmit={handleFormSubmit}>
                        <div className='error'>{error}</div>
                        <div className={resumeCss.Segment}>
                            <h4>Basic Info</h4>
                            <Grid container>
                                <AuthInput value={basicInfo.firstName} inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} disabled={true} />
                                <AuthInput value={basicInfo.lastName} inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} disabled={true} />
                                <AuthInput value={basicInfo.email} inputType="email" inputGridSm={12} inputGrid={4} mb={0} required={true} disabled={true} />
                                <div style={{ width: "100%" }}><div className={resumeCss.DetachedLabels}>Date of Birth *</div></div>
                                <AuthInput value={basicInfo.dob} placeholder="Date of Birth" inputType="date" inputGridSm={12} inputGrid={2} mb={2} required={true} disabled={true} />
                                <AuthInput value={basicInfo.mobileCode} label="Code" inputType="select" inputGridSm={4} inputGrid={3} mb={2} list={COUNTRIES} required={true} name='c-code' disabled={true} />
                                <AuthInput value={basicInfo.mobile} label="Mobile" inputType="number" inputGridSm={8} inputGrid={3} mb={2} required={true} disabled={true} />
                                <AuthInput value={basicInfo.jobPosition} label="Job Position" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} disabled={true} />
                                <AuthInput value={basicInfo.street} label="Street Name" inputType="text" inputGridSm={7} inputGrid={4} mb={2} required={true} disabled={true} />
                                <AuthInput value={basicInfo.city} label="City" inputType="text" inputGridSm={5} inputGrid={4} mb={2} required={true} disabled={true} />
                                <AuthInput value={basicInfo.country} label="Country" inputType="select2" inputGridSm={12} inputGrid={4} mb={2} list={COUNTRIES} required={true} disabled={true} />
                                <AuthInput value={basicInfo.profSummary} label="AI Generated Prof. Summary" multiline={true} rows={2} inputGridSm={12} mb={2} onChange={handleInputChange('profSummary')} />
                                <Grid item xs={12} style={{display: "flex", flexDirection: "column"}}>
                                {linkInfo.length > 0 &&                                     
                                    <div>
                                        <div className={resumeCss.DetachedLabels}>Your Links</div>
                                    
                                        <div style={{padding: "5px", display: "flex", flexWrap: "wrap"}}>
                                            {linkInfo.map((link, index) => {
                                                return (
                                                    <span key={index} className='array-item'>{link}<span className='itemDelete' title='Delete Link' onClick={() => {handleDeleteLinks(index)}}>X</span></span>
                                                )
                                            })}
                                        </div>
                                    </div>    
                                }
                                </Grid>
                            </Grid>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Relevant Skills</h4>
                            <Grid container>
                                <Grid item xs={12} style={{padding: "5px", display: "flex", flexWrap: "wrap"}}>
                                    {skills.map((skill, index) => {
                                        return (
                                            <span key={index} className='array-item'>{skill}<span className='itemDelete' title='Delete Skill' onClick={() => {handleDeleteSkills(index)}}>X</span></span>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Education Info</h4>
                            <div>
                                {eduArray.map((info, index) => {
                                return (<Grid container key={index} className='segment'>
                                        <AuthInput name="institution" value={info.institution} label="Name of Institution" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} disabled={true} />
                                        <AuthInput name="degree" value={info.degree} label="Degree Obtained" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} disabled={true} />
                                        <label className={resumeCss.DetachedLabels} mr={4}>Graduation Date *</label>
                                        <AuthInput name="date" value={info.date} placeholder="Graduation Date" inputType="date" inputGridSm={8} inputGrid={2} required={true} disabled={true} />
                                    </Grid>)
                                })}
                            </div>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Work & Volunteering Experience</h4>
                            <div>
                                {workExpArray.map((info, index) => {
                                    return <Grid container className='segment' key={index}>
                                                <AuthInput name="company" value={info.company}  label="Company/Org. Name" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                <AuthInput name="position" value={info.position}  label="Position Held" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                <AuthInput name="industry" value={info.industry}  label="Industry e.g IT" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                <AuthInput name="workLink" value={info.workLink}  label="Related Link" inputType="text" inputGridSm={12} inputGrid={3} mb={2} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                <div style={{width: "50%", margin: "0 auto 5px", display: "flex", justifyContent: "center"}}>
                                                    <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
                                                        <label className={resumeCss.DetachedLabels}>From *</label>
                                                        <AuthInput name="dateFrom" value={info.DateFrom} placeholder="Start Date" inputType="date" inputGridSm={12} inputGrid={12} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                    </div>
                                                    <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
                                                        <label className={resumeCss.DetachedLabels} style={{marginRight: "10px"}}>To *</label>
                                                        <AuthInput name="dateTo" value={info.dateTo} placeholder="End Date" inputType="date" inputGridSm={12} inputGrid={12} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                    </div>
                                     
                                                </div>
                                                <AuthInput name="jobDesc" value={info.jobDesc}  placeholder="[Optionally] write a job description and see how I optimise it for you. Leave blank to allow me craft something beautiful" multiline={true} rows={2} inputGridSm={12} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                            </Grid>
                                })}
                            </div>
                        </div>

                        {awardArray.length > 0 && 
                            <div className={resumeCss.Segment}>
                                <h4>Awards [If any]</h4>
                                <div>
                                    <Grid container sx={{ display: "flex", justifyContent: "space-around" }}>
                                        {awardArray.map((info, index) => {
                                            return <Grid item xs={12} md={5} mb={2} className='segment' key={index} >
                                                <AuthInput name="org" value={info.org} label="Awarding Organization" inputGridSm={12} inputType="text" mb={2} />
                                                <AuthInput name="award" value={info.award} label="Award Received" inputGridSm={12} inputType="text" mb={2} />
                                                <label className={resumeCss.DetachedLabels}>Date Awarded</label>
                                                <AuthInput name="date" value={info.date} placeholder="Date Awarded" inputGridSm={12} inputType="date" />
                                            </Grid>
                                        })}
                                    </Grid>
                                </div>
                            </div>
                        }

                        {publications.length > 0 &&
                            <div className={resumeCss.Segment}>
                                <h4>Publications [If any]</h4>
                                <div>
                                    <Grid container sx={{display: "flex", justifyContent: "space-around"}}>
                                        {publications.map((info, index) => {
                                            return <Grid item xs={12} md={5} mb={2} className='segment' key={index} >
                                                        <AuthInput name="title" value={info.title} label="Publication Title" inputGridSm={12} inputType="text" mb={2} /> 
                                                        <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                                                        <AuthInput name="date" value={info.date} placeholder="Date Awarded" inputGridSm={12} inputType="date" /> 
                                                    </Grid>
                                        })}
                                    </Grid>
                                </div>
                            </div>
                        }

                        {interests.length > 0 &&
                            <div className={resumeCss.Segment}>
                                <h4>Interests</h4>
                                <Grid container>
                                    <Grid item xs={12} style={{padding: "5px", display: "flex", flexWrap: "wrap"}}>
                                        {interests.map((interest, index) => {
                                            return (
                                                <span key={index} className='array-item'>{interest}<span className='itemDelete' title='Delete Interest' onClick={() => {handleDeleteInterests(index)}}>X</span></span>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            </div>
                        }
                        <div style={{ width: "100%", display: "flex", justifyContent: "right", marginBottom: "20px" }}>
                            <div style={{ width: "150px" }}>
                                <ButtonSubmitGreen>
                                    <span style={{ marginRight: "5px", paddingTop: "1px" }}>Finish </span> <ArrowForwardIosIcon fontSize='inherit' />
                                </ButtonSubmitGreen>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
            {loading && (
                <Modal>
                <h4>Hello {basicInfo.firstName}</h4>
                <div style={{marginTop: '15px'}}>
                    {screenWidth >= 900 ?
                        <Rings
                            height="200"
                            width="200"
                            color="white"
                            radius="6"
                            visible={true}
                            ariaLabel="rings-loading"
                        />
                    :
                        <Watch
                            height="150"
                            width="150"
                            radius={48}
                            color="white"
                            ariaLabel="revolving-dot-loading"
                            visible={true}
                        />
                    }
                </div>                       

                <h3>Readying your Resume for download...</h3>
                </Modal>
            )}

        </div>
    )
}


export default PreviewResume;