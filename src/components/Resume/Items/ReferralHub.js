import React from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../UI/AuthHeader/AuthHeader";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import coolImg from '../../../images/cool.png'
const screenWidth = window.innerWidth



const ReferralHub = () => {
    // const dispatch = useDispatch();
    // const confirm = useConfirm();
    // const { error, successMini,  } = useSelector((state) => state.stateData);
    const navigate = useNavigate();
    



    
    // const errorSetter = (string) => {
    //     dispatch(setError(string))
    //     errorAnimation()
    // }

    // const successSetter = (string) => {
    //     dispatch(setSuccessMini(string))
    //     successMiniAnimation()
    // }

    const goBackPrevPage = () => {
        navigate('/user/dashboard/resume');
    }





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
                headerText="My Network"
            />
            {/* <div className="error">{error}</div>
            <div className="success-mini">{successMini}</div> */}

            {/* <div style={{margin: '20px auto', width: screenWidth < 900 ? '100%' : '50%'}}>
                <AuthInputs 
                    placeholder="Search for a resume" 
                    inputType="search" 
                    mb={3} 
                    mt={5} 
                    required={true} 
                    value={searchString}
                    onChange={handleSearch}
                />
            </div>  */}

            
            <div style={styles.noResumes}>
                <h4>Coming Soon</h4>
                <div>
                    <img src={coolImg} width='100px' alt="Welcome" />
                </div>
            </div>


        </div>
    </div>
  );
};

export default ReferralHub;

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
        height: '80vh', 
        width: '100%'
    },
}
