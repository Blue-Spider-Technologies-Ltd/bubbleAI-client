import React from "react";
import css from "./SwimmingElephant.module.css"
import { BiSolidLike } from "react-icons/bi";
import { Grid } from "@mui/material";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { ImPushpin } from "react-icons/im";
import { PiLinkSimpleDuotone } from "react-icons/pi";



const SwimmingElephant = (props) => {

    return (
        <div className={css.elephantContainer}>
            <Grid container>
                <Grid item xs={7} className={css.LeftBg}>

                    <div className={css.Role}>
                        {props.resume?.basicInfo?.jobPosition}
                    </div>
                    <div className={css.Names}>
                        <h1 style={{marginTop: "0", marginBottom: "0", color: 'rgb(145, 145, 145)'}}>{props.resume?.basicInfo?.firstName}</h1>
                        <h1 style={{marginTop: "0"}}>{props.resume?.basicInfo?.lastName}</h1>
                    </div>
                
                    <section style={{paddingLeft: '1rem', paddingTop: '.3rem'}}>
                        <h3>PROFILE</h3>
                        <p>
                            {props.resume?.basicInfo?.profSummary}
                        </p>

                        
                        <div>
                            {props.resume?.workExpArray && (
                                <div>
                                    <h3>PROFESSIONAL EXPERIENCE</h3>
                                    {props.resume?.workExpArray.map((workInfo, index) => (
                                        <div key={index}>
                                            <div>
                                                <h4>
                                                    <span>{workInfo.position} </span><br />
                                                </h4>
                                                <h5>{workInfo.company}</h5>
                                            </div>
                                            <div style={{ color: "rgba(0, 0, 0, 0.454)", marginTop: '-3px' }}>
                                                {workInfo.dateFrom.slice(0, 7)} - {workInfo.currently ? "Present" : workInfo.dateTo.slice(0, 7)}
                                            </div>
                                            
                                            <ul>
                                            {workInfo.jobDesc.split(";").map((item, index) => (
                                                <li key={index}>{item.trim()}</li>
                                            ))}
                                            </ul>
                                
                                        </div>
                                    ))}
                                </div>
                            )}


                            {props.resume?.awardArray && (
                                <div>
                                    <h3>AWARDS & CERTIFICATIONS</h3>
                                    {props.resume.awardArray.length > 0 && (
                                        <section>
                                            {props.resume.awardArray.map((awardInfo, index) => (
                                                <div key={index} style={{marginBottom: "10px"}}>
                                                    
                                                    <h4>{awardInfo.award}</h4>
                                                    <h5>{awardInfo.org}</h5>
                                                    <div style={{ color: "rgba(0, 0, 0, 0.454)", marginTop: '-3px' }}>
                                                        {awardInfo.date.slice(0, 7)}
                                                    </div>
                                                </div>
                                            ))}
                                        </section>
                                    )}
                                </div>
                            )}

                            {props.resume.publications && (
                                <div>
                                    {props.resume.publications.length > 0 && (
                                        <section>
                                            <h3>PUBLICATIONS</h3>
                                            {props.resume.publications.map((publication, index) => (
                                                <p key={index}>{publication.title + ", " + publication.source + ", " + publication.date.slice(0, 4)}</p>
                                            ))}
                                        </section>
                                    )}
                                </div>
                            )}

                            <h3>REFEREES</h3>
                            <p>Available on Request</p>

                        </div>
                    </section>

                       
                </Grid>

                <Grid item xs={5} className={css.RightBg}>
                    <div className={css.idContainer}>
                        <div className={css.ImgContainer}>
                            <img src={props.imgUrl} alt="avatar" width={"100%"} />
                        </div>
                        
                        <div>
                           <PiPhoneCallFill /> {props.resume?.basicInfo?.mobile}
                        </div>
                        <hr />

                        <div>
                            <MdOutlineAlternateEmail /> {props.resume?.basicInfo?.email}
                        </div>
                        <hr />

                        <div>
                            <ImPushpin /> {props.resume?.basicInfo?.city + ", " + props.resume?.basicInfo?.country}
                        </div>
                        <hr />

                        {props.resume?.linkInfo?.length > 0 && (
                            <div>
                                {props.resume.linkInfo.map((link, index) => (
                                    <div key={index}>
                                        <PiLinkSimpleDuotone /> <a href={link} className={css.link}>{link}</a>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                    </div>

                    <div style={{marginTop: "1rem", borderLeft: '1px solid black', padding: '0 0 0 15px', height: '75%'}}>
                        <section>
                            <h3>EDUCATION</h3>
                            
                            {props.resume?.eduArray && (
                                <div>
                                    {props.resume?.eduArray?.map((eduInfo, index) => (
                                        <div key={index}>
                                            
                                            <h4>{eduInfo.institution}</h4>
                                            <h5>{eduInfo.degree}</h5>
                                            <div style={{ color: "rgba(0, 0, 0, 0.454)", marginTop: '-3px' }}>{eduInfo.date.slice(0, 7)}</div>
                                            
                                        </div>
                                    ))}
                                </div>
                            )}

                        </section>
                        
                        <section>
                            {props.resume?.skills?.length > 0 && (
                                <div>
                                    <h3>SKILLS</h3>
                                    <ul>
                                    {props.resume.skills.map((skill, index) => (
                                        <li key={index} className={css.SkillItems}> <span>{skill}</span></li>
                                    ))}
                                    </ul>

                                </div>
                            )}

                            {props.resume?.interests?.length > 0 && (
                                <div>
                                    <h3>HOBBIES</h3>
                                    {props.resume.interests.map((interest, index) => (
                                        <span key={index} className={css.SkillItems}><BiSolidLike /> <span>{interest}</span></span>
                                    ))}
                                </div>
                            )}
                        </section>

                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SwimmingElephant;