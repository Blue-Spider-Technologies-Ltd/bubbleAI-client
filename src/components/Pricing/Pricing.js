import React, {memo} from 'react';
import MenuBar from "../UI/Menu/Menu";
import { Grid } from "@mui/material"
// import { ButtonLogOut } from '../UI/Buttons/Buttons';
import ResumePricing from './ResumePricing';
// import DepositionPricing from './DepositionPricing';
// import FileTranscriptionPricing from './FileTranscriptionPricing';
import { CheckoutSummaryModal } from '../UI/Modal/Modal';
import { useSelector } from "react-redux";
import CountdownTimer from '../UI/Promo/Countdown';
import ChatwootWidget from '../../utils/chatwoot';
import blackFridayImg from '../../images/black-friday.png'

//////This page contains CSS from HOME.CSS and INDEX.CSS
const Pricing = () => {
    const { showCheckout } = useSelector(state => state.stateData)
    
    // const pricingCategoryChoices = [ 
    //     {
    //         name: "Resume Pricing",
    //         to: "/pricing#resume"
    //     },
    //     {
    //         name: "Deposition Pricing",
    //         to: "/pricing#deposition"
    //     },
    //     {
    //         name: "Transcription & Translation",
    //         to: "/pricing#transcription"
    //     }
    // ]

    return (
        <div>
            <MenuBar />

            <section className="container" style={{ marginTop: "100px" }}>
                <div className="container-inner">
                    <h1 style={{color: "#56A8AC"}}>Pricing</h1>
                    {/* <h4>On this page</h4>

                    <Grid container>
                        {pricingCategoryChoices.map((detail, index) => {
                            return (
                                <Grid key={index} item xs={6} sm={4} p={2}>
                                    <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <ButtonLogOut to={detail.to}>
                                            {detail.name}
                                        </ButtonLogOut>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid> */}
                </div>
            </section>

            <section style={styles.fridaySec}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <div style={styles.imgCont}>
                            <img style={styles.img} src={blackFridayImg} alt='Black Friday'/>
                        </div>
                    </Grid>                    
                    <Grid item xs={12} md={2}>
                        <div style={styles.endText}><div>ENDS IN</div></div>
                    </Grid>                    
                    <Grid item xs={12} md={5}>
                        <CountdownTimer />
                    </Grid>
                </Grid>
            </section>

            <ResumePricing />
            {/* <DepositionPricing />
            <FileTranscriptionPricing /> */}
         
            {showCheckout && <CheckoutSummaryModal />}

            <ChatwootWidget />
        </div>
    )
}

export default memo(Pricing);

const styles = {
    fridaySec: {
        width: '90vw',
        boxSizing: 'border-box',
        padding: '20px 40px',
        margin: 'auto'
    },
    endText: {
        boxSizing: 'border-box',
        paddingTop: '40px',
        paddingBottom: '20px',
        width: '100%',
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: '700',
    },
    img: {
        width: '80%',
        maxHeight: '150px'
    },
    imgCont: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
}