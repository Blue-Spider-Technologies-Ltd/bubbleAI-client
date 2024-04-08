import React, { useEffect, useState, memo } from 'react';
import { useDispatch } from "react-redux";
import { setFetching } from '../../redux/states';
import { Grid } from "@mui/material";
import PriceCard from '../UI/PriceCard/PriceCard';
import { fetchPrice, fetchCurrency, errorAnimation } from '../../utils/client-functions';


//////This page contains CSS from HOME.CSS and INDEX.CSS
const DepositionPricing = () => {
    const dispatch = useDispatch()
    const [pricePerWeek, setPricePerWeek] = useState(0)
    const [pricePerMonth, setPricePerMonth] = useState(0)
    const [pricePerQuarter, setPricePerQuarter] = useState(0)
    const [currency, setCurrency] = useState('')
    const [error, setError] = useState('')

    const errorSetter = (string) => {
        setError(string)
        errorAnimation()
    }

    useEffect(() => {
        setError('')
        dispatch(setFetching(true))
        const fetchData = async () => {
            try {
                const pricePerWeek = await fetchPrice('depositions', 'priceOne')
                const pricePerMonth = await fetchPrice('depositions', 'priceTwo')
                const pricePerQuarter = await fetchPrice('depositions', 'priceThree')
                const userCurrency = await fetchCurrency()
                setPricePerWeek(pricePerWeek)
                setPricePerMonth(pricePerMonth)
                setPricePerQuarter(pricePerQuarter)
                setCurrency(userCurrency)
    
                dispatch(setFetching(false))
            } catch (error) {
                errorSetter('Error fetching country prices, please reload page')
            }
        }
        fetchData()
    }, [dispatch])
    

const depositionsPricingDetails = [
    {
        product: "Deposition & Minutes Taking AI",
        duration: 'Per Week',
        price: pricePerWeek,
        currency: currency,
        popular: false,
        features: {
            nineMBandAbove: {
                available: false,
                text: 'Record above 3 minutes per time',
                descriptiion: 'Each recording can be more than 3 minutes if this option is available'
            },
            duration: {
                activeTime: true,
                text: 'Expiry within a week'
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
        product: "Deposition & Minutes Taking AI",
        duration: 'Per Month',
        price: pricePerMonth,
        currency: currency,
        popular: true,
        features: {
            nineMBandAbove: {
                available: true,
                text: 'Record above 3 minutes per time', 
                descriptiion: 'Each recording can be more than 3 minutes if this option is available'
            },
            duration: {
                activeTime: true,
                text: 'Expiry within a week'
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
        product: "Deposition & Minutes Taking AI",
        duration: 'Per Month',
        price: pricePerQuarter,
        currency: currency,
        popular: false,
        features: {
            nineMBandAbove: {
                available: true,
                text: 'Record above 3 minutes per time', 
                descriptiion: 'Each recording can be more than 3 minutes if this option is available'
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

        <section id="deposition" className="container" style={{ marginTop: "-10px" }}>
            <div className="container-inner">
                <h2 style={{color: "#56A8AC"}}>Deposition Plans</h2>
                <div className="error">{error}</div>

                <div className='Segment'>
                    <Grid container>
                        {depositionsPricingDetails.map((detail, index) => {
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
    )
}

export default memo(DepositionPricing);