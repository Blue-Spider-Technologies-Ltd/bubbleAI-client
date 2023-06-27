import React, { useEffect, useState } from 'react'
import resumeCss from './Resume.module.css'
import { useNavigate, Link } from 'react-router-dom'
import logoImg from "../../images/bubble-logo.png"
import { AuthInput } from '../UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { COUNTRIES } from '../../utils/countries';
import { useSelector, useDispatch } from "react-redux";
import { setUser, setResume } from "../../redux/states";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios'
import Modal from '../UI/Modal/Modal';
import { Rings, Watch } from 'react-loader-spinner'
const screenWidth = window.innerWidth

const CustomizeResume = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.stateData)
    const userLength = Object.keys(user).length
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [resumes, showResumes] = useState(false)

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
    useEffect(() => {

        if(isAuth) {
            if(userLength <= 0 ) {
                const populateUser = async () => {
                    try {
                        const response = await axios.get('/user/user', {
                            headers: {
                                'x-access-token': isAuth
                            }
                        })
                        if (response.data.status === "unauthenticated") {
                            localStorage?.removeItem('token')
                            return navigate('/popin')
                        }
                        setBasicInfo({
                            firstName: response.data.user.firstName,
                            lastName: response.data.user.lastName,
                            email: response.data.user.email,
                            dob: response.data.user.dob || "",
                            mobileCode: response.data.user.mobileCode || "",
                            mobile: response.data.user.mobile || "",
                            jobPosition: response.data.user.jobPosition || "",
                            street: response.data.user.street || "",
                            city: response.data.user.city || "",
                            country: response.data.user.country || "",
                            profSummary: response.data.user.profSummary || ""
                        })
                        dispatch(setUser(response.data.user))
                    } catch (error) {
                        console.log(error)
                        setError("Reload page to fetch data")
                    }
                }
                populateUser()
            }
        } else {
            navigate('/popin')
        }
    }, [navigate, dispatch, userLength, isAuth])

    const [linkInfo, setLinkInfo] = useState([""])

    const [skills, addSkills] = useState([""])

    const [eduArray, addEduArray] = useState([
        {
            institution: "",
            degree: "",
            date: ""
        }
    ])
    const [workExpArray, addWorkExpArray] = useState([
        {
            company: "",
            position: "",
            dateFrom: "",
            dateTo: "",
            jobDesc: ""
        }
    ])
 
    const [certArray, addCertArray] = useState([
        {
            cert: "",
            date: ""
        }
    ])
    const [awardArray, addAwardArray] =  useState([
        {
            org: "",
            award: "",
            date: ""
        }
    ])
    const [publications, addPublications] = useState([
        {
            title: "",
            date: ""
        }
    ])

    const toggleResumes = () => {
        showResumes(!resumes)
    }

    //////LINK HANDLERS
    const handleAddLinks = () => {
        setError("")
        const newLink = ""
        if(linkInfo.length < 3) {
            return setLinkInfo([...linkInfo, newLink])
        }
        setError("You can add a maximum of 3 links")
    }
    const handleDeleteLinks = () => {
        setError("")
        if(linkInfo.length > 1) {
            const prevLinks = [...linkInfo]
            prevLinks.pop()
            return setLinkInfo([...prevLinks])
        }
        setError("Leave blank, don't delete")
    }
    const handleLinkChange = (event, index) => {
        const prevLinkInfo = [...linkInfo];
        prevLinkInfo[index] = event.target.value
        setLinkInfo(prevLinkInfo)
    };

