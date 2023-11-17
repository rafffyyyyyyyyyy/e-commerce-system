import React, { useContext, useEffect, useState } from 'react'

// images
import givenImage from '../../assets/images/given image.png';

// react icons
import { ImSearch } from "react-icons/im";

import { useNavigate } from 'react-router-dom';

// baseUrl
import { backendUrl } from '../../utils/Services';

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
import { AdminContext } from '../../context/AdminContext';

function UsersList() {

    const { usersListToSearch, searchUser,
        setSearchUser, isLoading, errorResponse,
        editUserData,
        setEditUserData,
        handleEditUser,
        isEditUser,
        setIsEditUser,
        deleteData,
        setDeleteData,
        handleDeleteUser,
        isDeleteUser,
        setIsDeleteUser
    } = useContext(AdminContext);

    const [isErrorResponse, setIsErrorResponse] = useState(false);

    useEffect(() => {
        if (errorResponse) {
            setIsErrorResponse(true);

            setTimeout(() => {
                setIsErrorResponse(false);
            }, 5000);
        }
    }, [errorResponse]);

    const [onSearch, setOnSearch] = useState(false);

    // edit user
    const editButton = async (item) => {
        setIsEditUser(true);

        setEditUserData({
            firstName: item.first_name,
            middleName: item.middle_name,
            lastName: item.last_name,
            username: item.username,
            editId: item.id
        });
    }

    // delete
    const deleteButton = async (item) => {
        setIsDeleteUser(true);

        setDeleteData({
            firstName: item.first_name,
            middleName: item.middle_name,
            lastName: item.last_name,
            deleteId: item.id
        })
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
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>List of Students</h3>
                                <ImSearch size={25} className='search-bar search-right' style={{ marginTop: '0px' }} onClick={() => setOnSearch(onSearch ? false : true)} />
                                <input onClick={(e) => e.stopPropagation()} placeholder='Search...' value={searchUser} onChange={(e) => setSearchUser(e.target.value)} className='search-input' type="text" style={{ marginTop: '27px', display: onSearch ? 'block' : 'none' }} />
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
                                                    <th>Avatar</th>
                                                    <th>Name</th>
                                                    <th>Username</th>
                                                    <th>User Type</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {usersListToSearch && usersListToSearch.length === 0 ? (
                                                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                        <span>No User Account found!</span>
                                                    </div>
                                                ) : (
                                                    usersListToSearch && usersListToSearch.map((item, index) => (
                                                        <tr>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className="text-center"><img src={`${backendUrl}/${item.given_image}`} style={{ height: '40px', width: '40px', borderRadius: '50%' }} className="img-avatar img-thumbnail p-0 border-2" alt="user_avatar" /></td>
                                                            <td>{`${item.first_name} ${item.middle_name} ${item.last_name}`}</td>
                                                            <td><p className="m-0 truncate-1">{item.username}</p></td>
                                                            <td><p className="m-0">{item.user_type}</p></td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                    Action
                                                                </button>
                                                                <div className="dropdown-menu" role="menu">
                                                                    <a className="dropdown-item edit_data" href="#" onClick={() => editButton(item)}><span className="fa fa-edit text-primary" /> Edit</a>
                                                                    <div className="dropdown-divider" />
                                                                    <a className="dropdown-item delete_data" href="#" onClick={() => deleteButton(item)}><span className="fa fa-trash text-danger" /> Delete</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

            {/* -----------------   EDIT User -------------------- */}
            {isEditUser && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditUser ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit User</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleEditUser}>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">First Name</label>
                                    <input type="text" value={editUserData.firstName} onChange={(e) => setEditUserData((prev) => ({ ...prev, firstName: e.target.value }))} className="form-control form-control-border" placeholder="First Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Middle Name (Optional)</label>
                                    <input type="text" value={editUserData.middleName} onChange={(e) => setEditUserData((prev) => ({ ...prev, middleName: e.target.value }))} className="form-control form-control-border" placeholder="Middle Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Last Name</label>
                                    <input type="text" value={editUserData.lastName} onChange={(e) => setEditUserData((prev) => ({ ...prev, lastName: e.target.value }))} className="form-control form-control-border" placeholder="Last Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Username</label>
                                    <input type="text" value={editUserData.username} onChange={(e) => setEditUserData((prev) => ({ ...prev, username: e.target.value }))} className="form-control form-control-border" placeholder="Username" required />
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditUser(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit' >Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            {isDeleteUser && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDeleteUser ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Delete?</h5>
                        </div>
                        <hr />
                        <form onSubmit={handleDeleteUser}>
                            <div className='form-div'>
                                <span>Are you sure you wan't to delete {`${deleteData.firstName} ${deleteData.middleName} ${deleteData.lastName}`}?</span>
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDeleteUser(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Delete</button>
                            </div>
                        </form>
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

export default UsersList
