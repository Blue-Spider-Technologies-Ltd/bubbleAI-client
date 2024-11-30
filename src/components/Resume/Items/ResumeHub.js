import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { ButtonSubmitGreen, ButtonThin } from "../../UI/Buttons/Buttons";
import { Grid } from "@mui/material";
import avatarImg from '../../../images/avatar.png'
import axios from 'axios';
import AuthInputs from "../../UI/Input/AuthInputs";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IoMdRemoveCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { errorAnimation, successMiniAnimation, checkAuthenticatedUser } from "../../../utils/client-functions";
import { setError, setSuccessMini, setResume, setFetching, setUserResumesAll } from "../../../redux/states";
const screenWidth = window.innerWidth



const ResumeHub = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const { error, successMini, userResumesAll } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    const copyLink = useRef(null);
    const isAuth = localStorage?.getItem("token")
    const [img, setImg] = useState('')
    const [searchString, setSearchString] = useState("");
    const [resumeForSearch, setResumeForSearch] = useState("");
    

    useEffect(() => {

        const resumeLength = Object.keys(userResumesAll).length;

        if (resumeLength < 1 ) {
            navigate('/user/dashboard/resume?customize');
        } 
        setResumeForSearch(userResumesAll)
    }, []);

    useEffect(() => {
        setImg(avatarImg)
    }, []);

    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    const goBackPrevPage = () => {
        navigate('/user/dashboard/resume');
    }


    const handleCopy = () => {
        if (copyLink.current) {
            const textToCopy = copyLink.current.textContent;
      
            if (navigator.clipboard) {
              navigator.clipboard.writeText(textToCopy)
                .then(() => {
                  successSetter("Link copied to clipboard");
                })
                .catch((err) => {
                  errorSetter("Failed to copy Link: ", err);
                });
            } else {
              // For older browsers
              const tempTextArea = document.createElement("textarea");
              tempTextArea.value = textToCopy;
              document.body.appendChild(tempTextArea);
              tempTextArea.select();
              document.execCommand("copy");
              document.body.removeChild(tempTextArea);
      
              successSetter("Link copied to clipboard");
            }
        }
    };

    const handleReDownload = (index) => {
        // setTrueOpened(true)
        confirm({
            title: `Open "${resumeForSearch[index].storageDetails.name}" Resume?`,
            description: `Click OK to preview`,
        })
        .then(() => {
            //set only one resume to download
            dispatch(setResume(resumeForSearch[index]))
            navigate("/user/dashboard/resume?download");
        })
        .catch(() => {
            return    
        });
    }

    const handleDeleteResume = async (index, imgUrl) => {
        try {
            //must await
            await checkAuthenticatedUser()
        } catch (error) {
            dispatch(setFetching(false));
            return navigate("/popin?resume");      
        }
        confirm({
            title: `Delete "${resumeForSearch[index].storageDetails.name}" Resume?`,
            description: `Click OK to delete selected resume forever`,
        })
        .then(async () => {
            dispatch(setFetching(true))
            let body;
            if(imgUrl) {
                const urlParts = new URL(imgUrl);
                const pathname = urlParts.pathname;
                const pathParts = pathname.split('/');
                const fileName = pathParts[pathParts.length - 1];
                body = {
                    nameOfResume: resumeForSearch[index].storageDetails.name,
                    fileName: fileName
                }
            } else {
                body = {
                    nameOfResume: resumeForSearch[index].storageDetails.name,
                }
            }

            try {
                const response = await axios.post("/user/delete-resume", body, {
                    headers: {
                        "x-access-token": isAuth,
                    },
                });
                dispatch(setUserResumesAll(response.data.resume))
                setResumeForSearch(response.data.resume)
                dispatch(setFetching(false))
                successSetter("Resume Deleted")
            } catch (error) {
                dispatch(setFetching(false))
                errorSetter(error.response.data.error)
            }
        })
        .catch(() => {
            return    
        });
    }

    const handleSearch = (e) => {
        const newSearchString = e.target.value;
        setSearchString(newSearchString);
    
        if (newSearchString.length < 1) {
            setResumeForSearch(userResumesAll);
        } else  {
            // Filter the resumes based on the search string
            const filteredData = resumeForSearch.filter(item =>
              item.storageDetails.name.includes(newSearchString)
            );
            setResumeForSearch(filteredData);
        }
    };


    return (
        <div className="auth-container">
            {/* For SIDE MENU */}
            <div style={{ width: "100%", padding: "0" }}>
                <div className="auth-bg-blob"></div>
            </div>
            <div className='go-back' style={{position: "absolute", top: "1.3rem", left: "1rem"}}>
                <div onClick={goBackPrevPage} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', width: '80px'}}>
                    <ArrowCircleLeftIcon fontSize='large' />
                </div>
            </div>

            <div className="auth-container-inner">
                {/* for TOP MENU */}
                <AuthHeader
                    noAuthMenu={true}
                    headerText="My Resumes"
                />
                <div className="error">{error}</div>
                <div className="success-mini">{successMini}</div>

                <div style={{margin: '20px auto', width: screenWidth < 900 ? '100%' : '50%'}}>
                    <AuthInputs 
                        placeholder="Search resume by name" 
                        inputType="search" 
                        mb={3} 
                        mt={5} 
                        required={true} 
                        value={searchString}
                        onChange={handleSearch}
                    />
                </div> 

                {Object.keys(userResumesAll).length < 1 ? (
                    <div style={styles.noResumes}>
                        <h4>Your Resumes Appear here</h4>
                        <div style={{width: '200px'}}>
                            <ButtonSubmitGreen onClick={goBackPrevPage}>Create Resume</ButtonSubmitGreen>
                        </div>
                    </div>
                ) : (
                    Object.keys(resumeForSearch).length < 1 ? (
                        <div style={styles.noResumes}>
                            <h4>No resume found</h4>
                        </div>
                    ) : (
                        <Grid container>
                            {resumeForSearch.map((item, index) => (
                                <Grid key={index} item xs={12} md={6} sx={styles.cardGrid}>
                                    <Card sx={styles.card}>
                                        <CardMedia
                                            component="img"
                                            sx={styles.img}
                                            image={item?.storageDetails?.imgUrl ? item?.storageDetails?.imgUrl : img}
                                            alt="Avatar"
                                        />
                                        
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {item?.storageDetails?.name ? item.storageDetails.name.length > 18 ? `${item.storageDetails.name.slice(0, 18)}...` : item.storageDetails.name : 'Unnamed'}
                                                </Typography>
                                                {item?.storageDetails?.resumeLink && (
                                                    <div style={styles.link} title="Copy Resume Link" onClick={handleCopy}>
                                                        <div style={{overflowX: 'hidden', whiteSpace: 'nowrap'}}>
                                                            <span>Copy Share Link</span> 
                                                            <span style={{ display: 'none'}} ref={copyLink}>
                                                                {item?.storageDetails?.resumeLink}
                                                            </span>
                                                        </div>
                                                        <div >
                                                            <ContentCopyIcon fontSize='small' />
                                                        </div>
                                                    </div>
                                                )}
                                                {item?.storageDetails?.buildDate && (
                                                    <Typography sx={styles.buildDate}>
                                                        {item?.storageDetails?.buildDate}
                                                    </Typography>
                                                )}

                                            </CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-around', pl: 1, pb: 1 }}>
                                                <ButtonThin
                                                    fontSize='.6rem' 
                                                    border='2px solid #3E8F93' 
                                                    width={'100px'} 
                                                    height='25px' 
                                                    color='black'
                                                    onClick={() => handleReDownload(index)}
                                                >
                                                    <FaEye style={{color: "#3E8F93", fontSize: ".9rem"}} />&nbsp;&nbsp; View 
                                                </ButtonThin>

                                

                                                <ButtonThin
                                                    fontSize='.6rem' 
                                                    border='2px solid rgba(158, 9, 9, 0.733)' 
                                                    width={'100px'} 
                                                    height='25px' 
                                                    color='rgba(158, 9, 9, 0.733)'
                                                    onClick={() => handleDeleteResume(index, item?.storageDetails?.imgUrl)}
                                                >
                                                    <IoMdRemoveCircle style={{color: "rgba(158, 9, 9, 0.733)", fontSize: ".9rem"}} />&nbsp;&nbsp; Delete
                                                </ButtonThin>
                                            </Box>
                                        </Box>

                                    </Card>
                                </Grid>
                            ))}          
                        </Grid>
                    )

                )}

            </div>
        </div>
    );
};

export default ResumeHub;

const styles = {
    cardGrid: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px auto'
    },
    card: { 
        backgroundColor: '#c0d1d457',
        borderRadius: '20px',
        color: 'black',
        display: 'flex', 
        width: screenWidth < 900 ? '100%' : '90%',
    },
    buildDate: {
        marginTop: '10px',
        marginBottom: '-10px',
        textAlign: 'right',
        fontSize: '.6rem',
        width: '100%'
    },
    link: {
        borderRadius: '20px',
        color: 'rgba(0, 0, 0, 0.634)',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 250, 250, 0.625)',
        cursor: 'copy',
        margin: '5px 0',
        height: '35px',
        width: '100%',
        padding: '5px',
        zIndex: '1',
        fontSize: '.75rem',
    },
    img: {
        borderRadius: '50%',
        margin: '10px auto',
        width: '40%',
        maxWidth: '150px',
        maxHeight: '150px'
    },
    greenBtnCont: {
        width: '100px',
        height: '25px'
    },
    noResumes: {
        boxSizing: 'border-box',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '30vh', 
        width: '100%'
    }
}
