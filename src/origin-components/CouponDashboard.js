import React, { useState, useEffect } from 'react';
import adminCss from "./Admin.module.css"
import resumeCss from "../components/Resume/Resume.module.css"
import axios from "axios";
import AdminSideMenu from "../components/UI/AdminSideMenu/AdminSideMenu";
import AuthInput from '../components/UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { ButtonSubmitGreen } from '../components/UI/Buttons/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { errorAnimation, successMiniAnimation, checkAuthenticatedAdmin } from '../utils/client-functions';
import { setError, setFetching, setSuccessMini } from '../redux/states';
import CouponTable from '../components/UI/Tables/CouponTable'
//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt

const productList = [
    {
        name: "AI Resume"
    },
    {
        name: "Audio & Video Transcription AI"
    },
    {
        name: "Depositions"
    }
]

const subTypes = [
    {
        name: "Per Use"
    },
    {
        name: "Per Week"
    },
    {
        name: "Per Month"
    }
]

const couponLength = [
    {
        name: 12
    },
    {
        name: 13
    },
    {
        name: 14
    },
    {
        name: 15
    },
    {
        name: 16
    },
    {
        name: 17
    },
    {
        name: 18
    },
    {
        name: 19
    },
    {
        name: 20
    }
]

const CouponDashboard = () => {
    const { error, successMini } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [couponCode, setCouponCode] = useState("")
    const [codeLength, setCodeLength] = useState(12)
    const [createdUseCount, setCreatedUseCount] = useState(1)
    const [subDuration, setSubDuration] = useState("")
    const [coupons, setCoupons] = useState([])
    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [productName, setProductName] = useState("")
    const [expiration, setExpiration] = useState("")
    const isAdminAuth = sessionStorage?.getItem("afd8TvhsdjwiuuvsgjhsAfgsUhjs")

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                //must await
                await checkAuthenticatedAdmin()
            } catch (error) {
                return navigate("/");      
            }
            try {
                dispatch(setFetching(true))
                const response = await axios.get("/origin/get-all-coupons", {
                    headers: {
                      "x-access-token": isAdminAuth,
                    },
                });
                setCoupons(response.data.coupons)
                dispatch(setFetching(false))
            } catch (error) {
                dispatch(setFetching(false))
                errorSetter(error?.response?.statusText)
            }
        }

        fetchCoupons()
    }, [navigate])
    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    const successSetter = (string) => {
        dispatch(setSuccessMini(string))
        successMiniAnimation()
    }

    const handleCouponChange = (e) => {
        setCouponCode(e.target.value)
    }

    const handleDiscountChange = (e) => {
        setDiscountPercentage(e.target.value)
    }

    const handleProductChange = (e) => {
        if (e.target.value === undefined) {
            return setProductName("")
        }
        setProductName(e.target.value)
    }

    const handleSubDurationChange = (e) => {
        if (e.target.value === undefined) {
            return setSubDuration("")
        }
        setSubDuration(e.target.value)
    }

    const handleCodeLengthChange = (e) => {
        if (e.target.value === undefined) {
            return setCodeLength(12)
        }
        setCodeLength(e.target.value)
    }

    const handleUseCountChange = (e) => {
        setCreatedUseCount(e.target.value)
    }

    const handleExpirationChange = (e) => {
        setExpiration(e.target.value)
    }

    const createCoupon = async () => {
        const isComposedOfAllowedCharacters = (input) => {
            const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            // Check if every character in the input is in the allowedCharacters string
            return input.split('').every(char => allowedCharacters.includes(char));
        }

        if (!isComposedOfAllowedCharacters(couponCode)) {
            return errorSetter("Allowed chars: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
        }

        if (couponCode !== "" && (couponCode.length < 8 || couponCode.length > 20)) {
            return errorSetter("Coupon code length must be 8 - 20 chars or leave empty to generate at random")
        }

        if (productName === ""  || productName === "Choose Product Name") {
            return errorSetter("Select Product Name")
        }

        if (subDuration === ""  || subDuration === "Choose Sub Duration") {
            return errorSetter("Select Sub Duration")
        }

        if (discountPercentage === null || discountPercentage <= 4) {
            return errorSetter("Set Discount Percentage to a value greater than 4")
        }


        if (expiration === "") {
            return errorSetter("Set Expiration")
        }

        const couponData = {
            couponCode,
            codeLength,
            productName,
            discountPercentage,
            createdUseCount,
            expiration
        }

        try {
            //must await
            await checkAuthenticatedAdmin()
        } catch (error) {
            return navigate("/");      
        }
        try {
            dispatch(setFetching(true))
            const response = await axios.post("/origin/create-coupon", couponData, {
                headers: {
                    "x-access-token": isAdminAuth,
                },
            });
            
            if (response.status === 201) {
                setCoupons(response.data.coupons)
                dispatch(setFetching(false))
                successSetter(`Coupon: ${response?.data?.newCoupon?.code} generated`)
                return
            }

        } catch (error) {
            errorSetter(error?.response?.data?.message)
            dispatch(setFetching(false))
        }


    }

  return (
    <div className={adminCss.AdminDashboard}>
        <AdminSideMenu />
        <div className={adminCss.OtherWrapper}>
            <div className="error">{error}</div>
            <div className="success-mini">{successMini}</div>
            <div className={adminCss.TopContainer}>
                <h4>Create and Manage Coupons</h4>
            </div>

            <div className='Segment'>
                <h5 style={{marginLeft: "10px", margin: "10px"}}>Create New Coupon</h5>

                <Grid container>

                    <AuthInput 
                        id="productName"  
                        name="productName"  
                        value={productName}
                        label="Choose Product Name" 
                        inputType="select2" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        list={productList}
                        onChange={handleProductChange}
                        required
                    />

                    <AuthInput 
                        id="subType"  
                        name="subType"  
                        value={subDuration}
                        label="Choose Sub Duration" 
                        inputType="select2" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        list={subTypes}
                        onChange={handleSubDurationChange}
                        required
                    />

                    <AuthInput 
                        name="discountPercentage"  
                        value={discountPercentage}
                        label="Discount Percentage" 
                        inputType="number" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        onChange={handleDiscountChange}
                        required
                    />

                    <Grid item xs={3} md={2} style={{ width: "50%" }}>
                        <div className={resumeCss.DetachedLabels}>
                            To Expiration on?
                        </div>
                    </Grid>
                    <AuthInput 
                        id="expiration"  
                        name="expiration"  
                        value={expiration}
                        inputType="date" 
                        inputGridSm={9} 
                        inputGrid={4} 
                        mb={2}
                        onChange={handleExpirationChange}
                        required
                    />

                    <AuthInput 
                        id="codeLength"  
                        name="codeLength"  
                        value={codeLength}
                        label="Choose Coupon Code Length" 
                        inputType="select2" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        list={couponLength}
                        onChange={handleCodeLengthChange}
                        required
                    />

                    <AuthInput 
                        name="code"  
                        value={couponCode}
                        label="Coupon Code [optional]" 
                        inputType="text" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        onChange={handleCouponChange}
                    />

                    <AuthInput 
                        name="createUseCount"  
                        value={createdUseCount}
                        label="Alloted Usage Count" 
                        inputType="number" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        onChange={handleUseCountChange}
                        required
                    />


                    <Grid item xs={12} md={6}>
                        <div style={{ width: "100%"}}>
                            <ButtonSubmitGreen type="button" onClick={createCoupon}>
                                Create Coupon
                            </ButtonSubmitGreen>
                        </div>
                    </Grid>
                </Grid>


            </div>

            <div className='Segment'>
                <CouponTable allCoupons={coupons} />
            </div>

        </div>
    </div>
  );
}

export default CouponDashboard;