/////////////SKILL HANDLERS
    const handleAddSkill = () => {
        setError("")
        const newSkill = ""
        addSkills([...skills, newSkill])
    }
    const handleDeleteSkill = () => {
        setError("")
        if(skills.length > 1) {
            const prevSkills = [...skills]
            prevSkills.pop()
            return addSkills([...prevSkills])
        }
        setError("Leave blank, don't delete")
    }
    const handleSkillChange = (event, index) => {
        const prevSkills = [...skills];
        prevSkills[index] = event.target.value
        addSkills(prevSkills)
    };

    ///EDUCATION INFO HANDLERS
    const handleAddEduInfo = () => {
        setError("")
        const newInfo = {
            institution: "",
            degree: "",
            date: ""
        }
        if(eduArray.length < 3) {
            return addEduArray([...eduArray, newInfo])
        }
        setError("Only add 3 relevant backgrounds")
    }
    const handleDeleteEduInfo = () => {
        setError("")
        if(eduArray.length > 1) {
            const prevInfo = [...eduArray]
            prevInfo.pop()
            return addEduArray([...prevInfo])
        }
        setError("Leave blank, don't delete")
    }
    const handleEduExpChange = (event, index) => {
        const prevEduExp = [...eduArray];
        switch (event.target.name) {
            case "institution":
                prevEduExp[index].institution = event.target.value
                addEduArray(prevEduExp)
                break;
            case "degree":
                prevEduExp[index].degree = event.target.value
                addEduArray(prevEduExp)
                break;            
            case "date":
                prevEduExp[index].date = event.target.value
                addEduArray(prevEduExp)
                break;
            default: addEduArray(prevEduExp)
                break;
        }

    };

    /////WORK EXP HANDLERS
    const handleAddExp = () => {
        setError("")
        const newInfo = {
            company: "",
            position: "",
            dateFrom: "",
            dateTo: "",
            jobDesc: ""
        }
        if(workExpArray.length < 3) {
            return addWorkExpArray([...workExpArray, newInfo])
        }
        setError("Only add 3 Experiences")
    }
    const handleDeleteExp = () => {
        setError("")
        if(workExpArray.length > 1) {
            const prevInfo = [...workExpArray]
            prevInfo.pop()
            return addWorkExpArray([...prevInfo])
        }
        setError("Leave blank, don't delete")
    }
    const handleWorkExpChange = (event, index) => {
        const prevWorkExp = [...workExpArray];

        switch (event.target.name) {
            case "company":
                prevWorkExp[index].company = event.target.value
                addWorkExpArray(prevWorkExp)
                break;
            case "position":
                prevWorkExp[index].position = event.target.value
                addWorkExpArray(prevWorkExp)
                break;            
            case "dateFrom":
                prevWorkExp[index].dateFrom = event.target.value
                addWorkExpArray(prevWorkExp)
                break;
            case "dateTo":
                prevWorkExp[index].dateTo = event.target.value
                addWorkExpArray(prevWorkExp)
                break;            
            case "jobDesc":
                prevWorkExp[index].jobDesc = event.target.value
                addWorkExpArray(prevWorkExp)
                break;
            default: addEduArray(prevWorkExp)
                break;
        }

    };


    const handleAddCert = () => {
        setError("")
        const newCert = {
            cert: "",
            date: ""
        }
        if(certArray.length < 4) {
            return addCertArray([...certArray, newCert])
        }
        setError("Only add 4 Certifications")
    }
    const handleDeleteCert = () => {
        setError("")
        if(certArray.length > 1) {
            const prevCert = [...certArray]
            prevCert.pop()
            return addCertArray([...prevCert])
        }
        setError("Leave blank, don't delete")
    }
    const handleCertChange = (event, index) => {
        const prevCerts = [...certArray];
        switch (event.target.name) {
            case "cert":
                prevCerts[index].cert = event.target.value
                addCertArray(prevCerts)
                break;           
            case "date":
                prevCerts[index].date = event.target.value
                addCertArray(prevCerts)
                break;
            default: addCertArray(prevCerts)
                break;
        }

    };
    

    const handleAddAward = () => {
        setError("")
        const newAward = {
            org: "",
            award: "",
            date: ""
        }
        if(awardArray.length < 2) {
            return addAwardArray([...awardArray, newAward])
        }
        setError("Only add 2 Awards")
    }
    const handleDeleteAward = () => {
        setError("")
        if(awardArray.length > 1) {
            const prevAward = [...awardArray]
            prevAward.pop()
            return addAwardArray([...prevAward])
        }
        setError("Leave blank, don't delete")
    }
    const handleAwardChange = (event, index) => {
        const prevAwards = [...awardArray];
        switch (event.target.name) {
            case "org":
                prevAwards[index].org = event.target.value
                addAwardArray(prevAwards)
                break;  
            case "award":
                prevAwards[index].award = event.target.value
                addAwardArray(prevAwards)
                break;          
            case "date":
                prevAwards[index].date = event.target.value
                addAwardArray(prevAwards)
                break;
            default: addAwardArray(prevAwards)
                break;
        }

    };

    const handleAddPublication = () => {
        setError("")
        const newPub = {
            title: "",
            date: ""
        }
        if(publications.length < 2) {
            return addPublications([...publications, newPub])
        }
        setError("Only add 2 Publications")
    }
    const handleDeletePublication = () => {
        setError("")
        if(publications.length > 1) {
            const prevPub = [...publications]
            prevPub.pop()
            return addPublications([...prevPub])
        }
        setError("Leave blank, don't delete")
    }
    const handlePubChange = (event, index) => {
        const prevPub = [...publications];
        switch (event.target.name) {
            case "title":
                prevPub[index].title = event.target.value
                addPublications(prevPub)
                break;           
            case "date":
                prevPub[index].date = event.target.value
                addPublications(prevPub)
                break;
            default: addPublications(prevPub)
                break;
        }

    };


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(setResume({}))
        const resumeData = {
            basicInfo: basicInfo,           //Object
            linkInfo: linkInfo,             //Array
            skills: skills,                 //Array
            eduArray: eduArray,             //Array
            workExpArray: workExpArray,     //Array
            certArray: certArray,           //Array
            awardArray: awardArray,         //Array
            publications: publications      //Array
        }

        try {
            const response = await axios.post('/user/resume', resumeData, {
                headers: {
                    'x-access-token': isAuth
                }
            })
            if(response.status === 500) {
                setLoading(false)
                return setError("We are being throttled, try again after a while")
            }
            dispatch(setResume(response.data.resumeData))
            setLoading(false)
            navigate('/user/dashboard/resume?preview')
        } catch (error) {
            console.log(error)
            setError("We are being throttled, try again after a while")
        }
    }
  
    const handleInputChange = (prop) => (event) => {
        setBasicInfo({ ...basicInfo, [prop]: event.target.value});
    };    

    return (
        <div className={resumeCss.Resume}>

            <div style={{width: '100%', padding: '0'}}>
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
                        <div className={resumeCss.ActiveNav}><span>1</span>Customise</div>
                        <div><span>2</span>Preview AI Build</div>
                        <div><span>3</span>Download</div>
                    </div>
                    <form method="post" onSubmit={handleFormSubmit}>
                        <div className='error'>{error}</div>
                        <div className={resumeCss.Segment}>
                            <h4>Basic Info</h4>
                            <Grid container>
                                <AuthInput value={basicInfo.firstName} inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} disabled={true} onChange={handleInputChange('firstName')} /> 
                                <AuthInput value={basicInfo.lastName} inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} disabled={true} onChange={handleInputChange('lastName')} /> 
                                <AuthInput value={basicInfo.email} inputType="email" inputGridSm={12} inputGrid={4} mb={0} required={true} disabled={false} onChange={handleInputChange('email')} /> 
                                <div style={{width: "100%"}}><div className={resumeCss.DetachedLabels}>Date of Birth *</div></div>
                                <AuthInput value={basicInfo.dob} placeholder="Date of Birth" inputType="date" inputGridSm={12} inputGrid={2} mb={2} required={true} onChange={handleInputChange('dob')} /> 
                                <AuthInput value={basicInfo.mobileCode} label="Code" inputType="select" inputGridSm={4} inputGrid={3} mb={2} list={COUNTRIES} required={true} onChange={handleInputChange('mobileCode')} name='c-code' /> 
                                <AuthInput value={basicInfo.mobile} label="Mobile" inputType="number" inputGridSm={8} inputGrid={3} mb={2} required={true} onChange={handleInputChange('mobile')} /> 
                                <AuthInput value={basicInfo.jobPosition} label="Job Position" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} onChange={handleInputChange('jobPosition')} /> 
                                <AuthInput value={basicInfo.street} label="Street Name" inputType="text" inputGridSm={7} inputGrid={4} mb={2} required={true} onChange={handleInputChange('street')} /> 
                                <AuthInput value={basicInfo.city} label="City" inputType="text" inputGridSm={5} inputGrid={4} mb={2} required={true} onChange={handleInputChange('city')} /> 
                                <AuthInput value={basicInfo.country} label="Country" inputType="select2" inputGridSm={12} inputGrid={4} mb={2} list={COUNTRIES} required={true} onChange={handleInputChange('country')} /> 
                                {linkInfo.map((info, index) => {
                                    return <AuthInput 
                                                key={index} 
                                                label="Add a link e.g linkedin, github or your website" 
                                                value={info} 
                                                inputType="text" 
                                                inputGridSm={8} 
                                                inputGrid={8}
                                                mb={2} 
                                                required={false} 
                                                onChange={(event) => handleLinkChange(event, index)}
                                            />
                                })}
                                <Grid item xs={4} sx={{display: "flex", justifyContent: "center"}}>
                                    <div style={{marginRight: "10px"}} className='delete' title='Delete Link' onClick={handleDeleteLinks}>-</div>
                                    <div className='add' title='Add More Links' onClick={handleAddLinks}>+</div>
                                </Grid>
                                <AuthInput value={basicInfo.profSummary} placeholder="[Optionally] write a professional summary and see how I optimise it for you. Leave blank to allow me craft something beautiful" multiline={true} rows={2} inputGridSm={12} mb={2} onChange={handleInputChange('profSummary')} /> 
                            </Grid>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Education Info</h4>
                            <div>
                                {eduArray.map((info, index) => {
                                    return (<Grid container key={index} className='segment'>
                                               <AuthInput name="institution" value={info.institution} label="Name of Institution" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} onChange={(event) => handleEduExpChange(event, index)} /> 
                                               <AuthInput name="degree" value={info.degree} label="Degree Obtained" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} onChange={(event) => handleEduExpChange(event, index)} /> 
                                               <label className={resumeCss.DetachedLabels} mr={4}>Graduation Date *</label>
                                               <AuthInput name="date" value={info.date} placeholder="Graduation Date" inputType="date" inputGridSm={8} inputGrid={2} required={true} onChange={(event) => handleEduExpChange(event, index)} /> 
                                           </Grid>)
                                })}
                                <div className={resumeCss.CenteredElem}>
                                    <div style={{marginRight: "10px"}} className='delete' title='Delete Educational Info' onClick={handleDeleteEduInfo}>-</div>
                                    <div className='add' title='Add Educational Info' onClick={handleAddEduInfo}>+</div>
                                </div>
                            </div>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Work Experience</h4>
                            <div>
                                {workExpArray.map((info, index) => {
                                    return <Grid container className='segment' key={index}>
                                                <AuthInput name="company" value={info.company}  label="Company/Org. Name" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                <AuthInput name="position" value={info.position}  label="Position Held" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                <label className={resumeCss.DetachedLabels}>From *</label>
                                                <AuthInput name="dateFrom" value={info.DateFrom} placeholder="Start Date" inputType="date" inputGridSm={9} inputGrid={2} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                <label className={resumeCss.DetachedLabels} style={{marginRight: "10px"}}>To *</label>
                                                <AuthInput name="dateTo" value={info.dateTo} placeholder="End Date" inputType="date" inputGridSm={9} inputGrid={2} required={true} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                                <AuthInput name="jobDesc" value={info.jobDesc}  placeholder="[Optionally] write a job description and see how I optimise it for you. Leave blank to allow me craft something beautiful" multiline={true} rows={2} inputGridSm={12} onChange={(event) => handleWorkExpChange(event, index)} /> 
                                            </Grid>
                                })}
                                <div className={resumeCss.CenteredElem}>
                                    <div style={{marginRight: "10px"}} className='delete' title='Delete Experience' onClick={handleDeleteExp}>-</div>
                                    <div className='add' title='Add Experience' onClick={handleAddExp}>+</div>
                                </div>
                            </div>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Relevant Skills</h4>
                            <Grid container>
                                <Grid container item xs={9}>
                                    {skills.map((skill, index) => {
                                        return <AuthInput 
                                                    key={index} 
                                                    value={skill.value} 
                                                    label="Add a Skill" 
                                                    inputType="text" 
                                                    inputGridSm={12} 
                                                    inputGrid={6} 
                                                    mb={2} 
                                                    required={true} 
                                                    onChange={(event) => handleSkillChange(event, index)}
                                                />
                                    })}
                                </Grid>
                                <Grid item xs={3} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <div style={{marginRight: "10px"}} className='delete' title='Delete Skill' onClick={handleDeleteSkill}>-</div>
                                    <div className='add' title='Add a Skill' onClick={handleAddSkill}>+</div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Professional Certifications [If any]</h4>
                            <div>
                                <Grid container sx={{display: "flex", justifyContent: "space-around"}}>
                                    {certArray.map((info, index) => {
                                        return <Grid item xs={12} md={5} mb={2} className='segment' key={index} >
                                                    <AuthInput name="cert" value={info.cert} label="Certification Name" inputGridSm={12} inputType="text" mb={2} onChange={(event) => handleCertChange(event, index)} /> 
                                                    <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                                                    <AuthInput name="date" value={info.date} placeholder="Date Awarded" inputGridSm={12} inputType="date" onChange={(event) => handleCertChange(event, index)} /> 
                                                </Grid>
                                    })}
                                </Grid>
                                <div className={resumeCss.CenteredElem}>
                                    <div style={{marginRight: "10px"}} className='delete' title='Delete Certificate' onClick={handleDeleteCert}>-</div>
                                    <div className='add' title='Add Certificate' onClick={handleAddCert}>+</div>
                                </div>
                            </div>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Awards [If any]</h4>
                            <div>
                                <Grid container sx={{display: "flex", justifyContent: "space-around"}}>
                                    {awardArray.map((info, index) => {
                                        return <Grid item xs={12} md={5} mb={2} className='segment' key={index} >
                                                    <AuthInput name="org" value={info.org} label="Awarding Organization" inputGridSm={12} inputType="text" mb={2} onChange={(event) => handleAwardChange(event, index)} /> 
                                                    <AuthInput name="award" value={info.award} label="Award Received" inputGridSm={12} inputType="text" mb={2} onChange={(event) => handleAwardChange(event, index)} /> 
                                                    <label className={resumeCss.DetachedLabels}>Date Awarded</label>
                                                    <AuthInput name="date" value={info.date} placeholder="Date Awarded" inputGridSm={12} inputType="date" onChange={(event) => handleAwardChange(event, index)} /> 
                                                </Grid>
                                    })}
                                </Grid>
                                <div className={resumeCss.CenteredElem}>
                                    <div style={{marginRight: "10px"}} className='delete' title='Delete Award' onClick={handleDeleteAward}>-</div>
                                    <div className='add' title='Add Award' onClick={handleAddAward}>+</div>
                                </div>
                            </div>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Publications [If any]</h4>
                            <div>
                                <Grid container sx={{display: "flex", justifyContent: "space-around"}}>
                                    {publications.map((info, index) => {
                                        return <Grid item xs={12} md={5} mb={2} className='segment' key={index} >
                                                    <AuthInput name="title" value={info.title} label="Publication Title" inputGridSm={12} inputType="text" mb={2} onChange={(event) => handlePubChange(event, index)} /> 
                                                    <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                                                    <AuthInput name="date" value={info.date} placeholder="Date Awarded" inputGridSm={12} inputType="date" onChange={(event) => handlePubChange(event, index)} /> 
                                                </Grid>
                                    })}
                                </Grid>
                                <div className={resumeCss.CenteredElem}>
                                    <div style={{marginRight: "10px"}} className='delete' title='Delete Publication' onClick={handleDeletePublication}>-</div>
                                    <div className='add' title='Add Publication' onClick={handleAddPublication}>+</div>
                                </div>
                            </div>
                        </div>

                        <div style={{width: "100%", display: "flex", justifyContent: "right", marginBottom: "20px"}}>
                            <div style={{width: "150px"}}>
                                <ButtonSubmitGreen>
                                    <span style={{marginRight: "5px", paddingTop: "1px"}}>Preview </span> <ArrowForwardIosIcon fontSize='inherit' />
                                </ButtonSubmitGreen>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
            {loading && (
                <Modal>
                <h4>Hello {user.firstName}</h4>
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

                <h3>Creating your Resume, I'll only take a minute or less</h3>
                </Modal>
            )}

        </div>
    )
}


export default CustomizeResume;