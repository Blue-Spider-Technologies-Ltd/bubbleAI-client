import axios from "axios";
import {jwtDecode} from 'jwt-decode';;

export const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
}

export const checkAuthenticatedUser = async () => {
    try {
        const isAuth = localStorage?.getItem('token');

        if (isAuth) {
            const authUser = jwtDecode(isAuth);
            const now = Date.now();
            if (now < authUser.expiration) {
                return true
            } else {
                localStorage?.removeItem('token');
                throw new Error("Invalid Session")
            }
        }
        localStorage?.removeItem('token');
        throw new Error("Invalid token specified")
    } catch (error) {
        localStorage?.removeItem('token');
        throw new Error("Someth happened, try again")
    }

}

export const checkAuthenticatedAdmin = async () => {
    try {
        const isAdminAuth = sessionStorage?.getItem('afd8TvhsdjwiuuvsgjhsAfgsUhjs');
        const authAdmin = jwtDecode(isAdminAuth);
        const now = Date.now();
        if (isAdminAuth && now < authAdmin.expiration) {
            return true
        } else {
            sessionStorage?.removeItem('afd8TvhsdjwiuuvsgjhsAfgsUhjs');
            throw new Error('Session Expired');
        }
    } catch (error) {
        sessionStorage?.removeItem('afd8TvhsdjwiuuvsgjhsAfgsUhjs');
        throw new Error("Invalid Session")
    }
}

//call AFTER EVERY setError that is NOT an empty string to animate
export const errorAnimation = async () => {
    const error = document.querySelector('.error');
    error.classList.add('error-in');

    setTimeout(() => {
        error.classList.remove('error-in');
    }, 5000);
}

export const successMiniAnimation = async () => {
    const error = document.querySelector('.success-mini');
    error.classList.add('error-in');

    setTimeout(() => {
        error.classList.remove('error-in');
    }, 5000);
}

//CHECK for EMPTY STRINGS 
export const checkEmptyStringsInObj = (arr, ...exemptKeys) => {
  for (const obj of arr) {
    for (const [key, value] of Object.entries(obj)) {
      if (value === "" && !exemptKeys.includes(key)) {
        return false;
      }
    }
  }
  return true;
};


export const checkEmptyStringsInObjNoExempt = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === '') {
          return false;
        }
      }
    }
    return true;
}
  

export const checkEmptyStrings = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '') {
        return false;
      }
    }
    return true;
}


