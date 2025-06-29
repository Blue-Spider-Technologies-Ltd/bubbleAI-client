import React, { useEffect, useState, useRef } from 'react'
import css from './LearnMorePages.module.css'
import { fetchCountryData } from '../../../utils/client-functions';
import MenuBar from '../Menu/Menu';
import { ButtonSubmitGreen } from '../Buttons/Buttons';
import { FaLongArrowAltRight } from "react-icons/fa";
import { reviewDetails } from '../../../utils/reviews';
import bubbleBgAuthImg from "../../../images/bubblebg-auth.jpg"
import jobImg from "../../../images/jobs.png"
import coverImg from "../../../images/cover-letter.jpg"
import autoApplyImg from "../../../images/auto-apply-img.png"
import aramcoImg from "../../../images/aramco.png"
import amazonImg from "../../../images/amazon.jpg"
import metaImg from "../../../images/meta.png"
import microsoftImg from "../../../images/microsoft.png"
import nvidiaImg from "../../../images/nvidia.png"
import exxonImg from "../../../images/exxon.png"
import resumeImg from "../../../images/2.jpg"
import customImg from "../../../images/customize.jpg"
import previewImg from "../../../images/preview.jpg"
import Blob from '../Blob/Blob';
import { Grid, Rating } from "@mui/material";
import { faqs } from '../../../utils/faqs';
import ResumePricing from '../../Pricing/ResumePricing';
import { CheckoutSummaryModal } from '../Modal/Modal';
import { useSelector } from "react-redux";
import ChatwootWidget from '../../../utils/chatwoot';
const screenWidth = window.innerWidth

const ProcessStep = ({ number, title, description, image }) => {
    const [isVisible, setIsVisible] = useState(false);
    const stepRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (stepRef.current) {
            observer.observe(stepRef.current);
        }
    }, []);

    return (
        <div ref={stepRef} className={`${css.ProcessStepCard} ${isVisible ? css.visible : ''}`}>
            <div className={css.StepNumber}>{number}</div>
            <h3>{title}</h3>
            <p>{description}</p>
            {image && (
                <div style={{width: '100%', height: '200px', marginTop: "20px"}}>
                    <Blob bgImage={image} width="100%" height="100%" />
                </div>
            )}
        </div>
    );
};

const TestimonialCard = ({ detail }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
    }, []);

    return (
        <div ref={cardRef} className={`${css.TestimonialCard} ${isVisible ? css.visible : ""}`}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <div style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', marginRight: '1rem'}}>
                    <img src={detail?.img} alt={detail?.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
                <div>
                    <h4 style={{margin: 0, color: '#5fbec5'}}>{detail?.name}</h4>
                    <Rating name="read-only" value={detail?.rating} size="small" precision={0.5} readOnly />
                </div>
            </div>
            <p style={{fontSize: '0.9rem', lineHeight: '1.6'}}>{detail?.review}</p>
        </div>
    );
};

