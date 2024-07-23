import React, { useEffect, useState, useRef } from 'react'
import css from './LearnMorePages.module.css'
import { fetchCountryData } from '../../../utils/client-functions';
import MenuBar from '../Menu/Menu';
import { ButtonSubmitGreen } from '../Buttons/Buttons';
import { FaLongArrowAltRight } from "react-icons/fa";
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
import Blob from '../Blob/Blob';
import { Grid } from "@mui/material";
import HelpIcon from '../HelpIcon/HelpIcon';
const screenWidth = window.innerWidth

const ResumeLearnMore = () => {
    const [country, setCountry] = useState("")
    const [bubbleText, setBubbleText] = useState(['B', 'u', 'b', 'b', 'l', 'e', ' ', 'A', 'i']);
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
                <div>Seems you are in&nbsp;<span style={{fontWeight: '700'}}>{country}</span>. There is a 30% DISCOUNT in your country if you &nbsp;<a href='/join-bubble' target='_blank' className="link" style={{textDecoration: 'underline'}}>REGISTER NOW</a></div>
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
                <h2>Our Users Secure Employments in Top Companies</h2>
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
            <HelpIcon />
        </div>
    )
}
  

export default ResumeLearnMore;