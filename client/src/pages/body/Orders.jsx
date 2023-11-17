import React, { useContext, useEffect, useState } from 'react'

// images
import givenImage from '../../assets/images/given image.png';

// react icons
import { ImSearch } from "react-icons/im";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

// baseUrl
import { backendUrl } from '../../utils/Services';

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
import { AdminContext } from '../../context/AdminContext';

function Orders() {

    const [onSearch, setOnSearch] = useState(false);
    const [isMyOrder, setIsMyOrder] = useState(false);

    const { userOrders, isLoading, errorResponse, handleChangeOrderStatus, status, setStatus, isEditStatus, setIsEditStatus } = useContext(AdminContext);

    const [isErrorResponse, setIsErrorResponse] = useState(false);

    useEffect(() => {
        if (errorResponse) {
            setIsErrorResponse(true);

            setTimeout(() => {
                setIsErrorResponse(false);
            }, 5000);
        }
    }, [errorResponse]);

    const [clickedId, setClickedId] = useState(null);
    const [fullname, setFullname] = useState('');

    const buttonViewOrder = async (item) => {
        setClickedId(item.id);
        setFullname(item.fullname);
        setIsMyOrder(true);
    }

    return (
        <>
            <SideBar />
            <Header />

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6" style={{ width: '100%' }}>
                                {/* <h1 className="m-0">Welcome to </h1> */}
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content ">
                    <div className="container-fluid">
                        <div className="card card-outline card-primary">
                            <div className="card-header" style={{ display: 'flex' }}>
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>List of Customer's Orders</h3>
                                <ImSearch size={25} className='search-bar search-right' style={{ marginTop: '0px' }} onClick={() => setOnSearch(onSearch ? false : true)} />
                                <input onClick={(e) => e.stopPropagation()} placeholder='Search...' className='search-input' type="text" style={{ marginTop: '27px', display: onSearch ? 'block' : 'none' }} />
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="container-fluid" style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                        <table className="table table-hover table-striped">
                                            {/* <colgroup>
                                                <col width="5%" />
                                                <col width="20%" />
                                                <col width="25%" />
                                                <col width="20%" />
                                                <col width="10%" />
                                            </colgroup> */}
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>User Name</th>
                                                    <th>Order Date</th>
                                                    <th>Address</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userOrders?.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{item.fullname}</td>
                                                        <td><p className="m-0 truncate-1">{item.date}</p></td>
                                                        <td><p className="m-0 truncate-1">{item.address}</p></td>
                                                        <td >
                                                            <span className="badge badge-success badge-pill" style={{ background: item.status === 'Pending' ? 'red' : item.status === 'To Ship' ? 'lightblue' : item.status === "To Receive" ? 'orange' : 'blue' }}>{item.status}</span></td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                Action
                                                            </button>
                                                            <div className="dropdown-menu" role="menu">
                                                                <a className="dropdown-item edit_data" href="#" onClick={() => { setIsEditStatus(true); setStatus((prev) => ({...prev, status: item.status})); setStatus((prev) => ({...prev, editId: item.id})); setStatus((prev) => ({...prev, customerId: item.user_id})) }} ><span className="fa fa-edit text-primary" /> Edit Status</a>
                                                                <div className="dropdown-divider" />
                                                                <a className="dropdown-item delete_data" href="#" onClick={() => buttonViewOrder(item)}><MdOutlineRemoveRedEye size={25} /> View Order</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

            {/* My Order */}
            {isMyOrder && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isMyOrder ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span>{fullname}</span>
                        </div>

                        {userOrders?.length === 0 ? (
                            <div className="form-div" style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                                <span>No Order Yet</span>
                            </div>
                        ) : (
                            userOrders?.map(item =>

                                item.id === clickedId && (
                                    <div key={item.id}>
                                        <hr style={{ border: '1px solid black' }} />

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '12px' }}>Order Date: {item.date}</span>
                                            <span style={{ fontSize: '14px', color: item.status === "Pending" ? 'red' : item.status === "To Receive" ? 'orange' : 'blue' }}>{item.status}</span>
                                        </div>
                                        {item.product_info.split(',').map((product, index) => (
                                            <div key={index} style={{ marginLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                                <span>{product.trim()} (x{item.quantity.split(',').reverse()[index].trim()})</span>
                                                <span>₱{item.each_amount.split(',').reverse()[index].trim()}</span>
                                            </div>
                                        ))}
                                        <div style={{ marginLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginTop: '10px' }}>
                                            <span>Shipping Fee</span>
                                            <span>₱130</span>
                                        </div>
                                        <div style={{ marginLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                            <span>Discount</span>
                                            <span>₱0</span>
                                        </div>
                                        <hr />
                                        <div style={{ marginLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                            <span></span>
                                            <span style={{ color: 'red' }}>Total: ₱{item.total_amount}</span>
                                        </div>
                                    </div>
                                ))
                        )}

                        <br />
                        <div>
                            <button className='btn btn-primary' style={{ width: '100%' }} onClick={() => setIsMyOrder(false)}>Okay</button>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------   EDIT STATUS -------------------- */}
            {isEditStatus && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditStatus ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit Status</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleChangeOrderStatus}>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label htmlFor="name" className="control-label">Status</label>
                                    <select className='form-control form-control-border' value={status.status} onChange={(e) => setStatus((prev) => ({...prev, status: e.target.value}))} required>
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="To Ship">To Ship</option>
                                        <option value="To Receive">To Receive</option>
                                        <option value="Received">Received</option>
                                    </select>
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditStatus(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit' >Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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
        </>
    )
}

export default Orders;
