import React from 'react';
import cardCss from './PriceCard.module.css';
import { Grid, List, ListItem, ListItemIcon, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ButtonSubmitGreen, ButtonOutlineGreenWithDiffStyle } from '../Buttons/Buttons';
import CancelIcon from '@mui/icons-material/Cancel';


//////This page contains CSS from HOME.CSS and INDEX.CSS
const PriceCard = ({details}) => {


    return (
        <div className={cardCss.CardContainer}>
            <div className={cardCss.CardTop}>
                <h3>{details.title}</h3>
            </div>
            <hr />
            <div className={cardCss.PriceTag}>
                {details.price + details.currency}
            </div>
            <div className={cardCss.CardBottom}>
                <Grid item xs={12}>
                    <List>
                    
                        <ListItem >
                            <ListItemIcon>
                                {details.features.downloadablePDF.available ? (
                                    <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                ) : (
                                    <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                )}
                            </ListItemIcon>
                            <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                {details.features.downloadablePDF.text}
                            </Typography>
                        </ListItem>  
                        <ListItem >
                            <ListItemIcon>
                                {details.features.reAccessSaved.available ? (
                                    <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                ) : (
                                    <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                )}
                            </ListItemIcon>
                            <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                {details.features.reAccessSaved.text}
                            </Typography>
                        </ListItem>

                        <ListItem >
                            <ListItemIcon>
                                {details.features.editPrev.available ? (
                                    <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                ) : (
                                    <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                )}
                            </ListItemIcon>
                            <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                {details.features.editPrev.text}
                            </Typography>
                        </ListItem>  

                         <ListItem >
                            <ListItemIcon>
                                {details.features.sharableLink.available ? (
                                    <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                ) : (
                                    <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                )}
                            </ListItemIcon>
                            <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                {details.features.sharableLink.text}
                            </Typography>
                        </ListItem>   

                        <ListItem >
                            <ListItemIcon>
                                {details.features.changeName.available ? (
                                    <CheckCircleIcon sx={{color: '#3E8F93'}} fontSize='small' />
                                ) : (
                                    <CancelIcon sx={{color: 'rgb(216, 7, 7)'}} fontSize='small' />
                                )}
                            </ListItemIcon>
                            <Typography sx={{ml: -3, fontSize: '.9rem'}}>
                                {details.features.changeName.text}
                            </Typography>
                        </ListItem>  

                    </List>
                </Grid>

                <div style={{ width: "100%", display: 'flex', justifyContent: 'center'}}>
                    <div style={{ width: "85%"}}>

                        {details.popular ? (
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