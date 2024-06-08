import React, { useState } from 'react';
import adminCss from "./Admin.module.css"
import AdminSideMenu from "../components/UI/AdminSideMenu/AdminSideMenu";
import AuthInput from '../components/UI/Input/AuthInputs';
import { Grid } from "@mui/material";
import { ButtonSubmitGreen } from '../components/UI/Buttons/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { errorAnimation } from '../utils/client-functions';
import { setError } from '../redux/states';
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

const CouponDashboard = () => {
    const { error } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();
    const [couponCode, setCouponCode] = useState("")
    const [discountPercentage, setDiscountPercentage] = useState(null)
    const [productName, setProductName] = useState("")
    const [expiration, setExpiration] = useState("")
    

    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
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

    const handleExpirationChange = (e) => {
        setExpiration(e.target.value)
    }

    const createCoupon = () => {
        
        if (couponCode.length < 8  || couponCode.length > 20) {
            return errorSetter("Coupon code length must be 8 - 20 chars")
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

    }

  return (
    <div className={adminCss.AdminDashboard}>
        <AdminSideMenu />
        <div className={adminCss.OtherWrapper}>
            <div className="error">{error}</div>
            <div className={adminCss.TopContainer}>
                <h4>Create and Manage Coupons</h4>
            </div>

            <div className='Segment'>
                <h5 style={{marginLeft: "10px", margin: "10px"}}>Create New Coupon</h5>

                <Grid container>
                    <AuthInput 
                        name="code"  
                        value={couponCode}
                        label="Coupon Code" 
                        inputType="text" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2} 
                        onChange={handleCouponChange}
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
                    />

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
                    />

                    <AuthInput 
                        name="expiration"  
                        value={expiration}
                        label="To Expiration on?" 
                        inputType="date" 
                        inputGridSm={12} 
                        inputGrid={6} 
                        mb={2}
                        onChange={handleExpirationChange}
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
