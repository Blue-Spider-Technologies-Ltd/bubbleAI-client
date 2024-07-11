import React, { useEffect, useState, useRef } from 'react'
import resumeCss from './Resume.module.css'
import { useNavigate } from 'react-router-dom'
import AuthInput from '../UI/Input/AuthInputs'
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import carouselData from './carousel-items';
import { errorAnimation, successMiniAnimation, getOrdinalDate } from "../../utils/client-functions";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import Standard from './Templates/Standard/Standard'
import RadiantMoon from './Templates/RadiantMoon/RadiantMoon';
import SwimmingElephant from './Templates/SwimmingElephant/SwimmingElephant';
import Feedback from '../Dashboard/Feedback';
import jwt_decode from "jwt-decode";
import { SuccessFailureModal } from '../UI/Modal/Modal';
import axios from 'axios';
import { useReactToPrint  } from 'react-to-print';
import { setError, setFetching, setSuccessMini } from "../../redux/states";
import { checkAuthenticatedUser } from '../../utils/client-functions';
import Alert from '@mui/material/Alert';
import { useConfirm } from "material-ui-confirm";
const screenWidth = window.innerWidth


const CarouselItem = ({ item, index, activeIndex, handleItemClick }) => {
    return (
        <div
            className={resumeCss.carouselInner}
            key={index}
            onClick={() => handleItemClick(index)}
        >
            <h5>{item.title}</h5>
            <div className={`${activeIndex === index ? resumeCss.carouselMiddleActive : resumeCss.carouselMiddle}`} style={{backgroundImage: `url(${item.image})` }}>
                {activeIndex === index && <CheckCircleIcon fontSize='inherit' />}
            </div>
        </div>
    );
};


