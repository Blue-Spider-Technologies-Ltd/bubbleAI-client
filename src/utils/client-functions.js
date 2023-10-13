import axios from "axios";

export const fetchPrice = async (category, usage) => {
    try {
        const getIPData = await axios.get('https://api.ipify.org')
        const userIP = getIPData.data || ""
        const countryDataRaw = await axios.get(`https://ipapi.co/${userIP}/json/`)
        const countryData = countryDataRaw.data
        const continent = countryData.continent_code || 'NA'
        //if you change currency here manually change it in fetchCurrency function too
        const userCurrency = countryData.currency || 'USD'
        let finalPrice;
        let comparativePriceOne_Africa;
        let comparativePriceTwo_Africa;
        let comparativePriceThree_Africa;

        let comparativePriceOne_RestOfWorld;
        let comparativePriceTwo_RestOfWorld;
        let comparativePriceThree_RestOfWorld;

        switch (category) {
            case 'resume':
                comparativePriceOne_Africa = 2500;
                comparativePriceTwo_Africa = 10000;
                comparativePriceThree_Africa = 30000;

                comparativePriceOne_RestOfWorld = 3000;
                comparativePriceTwo_RestOfWorld = 13000;
                comparativePriceThree_RestOfWorld = 42000;
                break;

            case 'depositions':
                comparativePriceOne_Africa = 10000;
                comparativePriceTwo_Africa = 30000;
                comparativePriceThree_Africa = 100000;

                comparativePriceOne_RestOfWorld = 14000;
                comparativePriceTwo_RestOfWorld = 50000;
                comparativePriceThree_RestOfWorld = 170000;
                break;
            
            case 'transcribeFile':
                comparativePriceOne_Africa = 1500;
                comparativePriceTwo_Africa = 5000;
                comparativePriceThree_Africa = 15000;

                comparativePriceOne_RestOfWorld = 3000;
                comparativePriceTwo_RestOfWorld = 8000;
                comparativePriceThree_RestOfWorld = 22000;
                break;
        
            default:
                comparativePriceOne_Africa = 0;
                comparativePriceTwo_Africa = 0;
                comparativePriceThree_Africa = 0;

                comparativePriceOne_RestOfWorld = 0;
                comparativePriceTwo_RestOfWorld = 0;
                comparativePriceThree_RestOfWorld = 0;
                break;
        }
        

        switch (continent) {
            case 'AF':

                if (usage === "priceOne") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/64c27b2f8d0a61534c6da6d4/pair/NGN/${userCurrency}/${comparativePriceOne_Africa}`)  
                    finalPrice = Math.round(rate.data.conversion_result)
                }
                if (usage === "priceTwo") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/64c27b2f8d0a61534c6da6d4/pair/NGN/${userCurrency}/${comparativePriceTwo_Africa}`)  
                    finalPrice = Math.round(rate.data.conversion_result)
                }
                if (usage === "priceThree") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/64c27b2f8d0a61534c6da6d4/pair/NGN/${userCurrency}/${comparativePriceThree_Africa}`)  
                    finalPrice = Math.round(rate.data.conversion_result)
                }
                break;
        
            default:
                if (usage === "priceOne") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/64c27b2f8d0a61534c6da6d4/pair/NGN/${userCurrency}/${comparativePriceOne_RestOfWorld}`)  
                    finalPrice = Math.round(rate.data.conversion_result)
                }
                if (usage === "priceTwo") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/64c27b2f8d0a61534c6da6d4/pair/NGN/${userCurrency}/${comparativePriceTwo_RestOfWorld}`)  
                    finalPrice = Math.round(rate.data.conversion_result)
                }
                if (usage === "priceThree") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/64c27b2f8d0a61534c6da6d4/pair/NGN/${userCurrency}/${comparativePriceThree_RestOfWorld}`)  
                    finalPrice = Math.round(rate.data.conversion_result)
                }
                break;
        }

        return finalPrice
    } catch (error) {
        console.error(error)
    }
}

export const fetchCurrency = async () => {
    try {
        const getIPData = await axios.get('https://api.ipify.org')
        const userIP = getIPData.data || ""
        const countryDataRaw = await axios.get(`https://ipapi.co/${userIP}/json/`)
        const countryData = countryDataRaw.data
        const userCurrency = countryData.currency || 'USD'
        
        return userCurrency
    } catch (error) {
        console.error(error)
    }
}