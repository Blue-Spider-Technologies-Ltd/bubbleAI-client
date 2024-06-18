import React, { useState, useEffect } from 'react';
import adminCss from "./Admin.module.css"
import axios from "axios";
import AdminSideMenu from "../components/UI/AdminSideMenu/AdminSideMenu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { errorAnimation, checkAuthenticatedAdmin } from '../utils/client-functions';
import { setError, setFetching } from '../redux/states';
import UsersTable from '../components/UI/Tables/UsersTable'
//Wrap whole app around ConfirmProvider to be able to open confirmation dialog prompt



const CouponDashboard = () => {
    const { error, successMini } = useSelector((state) => state.stateData);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
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
                const response = await axios.get("/origin/get-users", {
                    headers: {
                        "x-access-token": isAdminAuth,
                    },
                });
                
                if (response.status === 200) {
                    setUsers(response.data.users)
                    dispatch(setFetching(false))
                    return
                }
    
            } catch (error) {
                errorSetter(error?.response?.data?.message)
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
                <h4>Users</h4>
            </div>


            <div className='Segment'>
                <UsersTable allUsers={users} />
            </div>

        </div>
    </div>
  );
}

export default CouponDashboard;
