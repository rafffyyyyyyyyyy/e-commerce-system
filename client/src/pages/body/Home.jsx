import React, { useContext, useEffect, useState } from 'react';

import '../../assets/css/Home.css';

// images
import givenImage from '../../assets/images/given image.png';
import logo from '../../assets/images/logo.png';
import notificationIcon from '../../assets/images/shopping.svg';

import { useNavigate } from 'react-router-dom';

// react icons
import { LuShoppingCart } from "react-icons/lu";
import { BsPersonCircle, BsArrowUpSquare } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineCloseCircle, AiOutlineMinus, AiOutlinePlus, AiFillLike, AiFillShop } from "react-icons/ai";
import { VscDeviceCamera } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { GrProductHunt } from "react-icons/gr";
import { FcShipped } from "react-icons/fc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";

import { AuthContext } from '../../context/AuthContext';
import { PublicContext } from '../../context/PublicContext';
import { backendUrl } from '../../utils/Services';
import { IoIosNotificationsOutline } from "react-icons/io";
import { AdminContext } from '../../context/AdminContext';

function Home() {
  const navigate = useNavigate();

  const [isProfile, setIsProfile] = useState(false);
  const [isComments, setIsComments] = useState(false);

  // ---------------------------------- PARTIAL LOGIN --------------------------------
  const [isLogin, setIsLogin] = useState(false);


  // ------------------------------------  LOGIN SIDE---------------------------------------
  const { isLoading, errorResponse, user, logoutUser, updateLoginInfo, loginInfo,
    userCredentials, handleLogin, isOpenLogin, setIsOpenLogin, isLogout, setIsLogout,
    registerInfo, updateRegisterInfo, registerUser, isOpenRegister, setIsOpenRegister,
    updateProfile, handleAddToCart, isProductClick, setIsProductClick, cartList,
    isChangePassword, setIsChangePassword, changePasswordData, setChangePasswordData, handleChangePassword,
    isAddAddress, setIsAddAddress, addressData, setAddressData, handleAddAddress, isMyAddress, setIsMyAddress, myAddressList, placeOrderData, setPlaceOrderData,
    isPlaceOrder, setIsPlaceOrder, handlePlaceOrder, isCart, setIsCart, handleDeleteCart, isMyOrder, setIsMyOrder, myOrdersList, myNotifications,
    feedbackData, setFeedbackData, handleAddFeedback, handleButtonFeedback, isRateMe, setIsRateMe, isSelectProduct, setIsSelectProduct, commentsList,
    isEditProfileName, setIsEditProfileName, names, setNames, handleEditProfileName, eachComments, checkUpdate, setCheckUpdate
  } = useContext(AuthContext); // require auth context

  const { categoryList, publicLoading, productListToSearch, homeSearch, setHomeSearch } = useContext(PublicContext);

  const { settingsData } = useContext(AdminContext);

  const [isErrorResponse, setIsErrorResponse] = useState(false);

  useEffect(() => {
    if (errorResponse) {
      setIsErrorResponse(true);

      setTimeout(() => {
        setIsErrorResponse(false);
      }, 5000);
    }
  }, [errorResponse]);

  // ---------------------------- CHECK IF LOGIN OR NOT -----------------------------
  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  // ---------------------------- GET EACH PRODUCT INFO -------------------------------
  const [eachProductInfo, setEachProductInfo] = useState({
    id: null,
    image: '',
    name: '',
    description: '',
    address: '',
    stock: null,
    prize: null,
    sold: null,
    ratings: null,
    date: ''
  });
  const productButton = async (item) => {
    setIsProductClick(isProductClick ? false : true);

    setEachProductInfo({
      id: item.id,
      image: item.image,
      name: item.name,
      description: item.description,
      address: item.address,
      stock: item.stock,
      prize: item.prize,
      sold: item.sold,
      ratings: item.ratings,
      date: item.date
    });
  }

  // ---------------------------------- SOLVE AMMOUNT --------------------------------
  const [quantity, setQuantity] = useState(0);
  const [ammount, setAmmount] = useState(0);
  // solve the ammount
  useEffect(() => {
    if (quantity !== 0) {
      setAmmount(eachProductInfo.prize * quantity);
    } else {
      setAmmount(0);
    }
  }, [quantity]);

  const [isCheckedMap, setIsCheckedMap] = useState({});
  const hasTrueValue = Object.values(isCheckedMap).includes(true);

  // Function to toggle the state of all checkboxes
  const handleToggleAllCheckboxes = () => {

    const hasTrueValue = Object.values(isCheckedMap).includes(true);
    const updatedMap = Object.fromEntries(
      Object.keys(isCheckedMap).map((key) => [key, !hasTrueValue])
    );

    setIsCheckedMap(updatedMap);
  };

  const handleCheckboxChange = (itemId) => {
    setQuantityMap((prev) => ({ ...prev, [itemId]: prev[itemId] || 1 }));

    setIsCheckedMap((prev) => {
      const updatedMap = { ...prev, [itemId]: !prev[itemId] };

      return updatedMap;
    });
  };

  // ----------------------------- check the checked item or product ----------------------------------------
  // get the checked item
  const getCheckedItems = () => {
    return Object.keys(isCheckedMap).filter((itemId) => isCheckedMap[itemId]);
  };

  useEffect(() => {
    if (isCheckedMap) {
      const checkedItems = getCheckedItems();
      // console.log('Checked Items:', checkedItems);
    }
  }, [isCheckedMap]);
  // ---------------------------------  SOLVE AMMOUNT ON CART -------------------------
  const [quantityMap, setQuantityMap] = useState({});
  const [totalsArray, setTotalsArray] = useState({});

  useEffect(() => {
    if (cartList) {
      // Initialize quantityMap and isCheckedMap based on cartList
      const initialQuantities = cartList.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});

      setQuantityMap(initialQuantities);

      const initialCheckedMap = cartList.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});

      setIsCheckedMap(initialCheckedMap);

      const initialTotalsArray = cartList.reduce((acc, item) => {
        acc[item.id] = 0; // Initialize total amount to 0
        return acc;
      }, {});

      setTotalsArray(initialTotalsArray);
    }
  }, [cartList]);

  useEffect(() => {
    if (quantityMap) {
      // Iterate over cartList and update totalsArray
      cartList?.forEach((item) => {
        const totalAmount = (quantityMap[item.id] || item.quantity) * item.prize;

        setTotalsArray((prevTotals) => ({
          ...prevTotals,
          [item.id]: totalAmount.toFixed(2),
        }));
      });
    }
  }, [quantityMap, isCheckedMap]);

  useEffect(() => {
    if (quantityMap) {
      const getCheckedIds = () => {
        return Object.keys(isCheckedMap).filter((id) => isCheckedMap[id]);
      };

      // Function to get totals based on checked IDs
      const getTotalsForCheckedIds = () => {
        const checkedIds = getCheckedIds();
        return checkedIds.map((id) => totalsArray[id]);
      };

      const getQuantityNumber = () => {
        const quantityId = getCheckedIds();
        return quantityId.map((id) => quantityMap[id]);
      }

      const getProductInfo = () => {
        const productInfoIds = getCheckedIds();
        const resultArray = [];
        const allArray = [];
        cartList?.map(item => {
          productInfoIds.map(productItem => {
            if (item.id === parseInt(productItem)) {
              resultArray.push(item.name);
              allArray.push(item);
            }
          })
        });
        setPlaceOrderData((prev) => ({ ...prev, productInfo: resultArray }));
        setPlaceOrderData((prev) => ({ ...prev, allData: allArray }));
      };
      getProductInfo();

      const totals = getTotalsForCheckedIds();
      const sum = totals.reduce((acc, value) => acc + parseFloat(value), 0);

      setPlaceOrderData((prev) => ({ ...prev, productIds: getCheckedIds() }));
      setPlaceOrderData((prev) => ({ ...prev, quantity: getQuantityNumber() }));
      setPlaceOrderData((prev) => ({ ...prev, eachAmount: getTotalsForCheckedIds() }));
      setPlaceOrderData((prev) => ({ ...prev, totalAmount: sum + 130 }));
    }
  }, [quantityMap, isCheckedMap, totalsArray]);

  //--------------------------------  BUTTON ADD TO CART  ---------------------------
  const buttonAddToCart = async () => {
    if (quantity > 0) {
      if (eachProductInfo?.stock >= quantity) {
        handleAddToCart(eachProductInfo.id, quantity);
      } else {
        alert(`Sorry our stock on this product is ${eachProductInfo.stock} left!`);
      }
    } else {
      alert('Please select the quantity');
    }
  }

  // ------------------ button feedback -------------------
  const buttonFeedback = async (item) => {
    setIsSelectProduct(true);

    setFeedbackData((prev) => ({ ...prev, userId: item.user_id }));
    setFeedbackData((prev) => ({ ...prev, productId: item.product_id }));
    setFeedbackData((prev) => ({ ...prev, fullname: item.fullname }));
    setFeedbackData((prev) => ({ ...prev, id: item.id }));
  }

  return (
    <>
      <nav className="main-header navbar navbar-expand" style={{ marginLeft: '0', background: 'none', color: 'black' }}>
        <ul className="navbar-nav">

          <li className="nav-item" style={{ marginTop: '-7px' }}>
            <a className="nav-link"><img src={settingsData && `${backendUrl}/${settingsData.image}`} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="" /></a>
          </li>

          <li className="nav-item d-sm-inline-block" style={{ marginLeft: '-20px' }}>
            <span style={{ cursor: 'pointer' }} className="nav-link">{settingsData && settingsData.title}</span>
          </li>

        </ul>

        <ul className="navbar-nav ml-auto">

          {isLogin && (
            <li className="nav-item dropdown" >
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell" style={{ color: 'black' }} />
                <span className="badge badge-warning navbar-badge">{myNotifications?.length === 0 ? '' : myNotifications?.length}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right notificationAlign">
                <span className="dropdown-item dropdown-header">{myNotifications && myNotifications.length} Notification</span>


                <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                  {myNotifications && myNotifications.reverse().map(item => (
                    <div key={item.id} className='dropdown-item other' style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: item.seen === 0 ? 'rgba(131, 131, 131, 0.20)' : '' }}>
                      <div style={{ display: 'flex' }}>
                        <i className="fas fa-bell mr-2" style={{ color: 'rgba(80, 66, 66, 0.935)', fontSize: '15px', marginTop: '5px' }} /><p style={{ marginLeft: '10px' }}>{item.content}</p>
                      </div>
                      <div style={{ marginLeft: '10px' }}>
                        <p style={{ marginLeft: 22, fontSize: 10, color: 'rgb(105, 96, 96)' }}>{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="dropdown-divider" />
                <a data-toggle="modal" data-target="#allNotification" style={{ cursor: 'pointer' }} className="dropdown-item dropdown-footer">See All Notifications</a>
              </div>
            </li>
          )}

          {userCredentials?.user_type === "Customer" && (
            <li className="nav-item dropdown" onClick={() => isLogin ? setIsCart(true) : setIsOpenLogin(true)}>
              <div className="nav-link">
                <LuShoppingCart style={{ cursor: 'pointer' }} size={20} />
                <span className="badge badge-warning navbar-badge">{cartList?.length === 0 ? '' : cartList?.length}</span>
              </div>
            </li>
          )}

          {isLogin && (
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small" style={{ color: 'black' }}>{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</span>
                <img style={{ width: 25, height: 25 }} className="img-profile rounded-circle" src={userCredentials && userCredentials.given_image ? `${backendUrl}/${userCredentials.given_image}` : givenImage} />
              </a>

              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }} onClick={() => setIsProfile(true)}><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                  Profile
                </a>
                {userCredentials?.user_type === "Admin" && (
                  <a className="dropdown-item" data-toggle="modal" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}><i className="nav-icon fas fa-tachometer-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Dashboard
                  </a>
                )}
                {userCredentials?.user_type === "Customer" && (
                  <>
                    <a className="dropdown-item" data-toggle="modal" style={{ cursor: 'pointer' }} onClick={() => setIsMyAddress(true)}><i className="fa-sm fa-fw mr-2 text-gray-400" ><FaAddressCard size={18} style={{ color: 'black', marginTop: '-3px' }} /></i>
                      My Address
                    </a>
                    <a className="dropdown-item" data-toggle="modal" style={{ cursor: 'pointer' }} onClick={() => setIsMyOrder(true)}><i className="fa-sm fa-fw mr-2 text-gray-400" ><FcShipped size={18} style={{ color: 'black', marginTop: '-3px' }} /></i>
                      My Orders
                    </a>
                  </>
                )}
                <a className="dropdown-item" data-toggle="modal" data-target="#change_password" style={{ cursor: 'pointer' }} onClick={() => setIsChangePassword(true)}><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                  Change Password
                </a>
                <a className="dropdown-item" data-toggle="modal" data-target="#logout" style={{ cursor: 'pointer' }} onClick={() => setIsLogout(true)}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                  Logout
                </a>
              </div>
            </li>
          )}

          {!isLogin && (
            <li className="nav-item dropdown" onClick={(e) => { e.stopPropagation(); setIsOpenLogin(true) }}>
              <a className="nav-link" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small" style={{ color: 'black' }}>Login/Register</span>
                <BsPersonCircle style={{ cursor: 'pointer', color: 'black' }} size={20} />
              </a>
            </li>
          )}
        </ul>
      </nav>

      <div className='top-search'>
        <form action="simple-results.html">
          <div>
            <input type="search" className="form-control" value={homeSearch === "not" ? '' : homeSearch} onChange={(e) => setHomeSearch(e.target.value)} placeholder="Search Product" style={{ paddingLeft: '35px', borderRadius: '5px', height: '40px', fontSize: '15px' }} />
            <BiSearchAlt2 size={23} style={{ position: 'absolute', marginTop: '-30px', marginLeft: '8px' }} />
          </div>
        </form>
      </div>

      <div className='category-container'>
        <button onClick={() => setHomeSearch("not")} className={homeSearch === "not" ? 'category selected' : 'category'}>All</button>
        {categoryList?.map(item => (
          <button onClick={() => setHomeSearch(item.category_name)} key={item.id} className={item.category_name === homeSearch ? 'category selected' : 'category'}>{item.category_name}</button>
        ))}
      </div>

      {/* My cart */}
      <div className={isCart ? 'active' : ''}>
        <div className="cards">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>My Cart</h1>
            <div style={{ marginTop: '15px', marginRight: '20px' }}>
              <button onClick={() => hasTrueValue ? setIsPlaceOrder(true) : alert("No Item Selected!")} style={{ borderRadius: '10px', fontSize: '20px', color: hasTrueValue ? '#fff' : '#d2d2d2', background: hasTrueValue ? 'orange' : '', padding: '5px 20px' }}>Check Out</button>
            </div>
          </div>
          <ul className="listCard" style={{ color: '#fff' }}>

            {cartList?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <span style={{ color: 'red' }}>Your Cart is Empty</span>
              </div>
            ) : (
              cartList?.map((item) => (
                <div key={item.id}>
                  <hr style={{ borderColor: '#fff' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', marginLeft: '10px', marginRight: '20px' }}>
                    <span style={{ color: 'red', fontSize: '15px' }}>
                      <span style={{ textDecoration: 'line-through', color: '#d2d2d2' }}>₱{item.discount}</span>{' '}
                      <span style={{ color: '' }}>₱{item.prize}</span>
                    </span>
                    <span style={{ fontSize: '15px' }}>{`₱${((quantityMap[item.id] || item.quantity) * item.prize).toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginLeft: '10px', marginRight: '20px' }} className="cart-list">
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isCheckedMap[item.id] || false}
                        onChange={() => handleCheckboxChange(item.id)}
                        style={{ height: '20px', width: '20px', cursor: 'pointer' }}
                      />
                      <img src={`${backendUrl}/${item.image}`} alt="" style={{ width: '50px', height: '50px' }} />
                      <span>{item.name}</span>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <button
                        onClick={() =>
                          setQuantityMap((prev) => ({ ...prev, [item.id]: (prev[item.id] || item.quantity) - 1 }))
                        }
                        style={{ width: '40px', height: '40px', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <AiOutlineMinus />
                      </button>
                      <span
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '3px',
                          padding: '2px',
                        }}
                      >
                        {quantityMap[item.id] || item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantityMap((prev) => ({ ...prev, [item.id]: (prev[item.id] || item.quantity) + 1 }))
                        }
                        style={{ width: '40px', height: '40px', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>

                    <span style={{marginRight: '10px'}}>
                      <RiDeleteBin6Line onClick={() => handleDeleteCart(item)} size={30} style={{ color: 'red', cursor: 'pointer' }} />
                    </span>
                  </div>
                </div>
              ))
            )}
          </ul>
          <div className="checkOut">
            <div className="total">Total: ₱{placeOrderData.totalAmount}</div>
            <div className="closeShopping" onClick={() => setIsCart(false)}>Close</div>
          </div>
        </div>

      </div>

      {/*  product list */}
      <div className="container">
        <div className="list">
          {productListToSearch?.length === 0 ? (
            <div style={{ fontSize: '18px', width: 'auto', height: 'auto', background: '#fff', padding: '20px', borderRadius: '15px', color: 'red' }}>
              <span>No Pruduct Found!</span>
            </div>
          ) : (
            productListToSearch?.map(item => (
              <div className="item" key={item.id}>
                <img src={`${backendUrl}/${item.image}`} alt />
                <div className="title">
                  {item.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }} className='price'>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <span style={{ textDecoration: 'line-through', color: '#7a7a7a' }}>₱{item.discount}</span>
                    <span>₱{item.prize}</span>
                  </div>
                  <span style={{ color: 'red' }}>Stock: {item.stock}</span>
                </div>

                <div className="ammount" style={{ textAlign: 'left' }}>

                  <ul style={{ display: 'flex', listStyle: 'none', margin: '10px 0 10px -40px', fontSize: '12px' }}>
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
                    <li style={{ marginLeft: '10px', color: 'red' }}>{item.sold} Sold</li>
                  </ul>
                </div>

                <button onClick={() => isLogin ? productButton(item) : setIsOpenLogin(true)} style={{ borderRadius: '1px', padding: '3px', fontSize: '15px' }}>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --------   PRODUCT LIST ---------- */}
      {isProductClick && (
        <div className="popup" onClick={() => { setIsProductClick(false); setAmmount(0); setQuantity(0) }}>
          <div className="popup-bodyss" onClick={(e) => e.stopPropagation()} style={{ animation: isProductClick ? 'dropBottom .3s linear' : '', color: '#fff' }}>
            <div style={{ minHeight: '100vh', overflow: 'auto' }}>
              <div className="modal-close" onClick={() => setIsProductClick(false)} id='comments'>
                <AiOutlineCloseCircle size={30} />
              </div>
              {/* <div style={{ fontWeight: 'bold' }}>
                <span>{eachProductInfo?.name}</span>
              </div> */}
              <div style={{ textAlign: 'center' }}>
                <img src={`${backendUrl}/${eachProductInfo?.image}`} style={{ width: '130px', height: '130px', borderRadius: '50%' }} alt="" />
              </div>
              <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '15px' }}>
                <span>{eachProductInfo.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '13px', color: 'red' }}>
                <span>Stock: {eachProductInfo?.stock}</span>
                {userCredentials?.user_type === "Customer" && (
                  <div style={{ color: '#fff' }}>
                    <span>Ammount: </span>
                    <span>₱{ammount}</span>
                  </div>
                )}
              </div>
              <div style={{ margin: '10px 0' }}>
                {eachProductInfo?.description}
              </div>

              {userCredentials?.user_type === "Customer" && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex' }}>
                    <button onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)} style={{ width: '40px', height: '40px', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><AiOutlineMinus /></button>
                    <span style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3px', padding: '2px' }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ width: '40px', height: '40px', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><AiOutlinePlus /></button>
                  </div>
                  <div>
                    <button onClick={() => buttonAddToCart()} style={{ borderRadius: '20px', fontSize: '15px', width: '150px', padding: '8px', color: 'black', backgroundColor: quantity !== 0 ? 'orange' : '' }}>Add to cart</button>
                  </div>
                </div>
              )}

              {/* comments */}
              <div style={{ animation: isComments ? 'dropBottom .3s linear' : '', overflow: 'auto' }}>
                <hr style={{ borderColor: '#fff' }} />
                <div>
                  <span>Product Ratings and Comments</span>

                  {!commentsList || !commentsList.some(item => item.product_id === eachProductInfo.id) && (
                    <>
                      <hr style={{ borderColor: '#fff' }} />
                      <div style={{ textAlign: 'center', color: 'red', marginLeft: '-20px' }}>
                        <span>No Comments Yet!</span>
                      </div>
                    </>
                  )}

                  {commentsList?.map(item => item.product_id === eachProductInfo.id && (
                    <>
                      <hr style={{ borderColor: '#fff' }} />
                      <div style={{ overflow: 'auto' }}>
                        <div style={{ display: 'flex' }}>
                          <img src={item.given_image && item.given_image.length > 0 ? `${backendUrl}/${item.given_image}` : givenImage} style={{ width: '60px', height: '60px', borderRadius: '50%' }} alt="" />
                          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                            <span style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '10px' }}>{`${item.first_name} ${item.middle_name} ${item.last_name}`}</span>
                            <ul style={{ display: 'flex', listStyle: 'none', color: '#ff9f43', marginLeft: '-40px', fontSize: '13.5px', marginBottom: '4px' }}>
                              <li><i className={item.ratings > 0 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 1 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 2 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 3 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 4 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 5 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 6 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 7 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 8 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li><i className={item.ratings > 9 ? 'fa fa-star' : 'fa fa-star notChecked'}></i></li>
                              <li style={{ color: '#fff', marginLeft: '10px' }}> | </li>
                              <li style={{ marginLeft: '10px', color: '#fff' }}>{item.name}</li>
                            </ul>
                            <span style={{ fontSize: '12px' }}>{item.date}</span>
                          </div>
                        </div>

                        <div style={{ marginLeft: '70px', marginTop: '20px', fontSize: '14px' }}>
                          <div style={{ width: '100%' }}>
                            <span>{item.comments}</span>
                          </div>
                          <div style={{ display: 'flex', fontSize: '15px', gap: '5px', marginTop: '8px' }}>
                            <AiFillLike style={{ cursor: 'pointer' }} size={20} />
                            <span> {item.is_like}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* --------   PROFILE ---------- */}
      {isProfile && (
        <div className="popup" onClick={() => setIsProfile(false)}>
          <div className="popup-bodys" onClick={(e) => e.stopPropagation()} style={{ animation: isProfile ? 'dropBottoms .3s linear' : '' }}>
            <div className="modal-close" onClick={() => setIsProfile(false)}>
              <AiOutlineCloseCircle size={30} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={userCredentials && userCredentials.given_image ? `${backendUrl}/${userCredentials.given_image}` : givenImage} style={{ borderRadius: '50%', height: '150px', width: '150px' }} />
              <label htmlFor="uploadPhoto" style={{ marginLeft: '-40px', cursor: 'pointer', zIndex: '3', color: 'white', position: 'absolute', marginTop: '110px' }}>
                <VscDeviceCamera size={30} style={{ backgroundColor: 'rgb(71, 71, 98)', padding: '3px', borderRadius: '50%' }} />
                <input type="file" id="uploadPhoto" onChange={(e) => updateProfile(e.target.files[0])} style={{ display: 'none' }} />
                {/* <input type="file" id="uploadPhoto" onChange={(e) => setAutoImage(e.target.files[0])} style={{ display: 'none' }} /> */}
              </label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div>
                <h2 style={{ fontSize: '20px' }}>{userCredentials && `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}`}</h2>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span>{userCredentials && userCredentials.user_type}</span>
              </div><br />
            </div>
            <hr />

            <div style={{ margin: '10px 10px 0px 10px' }}>
              <button onClick={() => { setNames({ firstName: userCredentials.first_name, middleName: userCredentials.middle_name, lastName: userCredentials.last_name }); setIsEditProfileName(true) }} style={{ width: '100%', padding: '5px', borderRadius: '5px', fontSize: '17px', color: 'black' }}>Edit Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Change profile info */}
      {
        isEditProfileName && (
          <div className="popup">
            <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isEditProfileName ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

              <div className="popup-edit">
                <span>Change Profile</span>
              </div>
              <hr />
              <form onSubmit={handleEditProfileName}>
                <div className='form-div'>
                  <label htmlFor="">First Name</label>
                  <input type="text" value={names.firstName} onChange={(e) => setNames((prev) => ({ ...prev, firstName: e.target.value }))} className='form-control' placeholder='First Name' required />
                </div>

                <div className='form-div'>
                  <label htmlFor="">Middle Name</label>
                  <input type="text" value={names.middleName} onChange={(e) => setNames((prev) => ({ ...prev, middleName: e.target.value }))} className='form-control' placeholder='Middle Name' required />
                </div>

                <div className='form-div'>
                  <label htmlFor="">Last Name</label>
                  <input type="text" value={names.lastName} onChange={(e) => setNames((prev) => ({ ...prev, lastName: e.target.value }))} className='form-control' placeholder='Last Name' required />
                </div>

                <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                  <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsEditProfileName(false)}>Cancel</button>
                  <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {/* My Address */}
      {isMyAddress && (
        <div className="popup">
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isMyAddress ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

            <div className="popup-edit" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>My Address</span>
              <div className="modal-close" onClick={() => setIsMyAddress(false)}>
                <AiOutlineCloseCircle size={30} />
              </div>
            </div>


            <hr />
            <div className="form-div" style={{ fontSize: '12px' }} >
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Land Mark</th>
                    <th>Country</th>
                    <th>Zip Code</th>
                  </tr>
                </thead>
                <tbody>
                  {myAddressList && myAddressList.length === 0 ? (
                    <div style={{ position: '', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                      <span>No Address!</span>
                    </div>
                  ) : (
                    myAddressList && myAddressList.map((item, index) => (
                      <tr key={item.id}>
                        <td>{`${item.street}. ${item.barangay} ${item.municipality}, ${item.province}`}</td>
                        <td>{`${item.land_mark}`}</td>
                        <td>{`${item.country}`}</td>
                        <td>{item.zip_code}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div>
              <button className='btn btn-primary' onClick={() => setIsAddAddress(true)} style={{ fontSize: '15px' }}>Add New Address</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Address */}
      {isAddAddress && (
        <div className="popup" style={{ fontSize: '15px' }}>
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isAddAddress ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

            <div className="popup-edit">
              <span style={{ fontWeight: 'bold' }}>Add Address</span>
            </div>

            <hr />

            <form onSubmit={handleAddAddress}>
              <div className='form-div'>
                <label htmlFor="">Street</label>
                <input type="text" className='form-control' value={addressData.street} onChange={(e) => setAddressData((prev) => ({ ...prev, street: e.target.value }))} placeholder='e.g. Sta. Cruz' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">Village (Barangay)</label>
                <input type="text" className='form-control' value={addressData.barangay} onChange={(e) => setAddressData((prev) => ({ ...prev, barangay: e.target.value }))} placeholder='e.g. Libertad' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">Municipality/City</label>
                <input type="text" className='form-control' value={addressData.municipality} onChange={(e) => setAddressData((prev) => ({ ...prev, municipality: e.target.value }))} placeholder='e.g. Dapitan City' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">Province/State</label>
                <input type="text" className='form-control' value={addressData.province} onChange={(e) => setAddressData((prev) => ({ ...prev, province: e.target.value }))} placeholder='e.g. Zamboanga Del Norte' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">Postal Code/Zip Code</label>
                <input type="number" className='form-control' value={addressData.zipCode} onChange={(e) => setAddressData((prev) => ({ ...prev, zipCode: e.target.value }))} placeholder='Zip Code' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">Country</label>
                <input type="text" className='form-control' value={addressData.country} onChange={(e) => setAddressData((prev) => ({ ...prev, country: e.target.value }))} placeholder='e.g. Philippines' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">Land Mark (Additional Address Info)</label>
                <input type="text" className='form-control' value={addressData.landMark} onChange={(e) => setAddressData((prev) => ({ ...prev, landMark: e.target.value }))} placeholder='e.g. Inside Rice Mailing Corporation' required />
              </div>

              <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsAddAddress(false)}>Cancel</button>
                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* My Order */}
      {isMyOrder && (
        <div className="popup">
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isMyOrder ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

            <div className="popup-edit">
              <span>My Order</span>
            </div>

            {myOrdersList?.length === 0 ? (
              <div className="form-div" style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                <span>No Order Yet</span>
              </div>
            ) : (
              myOrdersList?.map(item => (
                <div key={item.id}>
                  <hr style={{ border: '1px solid black' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px' }}>Order Date: {item.date}</span>
                    <span className="badge badge-success badge-pill" style={{ fontSize: '14px', color: '#fff', padding: '3px 10px', borderRadius: '15px', background: item.status === 'Pending' ? 'red' : item.status === 'To Ship' ? 'lightblue' : item.status === "To Receive" ? 'orange' : 'none' }}>{item.status === "Received" ? (<button style={{ fontSize: '14px', padding: '5px 14px', borderRadius: '5px', background: 'orange' }} onClick={() => buttonFeedback(item)}>Add Feedback</button>) : item.status}</span>
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

      {/* PLACE ORDER MODAL */}
      {isPlaceOrder && (
        <div className="popup">
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isPlaceOrder ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>
            <div className="modal-close" onClick={() => setIsPlaceOrder(false)}>
              <AiOutlineCloseCircle size={30} />
            </div>
            <div className="popup-edit">
              <span>Confirmation</span>
            </div>

            <hr />
            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label htmlFor="name" className="control-label">Address</label>
                <select className='form-control form-control-border' value={placeOrderData.address} onChange={(e) => setPlaceOrderData((prev) => ({ ...prev, address: e.target.value }))} required>
                  <option value="" selected disabled>Select Address</option>
                  {myAddressList?.map(item => (
                    <option key={item.id} value={`${item.street}. ${item.barangay} ${item.municipality}, ${item.province}`}>{`${item.street}. ${item.barangay} ${item.municipality}, ${item.province}`}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="name" className="control-label">Payment</label>
                <select className='form-control form-control-border' value={placeOrderData.paymentType} onChange={(e) => setPlaceOrderData((prev) => ({ ...prev, paymentType: e.target.value }))} required>
                  <option value="" selected disabled>Select Payment</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="G-Cash">G-Cash</option>
                </select>
              </div>

              {placeOrderData.eachAmount?.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <span>{placeOrderData.productInfo[index]}</span>
                    <span>(x{placeOrderData.quantity[index]})</span>
                  </div>
                  <span>₱{placeOrderData.eachAmount[index]}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginTop: '10px' }}>
                <span>Shipping Fee</span>
                <span>₱130</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginTop: '10px' }}>
                <span>Discount</span>
                <span>₱0</span>
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span></span>
                <span style={{ color: 'red' }}>Total: ₱{placeOrderData.totalAmount}</span>
              </div>
              <br />
              <div>
                <button type='submit' style={{ borderRadius: '10px', fontSize: '20px', background: 'orange', padding: '5px' }}>Place Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Choose Product */}
      {isSelectProduct && (
        <div className="popup">
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isSelectProduct ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>
            <div className="modal-close" onClick={() => setIsSelectProduct(false)}>
              <AiOutlineCloseCircle size={30} />
            </div>
            <div className="popup-edit">
              <h5>Select Product</h5>
            </div>
            <hr />
            <form>
              <div className='form-group'>
                <ul>
                  {/* {myOrdersList?.map(item => (
                    <li key={item.id} onClick={() => setIsRateMe(true)} style={{ cursor: 'pointer', margin: '10px 0 10px 0' }}>{item.product_info.split(',').map((product, index) => (
                      <span key={index}>{product.trim()}</span>
                    ))}</li>
                  ))} */}
                  {myOrdersList?.map(item => item.id === feedbackData.id && (
                    <li key={item.id}>
                      {item.product_info.split(',').map((product, index) => (
                        <li key={index} style={{ cursor: 'pointer', margin: '10px 0 10px 0' }}>
                          <a href='#' onClick={() => handleButtonFeedback(item.product_id.split(',')[index], item.product_info.split(',')[index])}>
                            {product}
                          </a>
                        </li>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rate */}
      {isRateMe && (
        <div className="popup">
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isRateMe ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

            <div className="popup-edit">
              <h5>Feedback to {feedbackData.productName}</h5>
            </div>
            <hr />
            <form onSubmit={handleAddFeedback}>
              <div className='form-group'>
                <label htmlFor="name" className="control-label">{checkUpdate ? 'Update' : 'Add'} Rate (1/10)</label>
                <select className='form-control form-control-border' value={feedbackData.ratings} onChange={(e) => setFeedbackData((prev) => ({ ...prev, ratings: e.target.value }))} required>
                  <option value="" selected disabled>Rate 1 out of 10</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name" className="control-label">{checkUpdate ? 'Update' : 'Add'} Comments</label>
                <textarea value={feedbackData.comments} onChange={(e) => setFeedbackData((prev) => ({ ...prev, comments: e.target.value }))} className="form-control form-control-border" placeholder="You Comment" id="" cols="30" rows="4"></textarea>
              </div>

              {checkUpdate && (
                <div style={{ margin: '-10px', padding: '0' }}>
                  <button onClick={() => { setCheckUpdate(false); setFeedbackData((prev) => ({ ...prev, ratings: '' })); setFeedbackData((prev) => ({ ...prev, comments: '' })); }} style={{ fontSize: '12px', padding: '5px', borderRadius: '5px', background: 'transparent', color: 'darkblue' }}>Switch to add comment</button>
                </div>
              )}

              <div style={{ justifyContent: 'space-between', marginTop: '10px', display: 'flex' }}>
                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsRateMe(false)}>Cancel</button>
                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>{checkUpdate ? 'Update' : 'Add'}</button>
              </div>

              <div className="form-div" style={{ fontSize: '12px', marginTop: '25px' }} >

                {eachComments && eachComments.length === 0 ? (
                  <span></span>
                ) : (
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Ratings</th>
                        <th>Comments</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        eachComments && eachComments.map((item, index) => (
                          <tr key={item.id}>
                            <td>
                              <div style={{ display: 'flex', listStyle: 'none', fontSize: '10px' }}>
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
                            <td>{item.comments}</td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                <a href="#" onClick={() => { setCheckUpdate(true); setFeedbackData((prev) => ({ ...prev, ratings: item.ratings })); setFeedbackData((prev) => ({ ...prev, productId: item.product_id })); setFeedbackData((prev) => ({ ...prev, comments: item.comments })); setFeedbackData((prev) => ({ ...prev, updateCommentId: item.id })); }}><span className="fa fa-edit text-primary" /> </a>
                                <div className="dropdown-divider" />
                                <a href="#" ><span className="fa fa-trash text-danger" /> </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )}

              </div >
            </form >
          </div >
        </div >
      )
      }

      {/* Change Password */}
      {isChangePassword && (
        <div className="popup">
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isChangePassword ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

            <div className="popup-edit">
              <span>Change Password</span>
            </div>
            <hr />
            <form onSubmit={handleChangePassword}>
              <div className='form-div'>
                <label htmlFor="">Username</label>
                <input type="text" value={changePasswordData.username} onChange={(e) => setChangePasswordData((prev) => ({ ...prev, username: e.target.value }))} className='form-control' placeholder='Username' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">Current Password</label>
                <input type="password" value={changePasswordData.password} onChange={(e) => setChangePasswordData((prev) => ({ ...prev, password: e.target.value }))} className='form-control' placeholder='*********' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">New Password</label>
                <input type="password" value={changePasswordData.newPassword} onChange={(e) => setChangePasswordData((prev) => ({ ...prev, newPassword: e.target.value }))} className='form-control' placeholder='*********' required />
              </div>

              <div style={{ marginTop: '15px' }}>
                <label htmlFor="">Confirm Password</label>
                <input type="password" value={changePasswordData.confirmPassword} onChange={(e) => setChangePasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))} className='form-control' placeholder='*********' required />
              </div>

              <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsChangePassword(false)}>Cancel</button>
                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -----------------------LOGOUT CONFIRMATION---------------------- */}
      {isLogout && (
        <div className="popup">
          <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isLogout ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

            <div className="popup-edit">
              <h5>Logout?</h5>
            </div>
            <hr />
            <div className='form-div'>
              <span>Are you sure you wan't to logout?</span>
            </div>

            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
              <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsLogout(false)}>No</button>
              <button className='btn btn-primary' type='submit' style={{ width: '80px' }} onClick={() => { logoutUser() }}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {isOpenLogin && !isOpenRegister && (
        <div onClick={() => setIsOpenLogin(false)} className='popup'>

          {/* Register page */}
          <div onClick={(e) => e.stopPropagation()} className='popup-bodys' style={{ animation: isOpenLogin ? 'dropBottoms .3s linear' : '' }} >
            <div style={{ textAlign: 'center' }}>
              <h3>Login</h3><br />
            </div>
            <div className="modal-close" onClick={() => setIsOpenLogin(false)}>
              <AiOutlineCloseCircle size={30} />
            </div>

            <form onSubmit={handleLogin}>
              <div className='form-div'>
                <label htmlFor="">Username</label>
                <input type="text" value={updateLoginInfo.username} onChange={(e) => updateLoginInfo({ ...loginInfo, username: e.target.value })} className='form-control' placeholder='Username' required />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="">Password</label>
                <input type="password" value={updateLoginInfo.password} onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} className='form-control' placeholder='*********' required />
              </div>

              <div style={{ marginTop: '20px' }}>
                <input type="submit" style={{ width: '100%' }} className='btn btn-primary' value="Login" />
              </div>

            </form>
            <div style={{ marginTop: '10px', textAlign: 'center' }} className='forgot-password'>
              <span>Forgot Password?</span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span>Don't Have Account? <a style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={() => { setIsOpenRegister(true); setIsOpenLogin(false) }} >Register</a></span>
            </div>
          </div>
        </div>
      )}

      {/* Register page */}
      {isOpenRegister && !isOpenLogin && (
        <div onClick={() => setIsOpenRegister(false)} className='popup'>

          {/* Register page */}
          <div onClick={(e) => e.stopPropagation()} className='popup-bodys' style={{ animation: isOpenRegister ? 'dropBottoms .3s linear' : '' }} >
            <div style={{ textAlign: 'center' }}>
              <h3>Register</h3><br />
            </div>
            <div className="modal-close" onClick={() => setIsOpenRegister(false)}>
              <AiOutlineCloseCircle size={30} />
            </div>

            <form onSubmit={registerUser}>
              <div className='form-div'>
                <label htmlFor="">First Name</label>
                <input type="text" className='form-control' value={updateRegisterInfo.firstName} onChange={(e) => updateRegisterInfo({ ...registerInfo, firstName: e.target.value })} placeholder='First Name' required />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="">Middle Name (Optional)</label>
                <input type="text" className='form-control' value={updateRegisterInfo.middleName} onChange={(e) => updateRegisterInfo({ ...registerInfo, middleName: e.target.value })} placeholder='Middle Name' />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="">Last Name</label>
                <input type="text" className='form-control' value={updateRegisterInfo.lastName} onChange={(e) => updateRegisterInfo({ ...registerInfo, lastName: e.target.value })} placeholder='Last Name' required />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="">Username</label>
                <input type="text" className='form-control' value={updateRegisterInfo.username} onChange={(e) => updateRegisterInfo({ ...registerInfo, username: e.target.value })} placeholder='Username' required />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="">Password</label>
                <input type="password" className='form-control' value={updateRegisterInfo.password} onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} placeholder='*********' required />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="">Confirm Password</label>
                <input type="password" className='form-control' value={updateRegisterInfo.confirmPassword} onChange={(e) => updateRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })} placeholder='*********' required />
              </div>

              <div style={{ marginTop: '20px' }}>
                <input type="submit" style={{ width: '100%' }} className='btn btn-primary' value="Register" />
              </div>

            </form>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span>Already have account? <a style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={() => { setIsOpenLogin(true); setIsOpenRegister(false) }} >Login</a></span>
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
      {isLoading || publicLoading && (
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

export default Home