const DownloadResume = () => {
    const { resume, error, successMini, resumeSubDuration, user } = useSelector(state => state.stateData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const componentRef = useRef();
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [isFeedbackTime, setIsFeedbackTime] = useState(false)
    const [canPrint, setCanPrint] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);
    const [carouselName, setCarouselName] = useState("");
    const [imgUrl, setImgUrl] = useState(resume?.storageDetails?.imgUrl || "https://bubble-ai.tech/uploads/avatar.webp");
    const [hasImg, setHasImg] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [resumeNameExist, setResumeNameExist] = useState(false);
    const [shareableLink, setShareableLink] = useState("");
    const [aiSuggestedJobs, setAiSuggestedJobs] = useState([]);
    const [storageDetails, setStorageDetails] = useState({
        name: "",
        desc: "",
        imgUrl:"",
        template: "Standard"
    })
    const isAuth = localStorage?.getItem('token')
    const authUser = isAuth && jwt_decode(isAuth)
    const hasDroppedFeedback = authUser && authUser.rated
   

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }


    useEffect(() => {
        const checkIfAuthUser = async () => {
            try {
                await checkAuthenticatedUser();
            } catch (error) {
                localStorage?.removeItem("token");
                navigate("/popin?resume");
            }
        };
        checkIfAuthUser();

    }, [navigate])

    useEffect(() => {
        const resumeLength = Object.keys(resume).length;
        const userLength = Object.keys(user).length;

        if (resumeLength < 1 || userLength < 1 ) {
            navigate('/user/dashboard/resume?customize');
        } 
    }, [user]);

    
    //scroll to page top on render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
    


    const checkObjectForKeyValue = (arr, key, keyOfKey, searchValue) => {
        if (arr.some(obj => obj[key][keyOfKey] === searchValue)) {
            errorSetter("Resume name already exists")
            setResumeNameExist(true)
        } else {
            setResumeNameExist(false)
        }
    }



    const selectTemplate = () => {
        let template;
   
        switch (carouselName) {
            case "Standard":
                template  = <Standard resume={resume} />
                break;
            case "Radiant Moon":
                template  = <RadiantMoon resume={resume} imgUrl={imgUrl} />
                break;
            case "Swimming Elephant":
                template  = <SwimmingElephant resume={resume} imgUrl={imgUrl} />
                break;
            case "Flying Fish":
            case "Water Train":
            case "Sinking Duck":
                template  = <h5 style={{textAlign: "center", padding: "30px 0 !important"}}>Coming Soon</h5>
                break;
        
            default:
                template  = <h5 style={{textAlign: "center"}}>Pick a template to display here</h5>
                break;
        }

        return template
    }

    const handleResumeSave = async () => {
        const completeResume = { ...resume, storageDetails }
        try {
            dispatch(setFetching(true));
            const response = await axios.post('/user/save-resume', completeResume, {
                headers: {
                    'x-access-token': isAuth
                }
            })
            ////run a CHECK HERE
            localStorage?.removeItem(
                "5787378Tgigi879889%%%%7]][][]]]=-9-0d90900io90799CVBcvVVHGGYUYFUYIOUIUTY0I9T]---000789XZJHVB[[[27627787tdtu&3$*))(990-__)((@@"
            );
            const data = response?.data?.shareableLink
            const data2 = response?.data?.aiSuggestedJobs

            setShareableLink(data)
            setAiSuggestedJobs(data2)
            dispatch(setFetching(false));
            
            if(hasDroppedFeedback) {
                setCompleted(true)
            } else {
                setIsFeedbackTime(true)
            }
        } catch (error) {
            dispatch(setFetching(false));
            console.log(error);
            errorSetter("Not saved to database, Try again")
        }
    }
    
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => handleResumeSave(),
        documentTitle: storageDetails.name
    });
    
    const toggleResumes = () => {
        setAuthMenuOpen(!authMenuOpen)
    }

    const handleInputChange = (prop) => (event) => {
        // console.log(storageDetails);
        setStorageDetails({ ...storageDetails, [prop]: event.target.value });
    };

    const handleItemClick = (index) => {
        const selectedCarousel = carouselData[index];
        setActiveIndex(index);
        setCarouselName(selectedCarousel.title)
    
        let canPrintFlag = false;
        if (selectedCarousel.title === "Radiant Moon" || selectedCarousel.title === "Swimming Elephant") {
            setHasImg(true)
        } else {
            setHasImg(false)
        }
    
        switch (selectedCarousel.title) {
            case "Standard":
                canPrintFlag = true;
                setStorageDetails({ ...storageDetails, template: "Standard" });
                break;
            case "Radiant Moon":
                setStorageDetails({ ...storageDetails, template: "Radiant Moon" });
                canPrintFlag = true;
                break;
            case "Swimming Elephant":
                setStorageDetails({ ...storageDetails, template: "Swimming Elephant" });
                canPrintFlag = true;
                break;
            default:
                canPrintFlag = false;
                break;
        }
    
        setCanPrint(canPrintFlag);
    };


    const saveImageToFolder = (blob, event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', blob);
        
        axios.post('/user/upload-img', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': isAuth
            }
        })
        .then(response => {
            setImgUrl(response.data.url)
            setStorageDetails({ ...storageDetails, imgUrl: response.data.url });
            successSetter(`Image uploaded successfully!`);
            return
        })
        .catch(error => {
            console.error(error);
            errorSetter('Error uploading image.');
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            errorSetter('Kindly select an image file');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
          errorSetter('File size exceeds 2MB limit. Please select a smaller file.');
          return;
        }
    
        saveImageToFolder(file, event)
        return
    };


    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value)
    }
    
    const handleCoverLetterCompose = () => {
        if(!companyName) {
            return errorSetter("Enter the Employer/Company to create Cover Letter")
        }

        if(resumeSubDuration === "Per Use") {
            return errorSetter("Upgrade Subscription to access this feature")
        }
        
        const basicInfo = resume?.basicInfo
        const email = basicInfo.email
        const fullName = basicInfo.firstName + " " + basicInfo.lastName
        const jobPosition = basicInfo.jobPosition
        const skills = resume.skills?.map(skill => `${skill}`).join(', ');
        const pastWorkPositions = resume.workExpArray.map(exp => exp.position).join(', ');
        const date = getOrdinalDate()

        const prompt = `You are a job applicant with the full name: ${fullName}, email address: ${email}, applying for the position of a ${jobPosition} at ${companyName}; you possess the following skills: ${skills}; You have previously held the following roles: ${pastWorkPositions}; and therefore, believe you are the best candidate for the job. Write a stunning professional Cover letter to prove this to your employer using ${date} as the date of application.`
        localStorage.setItem("UF76rOUFfVA6A87AJjhaf6bvaIYI9GHJFJHfgag0HFHJFAfgaHGA", prompt)
        // Open navigate in a new tab
        window.open("/chat", "_blank");

    }

    return (
        <div className="auth-container">
            {/* For SIDE MENU */}
            {/* <AuthSideMenu opened={authMenuOpen} seacrhBarPlaceholder="Search by resume name" hidden={!authMenuOpen} /> */}

            <div style={{ width: '100%', padding: '0' }}>
                <div className="auth-bg-blob">
                </div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                <AuthHeader authMenuOpen={authMenuOpen} onClick={toggleResumes} headerText="Download My Resume" />

                <div className="BodyWrapper">
                    <div className="BuildNavigator">
                        <div><span>1</span>Customise</div>
                        <div><span>2</span>Preview</div>
                        <div className="ActiveNav"><span>3</span>Download</div>
                    </div>
                    <form>
                        <div className='error'>{error}</div>
                        <div className="success-mini">{successMini}</div>
                        <div className='explanation-points'>
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="info">Click Download only when you are sure to download as action is not reversible</Alert>
                            {screenWidth < 900 && <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="info">Flip screen orientation to landscape to display template properly on mobile</Alert>}
                        </div>
                        <div className="Segment">
                            <h4>Save Resume Details</h4>
                            <div>
                                <Grid container>
                                    <AuthInput 
                                        name="resumeName"  
                                        value={storageDetails.name} 
                                        label="Resume Name" 
                                        inputType="text" 
                                        inputGridSm={12} 
                                        inputGrid={12} 
                                        mb={2} 
                                        onChange={handleInputChange('name')} 
                                        onBlur={() => checkObjectForKeyValue(user.resumes, "storageDetails", "name", storageDetails.name)} 
                                    />
                                    <AuthInput name="desc" value={storageDetails.desc} placeholder="Optional Description" multiline={true} rows={2} inputGridSm={12} onChange={handleInputChange('desc')} />
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
                                    ssr={true} // render carousel on server-side.
                                    infinite={true}
                                    keyBoardControl={true}
                                    customTransition="all .5 ease-in-out"
                                    transitionDuration={500}
                                    containerClass="carousel-container"
                                    dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px"
                                    centerMode={ screenWidth > 900 ? false : true}
                                    focusOnSelect={screenWidth < 900}
                                >

                                    {carouselData.map((item, index) => (
                                        <CarouselItem
                                            key={index}
                                            item={item}
                                            index={index}
                                            activeIndex={activeIndex}
                                            handleItemClick={handleItemClick}
                                        />
                                    ))}

                                </Carousel>
                            </div>
                        </div>
                        {hasImg && (
                            <div className="Segment">
                                <h4>Upload Image</h4>
                                <div style={{textAlign: "center", fontSize: ".8rem"}}>
                                    <p>CVs with your image has 80% more chance of being read</p>
                                    <input style={{marginLeft: "50px"}} type="file" accept="image/*" onChange={handleFileChange} />
                                </div>
                            </div>
                        )}


                        <div className="Segment">
                            <h4>View and Download</h4>
                            <div className={resumeCss.ResponsivePrintView}>
                                <div ref={componentRef}>
                                    {selectTemplate()}
                                </div>
                                
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <div style={{ width: "150px" }}>
                                    <ButtonSubmitGreen 
                                        type="button"
                                        onClick={() => {
                                            if(storageDetails.name === "") {
                                                window.scrollTo(0, 0);
                                                return errorSetter('Resume must have a name')
                                            }
                                            if (resumeNameExist) {
                                                window.scrollTo(0, 0);
                                                return errorSetter('Please change the resume name')
                                            }
                                            if(!canPrint) {
                                                return errorSetter('Select an AVAILABLE template to print')
                                            }
                                            if (resumeSubDuration === "Per Use" && carouselName !== "Standard") {
                                                return errorSetter("Your Subscription tier can not use this template")
                                            }
                                            confirm({ 
                                                    description: "Click OK only if you are sure to download, You must save or print your resume if you click OK. You can SCALE FONT and ADD/REDUCE MARGIN in the advanced setting of the next pop up, but you CAN NOT return here",
                                                    title: "This action is irreversible"
                                                })
                                                .then(() => {
                                                    handlePrint()
                                                })
                                                .catch(() => {
                                                    errorSetter("Resume not yet printed")
                                                });
                                        }}
                                    >
                                        <DownloadForOfflineIcon fontSize='medium' /><span style={{ marginLeft: '5px', addingTop: "1px" }}>Download PDF </span>
                                    </ButtonSubmitGreen>
                                </div>
                            </div>
                        </div>


                    </form>

                </div>

            </div>
            
            {!hasDroppedFeedback && isFeedbackTime && <Feedback notApaymentTextPositive="Resume Creation Completed!"/>}
            {completed &&  (                
                <SuccessFailureModal 
                    success={true} 
                    notApaymentTextPositive="Resume Creation Completed!"
                    notApayment={true}
                    label="Company Name"
                    value={companyName}
                    handleChange={handleCompanyNameChange}
                    handleCoverLetterCompose={handleCoverLetterCompose}
                    shareableLink={shareableLink}
                    aiSuggestedJobs={aiSuggestedJobs}
                />
            )}
                            
            

        </div>
    )
}


export default DownloadResume;