import React, { useEffect, useState } from 'react'
import resumeCss from './Resume.module.css'
import { useNavigate, Link } from 'react-router-dom'
import logoImg from "../../images/bubble-logo.png"
import { AuthInput } from '../UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Modal from '../UI/Modal/Modal';
import { Rings, Watch } from 'react-loader-spinner'
// import theme from 'jsonresume-theme-macchiato'
import resumeJson from './resume.json'
const screenWidth = window.innerWidth

const DownloadResume = () => {
    const { resume } = useSelector(state => state.stateData)
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [prevResumes, showPrevResumes] = useState(false)
    // const resumeHtml = theme.render(resumeJson);

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
    // const [linkInfo, setLinkInfo] = useState([])
    // const [skills, setSkills] = useState([])
    // const [eduArray, setEduArray] = useState([])
    // const [workExpArray, setWorkExpArray] = useState([])
    // const [certArray, setCertArray] = useState([])
    // const [awardArray, setAwardArray] = useState([])
    // const [publications, setPublications] = useState([])
    useEffect(() => {
        const resumeLength = Object.keys(resume).length
        if (isAuth) {
            // if (resumeLength <= 0) {
            //     navigate('/user/dashboard/resume?customize')
            // }

        } else {
            navigate('/popin')
        }
    }, [isAuth, navigate, resume])

    const toggleResumes = () => {
        showPrevResumes(!prevResumes)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // const resumeData = {
        //     basicInfo: basicInfo,           //Object
        //     linkInfo: linkInfo,             //Array
        //     skills: skills,                 //Array
        //     eduArray: eduArray,             //Array
        //     workExpArray: workExpArray,     //Array
        //     certArray: certArray,           //Array
        //     awardArray: awardArray,         //Array
        //     // publications: publications      //Array
        // }

        try {
            setLoading(false)
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
                        <div><span>2</span>Preview AI Build</div>
                        <div className={resumeCss.ActiveNav}><span>3</span>Download</div>
                    </div>
                    <form method="post" onSubmit={handleFormSubmit}>
                        <div className='error'>{error}</div>
                       

                        <div className={resumeCss.Segment}>
                            <h4>Save Resume Details</h4>
                            <div>
                                <Grid container>
                                    <AuthInput name="resumeName" value="" label="Resume Name" inputType="text" inputGridSm={12} inputGrid={12} mb={2} required={true} onChange={handleInputChange('resumeName')} />
                                    <AuthInput name="desc" value="" label="Optional Description" multiline={true} rows={2} inputGridSm={12} onChange={handleInputChange('desc')} />
                                </Grid>
                            </div>
                        </div>

                        <div className={resumeCss.Segment}>
                            <h4>Choose Template</h4>
                            <div>

                            </div>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>View and Download</h4>
                            <div>
                            {/* <div dangerouslySetInnerHTML={{ __html: resumeHtml }} /> */}
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <div style={{ width: "150px" }}>
                                    <ButtonSubmitGreen>
                                        <DownloadForOfflineIcon fontSize='medium' /><span style={{ marginLeft: '5px', addingTop: "1px" }}>Download PDF </span>
                                    </ButtonSubmitGreen>
                                </div>
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


export default DownloadResume;