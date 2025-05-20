import React from "react";
import { Grid } from "@mui/material";
import JobCard from "./JobCard";
import { ThreeCircles } from 'react-loader-spinner';

const styles = {
    cardGrid: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px auto'
    }
};

const JobList = ({
    jobs,
    img,
    activeIndex,
    setActiveIndex,
    applicationMap,
    expandedAppIndex,
    setExpandedAppIndex,
    handleCopy,
    getJob,
    getResume,
    chooseActStr,
    deleteJob,
    isResumeSubbed,
    loadingJobs
}) => {
    return (
        <Grid container>
            {jobs.map((job, index) => (
                <Grid item xs={12} md={6} sx={styles.cardGrid} key={index}>
                    <JobCard
                        job={job}
                        img={img}
                        index={index}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        app={applicationMap[job.id]}
                        expandedAppIndex={expandedAppIndex}
                        setExpandedAppIndex={setExpandedAppIndex}
                        handleCopy={handleCopy}
                        getJob={getJob}
                        getResume={getResume}
                        chooseActStr={chooseActStr}
                        deleteJob={deleteJob}
                        isResumeSubbed={isResumeSubbed}
                    />
                </Grid>
            ))}

            {loadingJobs && (
                <Grid item xs={12} sx={{height: '50px', ...styles.cardGrid}}>
                    <ThreeCircles
                        height="50"
                        width="50"
                        innerCircleColor="#F8E231"
                        middleCircleColor="#987070"
                        outerCircleColor="#7CC9CC"
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default JobList;