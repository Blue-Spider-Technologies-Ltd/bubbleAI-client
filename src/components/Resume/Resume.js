import React, { useEffect, useState } from 'react'
import resumeCss from './Resume.module.css'
import { useNavigate, Link } from 'react-router-dom'
import logoImg from "../../images/bubble-logo.png"
import { AuthInput } from '../UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { COUNTRIES } from '../../utils/countries';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/states";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios'
const isAuth = localStorage?.getItem('token')
// import { SelectChangeEvent } from '@mui/material/Select';

const Resume = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.stateData)
    const userLength = Object.keys(user).lengths
    const navigate = useNavigate()
        
    //resume data
    const [basicInfo, setBsicInfo] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        mobileCode: "",
        country: "",
        profSummary: ""
    })
    useEffect(() => {

        if(isAuth) {
            if(userLength > 0 ) {
                //console.log(user)
            } else {
                const populateUser = async () => {
                    try {
                        const response = await axios.get('/user', {
                            headers: {
                                'x-access-token': isAuth
                            }
                        })
                        setBsicInfo({
                            firstName: response.data.user.firstName,
                            lastName: response.data.user.lastName,
                            dob: response.data.user.dob || "",
                            mobileCode: response.data.user.mobileCode || "",
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
    }, [navigate, dispatch, userLength])

    const [error, setError] = useState("")
    const [resumes, showResumes] = useState(false)

    const handleInputChange = (prop) => (event) => {
        // setUser({ ...user, [prop]: event.target.value});
    };
    const [links, addLinks] = useState([<AuthInput label="Add a link e.g linkedin, github or your website" inputType="text" inputGridSm={12} inputGrid={12} mb={2} required={false} onChange={handleInputChange('links')} />]) 
    const [skills, addSkills] = useState([<AuthInput label="Add a Skill" inputType="text" inputGridSm={12} inputGrid={12} mb={2} required={false} onChange={handleInputChange('skills')} />]) 
    const [eduArray, addEduArray] = useState([(<Grid container className='segment'>
                                                    <AuthInput label="Name of Institution" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} /> 
                                                    <AuthInput label="Degree Obtained" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} /> 
                                                    <label className={resumeCss.DetachedLabels} mr={4}>Graduation Date *</label>
                                                    <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={8} inputGrid={2} required={true} /> 
                                                </Grid>
                                            )]) 
    const [workExpArray, addWorkExpArray] = useState([(<Grid container className='segment'>
                                                    <AuthInput label="Company/Org. Name" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} /> 
                                                    <AuthInput label="Position Held" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} /> 
                                                    <label className={resumeCss.DetachedLabels}>From *</label>
                                                    <AuthInput  placeholder="Graduation Date" inputType="date" inputGridSm={9} inputGrid={2} required={true} /> 
                                                    <label className={resumeCss.DetachedLabels} style={{marginRight: "10px"}}>To *</label>
                                                    <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={9} inputGrid={2} required={true} /> 
                                                    <AuthInput placeholder="[Optionally] write a job description and see how I optimise it for you. Leave blank to allow me craft something beautiful" multiline={true} rows={2} inputGridSm={12} /> 
                                                </Grid>
                                            )]) 
    const [certArray, addCertArray] = useState([(<Grid container className='segment'>
                                                    <AuthInput label="Certification Name" inputGridSm={12} inputType="text" mb={2} /> 
                                                    <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                                                    <AuthInput placeholder="Date Awarded" inputGridSm={12} inputType="date" /> 
                                                </Grid>
                                            )]) 
    const [awardArray, addAwardArray] = useState([(<Grid container className='segment'>
                                            <AuthInput label="Name" inputGridSm={12} inputType="text" mb={2} /> 
                                            <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                                            <AuthInput placeholder="Date Awarded" inputGridSm={12} inputType="date" /> 
                                        </Grid>
                                    )]) 
    const [publications, addPublications] = useState([(<Grid container className='segment'>
                                    <AuthInput   label="Title" inputGridSm={12} inputType="text" mb={2} /> 
                                    <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                                    <AuthInput placeholder="Date Awarded" inputGridSm={12} inputType="date" /> 
                                </Grid>
                            )])

    const [country, setCountry] = useState('')
    const [countryCode, setCountryCode] = useState('')
    //Checked if user logged in/found

    const toggleResumes = () => {
        showResumes(!resumes)
    }

    const handleAddLinks = () => {
        setError("")
        const newLink = <AuthInput label="Add a link e.g linkedin, github or your website" inputType="text" inputGridSm={12} inputGrid={12} mb={2} required={false} />
        if(links.length < 3) {
            return addLinks([newLink, ...links])
        }
        setError("You can add a maximum of 3 links")
    }
    const handleDeleteLinks = () => {
        setError("")
        if(links.length > 1) {
            const prevLinks = [...links]
            prevLinks.pop()
            return addLinks([...prevLinks])
        }
        setError("Leave blank, don't delete")
    }


    const handleAddSkill = () => {
        setError("")
        const newSkill = <AuthInput label="Add a skill" inputType="text" inputGridSm={12} inputGrid={12} mb={2} required={false} />
        addSkills([newSkill, ...skills])
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

    
    const handleAddEduInfo = () => {
        setError("")
        const newInfo = (<Grid container className='segment'>
                            <AuthInput label="Name of Institution" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} /> 
                            <AuthInput label="Degree Obtained" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} /> 
                            <label className={resumeCss.DetachedLabels} mr={4}>Graduation Date *</label>
                            <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={8} inputGrid={2} required={true} /> 
                        </Grid>)
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


    const handleAddExp = () => {
        setError("")
        const newInfo = (<Grid container className='segment'>
                            <AuthInput label="Company/Org. Name" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} /> 
                            <AuthInput label="Position Held" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} /> 
                            <label className={resumeCss.DetachedLabels}>From *</label>
                            <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={9} inputGrid={2} required={true} /> 
                            <label className={resumeCss.DetachedLabels} style={{marginRight: "10px"}}>To *</label>
                            <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={9} inputGrid={2} required={true} /> 
                            <AuthInput placeholder="[Optionally] write a job description and see how I optimise it for you. Leave blank to allow me craft something beautiful" multiline={true} rows={2} inputGridSm={12} /> 
                        </Grid>)
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


    const handleAddCert = () => {
        setError("")
        const newCert = (<Grid container className='segment'>
                            <AuthInput label="Certification Name" inputGridSm={12} inputType="text" mb={2} /> 
                            <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                            <AuthInput placeholder="Date Awarded" inputGridSm={12} inputType="date" /> 
                        </Grid>)
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
    

    const handleAddAward = () => {
        setError("")
        const newAward = (<Grid container className='segment'>
                            <AuthInput label="Name" inputGridSm={12} inputType="text" mb={2} /> 
                            <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                            <AuthInput placeholder="Date Awarded" inputGridSm={12} inputType="date" /> 
                        </Grid>)
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

    const handleAddPublication = () => {
        setError("")
        const newPub = (<Grid container className='segment'>
                            <AuthInput label="Title" inputGridSm={12} inputType="text" mb={2} /> 
                            <label className={resumeCss.DetachedLabels}>Date Awarded </label>
                            <AuthInput placeholder="Date Awarded" inputGridSm={12} inputType="date" /> 
                        </Grid>)
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

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(country + countryCode)
    }
    
    const handleSelectChange = (event) => {
        if (event.target.name === "c-code") {
            return setCountryCode(event.target.value)
        }
        setCountry(event.target.value);
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
                                <AuthInput value={basicInfo.firstName} inputType="text" inputGridSm={12} inputGrid={6} mb={2} required={true} disabled={true} onChange={handleInputChange('firstName')} /> 
                                <AuthInput value={basicInfo.lastName} inputType="text" inputGridSm={12} inputGrid={6} mb={0} required={true} disabled={true} onChange={handleInputChange('lastName')} /> 
                                <div style={{width: "100%"}}><div className={resumeCss.DetachedLabels}>Date of Birth *</div></div>
                                <AuthInput placeholder="Date of Birth" inputType="date" inputGridSm={12} inputGrid={2} mb={2} required={true} onChange={handleInputChange('date')} /> 
                                <AuthInput label="Code" inputType="select" inputGridSm={4} inputGrid={3} mb={2} list={COUNTRIES} required={true} changed={handleSelectChange} name='c-code' /> 
                                <AuthInput label="Mobile" inputType="number" inputGridSm={8} inputGrid={7} mb={2} required={true} onChange={handleInputChange('number')} /> 
                                <AuthInput label="Street Name" inputType="text" inputGridSm={7} inputGrid={4} mb={2} required={true} onChange={handleInputChange('street')} /> 
                                <AuthInput label="City" inputType="text" inputGridSm={5} inputGrid={4} mb={2} required={true} onChange={handleInputChange('city')} /> 
                                <AuthInput label="Country" inputType="select2" inputGridSm={12} inputGrid={4} mb={2} list={COUNTRIES} required={true} changed={handleSelectChange} name='country' /> 
                                {links.map((link, index) => {
                                    return <Grid item xs={8} style={{width: "70%"}} key={index}>{link}</Grid>
                                })}
                                <Grid item xs={4} sx={{display: "flex", justifyContent: "center"}}>
                                    <div style={{marginRight: "10px"}} className='delete' title='Delete Link' onClick={handleDeleteLinks}>-</div>
                                    <div className='add' title='Add More Links' onClick={handleAddLinks}>+</div>
                                </Grid>

                                <AuthInput placeholder="[Optionally] write a professional summary and see how I optimise it for you. Leave blank to allow me craft something beautiful" onChange={handleInputChange('prof-sum')} multiline={true} rows={2} inputGridSm={12} mb={2} /> 
                            </Grid>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>Educational Info</h4>
                            <div>
                                {eduArray.map((item, index) => {
                                    return <div key={index}>{item}</div>
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
                                {workExpArray.map((item, index) => {
                                    return <div key={index}>{item}</div>
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
                                <Grid item xs={9}>
                                    {skills.map((skill, index) => {
                                        return <Grid item xs={12} md={6} style={{width: "90%"}} key={index}>{skill}</Grid>
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
                                    {certArray.map((item, index) => {
                                        return <div key={index}>{item}</div>
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
                                    {awardArray.map((item, index) => {
                                        return <div key={index}>{item}</div>
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
                                    {publications.map((item, index) => {
                                        return <div key={index}>{item}</div>
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
        </div>
    )
}


export default Resume;