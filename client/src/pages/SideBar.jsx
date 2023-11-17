// import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FaThList, FaUsers, FaUsersCog } from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { FaBoxesStacked } from "react-icons/fa6";

// images
import givenImage from '../assets/images/given image.png';
import logo from '../assets/images/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AdminContext } from '../context/AdminContext';
import { backendUrl } from '../utils/Services';

function SideBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const { userCredentials } = useContext(AuthContext);
    const {settingsData, isLoading, isSettings, setIsSettings, updateSettingsData, setUpdateSettingsData, handleUpdateSettings} = useContext(AdminContext)

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <i className='fas fa-times close-button' data-widget="pushmenu" style={{ position: 'absolute', top: '17px', right: '20px', fontSize: '27px' }} href="#" role="button"></i>
                {/* Brand Logo */}
                <span className="brand-link span-cursor" style={{ width: '190px' }}>
                    <img src={settingsData ? `${backendUrl}/${settingsData.image}` : logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Admin</span>
                </span>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img style={{ width: 34, height: 34 }} src={givenImage} className="img-profile rounded-circle" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }}>{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2" style={{ marginLeft: '10px' }}>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item dropdown" onClick={() => navigate('/dashboard')}>
                                <a href="#" className={location.pathname === '/dashboard' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>


                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>
                                <a className={location.pathname === '/orders' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FcShipped /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Orders
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p className='nav-link nav-home' style={{ marginLeft: '', fontSize: '18px', color: 'whitesmoke', marginBottom: '-10px' }}><span>Maintenance</span></p>

                    <nav className="mt-2" style={{ marginLeft: '10px' }}>
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/users')}>
                                <a className={location.pathname === '/users' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FaUsersCog /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Users
                                    </p>
                                </a>
                            </li>

                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/categories')}>
                                <a className={location.pathname === '/categories' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FaThList /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Categories
                                    </p>
                                </a>
                            </li>
                            {/* =========================================================== RESEARCH WORKS ======================================================================================== */}
                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
                                <a className={location.pathname === '/products' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><FaBoxesStacked /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        Products
                                    </p>
                                </a>
                            </li>

                            <li className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => setIsSettings(true)}>
                                <a className={location.pathname === '/settings' ? 'nav-link nav-home hover-side' : 'nav-link nav-home'}>
                                    <i className="nav-icon"><IoSettingsOutline /></i>
                                    <p style={{ marginLeft: '10px' }}>
                                        settings
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Change profile info */}
            {isSettings && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isSettings ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span>Change System Info</span>
                        </div>
                        <hr />
                        <form onSubmit={handleUpdateSettings}>
                            <div className='form-div'>
                                <label htmlFor="">System Logo</label>
                                <input type="file" onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, image: e.target.files[0] }))} className='form-control' required />
                            </div>

                            <div className='form-div' style={{marginTop: '10px'}}>
                                <label htmlFor="">System Name</label>
                                <input type="text" value={updateSettingsData.title} onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, title: e.target.value }))} className='form-control' placeholder='System Name' required />
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsSettings(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
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
    )
}

export default SideBar
