import React from 'react';
import cardCss from './PriceCard.module.css';
import { Grid, List, ListItem, ListItemIcon, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ButtonSubmitGreen, ButtonOutlineGreenWithDiffStyle } from '../Buttons/Buttons';
import CancelIcon from '@mui/icons-material/Cancel';


//////This page contains CSS from HOME.CSS and INDEX.CSS
const PriceCard = ({details}) => {
    const { title, price, currency, popular, features } = details;
    const formattedPrice = price.toLocaleString('en-US');

    return (
        <div className={cardCss.CardContainer}>
            <div className={cardCss.CardTop}>
                <h3>{title}</h3>
            </div>
            <hr />
            <div className={cardCss.PriceTag}>
                {formattedPrice + " " + currency}
            </div>
            <div className={cardCss.CardBottom}>
                <Grid item xs={12}>
                    <List>
                    
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

                        <ListItem >
                            <ListItemIcon>
                                {features.editPrev.available ? (
                                    <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                ) : (
                                    <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                )}
                            </ListItemIcon>
                            <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                {features.editPrev.text}
                            </Typography>
                        </ListItem>  

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

                    </List>
                </Grid>

                <div style={{ width: "100%", display: 'flex', justifyContent: 'center'}}>
                    <div style={{ width: "85%"}}>

                        {popular ? (
                            <ButtonSubmitGreen>
                                <span style={{ marginRight: "5px", paddingTop: "1px" }}>Get Started </span>
                            </ButtonSubmitGreen>
                        ) : (
                            <ButtonOutlineGreenWithDiffStyle>
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