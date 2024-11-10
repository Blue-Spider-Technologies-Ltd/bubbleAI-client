import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setFetching, setError } from '../../redux/states';
import { Grid } from "@mui/material"
import PriceCard from '../UI/PriceCard/PriceCard';
import { fetchPrice, fetchCurrency, errorAnimation } from '../../utils/client-functions';


//////This page contains CSS from HOME.CSS and INDEX.CSS
const ResumePricing = () => {
    const dispatch = useDispatch()
    const { error } = useSelector(state => state.stateData)
    const [pricePerUse, setPricePerUse] = useState(0)
    const [pricePerWeek, setPricePerWeek] = useState(0)
    const [pricePerMonth, setPricePerMonth] = useState(0)
    const [currency, setCurrency] = useState('')

    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    useEffect(() => {
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
                errorSetter('Error fetching country prices, please reload page')
            }

        }
        fetchData()
    }, [dispatch])
    

const resumePricingDetails = [
    {
        product: "AI Resume",
        duration: 'Per Use',
        price: pricePerUse,
        currency: currency,
        popular: false,
        offer: false,
        features: {
            reAccessSaved: {
                available: false,
                text: 'Resume Storage for Later Access'
            },
            createSeveral: {
                available: false,
                text: 'Unlimited CV creation'
            },
            coverLetter: {
                available: false,
                text: 'Tailored Cover Letters'
            },
            editPreview: {
                available: true,
                text: 'Edit Ai Generated CV'
            },
            sharableLink: {
                available: false,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: true,
                text: 'Change CV Name'
            },
            downloadablePDF: {
                available: true,
                text: 'Download Resume as PDF'
            },
            severalTemplates: {
                available: false,
                text: 'Choose Your Template'
            },
            aiJobSuggestions: {
                available: false,
                text: 'Job Connections'
            },
            recommendation: {
                available: true,
                text: '(One-time Resume)'
            }
        }
    },
    {
        product: "AI Resume",
        duration: 'Per Week',
        price: pricePerWeek,
        currency: currency,
        popular: false,
        offer: true,
        features: {
            reAccessSaved: {
                available: true,
                text: 'Resume Storage for Later Access'
            },
            createSeveral: {
                available: true,
                text: 'Unlimited CV creation'
            },
            coverLetter: {
                available: true,
                text: 'Tailored Cover Letters'
            },
            editPreview: {
                available: true,
                text: 'Edit Ai Generated CV'
            },
            sharableLink: {
                available: false,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: false,
                text: 'Change CV Name'
            },
            downloadablePDF: {
                available: true,
                text: 'Download Resume as PDF'
            },
            severalTemplates: {
                available: true,
                text: 'Choose Your Template'
            },
            aiJobSuggestions: {
                available: true,
                text: '50+ Job Connections'
            },
            recommendation: {
                available: true,
                text: 'Connect to Hottest Jobs this Week'
            }
        }
    },
    {
        product: "AI Resume",
        duration: 'Per Month',
        price: pricePerMonth,
        currency: currency,
        popular: true,
        offer: true,
        features: {
            reAccessSaved: {
                available: true,
                text: 'Resume Storage for Later Access'
            },
            createSeveral: {
                available: true,
                text: 'Unlimited CV creation'
            },
            coverLetter: {
                available: true,
                text: 'Tailored Cover Letters'
            },
            editPreview: {
                available: true,
                text: 'Edit Ai Generated CV'
            },
            sharableLink: {
                available: true,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: true,
                text: 'Change CV Name'
            },
            downloadablePDF: {
                available: true,
                text: 'Download Resume as PDF'
            },
            severalTemplates: {
                available: true,
                text: 'Choose Your Template'
            },
            aiJobSuggestions: {
                available: true,
                text: '200+ Job Connections'
            },
            recommendation: {
                available: true,
                text: 'Get a Job by Next Month'
            }
        }
    }

]


    return (

        <section id="resume" className="container" style={{ marginTop: "-10px" }}>
            <div className="container-inner">
                <h2 style={{color: "#56A8AC"}}>Resume & Job Automation Plans</h2>
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