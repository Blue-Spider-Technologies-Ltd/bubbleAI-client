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
        features: {
            reAccessSaved: {
                available: false,
                text: 'Reaccess Saved Resumes'
            },
            createSeveral: {
                available: false,
                text: 'Create More Than One'
            },
            coverLetter: {
                available: false,
                text: 'Tailored Cover Letter'
            },
            sharableLink: {
                available: false,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: true,
                text: 'Change Names During Customzation'
            },
            downloadablePDF: {
                available: true,
                text: 'Save Resume as PDF'
            },
            severalTemplates: {
                available: false,
                text: 'Choose Your Template'
            },
            aiJobSuggestions: {
                available: false,
                text: 'Tailored Ai Job Suggestions Around You'
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
        popular: true,
        features: {
            reAccessSaved: {
                available: true,
                text: 'Reaccess Saved Resumes'
            },
            createSeveral: {
                available: true,
                text: 'Create More Than One'
            },
            coverLetter: {
                available: true,
                text: 'Tailored Cover Letter'
            },
            sharableLink: {
                available: false,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: false,
                text: 'Change Names During Customzation'
            },
            downloadablePDF: {
                available: true,
                text: 'Save Resume as PDF'
            },
            severalTemplates: {
                available: true,
                text: 'Choose Your Template'
            },
            aiJobSuggestions: {
                available: true,
                text: 'Tailored Ai Job Suggestions Around You'
            },
            recommendation: {
                available: true,
                text: '(Apply to Jobs Quick)'
            }
        }
    },
    {
        product: "AI Resume",
        duration: 'Per Month',
        price: pricePerMonth,
        currency: currency,
        popular: false,
        features: {
            reAccessSaved: {
                available: true,
                text: 'Reaccess Saved Resumes'
            },
            createSeveral: {
                available: true,
                text: 'Create More Than One'
            },
            coverLetter: {
                available: true,
                text: 'Tailored Cover Letter'
            },
            sharableLink: {
                available: true,
                text: 'Sharable Link to Resume'
            },
            changeName: {
                available: true,
                text: 'Change Names During Customzation'
            },
            downloadablePDF: {
                available: true,
                text: 'Save Resume as PDF'
            },
            severalTemplates: {
                available: true,
                text: 'Choose Your Template'
            },
            aiJobSuggestions: {
                available: true,
                text: 'Tailored Ai Job Suggestions Around You'
            },
            recommendation: {
                available: true,
                text: '(Recommended for Business)'
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