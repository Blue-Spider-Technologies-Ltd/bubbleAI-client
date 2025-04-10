import React, { useState, useEffect } from 'react';
import adminCss from "./Admin.module.css"
import axios from "axios";
import AdminSideMenu from "../components/UI/AdminSideMenu/AdminSideMenu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { errorAnimation, checkAuthenticatedAdmin } from '../utils/client-functions';
import { setError, setFetching } from '../redux/states';
import TransactionsTable from '../components/UI/Tables/TransactionsTable'
//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt



const CouponDashboard = () => {
    const { error, successMini } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState([])
    const isAdminAuth = sessionStorage?.getItem("afd8TvhsdjwiuuvsgjhsAfgsUhjs")

    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }

    // const successSetter = (string) => {
    //     dispatch(setSuccessMini(string))
    //     successMiniAnimation()
    // }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                //must await
                await checkAuthenticatedAdmin()
            } catch (error) {
                return navigate("/");      
            }
            try {
                dispatch(setFetching(true))
                const response = await axios.get("/origin/get-transactions", {
                    headers: {
                        "x-access-token": isAdminAuth,
                    },
                });
                
                if (response.status === 200) {
                    setTransactions(response.data.transactions)
                    dispatch(setFetching(false))
                    return
                }
    
            } catch (error) {
                errorSetter(error?.response?.data?.error)
                dispatch(setFetching(false))
            }
        }

        fetchUsers()
    }, [])
   





  return (
    <div className={adminCss.AdminDashboard}>
        <AdminSideMenu />
        <div className={adminCss.OtherWrapper}>
            <div className="error">{error}</div>
            <div className="success-mini">{successMini}</div>
            <div className={adminCss.TopContainer}>
                <h4>Transactions</h4>
            </div>


            <div className='Segment'>
                <TransactionsTable allTransactions={transactions} />
            </div>

        </div>
    </div>
  );
}

export default CouponDashboard;
