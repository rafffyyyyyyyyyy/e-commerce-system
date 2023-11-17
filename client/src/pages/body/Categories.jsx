import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// require header and sidebar
import SideBar from '../SideBar';
import Header from '../Header';
import { AdminContext } from '../../context/AdminContext';

function Categories() {

    const { handleAddCategory, categoryName, updateCategoryName, isLoading, errorResponse,
        categoryList, isAddCategories, setIsAddCategories,
        categoryId,
        updateCategoryId,
        handleDeleteCategory,
        isDelete,
        setIsDelete,
        isEditCategories,
        setIsEditCategories,
        handleEditCategory,
        editCategoryName,
        updateEditCategoryName
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

    const buttonDelete = async (item) => {
        setIsDelete(true);
        updateCategoryId({
            categoryId: item.id,
            categoryName: item.category_name
        });
    }

    const buttonEdit = async (item) => {
        setIsEditCategories(true);

        updateCategoryId({
            categoryId: item.id,
            categoryName: item.category_name
        });
        updateEditCategoryName(item.category_name);
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
                                {/* <h1 className="m-0">Welcome to Thesis and Capstone Archiving System</h1> */}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content ">
                    <div className="container-fluid">
                        <div className="card card-outline card-primary">
                            <div className="card-header">
                                <h3 className="card-title">List of Category</h3>
                                <div className="card-tools">
                                    <a href="#" className="btn btn-flat btn-sm btn-primary" onClick={() => setIsAddCategories(true)}><span className="fas fa-plus" />  Add New <span className='department-text'>Category</span></a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="container-fluid" style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                        <table className="table table-hover table-striped">
                                            <colgroup>
                                                <col width="5%" />
                                                <col width="20%" />
                                                <col width="65%" />
                                                <col width="10%" />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date Created</th>
                                                    <th>Category Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categoryList && categoryList.length === 0 ? (
                                                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                        <span>No Category Found!</span>
                                                    </div>
                                                ) : (
                                                    categoryList && categoryList.map((item, index) => (
                                                        <tr>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td>{item.date}</td>
                                                            <td>{item.category_name}</td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                    Action
                                                                </button>
                                                                <div className="dropdown-menu" role="menu">
                                                                    <a className="dropdown-item edit_data" href="#" onClick={() => buttonEdit(item)}><span className="fa fa-edit text-primary" /> Edit</a>
                                                                    <div className="dropdown-divider" />
                                                                    <a className="dropdown-item delete_data" href="#" onClick={() => buttonDelete(item)}><span className="fa fa-trash text-danger" /> Delete</a>
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

            {/* ------------------  ADD CATEGORY  --------------------------- */}
            {isAddCategories && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isAddCategories ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Add Category</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleAddCategory}>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Category Name</label>
                                    <input type="text" value={categoryName} onChange={(e) => updateCategoryName(e.target.value)} className="form-control form-control-border" placeholder="Category Name" required />
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsAddCategories(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------   EDIT CATEGORY -------------------- */}
            {isEditCategories && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditCategories ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit Category</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleEditCategory}>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Category Name</label>
                                    <input type="text" value={editCategoryName} onChange={(e) => updateEditCategoryName(e.target.value)} className="form-control form-control-border" placeholder="Category Name" required />
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditCategories(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            {isDelete && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDelete ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Delete?</h5>
                        </div>
                        <hr />
                        <form onSubmit={handleDeleteCategory}>
                            <div className='form-div'>
                                <span>Are you sure you wan't to Delete {categoryId.categoryName}?</span>
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDelete(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }} >Delete</button>
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

export default Categories;
