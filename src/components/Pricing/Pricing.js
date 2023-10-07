import React, { useEffect, useState } from 'react';
import MenuBar from "../UI/Menu/Menu";
import { Grid } from "@mui/material"
import { ButtonLogOut } from '../UI/Buttons/Buttons';
import PriceCard from '../UI/PriceCard/PriceCard';
import { fetchPrice, fetchCurrency } from '../../utils/functions';
import { Fetching } from '../UI/Modal/Modal';


//////This page contains CSS from HOME.CSS and INDEX.CSS
const Pricing = () => {
    const [pricePerUse, setPricePerUse] = useState(0)
    const [pricePerWeek, setPricePerWeek] = useState(0)
    const [pricePerMonth, setPricePerMonth] = useState(0)
    const [currency, setCurrency] = useState('')
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
        const fetchData = async () => {
            try {
                const pricePerUse = await fetchPrice('resume', 'perUse')
                const pricePerWeek = await fetchPrice('resume', 'perWeek')
                const pricePerMonth = await fetchPrice('resume', 'perMonth')
                const currency = await fetchCurrency()
                setPricePerUse(pricePerUse)
                setPricePerWeek(pricePerWeek)
                setPricePerMonth(pricePerMonth)
                setCurrency(currency)
    
                setFetching(false)
            } catch (error) {
                setError('Error fetching country prices, please reload page')
            }

        }
        fetchData()
    }, [])
    
const pricingCategoryChoices = [ "Resume Pricing", "Proposal Pricing", "Deposition Pricing" ]

const resumePricingDetails = [
    {
        title: 'Per Use',
        price: pricePerUse,
        currency: currency,
        popular: true,
        features: {
            reAccessSaved: {
                available: false,
                text: 'Reaccess Saved Resumes'
            },
            editPrev: {
                available: false,
                text: 'Edit Previous Resumes'
            },
            sharableLink: {
                available: false,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: false,
                text: 'Change Names on Resume'
            },
            downloadablePDF: {
                available: true,
                text: 'Save Resume as PDF'
            }
        }
    },
    {
        title: 'Per Week',
        price: pricePerWeek,
        currency: currency,
        popular: false,
        features: {
            reAccessSaved: {
                available: false,
                text: 'Reaccess Saved Resumes'
            },
            editPrev: {
                available: true,
                text: 'Edit Previous Resumes'
            },
            sharableLink: {
                available: false,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: false,
                text: 'Change Names on Resume'
            },
            downloadablePDF: {
                available: true,
                text: 'Save Resume as PDF'
            }
        }
    },
    {
        title: 'Per Month',
        price: pricePerMonth,
        currency: currency,
        popular: false,
        features: {
            reAccessSaved: {
                available: true,
                text: 'Reaccess Saved Resumes'
            },
            editPrev: {
                available: true,
                text: 'Edit Previous Resumes'
            },
            sharableLink: {
                available: true,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: true,
                text: 'Change Names on Resume'
            },
            downloadablePDF: {
                available: true,
                text: 'Save Resume as PDF'
            }
        }
    }
]


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

            <section id="ask-me" className="container" style={{ marginTop: "-10px" }}>
                <div className="container-inner">
                    <h2 style={{color: "#56A8AC"}}>Resume Plans</h2>
                    <div className="error">{error}</div>

                    <div className='Segment'>
                        <Grid container>
                            {resumePricingDetails.map((detail, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={6} md={4} px={1}>
                                        <PriceCard details={detail} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>


                </div>
            </section>
            {fetching && <Fetching />}
        </div>
    )
}

export default Pricing;