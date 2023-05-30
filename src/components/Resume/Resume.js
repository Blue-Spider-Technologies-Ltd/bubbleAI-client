import React, { useEffect, useState } from 'react'
import resumeCss from './Resume.module.css'
import { useNavigate, Link } from 'react-router-dom'
import logoImg from "../../images/bubble-logo.png"
import { AuthInput } from '../UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { COUNTRIES } from '../../utils/countries';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/states";
import axios from 'axios'
const isAuth = localStorage?.getItem('token')
// import { SelectChangeEvent } from '@mui/material/Select';

const Resume = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [resumes, showResumes] = useState(false)
    const [links, addLinks] = useState([<AuthInput label="Add a link e.g linkedin, github or your website" inputType="text" inputGridSm={11} inputGrid={11} mb={2} required={false} />] ) 
    const [eduArray, addEduArray] = useState([(<Grid container className='segment'>
                                                    <AuthInput label="Name of Institution" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} /> 
                                                    <AuthInput label="Degree Obtained" inputType="text" inputGridSm={12} inputGrid={4} mb={2} required={true} /> 
                                                    <label className={resumeCss.DetachedLabels} mr={4}>Graduation Date *</label>
                                                    <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={8} inputGrid={2} required={true} /> 
                                                </Grid>
                                            )]) 
    const [workExpArray, addWorkExpArray] = useState([( <Grid container className='segment'>
                                                    <AuthInput label="Company/Org. Name" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} /> 
                                                    <AuthInput label="Position Held" inputType="text" inputGridSm={12} inputGrid={3} mb={2} required={true} /> 
                                                    <label className={resumeCss.DetachedLabels}>From *</label>
                                                    <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={4} inputGrid={2} required={true} /> 
                                                    <label className={resumeCss.DetachedLabels}>To *</label>
                                                    <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={4} inputGrid={2} required={true} /> 
                                                    <AuthInput  placeholder="[Optionally] write a job description and see how I optimise it for you. Leave blank to allow me craft something beautiful" multiline={true} rows={2} inputGridSm={12} /> 
                                                </Grid>
                                            )]) 
    const { user } = useSelector(state => state.stateData)
    const dispatch = useDispatch()
    const userLength = Object.keys(user).length

    //Checked if user logged in/found
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

    const toggleResumes = () => {
        showResumes(!resumes)
    }

    const handleAddLinks = () => {
        setError("")
        const newLink = <AuthInput label="Add a link e.g linkedin, github or your website" inputType="text" inputGridSm={11} inputGrid={11} mb={2} required={false} />
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
                            <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={4} inputGrid={2} required={true} /> 
                            <label className={resumeCss.DetachedLabels}>To *</label>
                            <AuthInput placeholder="Graduation Date" inputType="date" inputGridSm={4} inputGrid={2} required={true} /> 
                            <AuthInput  placeholder="[Optionally] write a job description and see how I optimise it for you. Leave blank to allow me craft something beautiful" multiline={true} rows={2} inputGridSm={12} /> 
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
    
    // const handleSelectChange = (event: SelectChangeEvent) => {
    //     setCountry(event.target.value);
    // };
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

                    <form>
                        <div className='error'>{error}</div>
                        <div className={resumeCss.Segment}>
                            <h4>Basic Info</h4>
                            <Grid container>
                                <AuthInput value={user.firstName} inputType="text" inputGridSm={12} inputGrid={6} mb={2} required={true} disabled={true} /> 
                                <AuthInput value={user.lastName} inputType="text" inputGridSm={12} inputGrid={6} mb={0} required={true} disabled={true} /> 
                                <div style={{width: "100%"}}><div className={resumeCss.DetachedLabels}>Date of Birth *</div></div>
                                <AuthInput placeholder="Date of Birth" inputType="date" inputGridSm={12} inputGrid={2} mb={2} required={true} /> 
                                <AuthInput label="Code" inputType="select" inputGridSm={4} inputGrid={3} mb={2} list={COUNTRIES} required={true} /> 
                                <AuthInput label="Mobile" inputType="number" inputGridSm={8} inputGrid={7} mb={2} required={true} /> 
                                <AuthInput label="Street Name" inputType="text" inputGridSm={7} inputGrid={4} mb={2} required={true} /> 
                                <AuthInput label="City" inputType="text" inputGridSm={5} inputGrid={4} mb={2} required={true} /> 
                                <AuthInput label="Country" inputType="select2" inputGridSm={12} inputGrid={4} mb={2} list={COUNTRIES} required={true} /> 
                                {links.map((link, index) => {
                                    return <div style={{width: "70%"}} key={index}>{link}</div>
                                })}
                                <div style={{marginRight: "10px"}} className='delete' title='Delete Link' onClick={handleDeleteLinks}>-</div>
                                <div className='add' title='Add More Links' onClick={handleAddLinks}>+</div>
                                <AuthInput  placeholder="[Optionally] write a professional summary and see how I optimise it for you. Leave blank to allow me craft something beautiful" multiline={true} rows={2} inputGridSm={12} mb={2} /> 
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
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Resume;