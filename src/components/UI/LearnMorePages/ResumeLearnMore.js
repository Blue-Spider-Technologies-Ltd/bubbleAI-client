import React, { useEffect, useState, useRef } from 'react'
import css from './LearnMorePages.module.css'
import modalCss from '../Modal/Modal.module.css'
import { fetchCountryData } from '../../../utils/client-functions';
import MenuBar from '../Menu/Menu';
import { ButtonSubmitGreen } from '../Buttons/Buttons';
import { FaLongArrowAltRight } from "react-icons/fa";
import { TfiHandPointRight } from "react-icons/tfi";
import Carousel from "react-multi-carousel";
import { reviewDetails } from '../../../utils/reviews';
import bubbleBgAuthImg from "../../../images/bubblebg-auth.jpg"
import jobImg from "../../../images/jobs.jpg"
import coverImg from "../../../images/cover-letter.jpg"
import interviewImg from "../../../images/interview-prep.jpg"
import aramcoImg from "../../../images/aramco.png"
import amazonImg from "../../../images/amazon.jpg"
import metaImg from "../../../images/meta.png"
import microsoftImg from "../../../images/microsoft.png"
import nvidiaImg from "../../../images/nvidia.png"
import exxonImg from "../../../images/exxon.png"
import resumeImg from "../../../images/2.jpg"
import customImg from "../../../images/customize.jpg"
import downloadImg from "../../../images/download.jpg"
import previewImg from "../../../images/preview.jpg"
import Blob from '../Blob/Blob';
import { Grid, Rating } from "@mui/material";
import { faqs } from '../../../utils/faqs';
import ResumePricing from '../../Pricing/ResumePricing';
import { CheckoutSummaryModal } from '../Modal/Modal';
import { useSelector } from "react-redux";
import ChatwootWidget from '../../../utils/chatwoot';
const screenWidth = window.innerWidth

