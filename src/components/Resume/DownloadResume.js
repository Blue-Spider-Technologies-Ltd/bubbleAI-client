import React, { useEffect, useState, useRef } from 'react'
import resumeCss from './Resume.module.css'
import { useNavigate } from 'react-router-dom'
import AuthInput from '../UI/Input/AuthInputs'
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import carouselData from './carousel-items';
import standardTempImg from "../../images/resume-standard.png";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import Standard from './Templates/Standard/Standard';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useReactToPrint  } from 'react-to-print';
// console.log(resumeData);
const screenWidth = window.innerWidth

const DownloadResume = () => {
    const { resume } = useSelector(state => state.stateData)
    const navigate = useNavigate()
    const componentRef = useRef();
    const [error, setError] = useState("")
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const [resumeStorageDetails, setResumeStorageDetails] = useState({
        resumeName: "",
        desc: ""
    })
    const isAuth = localStorage?.getItem('token')
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
    //scroll to page top on render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const resumeLength = Object.keys(resume).length        
        const now = new Date().getTime()
        const authUser =  jwt_decode(isAuth)
        console.log(resume);
        if (isAuth && (now < authUser.expiration)) {
            if (resumeLength <= 0) {
                navigate('/user/dashboard/resume?customize')
            }

        } else {
            localStorage?.removeItem('token')
            navigate('/popin')
        }
    }, [isAuth, navigate, resume])


    const handleResumeSave = async () => {
        const completeResume = { ...resume, resumeStorageDetails }
        try {
            const response = await axios.post('/user/save-resume', completeResume, {
                headers: {
                    'x-access-token': isAuth
                }
            })
            console.log(response);
        } catch (error) {
            console.log(error)
            setError("Try again")
        }
    }
    
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => handleResumeSave(),
        documentTitle: resumeStorageDetails.resumeName
    });
    
    const toggleResumes = () => {
        setAuthMenuOpen(!authMenuOpen)
    }

    const handleInputChange = (prop) => (event) => {
        // console.log(resumeStorageDetails);
        setResumeStorageDetails({ ...resumeStorageDetails, [prop]: event.target.value });
    };

    return (
        <div className="auth-container">
        {/* For SIDE MENU */}
        <AuthSideMenu opened={authMenuOpen} seacrhBarPlaceholder="Search by resume name" hidden={!authMenuOpen} />

            <div style={{ width: '100%', padding: '0' }}>
                <div className="auth-bg-blob">
                </div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                <AuthHeader authMenuOpen={authMenuOpen} onClick={toggleResumes} headerText="Create My Resume" />

                <div className="BodyWrapper">
                    <div className="BuildNavigator">
                        <div><span>1</span>Customise</div>
                        <div><span>2</span>Preview AI Build</div>
                        <div className="ActiveNav"><span>3</span>Download</div>
                    </div>
                    <form>
                        <div className='error'>{error}</div>
                       
                        <div className="Segment">
                            <h4>Save Resume Details</h4>
                            <div>
                                <Grid container>
                                    <AuthInput name="resumeName" value={resumeStorageDetails.resumeName} label="Resume Name" inputType="text" inputGridSm={12} inputGrid={12} mb={2} required={true} onChange={handleInputChange('resumeName')} />
                                    <AuthInput name="desc" value={resumeStorageDetails.desc} label="Optional Description" multiline={true} rows={2} inputGridSm={12} onChange={handleInputChange('desc')} />
                                </Grid>
                            </div>
                        </div>

                        <div className="Segment">
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
                        <div className="Segment">
                            <h4>View and Download</h4>
                            <div className={resumeCss.ResponsivePrintView}>
                                <div ref={componentRef}>
                                    <Standard resume={resume} />
                                </div>
                                
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <div style={{ width: "150px" }}>
                                    <ButtonSubmitGreen type="button" onClick={() => {
                                        if(resumeStorageDetails.resumeName === "") {
                                            return setError('Resume must have a name')
                                        }
                                        handlePrint()
                                    }}>
                                        <DownloadForOfflineIcon fontSize='medium' /><span style={{ marginLeft: '5px', addingTop: "1px" }}>Download PDF </span>
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}


export default DownloadResume;

