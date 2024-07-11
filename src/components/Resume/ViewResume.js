import React, { useEffect, useState } from 'react';
import resumeCss from './Resume.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Standard from './Templates/Standard/Standard'
import RadiantMoon from './Templates/RadiantMoon/RadiantMoon';
import SwimmingElephant from './Templates/SwimmingElephant/SwimmingElephant';
import NotFound from '../Home/NotFound';
import { setFetching } from "../../redux/states";
import axios from 'axios';

const ViewResume = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shareableLink = searchParams.get('link');
    const [resume, setResume] = useState({})
    const [templateName, setTemplateName] = useState("")

    useEffect(() => {
        const fetchResume = async () => {
            dispatch(setFetching(true))
            try {
                const body = {
                    shareableLink: shareableLink
                }
                const response = await axios.post('/user/view-resume', body)
                if(response.status === 404) {
                    return navigate("/not-found")
                }
                //it return as an array of one object
                setResume(response.data.resume[0])
                setTemplateName(response?.data?.resume[0]?.storageDetails?.template)
                console.log(response?.data?.resume[0]?.storageDetails?.imgUrl);
                dispatch(setFetching(false))
            } catch (error) {
                dispatch(setFetching(false))
                console.log(error);
                navigate("/not-found")
            }
        }

        fetchResume()
    }, [])

    //scroll to page top on render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


  const selectTemplate = () => {
    let template
    switch (templateName) {
        case "Standard":
            template = <Standard resume={resume} />
            break;
        case "Radiant Moon":
            template = <RadiantMoon resume={resume} imgUrl={resume.storageDetails.imgUrl} />
            break;
        case "Swimming Elephant":
            template  = <SwimmingElephant resume={resume} imgUrl={resume.storageDetails.imgUrl} />
            break;
        default:
            template = <Standard resume={resume} />
            break;
    }

    return template
}

    return (
        <div>
            {!shareableLink ? (
                <NotFound /> 
            ) : (
                    <div className={resumeCss.ResponsivePrintView}>
                        <div>
                            {selectTemplate()}
                        </div>
                        
                    </div>
                )
            }
        </div>
    );
};

export default ViewResume;
