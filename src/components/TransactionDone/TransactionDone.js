import React, {useState, useEffect, useRef } from 'react';
import { SuccessFailureModal } from '../UI/Modal/Modal';
import { useLocation } from 'react-router-dom';
import { Fetching } from '../UI/Modal/Modal';
import axios from 'axios';



const TransactionDone = () => {
    const location = useLocation()
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [transaction, setTransaction] = useState({})
    const [name, setName] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const isEffectExecuted = useRef(false);
    
    useEffect(() => {
        if (!isEffectExecuted.current) {
            const params = new URLSearchParams(location.search);
        
            const status = params.get("status");
            setPaymentStatus(status)
            const txRef = params.get("tx_ref");
            const transactionId = params.get("transaction_id");
            const couponCode = params.get("coupon");
            const fullName = params.get("name");

            const completeTransaction = async () => {
                try {
                    if(status === "successful" || status === "completed") {
                        setIsSuccessful(true)
                    }
                    const payload = {
                        status : status,
                        txRef: txRef,
                        transactionId: transactionId
                    }
        
                    const response = await axios.post("/pricing/complete-transaction", payload, {
                        headers: {
                          "x-access-token": localStorage?.getItem('token'),
                        },
                    });

                    console.log(response?.data.transaction)
                    if(response?.data?.transaction.status === "successful" || response?.data?.transaction.status === "completed") {
                        setTransaction(response.data.transaction)
                        setIsSuccessful(true)
                        setIsCompleted(true)
                    } else {
                        setTransaction(response.data.transaction)
                        setIsCompleted(true)
                    }
                } catch (error) {
                    console.log(error);
                    setTransaction(error?.response?.data)
                    setIsCompleted(true)
                }
            }

            const completeCouponTransact100percentDiscount = async () => {
                setName(fullName)
                setIsSuccessful(true)
                setIsCompleted(true)
            }

            if(couponCode) {
                completeCouponTransact100percentDiscount()
            } else {
                completeTransaction()
            }

            isEffectExecuted.current = true;
        }
        
    }, [location])


    return (
        <div>
            {isCompleted ? 
                <SuccessFailureModal 
                    success={isSuccessful} 
                    successText={`Your Payment was ${paymentStatus}`}
                    bodyText="We will send more details to your registered email. Thank you!"
                    buttonText={isSuccessful ? "Done! Continue to Bubble" : "Try Again"}
                    fullName={name ? name : transaction?.customer?.fullName} 
                /> 
            : 
                <Fetching />
            }
        </div>
    )
}

export default TransactionDone;