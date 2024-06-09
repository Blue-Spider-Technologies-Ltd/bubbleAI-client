import React, { useState, useEffect } from "react";
import adminCss from "./Admin.module.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid } from "@mui/material";
import { AdminButtonCard } from "../components/UI/Buttons/Buttons";
import { errorAnimation, checkAuthenticatedAdmin } from "../utils/client-functions";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../redux/states";
import AdminSideMenu from "../components/UI/AdminSideMenu/AdminSideMenu";

// import { checkAuthenticatedUser } from "../../utils/client-functions";


// const screenWidth = window.innerWidth

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.stateData)
    const [usersCount, setUsersCount] = useState(0)
    const [transactionsCount, setTransactionsCount] = useState(0)
    const [adminCount, setAdminCount] = useState(0)
    const [couponCount, setCouponCount] = useState(0)
    const isAdminAuth = sessionStorage?.getItem("afd8TvhsdjwiuuvsgjhsAfgsUhjs")

    
    const errorSetter = (string) => {
        dispatch(setError(string))
        errorAnimation()
    }


    useEffect(() => {

        //This func must be called first in this use effect as it checks admin auth status
        const fetchUsersCount = async () => {
            try {
                //must await
                await checkAuthenticatedAdmin()
            } catch (error) {
                return navigate("/");      
            }
            try {
                const response = await axios.get("/origin/get-users-count", {
                    headers: {
                      "x-access-token": isAdminAuth,
                    },
                });
                
                setUsersCount(response.data.count)
            } catch (error) {
                errorSetter(error?.response?.statusText)
            }
        }

        const fetchTransactionsCount = async () => {

            try {
                const response = await axios.get("/origin/get-transactions-count", {
                    headers: {
                      "x-access-token": isAdminAuth,
                    },
                });
                
                setTransactionsCount(response.data.count)
            } catch (error) {
                errorSetter(error?.response?.statusText)
            }
        }

        const fetchAdminCount = async () => {

            try {
                const response = await axios.get("/origin/get-admin-count", {
                    headers: {
                      "x-access-token": isAdminAuth,
                    },
                });
                
                setAdminCount(response.data.count)
            } catch (error) {
                errorSetter(error?.response?.statusText)
            }
        }

        const fetchCouponCount = async () => {
            try {
                const response = await axios.get("/origin/get-coupon-count", {
                    headers: {
                      "x-access-token": isAdminAuth,
                    },
                });
                
                setCouponCount(response.data.count)
            } catch (error) {
                errorSetter(error?.response?.statusText)
            }
        }

        //Call functions
        fetchUsersCount()
        fetchTransactionsCount()
        fetchAdminCount()
        fetchCouponCount()
    }, [navigate])


    return (
        <div className={adminCss.AdminDashboard}>
            <AdminSideMenu />

            <div className="error">{error}</div>

            <div className={adminCss.OtherWrapper}>
                <div className={adminCss.TopContainer}>
                    <h4>Admin Dashboard</h4>
                </div>

                <Grid container py={3} px={1}>
                    <Grid item xs={12} md={6} lg={4} mb={3}>
                        <AdminButtonCard 
                            type='button'
                            color="black" 
                            width="80%"
                            height="170px"
                            iconText="Users"
                            total={usersCount}
                            onClick={() => navigate("/origin/users")}
                        >
                        </AdminButtonCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4} mb={3}>
                        <AdminButtonCard 
                            type='button'
                            color="black" 
                            width="80%"
                            height="170px"
                            iconText="Notifications"
                            total="15"
                            onClick={() => navigate("/origin/notifications")}
                        >
                        </AdminButtonCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4} mb={3}>
                        <AdminButtonCard 
                            type='button'
                            color="black" 
                            width="80%"
                            height="170px"
                            iconText="Transactions"
                            total={transactionsCount}
                            onClick={() => navigate("/origin/transactions")}
                        >
                        </AdminButtonCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4} mb={3}>
                        <AdminButtonCard 
                            type='button'
                            color="black" 
                            width="80%"
                            height="170px"
                            iconText="Coupons"
                            total={couponCount}
                            onClick={() => navigate("/origin/coupons")}
                        >
                        </AdminButtonCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4} mb={3}>
                        <AdminButtonCard 
                            type='button'
                            color="black" 
                            width="80%"
                            height="170px"
                            iconText="Admin"
                            total={adminCount}
                            onClick={() => navigate("/origin/admins")}
                        >
                        </AdminButtonCard>
                    </Grid>
                </Grid>
                
            </div>

        </div>        
    )
}

export default AdminDashboard;