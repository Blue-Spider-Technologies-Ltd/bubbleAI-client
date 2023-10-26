import React from 'react';
import MenuBar from "../UI/Menu/Menu";
import { Grid } from "@mui/material"
import { ButtonLogOut } from '../UI/Buttons/Buttons';
import ResumePricing from './ResumePricing';
import DepositionPricing from './DepositionPricing';
import FileTranscriptionPricing from './FileTranscriptionPricing';

//////This page contains CSS from HOME.CSS and INDEX.CSS
const Pricing = () => {

    
const pricingCategoryChoices = [ "Resume Pricing", "Proposal Pricing", "Deposition Pricing" ]

    return (
        <div>
            <MenuBar />

            <section id="ask-me" className="container" style={{ marginTop: "100px" }}>
                <div className="container-inner">
                    <h1 style={{color: "#56A8AC"}} className="ask-me-h2">Pricing</h1>
                    <h4>Click any button to see associated plan details</h4>

                    <Grid container>
                        {pricingCategoryChoices.map((detail, index) => {
                            return (
                                <Grid key={index} item xs={6} sm={4} p={2}>
                                    <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <ButtonLogOut>
                                            {detail}
                                        </ButtonLogOut>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </section>

            <ResumePricing />
            <DepositionPricing />
            <FileTranscriptionPricing />
         
        </div>
    )
}

export default Pricing;