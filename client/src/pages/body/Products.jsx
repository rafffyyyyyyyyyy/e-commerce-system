import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../SideBar'
import Header from '../Header'
import { AdminContext } from '../../context/AdminContext'

// react icons
import { ImSearch } from "react-icons/im";
import { backendUrl } from '../../utils/Services';

function Products() {

    const { isLoading, errorResponse, categoryList, addProductData, setAddProductdata, handleAddProduct,
        isAddProduct, setIsAddProduct, productListToSearch, searchProduct, setSearchProduct,
        editProductData, setEditProductData, isEditProduct, setIsEditProduct,
        handleEditProduct, isDeleteProduct, setIsDeleteProduct, handleDeleteProduct

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

    // edit product
    const editButton = async (item) => {
        setIsEditProduct(true);

        setEditProductData({
            category: item.category,
            productName: item.name,
            stock: item.stock,
            description: item.stock,
            editId: item.id,
            prize: item.prize,
            address: item.address
        });
    }

    // delete product
    const deleteButton = async (item) => {
        setIsDeleteProduct(true);

        setEditProductData({
            category: item.category,
            productName: item.name,
            stock: item.stock,
            description: item.stock,
            editId: item.id,
            prize: item.prize,
            address: item.address
        });
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
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>List of Products</h3>
                                    <div className="card-tools">
                                        <a href="#" onClick={() => setIsAddProduct(true)} className="btn btn-flat btn-sm btn-primary"><span className="fas fa-plus" />  Add New <span className='department-text'>Product</span></a>
                                    </div>
                                </div>
                                <ImSearch size={25} className='search-bar search-right' style={{ marginTop: '0px' }} onClick={() => setOnSearch(onSearch ? false : true)} />
                                <input onClick={(e) => e.stopPropagation()} placeholder='Search...' value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} className='search-input' type="text" style={{ marginTop: '27px', display: onSearch ? 'block' : 'none' }} />
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
                                                    <th>Image</th>
                                                    <th>Product Name</th>
                                                    <th>Stock</th>
                                                    <th>Prize</th>
                                                    <th>Sold</th>
                                                    <th>Ratings</th>
                                                    <th>Description</th>
                                                    <th>Address</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productListToSearch && productListToSearch.length === 0 ? (
                                                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                        <span>No product found!</span>
                                                    </div>
                                                ) : (
                                                    productListToSearch && productListToSearch.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className="text-center"><img src={`${backendUrl}/${item.image}`} style={{ height: '40px', width: '40px', borderRadius: '50%' }} className="img-avatar img-thumbnail p-0 border-2" alt="user_avatar" /></td>
                                                            <td>{item.name}</td>
                                                            <td><p className="m-0 truncate-1">{item.stock}</p></td>
                                                            <td><p className="m-0 truncate-1">{item.prize}</p></td>
                                                            <td><p className="m-0">{item.sold}</p></td>
                                                            <td>
                                                                <div style={{ display: 'flex', listStyle: 'none', fontSize: '15px' }}>
                                                                    <li><i className={item.ratings > 0 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 1 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 2 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 3 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 4 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 5 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 6 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 7 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 8 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                    <li><i className={item.ratings > 9 ? 'fa fa-star checked' : 'fa fa-star'}></i></li>
                                                                </div>
                                                            </td>
                                                            <td><p className="m-0">{item.description}</p></td>
                                                            <td><p className="m-0">{item.address}</p></td>
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

            {/* -----------------   ADD PRODUCT -------------------- */}
            {isAddProduct && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isAddProduct ? 'animateCenter 0.3s linear' : '', maxHeight: '100vh', overflow: 'auto'  }}>
                        <h5>Add New Product</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleAddProduct}>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Select Category</label>
                                    <select className='form-control form-control-border' value={addProductData.category} onChange={(e) => setAddProductdata((prev) => ({ ...prev, category: e.target.value }))} required>
                                        <option value="" selected disabled>Select Categories</option>
                                        {categoryList?.map(item => (
                                            <option key={item.id} value={item.category_name}>{item.category_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Product Image</label>
                                    <input type="file" onChange={(e) => setAddProductdata((prev) => ({ ...prev, productImage: e.target.files[0] }))} className="form-control form-control-border" alt='Product Image' required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Product Name</label>
                                    <input type="text" value={addProductData.productName} onChange={(e) => setAddProductdata((prev) => ({ ...prev, productName: e.target.value }))} className="form-control form-control-border" placeholder="Product Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Stock</label>
                                    <input type="number" value={addProductData.stock} onChange={(e) => setAddProductdata((prev) => ({ ...prev, stock: e.target.value }))} className="form-control form-control-border" placeholder="Stock" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Old Price</label>
                                    <input type="number" value={addProductData.discount} onChange={(e) => setAddProductdata((prev) => ({ ...prev, discount: e.target.value }))} className="form-control form-control-border" placeholder="Old Price" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Price</label>
                                    <input type="number" value={addProductData.prize} onChange={(e) => setAddProductdata((prev) => ({ ...prev, prize: e.target.value }))} className="form-control form-control-border" placeholder="Price" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Description (Optional)</label>
                                    <textarea value={addProductData.description} onChange={(e) => setAddProductdata((prev) => ({ ...prev, description: e.target.value }))} className="form-control form-control-border" placeholder="Description" id="" cols="30" rows="4"></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Address</label>
                                    <input type="text" value={addProductData.address} onChange={(e) => setAddProductdata((prev) => ({ ...prev, address: e.target.value }))} className="form-control form-control-border" placeholder="Address" required />
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsAddProduct(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit' >Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------   EDIT PRODUCT -------------------- */}
            {isEditProduct && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditProduct ? 'animateCenter 0.3s linear' : '', maxHeight: '100vh', overflow: 'auto' }}>
                        <h5>Edit Product</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleEditProduct}>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Select Category</label>
                                    <select className='form-control form-control-border' value={editProductData.category} onChange={(e) => setEditProductData((prev) => ({ ...prev, category: e.target.value }))} required>
                                        <option value="" selected disabled>Select Categories</option>
                                        {categoryList?.map(item => (
                                            <option key={item.id} value={item.category_name}>{item.category_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Product Image</label>
                                    <input type="file" onChange={(e) => setEditProductData((prev) => ({ ...prev, productImage: e.target.files[0] }))} className="form-control form-control-border" alt='Product Image' required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Product Name</label>
                                    <input type="text" value={editProductData.productName} onChange={(e) => setEditProductData((prev) => ({ ...prev, productName: e.target.value }))} className="form-control form-control-border" placeholder="Product Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Stock</label>
                                    <input type="number" value={editProductData.stock} onChange={(e) => setEditProductData((prev) => ({ ...prev, stock: e.target.value }))} className="form-control form-control-border" placeholder="Stock" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Old Price</label>
                                    <input type="number" value={editProductData.discount} onChange={(e) => setEditProductData((prev) => ({ ...prev, discount: e.target.value }))} className="form-control form-control-border" placeholder="Old Price" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Price</label>
                                    <input type="number" value={editProductData.prize} onChange={(e) => setEditProductData((prev) => ({ ...prev, prize: e.target.value }))} className="form-control form-control-border" placeholder="Price" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Description (Optional)</label>
                                    <textarea value={editProductData.description} onChange={(e) => setEditProductData((prev) => ({ ...prev, description: e.target.value }))} className="form-control form-control-border" placeholder="Description" id="" cols="30" rows="4"></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Address</label>
                                    <input type="text" value={editProductData.address} onChange={(e) => setEditProductData((prev) => ({ ...prev, address: e.target.value }))} className="form-control form-control-border" placeholder="Address" required />
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditProduct(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit' >Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            {isDeleteProduct && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDeleteProduct ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Delete?</h5>
                        </div>
                        <hr />
                        <form onSubmit={handleDeleteProduct}>
                            <div className='form-div'>
                                <span>Are you sure you wan't to delete {editProductData.productName}?</span>
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDeleteProduct(false)}>Cancel</button>
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

export default Products
