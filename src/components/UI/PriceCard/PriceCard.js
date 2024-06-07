import React from 'react';
import cardCss from './PriceCard.module.css';
import { Grid, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ButtonSubmitGreen, ButtonOutlineGreenWithDiffStyle } from '../Buttons/Buttons';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from "react-redux";
import { setShowCheckout, setPricingDetails } from "../../../redux/states";


//////This page contains CSS from HOME.CSS and INDEX.CSS
const PriceCard = ({details}) => {
    const { product, duration, price, currency, popular, features } = details;
    const formattedPrice = price?.toLocaleString('en-US');
    const dispatch = useDispatch()

    const pricingObject = {
        product: product,
        duration: duration,
        price: price,
        currency: currency
    }
    const showCheckoutFunction = () => {
        dispatch(setPricingDetails(pricingObject))
        dispatch(setShowCheckout(true))
    }

    return (
        <div className={cardCss.CardContainer}>
            <div className={cardCss.CardTop}>
                <h3>{duration}</h3>
            </div>
            <hr />
            <div className={cardCss.PriceTag}>
                {formattedPrice + " " + currency}
            </div>
            <div className={cardCss.CardBottom}>
                <Grid item xs={12}>

                    <List>
                        {features.downloadablePDF && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.downloadablePDF.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.downloadablePDF.text}
                                </Typography>
                            </ListItem> 
                        )}
 
                        {features.severalTemplates && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.severalTemplates.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.severalTemplates.text}
                                </Typography>
                            </ListItem>
                        )}
                        
                        {features.createSeveral && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.createSeveral.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.createSeveral.text}
                                </Typography>
                            </ListItem>  
                        )}  

                        {features.coverLetter && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.coverLetter.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.coverLetter.text}
                                </Typography>
                            </ListItem>  
                        )} 

                        {features.aiJobSuggestions && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.aiJobSuggestions.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.aiJobSuggestions.text}
                                </Typography>
                            </ListItem> 
                        )}

                        {features.changeName && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.changeName.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.changeName.text}
                                </Typography>
                            </ListItem> 
                        )}

                        {features.reAccessSaved && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.reAccessSaved.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.reAccessSaved.text}
                                </Typography>
                            </ListItem>
                        )}              

                        {features.sharableLink && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.sharableLink.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.sharableLink.text}
                                </Typography>
                            </ListItem> 
                        )}
              
                    </List>
                </Grid>

                <div style={{ width: "100%", display: 'flex', justifyContent: 'center'}}>
                    <div style={{ width: "85%"}}>

                        {popular ? (
                            <ButtonSubmitGreen onClick={showCheckoutFunction}>
                                <span style={{ marginRight: "5px", paddingTop: "1px" }}>Get Started </span>
                            </ButtonSubmitGreen>
                        ) : (
                            <ButtonOutlineGreenWithDiffStyle onClick={showCheckoutFunction}>
                                <span style={{ marginRight: "5px", paddingTop: "1px" }}>Get Started </span>
                            </ButtonOutlineGreenWithDiffStyle>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PriceCard;