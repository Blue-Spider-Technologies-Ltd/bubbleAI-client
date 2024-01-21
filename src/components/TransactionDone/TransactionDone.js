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
    const isEffectExecuted = useRef(false);
    
    useEffect(() => {
        if (!isEffectExecuted.current) {
            const completeTransaction = async () => {
                try {
                    const params = new URLSearchParams(location.search);
        
                    const status = params.get("status");
                    const txRef = params.get("tx_ref");
                    const transactionId = params.get("transaction_id");
        
                  
                    const payload = {
                        status : status,
                        txRef: txRef,
                        transactionId: transactionId
                    }
        
                    const response = await axios.post("/pricing/complete-trasaction", payload, {
                        headers: {
                          "x-access-token": localStorage?.getItem('token'),
                        },
                    });
                    console.log(response);
                    setIsCompleted(true)
                    
                    if(response?.data?.status === "successful") {
                        setTransaction(response.data)
                        setIsSuccessful(true)
                    } else {
                        setTransaction(response.data)
                        setIsCompleted(true)
                    }
                } catch (error) {
                    setTransaction(error?.response?.data)
                    setIsCompleted(true)
                    console.log(error?.response?.data);
                }
            }
            completeTransaction()
            isEffectExecuted.current = true;
        }
        
    }, [location])


    return (
        <div>
            {isCompleted ? <SuccessFailureModal success={isSuccessful} fullName={transaction?.customer?.fullName} /> : <Fetching />}
        </div>
    )
}

export default TransactionDone;