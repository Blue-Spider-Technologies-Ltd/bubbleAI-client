import React from 'react';
import cardCss from './PriceCard.module.css';
import { Grid, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ButtonSubmitGreen, ButtonOutlineGreenWithDiffStyle } from '../Buttons/Buttons';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from "react-redux";
import { setShowCheckout, setPricingDetails } from "../../../redux/states";
import { IoSparklesSharp } from "react-icons/io5";
import offerStarImg from '../../../images/offer-star.png'
import fullRefundImg from '../../../images/refund-stamp.png'

//////This page contains CSS from HOME.CSS and INDEX.CSS
const PriceCard = ({details}) => {
    const { product, duration, price, currency, popular, offer, features } = details;
    const formattedPrice = price?.toLocaleString('en-US');
    const twicePrice = price * 1.97
    const twicePriceFormatted = twicePrice?.toLocaleString('en-US');
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

            {/* <hr /> */}
            <div className={cardCss.PriceTag}>

                {offer && <div style={{color: '#2C3E50', textDecoration: 'line-through', fontSize: '.8rem', fontWeight: '700', justifyContent: 'flex-start'}}>{twicePriceFormatted + " " + currency}</div>}
                <div>{formattedPrice + " " + currency}</div>
                {offer && <div 
                    style={{fontSize: '.7rem', color: '#F0E68C', fontWeight: '700', position: 'relative'}}
                >
                    <span>50% OFF TODAY </span> <span><img src={offerStarImg} alt='discount' style={{ width: '1rem', marginLeft: '1px' }} /></span>
                </div>}
                
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

                        {features.editPreview && (
                            <ListItem >
                                <ListItemIcon>
                                    {features.editPreview.available ? (
                                        <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                    ) : (
                                        <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                    )}
                                </ListItemIcon>
                                <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                    {features.editPreview.text}
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
                {features.recommendation && 
                    <List className='link' style={{ marginTop: '-10px'}}> 
                        <ListItem >
                            <ListItemIcon>
                                <IoSparklesSharp style={{color: "#F8E231", fontSize: "1rem"}} />
                            </ListItemIcon>
                            <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                {features.recommendation.text}
                            </Typography>
                        </ListItem> 
                    </List>
                }

                {duration === 'Per Month' && <List style={{ marginTop: '-10px'}}> 
                    <ListItem >
                        <ListItemIcon style={{width: "1rem"}}>
                            <img style={{width: "1rem"}} src={fullRefundImg} alt='ref' />
                        </ListItemIcon>
                        <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                            Money-Back Guarantee (T&C)
                        </Typography>
                    </ListItem> 
                </List>}

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