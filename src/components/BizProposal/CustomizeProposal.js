// import React, { useEffect, useState, useRef } from 'react'
// import resumeCss from './Resume.module.css'
// import { useNavigate } from 'react-router-dom'
// import AuthInput from '../UI/Input/AuthInputs'
// import { Grid } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { ButtonSubmitGreen } from '../UI/Buttons/Buttons';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import carouselData from './carousel-items';
// import { errorAnimation, successMiniAnimation, getOrdinalDate } from "../../utils/client-functions";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import AuthSideMenu from '../UI/AuthSideMenu/AuthSideMenu';
// import AuthHeader from '../UI/AuthHeader/AuthHeader';
// import Standard from './Templates/Standard/Standard'
// import RadiantMoon from './Templates/RadiantMoon/RadiantMoon';
// import Feedback from '../Dashboard/Feedback';
// import jwt_decode from "jwt-decode";
// import { SuccessFailureModal } from '../UI/Modal/Modal';
// import axios from 'axios';
// import { useReactToPrint  } from 'react-to-print';
// import { setError, setFetching, setSuccessMini } from "../../redux/states";
// import { checkAuthenticatedUser } from '../../utils/client-functions';
// import Alert from '@mui/material/Alert';
// import { useConfirm } from "material-ui-confirm";
// const screenWidth = window.innerWidth



// const CustomizeProposal = () => {
//     const { error, successMini, user } = useSelector(state => state.stateData)
//     const [authMenuOpen, setAuthMenuOpen] = useState(false)

//     const toggleProposals = () => {
//         setAuthMenuOpen(!authMenuOpen)
//     }

//     return (
//         <div className="auth-container">
//             {/* For SIDE MENU */}
//             {/* <AuthSideMenu opened={authMenuOpen} seacrhBarPlaceholder="Search by resume name" hidden={!authMenuOpen} /> */}

//             <div style={{ width: '100%', padding: '0' }}>
//                 <div className="auth-bg-blob">
//                 </div>
//             </div>

//             <div className="auth-container-inner">
//                 {/* for TOP MENU */}
//                 <AuthHeader 
//                     authMenuOpen={authMenuOpen} 
//                     onClick={toggleProposals} 
//                     headerText="Customize Proposal" 
//                 />

//                 <div className="BodyWrapper">
//                     <div className="BuildNavigator">
//                         <div className="ActiveNav"><span>1</span>Customise</div>
//                         <div><span>2</span>Preview</div>
//                         <div><span>3</span>Download</div>
//                     </div>
//                     <form>
//                         <div className='error'>{error}</div>
//                         <div className="success-mini">{successMini}</div>
//                         {/* <div className='explanation-points'>
//                             <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="info">Click Download only when you are sure to download as action is not reversible</Alert>
//                             {screenWidth < 900 && <Alert sx={{padding: '0 5px', fontSize: '.7rem'}} severity="info">Flip screen orientation to landscape to display template properly on mobile</Alert>}
//                         </div> */}
//                         <div className="Segment">
//                             <h4>Proposal Details</h4>
//                             <div>
//                                 <Grid container>
//                                     <AuthInput 
//                                         name="resumeName"  
//                                         value={storageDetails.name} 
//                                         label="Resume Name" 
//                                         inputType="text" 
//                                         inputGridSm={12} 
//                                         inputGrid={12} 
//                                         mb={2} 
//                                         onChange={handleInputChange('name')} 
//                                         onBlur={() => checkObjectForKeyValue(user.resumes, "storageDetails", "name", storageDetails.name)} 
//                                     />
//                                     <AuthInput name="desc" value={storageDetails.desc} placeholder="Optional Description" multiline={true} rows={2} inputGridSm={12} onChange={handleInputChange('desc')} />
//                                 </Grid>
//                             </div>
//                         </div>


//                         <div className="Segment">

//                         </div>


//                     </form>

//                 </div>

//             </div>
//         </div>
//     )
// }



// export default CustomizeProposal;