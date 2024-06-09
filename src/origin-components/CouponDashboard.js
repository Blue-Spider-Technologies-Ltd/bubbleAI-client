import React, { useState } from 'react';
import adminCss from "./Admin.module.css"
import axios from "axios";
import AdminSideMenu from "../components/UI/AdminSideMenu/AdminSideMenu";
import AuthInput from '../components/UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { ButtonSubmitGreen } from '../components/UI/Buttons/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { errorAnimation, successMiniAnimation, checkAuthenticatedAdmin } from '../utils/client-functions';
import { setError, setFetching, setSuccessMini } from '../redux/states';
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
    const [generatedCoupon, setGeneratedCoupon] = useState("")
    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [productName, setProductName] = useState("")
    const [expiration, setExpiration] = useState("")
    const isAdminAuth = sessionStorage?.getItem("afd8TvhsdjwiuuvsgjhsAfgsUhjs")

    
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

    const handleCodeLengthChange = (e) => {
        if (e.target.value === undefined) {
            return setCodeLength(12)
        }
        setCodeLength(e.target.value)
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
                setGeneratedCoupon(response.data.code)
                dispatch(setFetching(false))
                successSetter(`Coupon: ${response.data.code} generated`)
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

                    <AuthInput 
                        id="expiration"  
                        name="expiration"  
                        value={expiration}
                        label="To Expiration on?" 
                        inputType="date" 
                        inputGridSm={12} 
                        inputGrid={6} 
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
                </Grid>



                <div style={{ width: "100%", display: "flex", justifyContent: "right"}}>
                    <div style={{ width: "30%", float: "right"}}>
                    <ButtonSubmitGreen type="button" onClick={createCoupon}>
                        Create Coupon
                    </ButtonSubmitGreen>
                    </div>
                </div>

            </div>


        </div>
    </div>
  );
}

export default CouponDashboard;
