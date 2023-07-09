import React, { useEffect, useState } from 'react'
import resumeCss from './Resume.module.css'
import { useNavigate, Link } from 'react-router-dom'
import logoImg from "../../images/bubble-logo.png"
import AuthInput from '../UI/Input/AuthInputs'
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Modal from '../UI/Modal/Modal';
import { Rings, Watch } from 'react-loader-spinner'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import carouselData from './carousel-items';
import standardTempImg from "../../images/resume-standard.png"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import resumeData from './resume.json'
import Standard from './Templates/Standard/Standard';
import jwt_decode from "jwt-decode";
// console.log(resumeData);
const screenWidth = window.innerWidth

const DownloadResume = () => {
    const { resume } = useSelector(state => state.stateData)
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [prevResumes, showPrevResumes] = useState(false)
    //Option for carousel in template section
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        slidesToSlide: 3 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 700 },
        items: 3,
        slidesToSlide: 2 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 700, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };

    const isAuth = localStorage.getItem('token')
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
        const now = new Date().getTime()
        const authUser =  jwt_decode(isAuth)
        console.log(resume);
        if (isAuth && (now < authUser.expiration)) {
            // if (resumeLength <= 0) {
            //     navigate('/user/dashboard/resume?customize')
            // }

        } else {
            localStorage.removeItem('token')
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
                            <div className={resumeCss.TemplateContainer}>
                                <Carousel
                                    responsive={responsive}
                                    swipeable={true}
                                    draggable={true}
                                    ssr={true} // means to render carousel on server-side.
                                    infinite={true}
                                    keyBoardControl={true}
                                    customTransition="all .5 ease-in-out"
                                    transitionDuration={500}
                                    containerClass="carousel-container"
                                    dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px"
                                    centerMode={ screenWidth > 900 ? false : true}
                                    focusOnSelect={true}
                                >
                                    <div className={resumeCss.carouselInner} >
                                        <h5>Standard</h5>
                                        <div className={resumeCss.carouselMiddleActive} style={{backgroundImage: `url(${standardTempImg})` }}>
                                            <CheckCircleIcon fontSize='inherit' />
                                        </div>
                                    </div>

                                    {carouselData.map((item, index) => {
                                        return (
                                            <div className={resumeCss.carouselInner} key={index} >
                                                <h5>{item.title}</h5>
                                                <div className={resumeCss.carouselMiddle} style={{backgroundImage: `url(${item.image})` }}>

                                                </div>
                                            </div>
                                        )
                                    })}
                                </Carousel>
                            </div>
                        </div>
                        <div className={resumeCss.Segment}>
                            <h4>View and Download</h4>
                            <div className={resumeCss.ResponsivePrintView}>
                                    <Standard resume={resumeData} />
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

