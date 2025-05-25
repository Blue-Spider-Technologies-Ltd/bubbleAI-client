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
import { Rings } from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { setShowCheckout } from "../../../redux/states"
import AuthInput from '../Input/AuthInputs';
import { ButtonSubmitBlack, ButtonSubmitGreen, ButtonOutlineGreenWithDiffStyle } from '../Buttons/Buttons';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import CancelIcon from '@mui/icons-material/Cancel';
import { ThreeCircles } from 'react-loader-spinner';
import refundImg from '../../../images/refund-stamp.png';
import successImg from '../../../images/success.gif';
import failedImg from '../../../images/failed.gif';
import { reviewDetails } from '../../../utils/reviews';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { checkAuthenticatedUser, errorAnimation, successMiniAnimation } from '../../../utils/client-functions';
import { setFetching, setError, setSuccessMini } from '../../../redux/states';
const screenWidth = window.innerWidth;

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
                            ""
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

export const SuccessFailureModal = ({ 
    success, 
    fullName, 
    notApayment, 
    notApaymentTextPositive, 
    notApaymentTextNegative, 
    successText,
    bodyText,
    buttonText,
 }) => {

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

                            <h1>{successText ? successText : "Your Payment Failed"}</h1>

                            <p>{bodyText ? bodyText : "We will send more details on this failure to your registered email. Use button below to try again."}</p>
                        </div>
                    ) : (
                        <div>
                            <h1>{success ? notApaymentTextPositive : notApaymentTextNegative}</h1>
                        </div>
                    )}
                    
                    <div style={{marginTop: '20px'}}>
                        <ButtonOutlineGreenWithDiffStyle borderColor={!success && "#D00000"} onClick={handleSuccess}>
                            {buttonText ? buttonText : "Try Again"}
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
            return errorSetter(error?.response?.data?.error)
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
                                        id={"couponCode"}
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
