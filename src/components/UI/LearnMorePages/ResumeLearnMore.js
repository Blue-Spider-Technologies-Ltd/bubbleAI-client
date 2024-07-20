import React, { useEffect, useState } from 'react'
import { fetchCountryData } from '../../../utils/client-functions';

const ResumeLearnMore = () => {
    const [country, setCountry] = useState("")

    useEffect(() => {
        const returnCountryName = async () => {
            try {
                const countryName = await fetchCountryData().country_name
            } catch (error) {
                
            }
        }
    })

}

export default ResumeLearnMore;