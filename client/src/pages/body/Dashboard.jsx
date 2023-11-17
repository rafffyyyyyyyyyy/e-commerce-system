import React, { useEffect, useState } from 'react';
import axios from 'axios';

// react icons
import { FaThList, FaUsers, FaUsersSlash } from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { TbArchiveOff } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { MdDateRange } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { FaBoxesStacked } from "react-icons/fa6";

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

function Dashboard() {
    const navigate = useNavigate();

    const { usersList, categoryList, isLoading, errorResponse, userOrders } = useContext(AdminContext);

    const [isErrorResponse, setIsErrorResponse] = useState(false);

    useEffect(() => {
        if (errorResponse) {
            setIsErrorResponse(true);

            setTimeout(() => {
                setIsErrorResponse(false);
            }, 5000);
        }
    }, [errorResponse]);

    return (
        <>
            <SideBar />
            <Header />

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6" style={{ width: '100%' }}>
                                {/* <h1 className="m-0">Welcome to Thesis and Capstone Archiving System</h1> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginLeft: '20px', textAlign: 'center', marginBottom: '20px' }}>
                    <h1 className="m-0">Admin Dashboard</h1>
                    <hr />
                </div>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>{categoryList?.length}</h3>
                                        <p>Categories</p>
                                    </div>
                                    <div className="icon">
                                        <i><FaThList /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/categories')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{userOrders ? userOrders.filter(item => item.status === "Pending").length : 0}<sup style={{ fontSize: 20 }}></sup></h3>
                                        <p>Pending Orders</p>
                                    </div>
                                    <div className="icon">
                                        <i><FcShipped /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/orders')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{userOrders ? userOrders.filter(item => item.status === "To Receive").length : 0}<sup style={{ fontSize: 20 }}></sup></h3>
                                        <p>To Receive Orders</p>
                                    </div>
                                    <div className="icon">
                                        <i><FcShipped /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/orders')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>{userOrders ? userOrders.filter(item => item.status === "To Receive").length : 0}<sup style={{ fontSize: 20 }}></sup></h3>
                                        <p>Receives Orders</p>
                                    </div>
                                    <div className="icon">
                                        <i><FcShipped /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/orders')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>3</h3>
                                        <p>Products</p>
                                    </div>
                                    <div className="icon">
                                        <i><FaBoxesStacked /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/products')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>12</h3>
                                        <p>Order History</p>
                                    </div>
                                    <div className="icon">
                                        <i><FcShipped /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/archive-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{usersList?.length}</h3>
                                        <p>Users</p>
                                    </div>
                                    <div className="icon">
                                        <i><FaUsers /></i>
                                    </div>
                                    <a href="#" className="small-box-footer" onClick={() => navigate('/users')}>More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Loading div */}
                {isErrorResponse && errorResponse ? (
                    <div className='error-respond' style={{ backgroundColor: errorResponse.isError ? '#fb7d60' : '#7b4ae4' }}>
                        <div>
                            <h5>{errorResponse.message}</h5>
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                {/* fetching data screen */}
                {isLoading && (
                    <div className="popup">
                        <div className="modal-pop-up-loading">
                            <div className="modal-pop-up-loading-spiner"></div>
                            <p>Loading...</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboard
