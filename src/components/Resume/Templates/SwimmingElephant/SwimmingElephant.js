import React from "react";
import css from "./SwimmingElephant.module.css"
import { BiSolidLike } from "react-icons/bi";
import { Grid } from "@mui/material";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { ImPushpin } from "react-icons/im";
import { PiLinkSimpleDuotone } from "react-icons/pi";
import { FaCircleDot } from "react-icons/fa6";
import { getMonthShortName, capitalizeWords } from "../../../../utils/client-functions";


const SwimmingElephant = (props) => {

    return (
        <div className={css.elephantContainer}>
            <Grid container>
                <Grid item xs={7} className={css.LeftBg}>

                    <div className={css.Role}>
                        {capitalizeWords(props.resume?.basicInfo?.jobPosition)}
                    </div>
                    <div className={css.Names}>
                        <h1 style={{marginTop: "0", marginBottom: "0", color: 'rgb(145, 145, 145)'}}>{capitalizeWords(props.resume?.basicInfo?.lastName)}</h1>
                        <h1 style={{marginTop: "0"}}>{capitalizeWords(props.resume?.basicInfo?.firstName)}</h1>
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
                                                <h5>{capitalizeWords(workInfo.company)}</h5>
                                            </div>
                                            <div style={{ color: "rgba(0, 0, 0, 0.454)", marginTop: '-3px' }}>
                                                {getMonthShortName(workInfo?.dateFrom) + " " + workInfo.dateFrom.slice(0, 4)} - {workInfo.currently ? "Present" : getMonthShortName(workInfo?.dateTo) + " " + workInfo.dateTo.slice(0, 4)}
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
                                    {props.resume.awardArray.length > 0 && (
                                        <section>
                                            <h3>AWARDS & CERTIFICATIONS</h3>
                                            {props.resume.awardArray.map((awardInfo, index) => (
                                                <div key={index} style={{marginBottom: "10px"}}>
                                                    
                                                    <h4>{awardInfo.award}</h4>
                                                    <h5>{capitalizeWords(awardInfo.org)}</h5>
                                                    <div style={{ color: "rgba(0, 0, 0, 0.454)", marginTop: '-3px' }}>
                                                        {getMonthShortName(awardInfo?.date) + " " + awardInfo.date.slice(0, 4)}
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
                                            <ul>
                                                {props.resume.publications.map((publication, index) => (
                                                    <li key={index}>{capitalizeWords(publication.title) + ", " + publication.source + ", " + getMonthShortName(publication?.date) + " " + publication.date.slice(0, 4)}</li>
                                                ))}
                                            </ul>
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

                    <div style={{marginTop: "1rem", borderLeft: '3px solid rgb(145, 145, 145)', padding: '0 0 0 15px', height: '75%'}}>
                        <section>
                            <h3><FaCircleDot className={css.Icons} />EDUCATION</h3>
                            
                            {props.resume?.eduArray && (
                                <div style={{marginLeft: "1.6rem"}}>
                                    {props.resume?.eduArray?.map((eduInfo, index) => (
                                        <div key={index}>
                                            
                                            <h4>{eduInfo.institution}</h4>
                                            <h5>{capitalizeWords(eduInfo.degree)}</h5>
                                            <div style={{ color: "rgba(0, 0, 0, 0.454)", marginTop: '-3px' }}>{getMonthShortName(eduInfo?.date) + " " + eduInfo.date.slice(0, 4)}</div>
                                            
                                        </div>
                                    ))}
                                </div>
                            )}

                        </section>
                        
                        <section>
                            {props.resume?.skills?.length > 0 && (
                                <div>
                                    <h3><FaCircleDot className={css.Icons} />SKILLS</h3>
                                    <ul>
                                    {props.resume.skills.map((skill, index) => (
                                        <li key={index} className={css.SkillItems}> <span>{skill}</span></li>
                                    ))}
                                    </ul>

                                </div>
                            )}

                            {props.resume?.interests?.length > 0 && (
                                <div>
                                    <h3><FaCircleDot className={css.Icons} />HOBBIES</h3>
                                    {props.resume.interests.map((interest, index) => (
                                        <span key={index} className={css.SkillItems} style={{marginLeft: "1.6rem"}}><BiSolidLike /> <span>{interest}</span></span>
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