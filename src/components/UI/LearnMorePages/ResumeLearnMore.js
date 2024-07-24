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
import HelpIcon from '../HelpIcon/HelpIcon';
const screenWidth = window.innerWidth

const ResumeLearnMore = () => {
    const [country, setCountry] = useState("")
    const [bubbleText, setBubbleText] = useState(['B', 'u', 'b', 'b', 'l', 'e', ' ', 'A', 'i']);
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
                <div>Seems you are in&nbsp;<span style={{fontWeight: '700'}}>{country}</span>. There is a 30% DISCOUNT in your country if you &nbsp;<span className="link" style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={handleTryFree}>REGISTER NOW</span></div>
            </div>

      
            <div className="auth-container-inner" style={{ textAlign: 'center', marginTop: '150px'}}>

                <div className={css.TitleContainer}>
                    <h1 style={{color: 'black', fontSize: '3rem'}}>
                        Job Search Automation using{' '} <br/>
                        <span ref={bubbleTextRef} className="bubble-text">
                            Bubble Ai.
                        </span>
                    </h1>
                    <h5>Over 90% of users report employment into top companies with our Tailored CV creation, Job Specific Cover Letters, Job Suggestions and Interview Preparation Ai tools.</h5>
                    <div style={{width: '300px', margin: '10px auto 10px'}}>
                        <ButtonSubmitGreen 
                            type="button"
                            onClick={handleTryFree}
                        >
                            TRY FOR FREE NOW &nbsp;&nbsp;&nbsp;<FaLongArrowAltRight />
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
                            <h2>Job Tailored Resume/CV</h2>
                            <div className={css.ShowOffBody}>
                                <img className={css.ShowOffImg} src={resumeImg} alt="" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} mb={2}>
                        <div className={css.ShowOffCont}>
                            <h2>High Paying Jobs</h2>
                            <div className={css.ShowOffBody}>
                                <img className={css.ShowOffImg} src={jobImg} alt="" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} mb={2}>
                        <div className={css.ShowOffCont}>
                            <h2>Free Interview Prep</h2>
                            <div className={css.ShowOffBody}>
                                <img className={css.ShowOffImg} src={interviewImg} alt="" />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </section>   

            <section className={css.TopCompanies}>
                <h2>Our Users Secure Employment in Top Companies</h2>
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
                        <h3>Customize</h3>
                        <p>After registration, Interact with Bubble Ai providing a few background Info about your Education, Experience and Preferences.</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Takes less than 2 minutes.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Remove the hassle of waiting for days to get CV.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Interaction used to generate tailored resume/CV.</Grid>
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
                        <h3>Preview</h3>
                        <p>While we combine many algorithms to pass Applicant Tracking Systems and other software, we also give you, the user, the opprtunity to preview and edit the seamlessly generated Ai resume, giving it extra legitimacy and a human touch.</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Pass 99.99% ATS.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Add your touch.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Perfect it to choice if necessary.</Grid>
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

                <Grid container sx={{lineHeight: '1.4'}}>
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
                        <p>After clicking the download button, a pop where you can scale the document margin, font and opt for direct print or save is displayed allowing for choice formating. But before that you can:</p>
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
                                <Grid item xs={8}>Per Week & Per Month subscribers get access to SAVE & REACCESS all resumes.</Grid>
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
                        <h3>After Download</h3>
                        <p>This is where the rest of the magic happens. Bubble Ai does not just give you a professional and role-specific CV, a pop up appears after download and Premium Users can BENEFIT from this as it offers:</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Shareable Link of Resume to employers.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Choice of Job-tailored Cover Letters.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Suggests jobs around you that you stand more than a 90% chance of securing.</Grid>
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
                        <p>This is an extra and a free service offered by Bubble Ai. On a random day or after you get a call for an interview, visit Bubble Ai home page and focus on the ASK ME ANYTHING input. You will get a JOB INTERVIEW PREPARATION suggestion. BENEFITS include:</p>
                        <div className={css.Points}>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Tailored and edittable initial prompt.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Top 10 frequent questions from your chosen company.</Grid>
                            </Grid>
                            <Grid container mb={1}>
                                <Grid item xs={2}><TfiHandPointRight className={css.Pointers} /></Grid>
                                <Grid item xs={8}>Interactive Ai to coach you on your own generated questions.</Grid>
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
                    transitionDuration={500}
                    containerClass="carousel-container"
                    autoPlaySpeed={4000}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    autoPlay={true}
                    centerMode={ screenWidth > 900 ? false : true}
                    focusOnSelect={screenWidth < 900}
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

            <HelpIcon />
        </div>
    )
}
  

export default ResumeLearnMore;