const ResumeLearnMore = () => {
    const { showCheckout } = useSelector(state => state.stateData)
    const [country, setCountry] = useState("")
    const [bubbleText, setBubbleText] = useState(['B', 'u', 'b', 'b', 'l', 'e', ' ', 'A', 'i']);
    const [activeIndex, setActiveIndex] = useState(null);
    const bubbleTextRef = useRef(null);
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
                <div>Seems you are in&nbsp;<span style={{fontWeight: '700'}}>{country}</span>. There is a 30% DISCOUNT in your country if you &nbsp;<span className="link" style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={handleTryFree}>START NOW</span></div>
            </div>

      
            <div className="auth-container-inner" style={{ textAlign: 'center', marginTop: '150px'}}>

                <div className={css.TitleContainer}>
                    <h1 style={{color: 'black', fontSize: '3rem'}}>
                        Job Search Automation using{' '} <br/>
                        <span ref={bubbleTextRef} className="bubble-text">
                            Bubble Ai.
                        </span>
                    </h1>
                    <h5>Over 90% of users report employment into top companies with our Ai CV builder, Job Specific Cover Letters, Job Search Automation and Interview Preparation Ai tools.</h5>
                    <div style={{width: '300px', margin: '10px auto 10px'}}>
                        <ButtonSubmitGreen 
                            type="button"
                            onClick={handleTryFree}
                        >
                            CREATE CV ONLINE FREE &nbsp;&nbsp;&nbsp;<FaLongArrowAltRight />
                        </ButtonSubmitGreen>
                    </div>

                </div>

            </div>  

            <section>
                <Grid container p={5} mt={2}>
                    <Grid item xs={12} md={4} mb={2}>
                        <div className={css.ShowOffCont}>
                            <h2>Tailored Cover Letters</h2>
                            <div className={css.ShowOffBody}>
                                <img className={css.ShowOffImg} src={coverImg} alt="" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} mb={2}>
                        <div className={css.ShowOffCont}>
                            <h2>Ai Resume Builder</h2>
                            <div className={css.ShowOffBody}>
                                <img className={css.ShowOffImg} src={resumeImg} alt="" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} mb={2}>
                        <div className={css.ShowOffCont}>
                            <h2>Job Search Automation</h2>
                            <div className={css.ShowOffBody}>
                                <img className={css.ShowOffImg} src={jobImg} alt="" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} mb={2}>
                        <div className={css.ShowOffCont}>
                            <h2>Free Interview Simulations</h2>
                            <div className={css.ShowOffBody}>
                                <img className={css.ShowOffImg} src={interviewImg} alt="" />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </section>   

            <section className={css.TopCompanies}>
                <h2>Users Secure Employment in Top Companies</h2>
                <Grid container>
                    <Grid container xs={12} md={2}>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={6} md={12}>
                            <img src={aramcoImg} className={css.CompanyImg} alt="" />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={2}>
                        <Grid item xs={6} md={12}>
                            <img src={nvidiaImg} className={css.CompanyImg} alt="" />
                        </Grid>
                        <Grid item xs={6} md={0}>

                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={2}>
                        <Grid item xs={6} md={0}>

                        </Grid>
                        <Grid item xs={6} md={12}>
                            <img src={metaImg} className={css.CompanyImg} alt="" />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={2}>
                        <Grid item xs={6} md={12}>
                            <img src={microsoftImg} className={css.CompanyImg} alt="" />
                        </Grid>
                        <Grid item xs={6} md={0}>

                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={2}>
                        <Grid item xs={6} md={0}>

                        </Grid>
                        <Grid item xs={6} md={12}>
                            <img src={amazonImg} className={css.CompanyImg} alt="" />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={2}>
                        <Grid item xs={6} md={12}>
                            <img src={exxonImg} className={css.CompanyImg} alt="" />
                        </Grid>
                        <Grid item xs={6} md={0}>

                        </Grid>
                    </Grid>
                </Grid>
            </section>    


            <section className={css.Process}>
                <h2>Bubble Ai 5 Minutes Job Automation Process</h2>
                <Grid container sx={{lineHeight: '1.4'}} p={3}>
                    <Grid item xs={12} md={6} pt={screenWidth < 900 && 3} mb={screenWidth < 900 && 0}>
                        <div style={{width: '100%', height: '100%', marginTop: "50px"}}>
                                <Blob
                                    bgImage={customImg}
                                    width="100%"
                                    height="100%"
                                    // desc="Watch Video"
                                />
                            </div>
                    </Grid>
                    <Grid item xs={12} md={6} p={3} pt={screenWidth < 900 && 0}>
                        <h3>Create Resume</h3>
                        <p>Typically takes less than 2 minutes and generates a professional resume that scores over 90% ATS</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>You can upload old resume or start from scratch to create.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Preview Bubble AI generated resume and make edits if you like.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Choose preferred template and download in PDF.</Grid>
                            </Grid>
                        </div>
                        <div style={{width: '300px', marginTop: '2rem'}}>
                            <ButtonSubmitGreen 
                                type="button"
                                onClick={handleTryFree}
                            >
                                CREATE NOW &nbsp;&nbsp;&nbsp;<FaLongArrowAltRight />
                            </ButtonSubmitGreen>
                        </div>
                    </Grid>
                </Grid>

                <Grid container sx={{lineHeight: '1.4'}}>
                    {screenWidth < 900 && (
                        <Grid item xs={12} md={6}>
                            <div style={{width: '100%', height: '110%', marginTop: "50px"}}>
                                <Blob
                                    bgImage={previewImg}
                                    width="100%"
                                    height="100%"
                                    // desc="Watch Video"
                                />
                            </div>
                        </Grid>
                    )}
                    <Grid item xs={12} md={6} p={3}>
                        <h3>Bubble AI Job Connect</h3>
                        <p>For every new resume created, Bubble Ai performs an indepth keyword, skills, experience and industry analysis to start connecting you to jobs. These jobs promise:</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Over 90% Interview rate.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Provides options to automatically tailor application materials for each job with a click.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Uses real job data and your data for creating <strong>resume</strong>, <strong>cover letter</strong>, <strong>interview prep</strong> and <strong>follow-up email</strong> to recruiter.</Grid>
                            </Grid>
                        </div>
                        <div style={{width: '300px', marginTop: '2rem'}}>
                            <ButtonSubmitGreen 
                                type="button"
                                onClick={handleTryFree}
                            >
                                GET CONNECTED &nbsp;&nbsp;&nbsp;<FaLongArrowAltRight />
                            </ButtonSubmitGreen>
                        </div>
                    </Grid>
                    {screenWidth > 900 && (
                        <Grid item xs={12} md={6}>
                            <div style={{width: '100%', height: '110%'}}>
                                <Blob
                                    bgImage={previewImg}
                                    width="100%"
                                    height="100%"
                                    // desc="Watch Video"
                                />
                            </div>
                        </Grid>
                    )}
                </Grid>

                {/* <Grid container sx={{lineHeight: '1.4'}}>
                    <Grid item xs={12} md={6}>
                        <div style={{width: '100%', height: '110%', marginTop: screenWidth < 900 && "50px"}}>
                            <Blob
                                bgImage={downloadImg}
                                width="100%"
                                height="100%"
                                // desc="Watch Video"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} p={3}>
                        <h3>Download</h3>
                        <p>On the download page you can:</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Select from Choice Templates.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Get your resume in PDF.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Premium subscribers get access to SAVE & REACCESS all resumes.</Grid>
                            </Grid>
                        </div>
                        <div style={{width: '300px', marginTop: '2rem'}}>
                            <ButtonSubmitGreen 
                                type="button"
                                onClick={handleTryFree}
                            >
                                START NOW &nbsp;&nbsp;&nbsp;<FaLongArrowAltRight />
                            </ButtonSubmitGreen>
                        </div>
                    </Grid>
                </Grid>

                <Grid container sx={{lineHeight: '1.4'}}>
                    {screenWidth < 900 && (
                        <Grid item xs={12} md={6} pt={5}>
                            <div style={{width: '100%', height: '100%', marginBottom: ""}}>
                                <Blob
                                    bgImage={jobImg}
                                    width="100%"
                                    height="100%"
                                    // desc="Watch Video"
                                />
                            </div>
                        </Grid>
                    )}
                    <Grid item xs={12} md={6} p={3}>
                        <h3>Automated Job Search</h3>
                        <p>Ai analysis is also used to automatically search JOBS THAT FIT YOU after CV download:</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Resume Link(url), Shareable to employers.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Automatically Searches jobs where you stand more than a 90% chance of being called, around your chosen location.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>One-click Cover Letter Generator for each job.</Grid>
                            </Grid>
                        </div>
                        <div style={{width: '300px', marginTop: '2rem'}}>
                            <ButtonSubmitGreen 
                                type="button"
                                onClick={handleTryFree}
                            >
                                GET CV & JOBS FOR IT &nbsp;&nbsp;&nbsp;<FaLongArrowAltRight />
                            </ButtonSubmitGreen>
                        </div>
                    </Grid>
                    {screenWidth > 900 && (
                        <Grid item xs={12} md={6}>
                            <div style={{width: '100%', height: '100%'}}>
                                <Blob
                                    bgImage={jobImg}
                                    width="100%"
                                    height="100%"
                                    // desc="Watch Video"
                                />
                            </div>
                        </Grid>
                    )}
                </Grid>

                <Grid container sx={{lineHeight: '1.4'}}>
                    <Grid item xs={12} md={6} >
                        <div style={{width: '100%', height: '110%', marginTop: screenWidth < 900 && "50px"}}>
                            <Blob
                                bgImage={interviewImg}
                                width="100%"
                                height="100%"
                                // desc="Watch Video"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} p={3}>
                        <h3>Interview Preparations</h3>
                        <p>Benefit from free interview preparations with Bubble Ai. Use the ASK ME ANYTHING input on Homepage. You will get a JOB INTERVIEW PREPARATION suggestion. BENEFITS include:</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Edittable initial prompt to fit your potential job.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Top 10 frequently asked questions from your potential employer.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Interactive Ai to answer your questions.</Grid>
                            </Grid>
                        </div>
                        <div style={{width: '300px', marginTop: '2rem'}}>
                            <ButtonSubmitGreen 
                                type="button"
                                onClick={handleTryFree}
                            >
                                TRY IT NOW &nbsp;&nbsp;&nbsp;<FaLongArrowAltRight />
                            </ButtonSubmitGreen>
                        </div>
                    </Grid>
                </Grid> */}

            </section>  

            <section className={css.TopCompanies}>
                <h2>Users' Feedback Say More Than We Can!</h2>

                <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    ssr={true} // render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all .5 ease-out"
                    transitionDuration={1000}
                    containerClass="carousel-container"
                    autoPlaySpeed={10000}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    autoPlay={true}
                    centerMode={ screenWidth > 900 ? false : true}
                    focusOnSelect={true}
                >
                    {reviewDetails?.map((detail, index) => {
                        return (
                            <div key={index} style={{height: "auto", marginLeft: '10px'}}>
                                <div style={{fontSize: '.7rem', display: 'flex', justifyContent: 'center', width: '100%'}}>
                                    <div style={{width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden'}}>
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
            </section>   

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

            <section>
                <ResumePricing />
            </section>
            {showCheckout && <CheckoutSummaryModal />}
            <ChatwootWidget />
        </div>
    )
}
  

export default ResumeLearnMore;