const TestimonialSliders = ({ reviewDetails }) => {
    // Split reviews into two groups for opposite directions
    const midpoint = Math.ceil(reviewDetails.length / 2);
    const firstGroup = reviewDetails.slice(0, midpoint);
    const secondGroup = reviewDetails.slice(midpoint);

    return (
        <section className={css.TestimonialSlider}>
            <h2>User Success Stories</h2>
            
            <div className={css.SliderRow}>
                <div className={css.SliderTrack}>
                    {[...firstGroup, ...firstGroup].map((detail, index) => (
                        <TestimonialCard key={`first-${index}`} detail={detail} />
                    ))}
                </div>
            </div>

            <div className={css.SliderRowReverse}>
                <div className={css.SliderTrackReverse}>
                    {[...secondGroup, ...secondGroup].map((detail, index) => (
                        <TestimonialCard key={`second-${index}`} detail={detail} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ResumeLearnMore = () => {
    const { showCheckout } = useSelector(state => state.stateData)
    const [country, setCountry] = useState("")
    const [bubbleText, setBubbleText] = useState(['B', 'u', 'b', 'b', 'l', 'e', ' ', 'A', 'i']);
    const [activeIndex, setActiveIndex] = useState(null);
    const bubbleTextRef = useRef(null);


    useEffect(() => {
        const returnCountryName = async () => {
            try {
                let countryName = await fetchCountryData()
                countryName = countryName.country_name
                setCountry(countryName)
            } catch (error) {
                
            }
        }

        returnCountryName()
    }, [])

    useEffect(() => {
        if (bubbleTextRef.current) {
          bubbleTextRef.current.style.animation = 'none';
          void bubbleTextRef.current.offsetWidth; // Trigger a reflow
          bubbleTextRef.current.style.animation = null;
        }
    }, [bubbleText]);

    const handleTryFree = () => {
        localStorage.setItem('prevPath', '/user/dashboard/resume')
        window.open('/join-bubble', '_blank');
    }

    const handleQClick = index => {
        setActiveIndex(index === activeIndex ? null : index);
    }


    const processSteps = [
        {
            title: "Create or Upload Resume",
            description: "Upload your existing resume or create one from scratch by filling a quick 2-minute profile. Our AI will handle the rest.",
            image: customImg
        },
        {
            title: "AI-Powered Customization",
            description: "Bubble Ai analyzes and optimizes your resume with industry-specific keywords and metrics for maximum ATS compatibility.",
            image: resumeImg
        },
        {
            title: "Preview & Download",
            description: "Review your optimized resume and make any desired changes. Choose from our selection of regionally-accepted professional templates.",
            image: previewImg
        },
        {
            title: "Smart Job Matching",
            description: "Using advanced algorithms, we connect you with jobs where your resume has a 90%+ interview probability.",
            image: jobImg
        },
        {
            title: "Complete Application Package",
            description: "Generate tailored cover letters and use our interactive interview preparation tool powered by company-specific research with personalized answers.",
            image: coverImg
        },
        {
            title: "Auto-Apply Feature",
            description: "Let Bubble Ai automatically apply to jobs for you! Our intelligent system will: Fill out application forms, tailor resumes and cover letters for each application, Allow you to review and edit before submission",
            image: autoApplyImg
        }
    ];

    return (
        <div style={{width: '100vw', boxSizing: 'border-box'}}>
            <MenuBar />
            
            <div style={{ width: '100%', padding: '0' }}>
                <div className="auth-bg-blob">
                    <div style={{height: screenWidth > 900 ? "120%" : "100%", width: screenWidth > 900 ? "110%" : "100%"}}>
                        <Blob bgImage={bubbleBgAuthImg} altText="Join bubble" />          
                    </div>  
                </div>
            </div>

            <div className={css.DiscountHeader}>
                <div><span className="link" style={{textDecoration: 'underline', cursor: 'pointer', marginLeft: '10px'}} onClick={handleTryFree}>Grab FREE TRIAL now!</span> join thousands of successful job seekers in <span style={{fontWeight: '700'}}>{country}</span>!</div>
            </div>

            <div className="auth-container-inner" style={{ textAlign: 'center', marginTop: '150px'}}>
                <div className={css.TitleContainer}>
                    <h1>
                        Intelligent Job Application Automation with{' '} 
                        <span ref={bubbleTextRef} className="bubble-text">Bubble Ai</span>
                    </h1>
                    <h5>Join thousands who've secured positions at top companies using our AI-powered resume builder, automated job matching, and interview preparation tools.</h5>
                    <div style={{width: '300px', margin: '20px auto'}}>
                        <ButtonSubmitGreen onClick={handleTryFree}>
                            Try Bubble Ai Free &nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                    </div>
                </div>

                <section className={css.Process}>
                    <h2>How Bubble Ai Works</h2>
                    <div className={css.StepsContainer}>
                        {processSteps.map((step, index) => (
                            <ProcessStep 
                                key={index}
                                number={index + 1}
                                {...step}
                            />
                        ))}
                    </div>
                    
                </section>

                <section className={css.TopCompanies}>
                    <h2>Users Secure Employment in Top Companies</h2>
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                        <Grid item xs={6} sm={4} md={2}>
                            <img src={aramcoImg} className={css.CompanyImg} alt="Aramco" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <img src={nvidiaImg} className={css.CompanyImg} alt="NVIDIA" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <img src={metaImg} className={css.CompanyImg} alt="Meta" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <img src={microsoftImg} className={css.CompanyImg} alt="Microsoft" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <img src={amazonImg} className={css.CompanyImg} alt="Amazon" />
                        </Grid>
                        <Grid item xs={6} sm={4} md={2}>
                            <img src={exxonImg} className={css.CompanyImg} alt="ExxonMobil" />
                        </Grid>
                    </Grid>
                </section>

                <TestimonialSliders reviewDetails={reviewDetails} />

                <section className={css.Process}>
                    <h2>FAQs</h2>
                    <div style={{width: screenWidth > 900 && '60%', margin: '0 auto'}}>
                        {faqs.map((item, index) => {
                        return (
                            <div key={index}>
                            <div className={css.faqItem} onClick={() => handleQClick(index)}>
                                <p>{item.q}</p>
                                <p className={css.plus}>+</p>
                            </div>
                            <div className={activeIndex !== index ? css.faqAnswer : css.faqClicked}>{item.a}</div>
                            </div>
                        )
                        })}
                    </div>
                    
                </section>

                <section style={{width: '100%', padding: '0', margin: '50px auto 0', display: 'flex', justifyContent: 'center'}}>
                    <ResumePricing />
                </section>
            </div>
            {showCheckout && <CheckoutSummaryModal />}
            <ChatwootWidget />
        </div>
    )
}

export default ResumeLearnMore;