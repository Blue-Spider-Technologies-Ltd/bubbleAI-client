import React, { useEffect, useState } from 'react';
import resumeCss from './Resume.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import StandardPDF from './Templates/Standard/StandardPDF';
import EuroPass from './Templates/Europass/EuroPass';
import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
import NotFound from '../Home/NotFound';
import { setFetching } from "../../redux/states";
import axios from 'axios';
import avatarImg from '../../images/avatar.png';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const ViewResume = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shareableLink = searchParams.get('link');
    const [resume, setResume] = useState({});
    const [resumeFetched, setResumeFetched] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const imgUrl = resume?.storageDetails?.imgUrl || avatarImg;
    const screenWidth = window.innerWidth;

    // Scroll to page top on render
    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(shareableLink);
    }, [shareableLink]);

    useEffect(() => {
        const fetchResume = async () => {
            dispatch(setFetching(true));
            try {
                const body = {
                    shareableLink: shareableLink
                };
                const response = await axios.post('/user/view-resume', body);
                if (response.status === 404) {
                    navigate("/not-found");
                    return; // Ensure early exit if not found
                }

                // It returns as an array of one object
                setResume(response.data.resume[0]);
                setTemplateName(response.data.resume[0]?.storageDetails?.template);
                setResumeFetched(true)
            } catch (error) {
                navigate("/not-found");
            } finally {
                dispatch(setFetching(false)); // Ensure fetching state is reset
            }
        };

        if (shareableLink) {
            fetchResume();
        }
    }, [dispatch, navigate, shareableLink]);

    const selectTemplate = () => {
        let template;
        switch (templateName) {
            case "Standard":
                template = <StandardPDF resume={resume} />;
                break;
            case "Euro Pass":
                template = <EuroPass resume={resume} imgUrl={imgUrl} />;
                break;
            default:
                template = <StandardPDF resume={resume} />;
                break;
        }
        return template;
    };

    const handleDownload = async () => {
        dispatch(setFetching(true));
        const fileName = resume?.basicInfo?.firstName + " " + resume?.basicInfo?.lastName + '.pdf';
        const blob = await pdf(selectTemplate()).toBlob();
        if (screenWidth < 1000) {
            // Mobile
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, '_blank');
        } else {
            saveAs(blob, fileName);
        }
        dispatch(setFetching(false));
    };

    return (
        <div>
            {!shareableLink ? (
                <NotFound />
            ) : (
                <div>
                    <div className={resumeCss.ResponsivePrintView}>
                        <div>
                            {resumeFetched && selectTemplate()}
                        </div>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        <div style={{ width: "150px" }}>
                            <ButtonSubmitGreen
                                type="button"
                                onClick={handleDownload}
                            >
                                <DownloadForOfflineIcon fontSize='medium' />
                                <span style={{ marginLeft: '5px', paddingTop: "1px" }}>Download PDF</span>
                            </ButtonSubmitGreen>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewResume;