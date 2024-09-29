import React, { useEffect, useState } from 'react';
import resumeCss from './Resume.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import StandardPDF from './Templates/Standard/StandardPDF'
import EuroPass from './Templates//Europass/EuroPass';
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import NotFound from '../Home/NotFound';
import { setFetching } from "../../redux/states";
import axios from 'axios';
import avatarImg from '../../images/avatar.png'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const ViewResume = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shareableLink = searchParams.get('link');
    const [resume, setResume] = useState({})
    const [templateName, setTemplateName] = useState("")
    const imgUrl = resume?.storageDetails?.imgUrl || avatarImg
    const screenWidth = window.innerWidth

    
    //scroll to page top on render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            } catch (error) {
                // console.log(error);
                navigate("/not-found")
            }
            dispatch(setFetching(false))
        }

        fetchResume()
    }, [])



    const selectTemplate = () => {
        let template
        switch (templateName) {
            case "StandardPDF":
                template = <StandardPDF resume={resume} />
                break;
            case "Euro Pass":
                template = <EuroPass resume={resume} imgUrl={imgUrl} />
                break;
            default:
                template = <StandardPDF resume={resume} />
                break;
        }

        return template
    }

    const handleDownload = async () => {


        const fileName = resume?.storageDetails?.name + '.pdf';
        const blob = await pdf(selectTemplate()).toBlob();

        if(screenWidth < 1000) {
            // Mobile
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
        } else {
            saveAs(blob, fileName);
        }
            
    }

    return (
        <div>
            {!shareableLink ? (
                <NotFound /> 
            ) : (

                    <div>
                        <div className={resumeCss.ResponsivePrintView}>
                            <div>
                                {selectTemplate()}
                            </div>
                            
                        </div>

                        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                            <div style={{ width: "150px" }}>
                                <ButtonSubmitGreen 
                                    type="button"
                                    onClick={handleDownload}
                                >
                                
                                    <DownloadForOfflineIcon fontSize='medium' /><span style={{ marginLeft: '5px', addingTop: "1px" }}>Download PDF </span>
                                </ButtonSubmitGreen>
                            </div>
                            
                        </div>
                    </div>

                )
            }
        </div>
    );
};

export default ViewResume;