export const getOrdinalDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Function to add ordinal suffix to date
    function getOrdinalSuffix(n) {
        if (n > 3 && n < 21) return 'th'; // handles special case for numbers between 11 and 13
        switch (n % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}
  
  
  

export const fetchPrice = async (category, usage) => {
    try {
        const getIPData = await axios.get('https://api.ipify.org')
        const userIP = getIPData.data || ""
        const countryDataRaw = await axios.get(`https://ipapi.co/${userIP}/json/`)
        const countryData = countryDataRaw.data
        const continent = countryData.continent_code || 'NA'
        //if you change currency here manually change it in fetchCurrency function too
        const userCurrency = countryData.currency || 'NGN'
        let finalPrice;
        let comparativePriceOne_Africa;
        let comparativePriceTwo_Africa;
        let comparativePriceThree_Africa;

        let comparativePriceOne_RestOfWorld;
        let comparativePriceTwo_RestOfWorld;
        let comparativePriceThree_RestOfWorld;

        switch (category) {
            case 'resume':
                comparativePriceOne_Africa = 1500;
                comparativePriceTwo_Africa = 4000;
                comparativePriceThree_Africa = 10000;

                comparativePriceOne_RestOfWorld = 4000;
                comparativePriceTwo_RestOfWorld = 20000;
                comparativePriceThree_RestOfWorld = 60000;
                break;

            case 'depositions':
                comparativePriceOne_Africa = 4000;
                comparativePriceTwo_Africa = 10000;
                comparativePriceThree_Africa = 30000;

                comparativePriceOne_RestOfWorld = 6000;
                comparativePriceTwo_RestOfWorld = 14000;
                comparativePriceThree_RestOfWorld = 50000;
                break;
            
            case 'transcribeFile':
                comparativePriceOne_Africa = 1500;
                comparativePriceTwo_Africa = 8000;
                comparativePriceThree_Africa = 24000;

                comparativePriceOne_RestOfWorld = 3000;
                comparativePriceTwo_RestOfWorld = 10000;
                comparativePriceThree_RestOfWorld = 35000;
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
                if(userCurrency !== "NGN") {
                    if (usage === "priceOne") {
                        //convert naira to user currency
                        const rate = await axios.get(`https://v6.exchangerate-api.com/v6/23326c90a265332f0762fc20/pair/NGN/${userCurrency}/${comparativePriceOne_Africa}`)  
                        finalPrice = Math.round(rate?.data?.conversion_result)
                    }
                    if (usage === "priceTwo") {
                        //convert naira to user currency
                        const rate = await axios.get(`https://v6.exchangerate-api.com/v6/23326c90a265332f0762fc20/pair/NGN/${userCurrency}/${comparativePriceTwo_Africa}`)  
                        finalPrice = Math.round(rate?.data?.conversion_result)
                    }
                    if (usage === "priceThree") {
                        //convert naira to user currency
                        const rate = await axios.get(`https://v6.exchangerate-api.com/v6/23326c90a265332f0762fc20/pair/NGN/${userCurrency}/${comparativePriceThree_Africa}`)  
                        finalPrice = Math.round(rate?.data?.conversion_result)
                    }
                } else {
                    if (usage === "priceOne") {
                        finalPrice = comparativePriceOne_Africa
                    }
                    if (usage === "priceTwo") {
                        finalPrice = comparativePriceTwo_Africa
                    }
                    if (usage === "priceThree") {
                        finalPrice = comparativePriceThree_Africa
                    }
                }

                break;
        
            default:
                if (usage === "priceOne") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/23326c90a265332f0762fc20/pair/NGN/${userCurrency}/${comparativePriceOne_RestOfWorld}`)  
                    finalPrice = Math.round(rate?.data?.conversion_result)
                }
                if (usage === "priceTwo") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/23326c90a265332f0762fc20/pair/NGN/${userCurrency}/${comparativePriceTwo_RestOfWorld}`)  
                    finalPrice = Math.round(rate?.data?.conversion_result)
                }
                if (usage === "priceThree") {
                    //convert naira to user currency
                    const rate = await axios.get(`https://v6.exchangerate-api.com/v6/23326c90a265332f0762fc20/pair/NGN/${userCurrency}/${comparativePriceThree_RestOfWorld}`)  
                    finalPrice = Math.round(rate?.data?.conversion_result)
                }
                break;
        }

        return finalPrice
    } catch (error) {
        console.error(error)
    }
}

export const fetchIp = async () => {
    try {
        const getIPData = await axios.get('https://api.ipify.org')
        const userIP = getIPData.data || "" 

        return userIP
    } catch (error) {
        console.error(error)
    }
}

export const fetchCountryData = async () => {
    try {
        const userIP = await fetchIp()
        const countryDataRaw = await axios.get(`https://ipapi.co/${userIP}/json/`)
        const countryData = countryDataRaw?.data   

        return countryData
    } catch (error) {
        console.error(error)
    }
}

export const fetchCurrency = async () => {
    try {
        const countryData = await fetchCountryData()
        const userCurrency = countryData?.currency || 'NGN'
        
        return userCurrency
    } catch (error) {
        console.error(error)
    }
}


export const getMonthShortName = (dateString) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const monthShortName = months[monthIndex];
  
    return monthShortName;
}

export const capitalizeWords = (sentence) => {
    return sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}


export const capitalizeAllLetters = (str) => {
    return str.replace(/[a-zA-Z]/g, (char) => char.toUpperCase());
}

const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const fetchImageAndConvert = async (imageUrl) => {
    try {
        // Fetch the image as a Blob
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const originalBlob = await response.blob();
        
        // Create a new Blob with the desired MIME type (image/png)
        const newBlob = new Blob([originalBlob], { type: 'image/png' });
        
        // Now you can use the newBlob as needed
        const base64String = await toBase64(newBlob);
        return base64String;

    } catch (error) {
        console.error('Error fetching or converting image:', error);
    }
};

