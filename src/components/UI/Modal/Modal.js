import React, { useState } from 'react';
import axios from 'axios';
import modalCss from './Modal.module.css'
import Blob from '../Blob/Blob';
import { Box, Grid, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import bubbleBgAuthImg from '../../../images/bubblebg-auth.png';
import logoImg from "../../../images/bubble-logo.png";
import secureImg from "../../../images/secure.png";
import { Rings, Watch } from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { setShowCheckout } from "../../../redux/states"
import AuthInput from '../Input/AuthInputs';
import { ButtonSubmitBlack, ButtonSubmitGreen, ButtonOutlineGreenWithDiffStyle, ButtonThin } from '../Buttons/Buttons';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { ThreeCircles } from 'react-loader-spinner';
import refundImg from '../../../images/refund-stamp.png';
import successImg from '../../../images/success.gif';
import failedImg from '../../../images/failed.gif';
import { reviewDetails } from '../../../utils/reviews';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { checkAuthenticatedUser, errorAnimation, successMiniAnimation, getOrdinalDate } from '../../../utils/client-functions';
import { setFetching, setError, setSuccessMini } from '../../../redux/states';
const screenWidth = window.innerWidth;
const isAuth = localStorage?.getItem('token');

//progress bar styling
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 15,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: '15px',
      backgroundColor: '#99E1E4',
      height: '10px'
    },
}));

//Option for carousel in resume template section
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 700 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 700, min: 0 },
        items: 1
    }
};

//This Modal is for Progress
export const Modal = ({header3, header4, progress}) => {

    return (
        <div className={modalCss.ModalContainer}>

            <div className={modalCss.ModalBody}>

                <div className={modalCss.ModalBlobBg}>
                    <Blob bgImage={bubbleBgAuthImg} />
                </div>
                <div className={modalCss.ModalInner}>
                    <h4>{header4}</h4>
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
                    <Box sx={{ width: '80%', margin: '20px auto', height: '10px', borderRadius: '15px'}}>
                        <BorderLinearProgress variant="determinate" value={progress} />
                    </Box>
                    <h3>{header3} {progress}%</h3>
                </div>
                
            </div>

        </div>
    )
}

export const Overlay = (props) => {
    const navigate = useNavigate()
    const handleClick = () => {
        if(props.prevPath) {
            navigate(props.prevPath)
        } else {
            navigate("/")

        }
    }

    return (
        <div className={modalCss.ModalContainer}>
            <div 
                style={{zIndex: "999999999", position: "absolute", top: "1.3rem", left: "1.3rem", cursor: "pointer", color: "white"}}
                onClick={handleClick}
            >
                <CancelIcon fontSize="large"/>
            </div>
            {props.children}
        </div>
    )
}


export const Fetching = () => {
    return (
        <div className={modalCss.ModalContainer}>
            <div className={modalCss.ModalBodyTwo}>
                <div className={modalCss.ModalBlobBg}>
                    <img src={logoImg} alt='Bubble Ai' className={modalCss.Blinker} />
                </div>
            </div>
        </div>
    )
}


export const PlainModalOverlay = (props) => {

    return (
        <div className={modalCss.ModalContainer}>
            <div className={modalCss.PlainModalOverlay}>
                {props.children}
            </div>
        </div>
    )
}


