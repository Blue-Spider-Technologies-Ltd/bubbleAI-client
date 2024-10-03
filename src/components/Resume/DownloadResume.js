import React, { useEffect, useState, useRef } from 'react'
import resumeCss from './Resume.module.css'
import { SuccessFailureModal, Overlay, CheckoutSummaryModal } from '../UI/Modal/Modal';
import ResumePricing from '../Pricing/ResumePricing';
import axios from 'axios';
import { setError, setFetching, setSuccessMini, setResume } from "../../redux/states";
import { checkAuthenticatedUser } from '../../utils/client-functions';
import Alert from '@mui/material/Alert';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ProtectedContent from "../UI/ProtectedContent/ProtectedContent ";
import { useConfirm } from "material-ui-confirm";
import avatarImg from '../../images/avatar.png'
import { useNavigate } from 'react-router-dom'
import AuthInput from '../UI/Input/AuthInputs'
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import carouselData from './carousel-items';
import { errorAnimation, successMiniAnimation } from "../../utils/client-functions";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import StandardPDF from './Templates/Standard/StandardPDF'
import EuroPass from './Templates/Europass/EuroPass';
import Feedback from '../Dashboard/Feedback';
import {jwtDecode} from 'jwt-decode';;
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
    const { resume, error, successMini, resumeSubDuration, user, showCheckout } = useSelector(state => state.stateData)
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
    const [imgUrl, setImgUrl] = useState(resume?.storageDetails?.imgUrl || avatarImg);
    const [hasImg, setHasImg] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [resumeNameExist, setResumeNameExist] = useState(false);
    const [shareableLink, setShareableLink] = useState("");
    const [aiSuggestedJobs, setAiSuggestedJobs] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(true);
    const [isFirstFreeSetOnDB, setIsFirstFreeSetOnDB] = useState(false)
    const [storageDetails, setStorageDetails] = useState({
        name: "",
        desc: "",
        imgUrl:"",
        template: "Standard",
        resumeLink: "",
        buildDate: ""
    })
    const isAuth = localStorage?.getItem('token')
    const authUser = isAuth && jwtDecode(isAuth)
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


    useEffect(() => {
        let timer;
    
        const runSubTimerForNewUser = () => {
            if (!user?.resumeSubscriptions?.subscribed) {
                errorSetter("Select a package to get all BENEFITS");
                if (!isFirstFreeSetOnDB) {
                    setIsFirstFreeUsedAndUpdateDB();
                }
            }
        };

        timer = setTimeout(runSubTimerForNewUser, 180000); // 3 minute
        
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    
    const setIsFirstFreeUsedAndUpdateDB = () => {
        dispatch(setFetching(true))
        axios
            .get('/set-first-free-used', {
                headers: {
                    'x-access-token': isAuth,
                },
            })
            .then((response) => {
                setIsFirstFreeSetOnDB(true);
                setIsSubscribed(false);
            })
            .catch((error) => {
                setIsFirstFreeSetOnDB(false);
            });
            dispatch(setFetching(false))
    };
    
    
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

    const handleFirstFreeDownloadRestrict = () => {

        if (!user.isFirstFreeUsed) {
            if (!isFirstFreeSetOnDB) {
                setIsFirstFreeUsedAndUpdateDB();
            }
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
                template  = <StandardPDF resume={resume} />
                break;
            case "Euro Pass":
                template  = <EuroPass resume={resume} imgUrl={imgUrl} />
                break;
            case "Auckland":
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
        dispatch(setFetching(true));
        //set Resume for cover letter use
        dispatch(setResume(resume));
    
        try {
            const fileName = storageDetails.name + '.pdf';
            const blob = await pdf(selectTemplate()).toBlob();

            if(screenWidth < 1000) {
                // Mobile
                const blobUrl = URL.createObjectURL(blob);
                window.open(blobUrl, '_blank');
            } else {
                saveAs(blob, fileName);
            }
            // const jobs = [
            //     {title: 'Senior Software Engineer', company_name: "Blue Spider Tech", location: 'Abuja Nigeria', salary: '$120,000 - $150,000', company_url: '/chat', url: '/chat'},
            //     {title: 'Senior Software Engineer', company_name: "Blue Spider Tech", location: 'Abuja Nigeria', salary: '$120,000 - $150,000', company_url: '/chat', url: '/chat'},
            //     {title: 'Senior Software Engineer', company_name: "Blue Spider Tech", location: 'Abuja Nigeria', salary: '$120,000 - $150,000', company_url: '/chat', url: '/chat'},
            // ]
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
            // const data2 = response?.data?.aiSuggestedJobs

            setShareableLink(data)
            // setAiSuggestedJobs(jobs)
            dispatch(setFetching(false));
            
            if(hasDroppedFeedback) {
                setCompleted(true)
            } else {
                setIsFeedbackTime(true)
            }
        } catch (error) {
            dispatch(setFetching(false));
            errorSetter("Not saved to database, Try again")
        }

        dispatch(setFetching(false));
    }


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
        if (selectedCarousel.title === "Euro Pass" || selectedCarousel.title === "Swimming Elephant" || selectedCarousel.title === "Flying Fish" || selectedCarousel.title === "Water Train") {
            setHasImg(true)
        } else {
            setHasImg(false)
        }
    
        switch (selectedCarousel.title) {
            case "Standard":
                canPrintFlag = true;
                setStorageDetails({ ...storageDetails, template: "Standard" });
                break;
            case "Euro Pass":
                setStorageDetails({ ...storageDetails, template: "Euro Pass" });
                canPrintFlag = true;
                break;
            case "Auckland":
                setStorageDetails({ ...storageDetails, template: "Auckland" });
                canPrintFlag = true;
                break;
            case "Flying Fish":
                setStorageDetails({ ...storageDetails, template: "Flying Fish" });
                canPrintFlag = true;
                break;
            case "Water Train":
                setStorageDetails({ ...storageDetails, template: "Water Train" });
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
        setFetching(true)
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
            setFetching(false)
            successSetter(`Image uploaded successfully!`);
            return
        })
        .catch(error => {
            setFetching(false)
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


    const handleDownload = () => {
        if(!canPrint) {
            return errorSetter('Select an AVAILABLE template to print')
        }
        //check if user used first free use already and if not subscribed
        if(!user?.resumeSubscriptions?.subscribed) {
            errorSetter('Please SUBSCRIBE to download resume plus other BENEFITS')
            handleFirstFreeDownloadRestrict()
            setIsSubscribed(false)
            return
        }
        if(storageDetails.name === "") {
            window.scrollTo(0, 0);
            return errorSetter('Resume must have a name')
        }
        if (resumeNameExist) {
            window.scrollTo(0, 0);
            return errorSetter('Please change the resume name')
        }
        if (resumeSubDuration === "Per Use" && carouselName !== "Standard") {
            return errorSetter("Your Subscription tier can not use this template")
        }
        const note = screenWidth < 900 ? 'Click OK only when instruction completed. MOBILE DETECTED! Enable browser pop-ups to let CV download. Go to Phone settings ⚙️; Search pop-up and allow it. After that, your resume will open in another tab, click the share (📤) button on your browser to save to files or share. RETURN BACK TO THIS TAB WHEN DONE FOR JOBS DISPLAY AND COVER LETTERS' : 'This action is irreversible, continue?'
        confirm({ 
                description: note,
                title: "⚠️⚠️⚠️PLEASE READ⚠️⚠️⚠️"
            })
            .then(() => {
                // handlePrint()
                handleResumeSave()
            })
            .catch(() => {
                errorSetter("Resume not yet printed")
            });
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
                <AuthHeader authMenuOpen={authMenuOpen} onClick={toggleResumes} headerText="Download Resume" />

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
                            {screenWidth < 900 && <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="error">MOBILE DETECTED: Enable browser pop-ups to let CV download. Go to Phone settings ⚙️; Search pop-up and allow it. If you do not, you will lose your download and Bubble Ai will not be liable.</Alert>}
                            <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="warning">Click Download only when you are sure to download as action is not reversible</Alert>
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
                                    <p>CVs with your image have 80% more chance of being read</p>
                                    <input style={{marginLeft: "50px"}} type="file" accept="image/*" onChange={handleFileChange} />
                                </div>
                            </div>
                        )}


                        <div className="Segment">
                            <h4>View and Download</h4>
                            
                                <ProtectedContent>
                                    <div id="ComponentRef" ref={componentRef} className={resumeCss.ResponsivePrintView}>
                                        {selectTemplate()}
                                    </div>
                                </ProtectedContent>
                            
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <div style={{ width: "150px" }}>
                                    <ButtonSubmitGreen 
                                        type="button"
                                        onClick={handleDownload}
                                    >
                                    
                                        <DownloadForOfflineIcon fontSize='medium' /><span style={{ marginLeft: '5px', addingTop: "1px" }}>Download PDF </span>
                                    </ButtonSubmitGreen>
                                </div>
                                
                            </div>
                        </div>

                    </form>

                </div>

            </div>

            {!isSubscribed && (
                <Overlay prevPath="/user/dashboard/resume">
                    <ResumePricing />
                </Overlay>
            )}

            {showCheckout && <CheckoutSummaryModal />}
            
            {!hasDroppedFeedback && isFeedbackTime && <Feedback notApaymentTextPositive="Resume Creation Completed!"/>}
            {completed &&  (                
                <SuccessFailureModal 
                    success={true} 
                    notApaymentTextPositive="Resume Creation Completed!"
                    notApayment={true}
                    resume={resume}
                    shareableLink={shareableLink}
                    aiSuggestedJobs={aiSuggestedJobs}
                    template={storageDetails.template}
                />
            )}
                            
            

        </div>
    )
}


export default DownloadResume;