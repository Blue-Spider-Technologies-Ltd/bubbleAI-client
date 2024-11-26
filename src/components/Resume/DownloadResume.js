import React, { useEffect, useState, useRef } from 'react'
import resumeCss from './Resume.module.css'
import { SuccessFailureModal, Overlay, CheckoutSummaryModal } from '../UI/Modal/Modal';
import ResumePricing from '../Pricing/ResumePricing';
import axios from 'axios';
import { setError, setFetching, setSuccessMini, setResume } from "../../redux/states";
import { checkAuthenticatedUser } from '../../utils/client-functions';
import Alert from '@mui/material/Alert';
import { pdf, PDFViewer, StyleSheet, Text, Document, Page } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ProtectedContent from "../UI/ProtectedContent/ProtectedContent ";
import { useConfirm } from "material-ui-confirm";
import avatarImg from '../../images/avatar.png'
import { useNavigate } from 'react-router-dom'
import AuthInput from '../UI/Input/AuthInputs'
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ButtonSubmitGreen, ButtonOutlineGreenWithDiffStyle } from '../UI/Buttons/Buttons';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { PiPlugsConnected } from "react-icons/pi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import carouselData from './carousel-items';
import { errorAnimation, successMiniAnimation } from "../../utils/client-functions";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import AuthHeader from '../UI/AuthHeader/AuthHeader';
import StandardPDF from './Templates/Standard/StandardPDF'
import EuroPass from './Templates/Europass/EuroPass';
import Auckland from './Templates/Auckland/Auckland';
import Feedback from '../Dashboard/Feedback';
import {jwtDecode} from 'jwt-decode';
import ChatwootWidget from "../../utils/chatwoot";
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

const styles = StyleSheet.create({
    viewerContainer: {
        width: '100%',
        height: screenWidth > 800 ? 1000 : 700
    },
    StandardContainer: {
        display: "block",
        padding: 20,
        lineHeight: 1.2,
        fontSize: 20,
        fontWeight: '900',
        paddingTop: 50
    },
});


const DownloadResume = () => {
    const { resume, error, successMini, resumeSubDuration, user, showCheckout } = useSelector(state => state.stateData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const componentRef = useRef();
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [hasDownloadedCv, setHasDownloadedCv] = useState(false)
    const [isFeedbackTime, setIsFeedbackTime] = useState(false)
    const [canPrint, setCanPrint] = useState(false)
    const [activeIndex, setActiveIndex] = useState(null);
    const [carouselName, setCarouselName] = useState("");
    const [imgUrl, setImgUrl] = useState(resume?.storageDetails?.imgUrl || avatarImg);
    const [hasImg, setHasImg] = useState(false);
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
        const handleContextMenu = (event) => {
            event.preventDefault(); // Prevent the default right-click context menu
        };

        document.addEventListener('contextmenu', handleContextMenu);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

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
                template  = <Auckland resume={resume} imgUrl={imgUrl} />
                break;
            case "Flying Fish":
            case "Water Train":
            case "Sinking Duck":
                template  = (<Document>
                                <Page style={styles.StandardContainer}>
                                    <Text style={{textAlign: "left"}}>Template coming soon</Text>
                                </Page>
                            </Document>)
                break;
        
            default:
                template  = (<Document>
                                <Page style={styles.StandardContainer}>
                                    <Text style={{textAlign: "left"}}>Pick a template to display here</Text>
                                </Page>
                            </Document>)
                break;
        }

        return template
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
        if (selectedCarousel.title === "Euro Pass" || selectedCarousel.title === "Auckland" || selectedCarousel.title === "Flying Fish" || selectedCarousel.title === "Water Train") {
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
                canPrintFlag = false;
                break;
            case "Water Train":
                setStorageDetails({ ...storageDetails, template: "Water Train" });
                canPrintFlag = false;
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
            const imageUrl = response.data.url
            const secureImageUrl = imageUrl.slice(0, 4) + 's' + imageUrl.slice(4);
            setImgUrl(secureImageUrl)
            setStorageDetails({ ...storageDetails, imgUrl: secureImageUrl });
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

        
    const handleJobConnect = () => {
        if(hasDownloadedCv) {
            navigate('/user/dashboard/job-hub')
        } else {
            errorSetter("Download resume to proceed")
        }
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

            if(!hasDownloadedCv) {
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
                
                if(!hasDroppedFeedback) {
                    setIsFeedbackTime(true)
                }
                setHasDownloadedCv(true)
            }
            successSetter("CV Downloaded Successfully")

        } catch (error) {
            dispatch(setFetching(false));
            errorSetter("Not saved to database, Try again")
        }

        dispatch(setFetching(false));
    }


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
            return errorSetter("Upgrade to Monthly or Weeekly for this template")
        }
        const note = screenWidth < 900 ? 'Click OK only when instruction completed. MOBILE DETECTED! Enable browser pop-ups to let CV download. Go to Phone settings ⚙️; Search pop-up and allow it. After that, your resume will open in another tab, click the share (📤) button on your browser to save to files or share. RETURN BACK TO THIS TAB WHEN DONE FOR JOBS DISPLAY AND COVER LETTERS' : 'This action is irreversible, continue?'
        confirm({ 
                description: note,
                title: "⚠️⚠️⚠️PLEASE READ⚠️⚠️⚠️"
            })
            .then(() => {
                handleResumeSave()
            })
            .catch(() => {
                errorSetter("Resume not yet printed")
            });
    }

    const handleContextMenu = (event) => {
        event.preventDefault(); // Prevent the default right-click context menu
    };

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
                            {screenWidth < 900 && <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="error">MOBILE DETECTED: Enable browser pop-ups to allow CV download. Go to Phone settings ⚙️; Search pop-up and allow it. If you do not, you will lose your download and Bubble Ai will not be liable.</Alert>}
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

                            {screenWidth < 900 && (
                                <Alert 
                                    sx={{ 
                                        width: '100%',  
                                        padding: '0 5px', 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        fontSize: '.7rem'
                                    }} 
                                    severity="info"
                                >
                                    <div>Only first page is displayed on mobile. Download for complete view</div>
                                </Alert>
                            )}
                            {!isSubscribed && (
                                <Alert 
                                    sx={{ 
                                        width: '100%',  
                                        padding: '0 5px', 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        fontSize: '.7rem',
                                        marginTop: '10px'
                                    }} 
                                    severity="info"
                                >
                                    <div><a href='/pricing' className='link' target='_blank'>Upgrade Subscription Here</a> to enable resume scrolling</div>
                                </Alert>
                            )}


                            <ProtectedContent>
                                <div id="ComponentRef" ref={componentRef} className={resumeCss.ResponsivePrintView}>
                                    <div style={{ height: '50px', width: '27%', position: 'absolute', right: '2px', top: '2px', backgroundColor: screenWidth > 700 ? '#323639' : 'white', zIndex: 20}}>
                                    </div>
                                    <PDFViewer style={styles.viewerContainer} >
                                        {selectTemplate()}
                                    </PDFViewer>
                                    {!isSubscribed && (
                                        <div 
                                            onContextMenu={handleContextMenu} 
                                            style={{ 
                                                position: 'absolute', 
                                                top: 0, 
                                                left: 0, 
                                                right: 0, 
                                                bottom: 0, 
                                                zIndex: 1 
                                            }} 
                                        />
                                    )}
                                </div>
                            </ProtectedContent>


                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                                <div style={{ width: screenWidth < 500 ? "250px" : "350px" }}>
                                    <ButtonOutlineGreenWithDiffStyle type="button" onClick={handleDownload}>
                                        <DownloadForOfflineIcon fontSize='medium' /><span style={{ marginLeft: '5px', paddingTop: "1px" }}>Download Resume </span>
                                    </ButtonOutlineGreenWithDiffStyle>
                                </div>
                            </div>


                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <div style={{ width: screenWidth <= 500 ? "250px" : "350px" }}>
                                    <ButtonSubmitGreen 
                                        type="button"
                                        onClick={handleJobConnect}
                                    >
                                        <PiPlugsConnected style={{color: "#F8E231", fontSize: "1.5rem"}} /><span style={{ marginLeft: '5px', paddingTop: "1px" }}>Bubble AI Jobs Connect</span>
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
                    imgUrl={imgUrl}
                />
            )}
                            
            <ChatwootWidget />
        </div>
    )
}


export default DownloadResume;