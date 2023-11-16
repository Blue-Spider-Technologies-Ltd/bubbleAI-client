import React, { useEffect, useState, memo } from 'react';
import { useDispatch } from "react-redux";
import { setFetching } from '../../redux/states';
import { Grid } from "@mui/material"
import PriceCard from '../UI/PriceCard/PriceCard';
import { fetchPrice, fetchCurrency } from '../../utils/client-functions';


//////This page contains CSS from HOME.CSS and INDEX.CSS
const ResumePricing = () => {
    const dispatch = useDispatch()
    const [pricePerUse, setPricePerUse] = useState(0)
    const [pricePerWeek, setPricePerWeek] = useState(0)
    const [pricePerMonth, setPricePerMonth] = useState(0)
    const [currency, setCurrency] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
        dispatch(setFetching(true))
        const fetchData = async () => {
            try {
                const pricePerUse = await fetchPrice('resume', 'priceOne')
                const pricePerWeek = await fetchPrice('resume', 'priceTwo')
                const pricePerMonth = await fetchPrice('resume', 'priceThree')
                const userCurrency = await fetchCurrency()
                setPricePerUse(pricePerUse)
                setPricePerWeek(pricePerWeek)
                setPricePerMonth(pricePerMonth)
                setCurrency(userCurrency)
    
                dispatch(setFetching(false))
            } catch (error) {
                setError('Error fetching country prices, please reload page')
            }

        }
        fetchData()
    }, [dispatch])
    

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

        <section id="resume" className="container" style={{ marginTop: "-10px" }}>
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
    )
}

export default memo(ResumePricing);