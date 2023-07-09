import React from "react";
import standardCss from "./Standard.module.css"
import PsychologyIcon from '@mui/icons-material/Psychology';
import FavoriteIcon from '@mui/icons-material/Favorite';



const Standard = (props) => {
    return (
        <div className={standardCss.StandardContainer}>
            <div className={standardCss.basicInfo}>
                <h3>{props.resume.basicInfo.firstName + " " + props.resume.basicInfo.lastName}</h3>
                <span>{props.resume.basicInfo.mobile}</span> <span><a href={`mailto:${props.resume.basicInfo.email}`}>{props.resume.basicInfo.email}</a></span>

                <div>
                    {props.resume.linkInfo.length > 0 ?
                        props.resume.linkInfo.map((link, index) => {
                            return <span><a href="/" key={index}>{link}</a> </span>
                        }) : ""
                    }
                </div>
            </div>

            <div className={standardCss.resBody}>
                <div className={standardCss.profSummary}>{props.resume.basicInfo.profSummary}</div>

                <section>
                    <h3>Education</h3>

                    {props.resume.eduArray.map((eduInfo, index) => {
                        return (<div key={index} className={standardCss.Education}>
                                    <h5>{eduInfo.institution}</h5>
                                    <div className={standardCss.FlexContainer}>
                                        <div><span>{eduInfo.degree}</span></div>
                                        <div>{eduInfo.date}</div>
                                    </div>
                                </div>)
                    })}

                </section>

                <section>
                    <h3>Relevant Experience</h3>
                    {props.resume.workExpArray.map((workInfo, index) => {
                        return (
                            <div>
                            <div className={standardCss.FlexContainer}>
                                <div>
                                <h5 style={{ display: "inline" }}>
                                    <span>{workInfo.position}</span> - <span>{workInfo.company}</span>{" "}
                                    <a href={workInfo.workLink}>({workInfo.workLink})</a>
                                </h5>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                <span>{workInfo.dateFrom}</span> - <span>{workInfo.dateTo}</span>
                                </div>
                            </div>
                            <div style={{ color: "rgba(0, 0, 0, 0.454)" }}>{workInfo.industry}</div>
                            <ul>
                                {workInfo.jobDesc
                                .split(";")
                                .map((item, index) => (
                                    <li key={index}>{item.trim()}</li>
                                ))}
                            </ul>
                            </div>
                        );
                    })}

                </section>

                <section>
                    <h3>Skills & Proficiencies</h3>
                        <div className={standardCss.Skills}>
                        {props.resume.skills.map((skill, index) => {
                            return (
                                <span key={index} className={standardCss.SkillItems}><PsychologyIcon fontSize="inherit" /> <span>{skill}</span></span>
                            );
                        })}
                    </div>

                </section>

                <section>
                    <h3>Certifications & Awards</h3>
                    {props.resume.awardArray.map((awardInfo, index) => {
                        return (<div key={index} className={standardCss.Education}>
                                    <h5>{awardInfo.org}</h5>
                                    <div className={standardCss.FlexContainer}>
                                        <div><span>{awardInfo.award}</span></div>
                                        <div>{awardInfo.date}</div>
                                    </div>
                                </div>)
                    })}

                </section>

                <section>
                    <h3>Publications</h3>
                    <ul>
                        <li><span>Pollution Education Inclusion in Secondary School Curriculum</span>, <span>(source) A Case Study of Edo South Senatorial District</span>, <span>2018</span></li>
                        <li><span>Tech Curriculum Development and Inclusion in Early Child Education</span>, <span>(source) A research Proposal Submitted to The Federal Ministry of Education, Abuja Nigeria</span>, <span>2022</span></li>
                    </ul>
                </section>

                <section>
                    <h3>Interests</h3>

                    <div className={standardCss.Skills}>
                    {props.resume.interests.map((interest, index) => {
                        return (
                            <span key={index} className={standardCss.SkillItems}><FavoriteIcon fontSize="inherit" /> <span>{interest}</span></span>
                        );
                    })}

                    </div>

                </section>

            </div>
        </div>
    )
}

export default Standard;