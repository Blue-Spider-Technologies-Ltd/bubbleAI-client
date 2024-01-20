import React, {useState, useEffect} from 'react';
import { SuccessFailureModal } from '../UI/Modal/Modal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const TransactionDone = () => {
    const location = useLocation()
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [transaction, setTransaction] = useState({})
    
    useEffect(() => {
        const completeTransaction = async () => {
            try {
                var params = new URLSearchParams(location.search);
    
                var status = params.get("status");
                var txRef = params.get("tx_ref");
                var transactionId = params.get("transaction_id");
    
              
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
                    setIsSuccessful(true)
                    setTransaction(response.data)
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
    }, [location])


    return (
        <div>
            {isCompleted ? <SuccessFailureModal success={isSuccessful} fullName={transaction?.customer?.fullName} /> : ""}
        </div>
    )
}

export default TransactionDone;