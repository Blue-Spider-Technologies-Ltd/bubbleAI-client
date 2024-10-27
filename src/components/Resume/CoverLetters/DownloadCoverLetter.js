import React, { useEffect, useState, useRef } from 'react'
import resumeCss from '../Resume.module.css'
import { setError, setFetching, setSuccessMini } from "../../../redux/states";
import { pdf, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
// import ProtectedContent from "../../UI/ProtectedContent/ProtectedContent";
import { useConfirm } from "material-ui-confirm";
import { useDispatch } from "react-redux";
import { ButtonSubmitGreen } from '../../UI/Buttons/Buttons';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import "react-multi-carousel/lib/styles.css";
import { errorAnimation, successMiniAnimation } from "../../../utils/client-functions";
// import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
import AuthHeader from '../../UI/AuthHeader/AuthHeader';
import CLStandardPDF from './CLStandardPDF';
import CLEuroPass from './CLEuroPass';
import CLAuckland from './CLAuckland';
const screenWidth = window.innerWidth



const styles = StyleSheet.create({
    viewerContainer: {
        width: '100%',
        height: screenWidth > 800 ? 1200 : 900
    }
});



const DownloadCoverLetter = () => {
    const resumeLocal = localStorage.getItem('resume')
    const resume = JSON.parse(resumeLocal)
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const componentRef = useRef();
    const [authMenuOpen, setAuthMenuOpen] = useState(false)
    const template = localStorage?.getItem("template")
    const imgUrl = localStorage?.getItem("imgUrl")
    const letter = localStorage?.getItem("letter")

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }
    
    //scroll to page top on render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const selectTemplate = () => {

        let selectedTemplate;
   
        switch (template) {
            case "Standard":
                selectedTemplate  = <CLStandardPDF resume={resume} letter={letter} />
                break;
            case "Euro Pass":
                selectedTemplate  = <CLEuroPass resume={resume} imgUrl={imgUrl} letter={letter} />
                break;
            case "Auckland":
                selectedTemplate  = <CLAuckland resume={resume} imgUrl={imgUrl} letter={letter} />
                break;
            case "Flying Fish":
            case "Water Train":
            case "Sinking Duck":
                selectedTemplate  = <h5 style={{textAlign: "center", padding: "30px 0 !important"}}>Coming Soon</h5>
                break;
        
            default:
                selectedTemplate  = <CLStandardPDF resume={resume} letter={letter} />
                break;
        }

        return selectedTemplate
    }

    const handleResumeSave = async () => {
        dispatch(setFetching(true));
    
        try {
            const fileName = 'Bubble-ai-cover.pdf';
            const blob = await pdf(selectTemplate()).toBlob();

            if(screenWidth < 1000) {
                // Mobile
                const blobUrl = URL.createObjectURL(blob);
                window.open(blobUrl, '_blank');
            } else {
                saveAs(blob, fileName);
            }
            localStorage.removeItem("template")            
            localStorage.removeItem("imgUrl")
            localStorage.removeItem("letter")
            successSetter("Cover Letter Downloaded")
        } catch (error) {
            dispatch(setFetching(false));
            errorSetter("Not Downloaded, Try again")
        }

        dispatch(setFetching(false));
    }


    const toggleResumes = () => {
        setAuthMenuOpen(!authMenuOpen)
    }



    const handleDownload = () => {
        const note = screenWidth < 900 ? 'Click OK only when instruction completed. MOBILE DETECTED! Enable browser pop-ups to let CV download. Go to Phone settings ⚙️; Search pop-up and allow it. After that, your letter will open in another tab, click the share (📤) button on your browser to save to files or share.' : 'This action is irreversible, continue?'
        confirm({ 
                description: note,
                title: "⚠️⚠️⚠️PLEASE READ⚠️⚠️⚠️"
            })
            .then(() => {
                handleResumeSave()
            })
            .catch(() => {
                errorSetter("Cover Letter not downloaded")
            });
    }

    return (
        <div className="auth-container">
            {/* For SIDE MENU */}
            {/* <AuthSideMenu opened={authMenuOpen} seacrhBarPlaceholder="Search by resume name" hidden={!authMenuOpen} /> */}

            <div style={{ width: '100%', padding: '0' }}>
                <div className="auth-bg-blob">
                </div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                <AuthHeader authMenuOpen={authMenuOpen} onClick={toggleResumes} headerText="Cover Letter" />

                <div className="BodyWrapper">
                    <form>
                        <div className="Segment">
                            <h4>View and Download</h4>
                            
                                    <div id="ComponentRef" ref={componentRef} className={resumeCss.ResponsivePrintView}>
                                        <div style={{ height: '50px', width: '27%', position: 'absolute', right: '2px', top: '2px', backgroundColor: screenWidth > 700 ? '#323639' : 'white', zIndex: 20}}>
                                        </div>
                                        <PDFViewer style={styles.viewerContainer} >
                                            {selectTemplate()}
                                        </PDFViewer>
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

                    </form>

                </div>
            </div>
        </div>
    )
}


export default DownloadCoverLetter;