const JobList = ({ aiSuggestedJobs, resume, template, imgUrl, errorSetter }) => {
    const dispatch = useDispatch();
    const { resumeSubDuration } = useSelector(state => state.stateData)
    const getRandomNumber = () => {
        return Math.floor(Math.random() * (99 - 90 + 1)) + 90;
    };

    const handleCoverLetterCompose = async (job, index) => {
        const date = getOrdinalDate()
        const companyName = job?.company_name
        const jobDesc = job?.description
        const jobPosition = job?.title
        
        localStorage?.removeItem("template")            
        localStorage?.removeItem("imgUrl")
        localStorage?.removeItem("resume")
        localStorage?.removeItem("letter")
        
        if(resumeSubDuration !== "Per Week" && resumeSubDuration !== "Per Month") {
            return errorSetter("Upgrade Subscription to access this feature")
        }
        
        const prompt = `You are the best and most professional cover letter writer in the world, 
            with 100% success rate from your cover letter writings. Write a stunning professional 
            cover letter using the following details: Job Position: ${jobPosition}, 
            Job Description: ${jobDesc}, Company Name: ${companyName}, My resume in object form: ${JSON.stringify(resume)}, 
            pick out the candidate name from keys firstName for First Name and lastName for Last Name within 
            the basicInfo object of the resume; pick out the candidate's work history and all other elements 
            needed to write the best cover letter from the resume object and Date: ${date}. NOTES: Do not include any 
            links or addressing or contact details or place holders e.g [Your Email] [Your Mobile] [Hiring Manager’s Name] to the cover letter. 
            Start with Date, then Dear Hiring Manager and return just the cover letter, with no explanations`
        
        try {
            dispatch(setFetching(true))
            let response = await axios.post("/cover-letter", { prompt }, {
                headers: {
                    "x-access-token": isAuth,
                },
            });

            localStorage.setItem("template", template)            
            localStorage.setItem("resume", JSON.stringify(resume))            
            localStorage.setItem("imgUrl", imgUrl)
            localStorage.setItem("letter", response.data)
            dispatch(setFetching(false))
            //Navigate in a Cover Letter page
            setTimeout(() => {
                window.open("/cover-letter", "_blank");
            }, 3000);
 
        } catch (error) {
            dispatch(setFetching(false))
            errorSetter("Failed to generate Cover Letter, Try again")
        }

    }
    const styles = {
        container: {
          width: "100%",
          textAlign: "left",
          padding: "5px",
          backgroundColor: "#c0d1d457",
          borderRadius: "10px",
          wordBreak: "break-word",
          lineHeight: "1",
          boxShadow: "inset 10px 10px 10px rgba(0, 0, 0, 0.1)"
        },
        iconContainer: {
          fontSize: '1.5rem',
          width: "3rem",
          height: "3rem",
          margin: "auto",
          color: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          boxShadow: "inset 10px 10px 10px rgba(0, 0, 0, 0.1)"
        },
        jobTitle: {
          margin: "0",
          fontWeight: "500",
          fontSize: "1rem"
        },
        companyInfo: {
          fontSize: ".75rem"
        },
        locationTimeContainer: {
          marginLeft: screenWidth >= 900 ? '5.6rem' : '1rem',
          color: 'gray',
          fontSize: '.7rem'
        },
        linkStyle: {
          color: "rgb(177, 71, 1)"
        },
        hrStyle: {
          width: '90%',
          margin: "auto",
          marginBottom: "15px",
          marginTop: "5px"
        }
    };

    const JobMessage = () => {
        const isPremium = resumeSubDuration === 'Per Week' && resumeSubDuration === 'Per Month';

        return (
            <div>
              {isPremium ? (
                <div>
                  To view Jobs that give you greater than 90% chance of being hired ({' '}
                  <a style={styles.linkStyle} href="/pricing" target="_blank" rel="noopener noreferrer">Upgrade</a>).
                </div>
              ) : (
                <div>
                  No jobs were found that match your CV. Try changing the location or generate other similar job titles recruiters might call a your chosen job position{' '}
                  <a style={styles.linkStyle} href="/chat" target="_blank" rel="noopener noreferrer">HERE</a>.
                </div>
              )}
            </div>
        );
    };

    if (!Array.isArray(aiSuggestedJobs) || aiSuggestedJobs.length === 0) {
      return (
        <div>
            <h4>Your Job Connections (Offering over 90% Chance of success)</h4>
            <div style={styles.container}>
                <div style={{ padding: "10px", color: "gray", fontSize: ".7rem" }}>
                    <JobMessage />
                </div>
            </div>
        </div>
      );
    }

    return (
      <div>
        <h4>Your Job Connections (Offering over 90% chance of success)</h4>
        <div style={styles.container}>
          {aiSuggestedJobs.map((job, index) => (
            <div key={index}>
              <Grid container>
                <Grid item xs={2}>
                  <div style={styles.iconContainer}>
                    <BusinessCenterIcon fontSize='inherit' />
                  </div>
                </Grid>
                <Grid item xs={10} style={{ textAlign: "left", alignItems: "center", paddingTop: "8px" }}>
                  <h3 style={styles.jobTitle}>{job?.title}</h3>
                  <div style={styles.companyInfo}>{job?.company_name}</div>
                </Grid>
              </Grid>
  
              <div style={styles.locationTimeContainer}>
                <Grid container>
                  <Grid item md={6} xs={12}>
                    <div>
                      <LocationOnIcon style={{ marginRight: "5px", fontSize: ".9rem" }} />
                      <span style={{ position: "relative", top: "-4px" }}>{job?.location}</span>
                    </div>
                    <div>
                      <PaidIcon style={{ marginRight: "5px", fontSize: ".9rem" }} />
                      <span style={{ position: "relative", top: "-4px" }}>{job?.salary}</span>
                    </div>
                    <div>
                      <KeyboardDoubleArrowUpIcon style={{ marginRight: "5px", fontSize: ".9rem" }} />
                      <span style={{ position: "relative", top: "-4px" }}>Your Chance <b>{getRandomNumber()}%</b></span>
                    </div>
                  </Grid>
  
                  <Grid item md={6} xs={12} style={{ fontWeight: "600", display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{ marginTop: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='1px solid rgb(177, 144, 13)' 
                            width={'100%'} 
                            height='25px' 
                            color='rgb(177, 144, 13)'
                        >
                            <a href={job?.external_url} target="_blank" rel="noreferrer" className="link">View Company</a>
                        </ButtonThin>
                    </div>
                    <div style={{ marginTop: "10px"}}>
                        <ButtonThin 
                            onClick={() => handleCoverLetterCompose(job)} 
                            fontSize='.6rem' 
                            border='1px solid rgb(177, 144, 13)' 
                            width={'100%'} 
                            height='25px' 
                            color='rgb(177, 144, 13)'
                        >
                            Get Cover Letter
                        </ButtonThin>
                    </div>
                    <div style={{ marginTop: "10px"}}>
                        <ButtonThin
                            fontSize='.6rem' 
                            border='1px solid rgb(177, 144, 13)' 
                            width={'100%'} 
                            height='25px' 
                            color='rgb(177, 144, 13)'
                        >
                            <a href={job?.url} target="_blank" rel="noreferrer" className="link">Apply Now</a>
                        </ButtonThin>
                    </div>
                  </Grid>
                </Grid>
                <hr style={styles.hrStyle} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};


export const SuccessFailureModal = ({ 
    success, 
    fullName, 
    notApayment, 
    notApaymentTextPositive, 
    notApaymentTextNegative, 
    resume,
    shareableLink, 
    aiSuggestedJobs,
    template,
    imgUrl }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const prevPath = localStorage?.getItem("prevPath")

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    const handleSuccess = () => {
        if (!success) {
            navigate('/pricing')
        } else {
            if(localStorage.getItem('prevPath')) {
                navigate(prevPath)
                localStorage?.removeItem('prevPath')
                return
            }
            window.location.reload()
        }
    }

    const handleCopy = () => {
        // Convert React nodes to a string or handle differently if needed
        const textToCopy = React.Children.map(shareableLink, child => 
            typeof child === "string" ? child : React.isValidElement(child) ? child.props.children : ""
        ).join('');

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    successSetter('Link copied to clipboard');
                })
                .catch(err => {
                    errorSetter('Failed to copy Link: ', err);
                });
        } else {
            //For older browsers
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);

            successSetter('Link copied to clipboard');
        }
    };


    return (
        <div className={modalCss.ModalContainer}>
            <div style={{textAlign: 'center', backgroundColor: 'white'}} className={modalCss.CheckoutContainer}>
                <div className={modalCss.CheckoutLogoWrapper}>
                    <img src={success ? successImg : failedImg} alt='Bubble Ai' style={{width: '100%'}} />
                </div>

                    {!notApayment ? (
                        <div>               
                            <div>
                                <h3>Hey, {fullName}</h3>
                            </div>

                            <h1>{success ? "Your Payment was Successful!" : "Your Payment Failed"}</h1>

                            <p>{success ? "We will send a payment confirmation email to your registered email. Well done!" : "We will send more details on this failure to your registered email. Use button below to try again."}</p>
                        </div>
                    ) : (
                        <div>
                            <h1>{success ? notApaymentTextPositive : notApaymentTextNegative}</h1>
                        </div>
                    )}
                    
                    <div style={{marginTop: '20px'}}>
                        <ButtonOutlineGreenWithDiffStyle borderColor={!success && "#D00000"} onClick={handleSuccess}>
                            {success ? "Done! Continue to Bubble" : "Try Again"}
                        </ButtonOutlineGreenWithDiffStyle>
                    </div>

            </div>
        </div>
    )
}


export const CheckoutSummaryModal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { pricingDetails, error, successMini } = useSelector(state => state.stateData)
    const [loading, setLoading] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [couponCode, setCouponCode] = useState("")
    const [isCouponApplied, setIsCouponApplied] = useState(false)
    const formattedDiscount = discount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedPrice = pricingDetails.price?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const vat = pricingDetails.price * 0.075;
    const formattedVat = vat?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const total = pricingDetails.price + vat - discount
    const formattedTotal = total?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    const hideCheckoutFunction = () => {
        dispatch(setShowCheckout(false))
    }

    const handleProceedToPay = async () => {
        dispatch(setFetching(true))
        const prevPath = location.pathname
        localStorage?.setItem("prevPath", prevPath)
        if(total <= 0 && discount === 0) {
            errorSetter('Reload Page to fix amount')
            dispatch(setFetching(false))
            return
        }
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            dispatch(setFetching(false))
            navigate('/popin?pricing')
            return
        }
        try {
            // dispatch(setFetching(true))
            const isAuth = localStorage?.getItem('token');
            
            const priceData = {
                currency: pricingDetails.currency,
                duration: pricingDetails.duration,
                amount: total,
                product: pricingDetails.product,
                couponCode: discount ? couponCode : "",
                customizations: {
                    title: `Bubble ${pricingDetails?.product} (${pricingDetails?.duration})`,
                    logo: logoImg,
                },
            }

            if (discount === (pricingDetails.price + vat)) {
                //WHEN USER APPLIES 100% COUPON
                const response = await axios.post("/pricing/full-payment-with-coupon", priceData, {
                    headers: {
                      "x-access-token": isAuth,
                    },
                });
                if (response.data === "Subscription Already Exists") {
                    throw new Error(response.data)
                }
                const {status, tx_ref, couponCode} = response.data;
                const name = response.data.customer?.fullName
                const transactionId = tx_ref
                window.location.href = `/transaction?status=${status}&tx_ref=${tx_ref}&transaction_id=${transactionId}&coupon=${couponCode}&name=${name}`
            } else {
                //WHEN USER PAYS ALL OR PART
                const response = await axios.post("/pricing/start-payment", priceData, {
                    headers: {
                      "x-access-token": isAuth,
                    },
                });            
                if (response.data === "Subscription Already Exists") {
                    throw new Error(response.data)
                }
                
                window.location.href = response.data.data.link
            }


        } catch (error) {
            dispatch(setFetching(false))
            errorSetter(error.response.data)
        }

    }

    const handleCouponCodeChange = (e) => {
        setCouponCode(e.target.value)
    }

    const handleDiscount = async () => {
        if (!couponCode) {
            return errorSetter("Input your Discount Code")
        }
        if (isCouponApplied) {
            return errorSetter("Discount already applied")
        }

        try {
            setLoading(true) 
            const data = {
                couponCode: couponCode,
                product: pricingDetails.product,
                duration: pricingDetails.duration
            } 
            const response = await axios.post("/pricing/check-coupon", data, {
                headers: {
                  "x-access-token": localStorage?.getItem('token'),
                },
            });
            // const 
            if(response.status !== 200) {
                setLoading(false) 
                setCouponCode("")
                return errorSetter("Something went wrong, try another code")
            }

            const newDiscount = response.data.discountPercent/100 * total
            setDiscount(newDiscount)
            setLoading(false) 
            successSetter(`Congrats! ${response?.data?.discountPercent}% discount on product applied`)
            setIsCouponApplied(true)


        } catch (error) {
            setCouponCode("")
            setLoading(false) 
            return errorSetter(error.response.data.message)
        }

    }

    return (
        <div className={modalCss.ModalContainer}>
            <div className={modalCss.CheckoutContainer}>
                <div className={modalCss.CheckoutLogoWrapper}>
                    <img src={logoImg} alt='Bubble Ai' style={{width: '100%'}} />
                </div>

                <h2>Secure Checkout</h2>

                <div style={{width: '100%', display: 'flex', justifyContent: 'center', borderRadius: '5px', overflow: 'hidden'}}>
                    <img src={secureImg} alt='Bubble Ai' style={{width: '60%', height: '60px'}} />
                </div>

                <div className="error">{error}</div>
                <div className="success-mini">{successMini}</div>
                <Grid container>
                    <Grid item xs={12} md={7}> 
                        <div className='Segment'>
                            <h5>Summary</h5>
                            <div className={modalCss.CheckoutInnerContainerGroup}>
                                <div className={modalCss.CheckoutInnerContainer}>
                                    <div>
                                        Product
                                    </div>
                                    <div>
                                        -
                                    </div>
                                    <div className='align-right-bold'>
                                        {pricingDetails.product}
                                    </div>
                                </div>

                                <div className={modalCss.CheckoutInnerContainer}>
                                    <div>
                                        Duration
                                    </div>
                                    <div>
                                        -
                                    </div>
                                    <div className='align-right-bold'>
                                        {pricingDetails.duration}
                                    </div>
                                </div>
                            </div>

                            <p></p>

                            <h5>Payment</h5>
                            <div className={modalCss.CheckoutInnerContainerGroup}>
                                <div className={modalCss.CheckoutInnerContainer}>
                                    <div>
                                        Price
                                    </div>
                                    <div>
                                        -
                                    </div>
                                    <div className='align-right-bold'>
                                        {pricingDetails.currency + " " + formattedPrice}
                                    </div> 
                                </div>
                                <div className={modalCss.CheckoutInnerContainer}>
                                    <div>
                                        VAT @ 7.5%
                                    </div>
                                    <div>
                                        -
                                    </div>
                                    <div className='align-right-bold'>
                                        {pricingDetails.currency + " " + formattedVat}
                                    </div> 
                                </div>
                                <div className={modalCss.CheckoutInnerContainer}>
                                    <div>
                                        Discount
                                    </div>
                                    <div>
                                        -
                                    </div>
                                    <div className='align-right-bold'>
                                        {pricingDetails.currency + " " + formattedDiscount}
                                    </div> 
                                </div>
                                <div style={{width: '80%', padding: '0', margin: 'auto', border: 'none', borderBottom: '1px solid black'}}>
                                </div>
                                <div className={modalCss.CheckoutInnerContainer} style={{fontWeight: '700'}}>
                                    <div>
                                        Total
                                    </div>
                                    <div>
                                        -
                                    </div>
                                    <div className='align-right-bold'>
                                        {pricingDetails.currency + " " + formattedTotal}
                                    </div> 
                                </div>
                            </div>
                            <p></p>

                            <h5>Coupon/Discount Code</h5>
                            <div className={modalCss.CheckoutInnerContainer}>
                                <div>
                                    <AuthInput
                                        value={couponCode}
                                        inputType="text"
                                        inputGridSm={12}
                                        onChange={handleCouponCodeChange}
                                    />
                                </div>
                                <div className='align-right-bold'>
                                    <ButtonSubmitBlack 
                                        type="submit" 
                                        height='30px'
                                        onClick={handleDiscount}
                                    >{!loading ? "Apply" : 
                                        <ThreeCircles
                                            height="15"
                                            width="15"
                                            color="#FFFFFF"
                                            visible={true}
                                            ariaLabel="three-circles-rotating"
                                        />}
                                    </ButtonSubmitBlack>
                                </div>
                            </div>
                            <p></p>
                            <ButtonSubmitGreen onClick={handleProceedToPay}>
                                <span style={{ marginRight: "5px", paddingTop: "1px" }}>
                                   PROCEED TO PAY{" "}
                                </span>{" "}
                                <TrendingFlatIcon fontSize="inherit" />
                            </ButtonSubmitGreen>
                        </div>

                    </Grid>

                    <Grid item xs={12} md={5}>
                        <div style={{padding: '20px 0 20px 10px', width: '100%', textAlign: 'center'}}>
                            <img src={refundImg} alt='Refund Guaranteed' style={{width: '100px', borderRadius: '50%'}} />

                            <div>
                                <h5>100% Refund</h5>
                                <h2>GUARANTEED</h2>
                                <a 
                                    href='/privacy' 
                                    target='_blank'
                                    style={{fontSize: '.65rem', color: '#3E8F93', position: 'relative', top: '-20px'}}
                                >
                                    See Terms & Conditions
                                </a>

                                <div className='Segment'>
                                    <Carousel
                                        autoPlay={true}
                                        autoPlaySpeed={10000}
                                        transitionDuration={1000}
                                        arrows={false}
                                        responsive={responsive}
                                        swipeable={true}
                                        draggable={true}
                                        ssr={true} // render carousel on server-side.
                                        infinite={true}
                                        keyBoardControl={true}
                                        customTransition="all .5"
                                        containerClass="carousel-container"
                                        dotListClass="custom-dot-list-style"
                                        itemClass="carousel-item-padding-40-px"
                                        focusOnSelect={true}
                                    >

                                        {reviewDetails?.map((detail, index) => {
                                            return (
                                                <div key={index}>
                                                    <div style={{fontSize: '.7rem', display: 'flex', justifyContent: 'left', width: '100%'}}>
                                                        <div style={{width: '40px', borderRadius: '50%', overflow: 'hidden'}}>
                                                            <img src={detail?.img} alt={detail?.name} width='100%' />
                                                        </div>
                                                        <div style={{marginLeft: '10px'}}>
                                                            <div style={{fontSize: '.67rem', fontWeight: '700', color: '#5fbec5'}}>
                                                                {detail?.name}
                                                            </div>
                                                            <div>
                                                                <Rating name="read-only" value={detail?.rating} size="small" precision={0.5} readOnly />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={modalCss.reviewCarousel}>
                                                        <p>
                                                            {detail?.review}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                        
                    </Grid>
                </Grid>

                <div className={modalCss.CancelCheckout} onClick={hideCheckoutFunction} >
                    Cancel
                </div>
            </div>
        </div>
    )
}
