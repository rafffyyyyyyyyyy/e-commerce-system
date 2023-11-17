import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { agetRequest, apostRequest, baseUrl, getRequest, postRequest } from "../utils/Services";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // const {changeStatusMount} = useContext(AdminContext);

    const navigate = useNavigate();

    // loading
    const [errorResponse, setErrorResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mount, setMount] = useState(false);

    const [registerInfo, setRegisterInfo] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const user = localStorage.getItem('token');
        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    // -------------------------------------    REGISTER    ---------------------------------------------
    const [isOpenRegister, setIsOpenRegister] = useState(false);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        const firstName = registerInfo.firstName;
        const middleName = registerInfo.middleName;
        const lastName = registerInfo.lastName;
        const username = registerInfo.username;
        const password = registerInfo.password;
        const confirmPassword = registerInfo.confirmPassword;
        const data = { firstName, middleName, lastName, username, password, confirmPassword };

        const response = await postRequest(`${baseUrl}/users/register`, data);

        setIsLoading(false);
        setIsOpenRegister(false);
        setMount(mount ? false : true);

        if (response.error) {
            setErrorResponse({ message: response.message, isError: true });
        } else {
            localStorage.setItem("token", JSON.stringify(response.token));
            setUser(response.token);
            setErrorResponse({ message: response.message, isError: false });
        }
    }, [registerInfo]);

    // -------------------------------------   LOGOUT  --------------------------------------------
    const [isLogout, setIsLogout] = useState(false);

    const logoutUser = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setUserCredentials(null);
        setIsLogout(false);
        setErrorResponse({ message: "Logout Success", isError: false });
        navigate('/');
    }, []);

    // ------------------------------------    LOGIN USERS -----------------------------------------
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    });
    const [isOpenLogin, setIsOpenLogin] = useState(false);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        const username = loginInfo.username;
        const password = loginInfo.password;
        const data = { username, password };

        const response = await postRequest(`${baseUrl}/users/login`, data);

        setIsLoading(false);
        setIsOpenLogin(false);
        setMount(mount ? false : true);

        if (response.error) {
            setErrorResponse({ message: response.message, isError: true });
        } else {
            localStorage.setItem("token", JSON.stringify(response.token));
            setUser(response.token);
            setErrorResponse({ message: response.message, isError: false });
        }
    }, [loginInfo]);

    // ------------------------------------ PROTECTED   -------------------------------------------
    const token = user;
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            setIsLoading(true);

            const fetchUser = async () => {
                const response = await agetRequest(`${baseUrl}/users/protected`);

                setIsLoading(false);

                if (response.error) {
                    setUser(null);
                    setErrorResponse({ message: response.message, isError: true });
                } else {
                    setUserId(response.user);
                }
            };
            fetchUser();
        }
    }, [token, mount, user]);

    // ---------------------------------    CHANGE PASSWORD ----------------------------------------------
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [changePasswordData, setChangePasswordData] = useState({
        username: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${baseUrl}/users/change-password`, { changePasswordData, userId: userId.id });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setMount(mount ? false : true);
                setIsChangePassword(false);
                setErrorResponse({ message: response.message, isError: false });
                setChangePasswordData({
                    username: '',
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    };

    //------------------------------------------------------    EDIT PROFILE    -----------------------------------------------------------
    const [isEditProfileName, setIsEditProfileName] = useState(false);
    const [names, setNames] = useState({
        firstName: '',
        middleName: '',
        lastName: ''
    });

    const handleEditProfileName = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${baseUrl}/users/change-profile-info`, { names, userId: userId.id });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setIsEditProfileName(false);
                setMount(mount ? false : true);
                setErrorResponse({ message: response.message, isError: false });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    };

    // -------------------------------------    FETCH USER CREDENTIALS --------------------------------------
    const [userCredentials, setUserCredentials] = useState([]);

    useEffect(() => {
        if (userId?.id) {
            const fetchUserData = async () => {
                setIsLoading(true);

                const id = userId.id;
                try {
                    const response = await apostRequest(`${baseUrl}/users/fetch-user-credentials`, { id });

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setChangePasswordData((prev) => ({ ...prev, username: response.message[0].username }));
                        setUserCredentials(response.message[0]);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log('error: ', error);
                }
            };
            fetchUserData();
        }
    }, [userId, mount]);

    //-----------------------------------------------   ADD NEW ADDRESS ------------------------------------------------
    const [addressMount, setAddressMount] = useState(false);
    const [isAddAddress, setIsAddAddress] = useState(false);
    const [addressData, setAddressData] = useState({
        street: '',
        barangay: '',
        municipality: '',
        province: '',
        zipCode: '',
        country: '',
        landMark: ''
    });

    const handleAddAddress = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${baseUrl}/users/add-address`, { addressData, userId: userId.id });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setIsAddAddress(false);
                setAddressMount(addressMount ? false : true);
                setErrorResponse({ message: response.message, isError: false });
                setAddressData({
                    street: '',
                    barangay: '',
                    municipality: '',
                    province: '',
                    zipCode: '',
                    country: '',
                    landMark: ''
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    };

    //-----------------------------------------------   FETCH ADDRESS   ------------------------------------------------
    const [myAddressList, setMyAddressList] = useState(null);
    const [isMyAddress, setIsMyAddress] = useState(false);

    useEffect(() => {
        if (userId) {
            setIsLoading(true);
            setErrorResponse(null);

            const fetchAddress = async () => {
                try {
                    const response = await apostRequest(`${baseUrl}/users/fetch-address`, { userId: userId.id })

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setIsMyAddress(false);
                        setMyAddressList(response.message);
                    }
                } catch (error) {

                }
            };
            fetchAddress();
        }
    }, [userId, addressMount]);

    // ----------------------------------------------   AUTO PROFILE UPLOAD --------------------------------------------
    const [autoImage, setAutoImage] = useState([]);

    const updateProfile = useCallback((info) => {
        setAutoImage(info);
    }, []);

    useEffect(() => {
        if (autoImage) {
            if (autoImage.length === 0) {
                // console.log('nothing change!')
            }
            else {
                setIsLoading(true);
                const autoUpload = async () => {

                    const requestImageToUpload = new FormData();
                    requestImageToUpload.append('image', autoImage);
                    requestImageToUpload.append('userId', userId.id);

                    try {
                        const response = await apostRequest(`${baseUrl}/users/profile-upload`, requestImageToUpload);
                        setIsLoading(false);

                        if (response.error) {
                            setErrorResponse({ message: response.message, isError: true });
                            // console.log(response);
                        } else {
                            setErrorResponse({ message: response.message, isError: false });
                            setMount(mount ? false : true);
                        }
                    } catch (error) {
                        setIsLoading(false);
                        console.log('error: ', error);
                    }
                };
                autoUpload();
            }
        }
    }, [autoImage]);

    // ---------------------------------    HANDLE ADD TO CART  -------------------------------------------
    const [addCartMount, setAddCartMount] = useState(false);
    const [isProductClick, setIsProductClick] = useState(false);
    const [testerProduct, setTesterProduct] = useState('');

    const handleAddToCart = useCallback(async (productId, quantity) => {

        setIsLoading(true);
        setErrorResponse(null);
        setTesterProduct(productId);

        try {
            const response = await apostRequest(`${baseUrl}/users/add-cart`, { productId, quantity, userId: userId.id });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setIsProductClick(false);
                setAddCartMount(addCartMount ? false : true);
                setErrorResponse({ message: response.message, isError: false });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }, [userId]);

    // -----------------------------------------    PLACE ORDER -----------------------------------------
    const [placeOrderMount, setPlaceOrderMount] = useState(false);
    const [isMyOrder, setIsMyOrder] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [isPlaceOrder, setIsPlaceOrder] = useState(false);
    const [placeOrderData, setPlaceOrderData] = useState({
        productIds: null,
        quantity: null,
        eachAmount: null,
        totalAmount: null,
        productInfo: null,
        address: null,
        paymentType: null,
        allData: null
    });

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${baseUrl}/users/place-order`, { placeOrderData, userId: userId.id, fullname: `${userCredentials.first_name} ${userCredentials.middle_name} ${userCredentials.last_name}` });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setIsPlaceOrder(false);
                setIsCart(false);
                setIsMyOrder(true);
                setPlaceOrderMount(placeOrderMount ? false : true);
                setErrorResponse({ message: response.message, isError: false });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // ---------------------------------------- FETCH ORDERS    --------------------------------------------
    const [myOrdersList, setMyOrdersList] = useState(null);

    useEffect(() => {
        if (userId) {
            const fetchOrders = async () => {

                setIsLoading(true);
                setErrorResponse(null);

                try {
                    const response = await apostRequest(`${baseUrl}/users/fetch-myOrders`, { userId: userId.id });

                    setIsLoading(false);

                    if (response.error) {
                        setErrorResponse({ message: response.message, isError: true });
                    } else {
                        setMyOrdersList(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchOrders();
        }
    }, [userId, placeOrderMount]);

    // -----------------------------------------    DELETE FROM THE CART    --------------------------------

    const handleDeleteCart = async (item) => {

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${baseUrl}/users/delete-cart`, { item });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setAddCartMount(addCartMount ? false : true);
                setErrorResponse({ message: response.message, isError: false });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // ---------------------------------------  FETCH CART ----------------------------------
    const [cartList, setCartList] = useState(null);

    useEffect(() => {
        if (userId) {
            setIsLoading(true);
            setErrorResponse(null);

            const fetchCart = async () => {
                try {
                    const response = await apostRequest(`${baseUrl}/users/fetch-cart`, { userId: userId.id });

                    setIsLoading(false);

                    if (response.error) {
                        setErrorResponse({ message: response.message, isError: true });
                    } else {
                        setCartList(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchCart();
        }
    }, [userId, addCartMount, testerProduct]);

    // ------------------------------------------------ FETCH NOTIFICATION  -----------------------------------------------------
    const [myNotifications, setMyNotifications] = useState(null);

    useEffect(() => {
        if (userId) {
            const fetchNotifications = async () => {
                setIsLoading(true);
                setErrorResponse(null);

                try {
                    const response = await apostRequest(`${baseUrl}/users/fetch-notifications`, { userId: userId.id });

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setMyNotifications(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchNotifications();
        }
    }, [userId]);

    // -------------------------------------    HANDLE ADD FEEDBACK -------------------------------------------
    const [feedbackMount, setFeedbackMount] = useState(false);
    const [eachMount, setEachMount] = useState(false);
    const [feedbackData, setFeedbackData] = useState({
        userId: null,
        productId: null,
        image: '',
        fullname: '',
        ratings: null,
        comments: '',
        productName: '',
        id: null,
        updateCommentId: null
    });

    const [isRateMe, setIsRateMe] = useState(false);
    const [isSelectProduct, setIsSelectProduct] = useState(false);
    const [checkUpdate, setCheckUpdate] = useState(false);

    const handleButtonFeedback = async (productId, productName) => {
        setFeedbackData((prev) => ({ ...prev, productId: productId }));
        setFeedbackData((prev) => ({ ...prev, productName: productName }));
        setIsRateMe(true);
        setIsSelectProduct(false);
        setEachMount(eachMount ? false : true);
    }

    const handleAddFeedback = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        if (checkUpdate) {
            try {
                const response = await apostRequest(`${baseUrl}/users/update-feedback`, { feedbackData, userId: userId.id });

                setIsLoading(false);

                if (response.error) {
                    setErrorResponse({ message: response.message, isError: true });
                } else {
                    setErrorResponse({ message: response.message, isError: false });
                    setFeedbackData((prev) => ({ ...prev, ratings: '' }));
                    setFeedbackData((prev) => ({ ...prev, comments: '' }));
                    setFeedbackMount(feedbackMount ? false : true);
                    // setIsRateMe(false);
                }
            } catch (error) {
                setIsLoading(false);
                console.log("Error: ", error);
            }
        } else {
            try {
                const response = await apostRequest(`${baseUrl}/users/add-feedback`, { feedbackData, userId: userId.id });

                setIsLoading(false);

                if (response.error) {
                    setErrorResponse({ message: response.message, isError: true });
                } else {
                    setErrorResponse({ message: response.message, isError: false });
                    setFeedbackData((prev) => ({ ...prev, ratings: '' }));
                    setFeedbackData((prev) => ({ ...prev, comments: '' }));
                    setFeedbackMount(feedbackMount ? false : true);
                    // setIsRateMe(false);
                }
            } catch (error) {
                setIsLoading(false);
                console.log("Error: ", error);
            }
        }
    }

    // --------------------------------------------------   FETCH COMMENTS  -------------------------------------------------------
    const [commentsList, setCommentsList] = useState(null);

    useEffect(() => {
        if (userId) {
            const fetchComments = async () => {
                setIsLoading(true);
                setErrorResponse(null);

                try {
                    const response = await agetRequest(`${baseUrl}/users/get-comments`);

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setCommentsList(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchComments();
        }
    }, [userId, feedbackMount]);

    // --------------------------------------   CALCULATE RATE FOR PRODUCTS   ---------------------------------------------
    let totalRatings = 0;
    let productCount = 0;

    const ratingsMap = new Map();

    commentsList?.forEach(row => {
        const { product_id, ratings } = row;
        if (ratings !== null) {
            if (ratingsMap.has(product_id)) {
                ratingsMap.get(product_id).total += ratings;
                ratingsMap.get(product_id).count++;
            } else {
                ratingsMap.set(product_id, { total: ratings, count: 1 });
            }
        }
    });

    // Calculate average ratings for each product_id
    const averageRatings = [];

    ratingsMap.forEach((value, key) => {
        const { total, count } = value;
        const averageRating = count > 0 ? total / count : 0;
        averageRatings.push({ product_id: key, averageRating });
    });

    useEffect(() => {
        if (averageRatings) {
            const insertRatings = async () => {
                setIsLoading(true);

                try {
                    const response = await apostRequest(`${baseUrl}/users/insert-ratings`, { averageRatings });

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        // console.log(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            insertRatings();
        }
    }, [userId, feedbackMount, averageRatings]);

    // ------------------------------   FETCH EACH COMMENT  ---------------------------------
    const [eachComments, setEachComments] = useState(null);

    useEffect(() => {
        if (userId) {
            setIsLoading(true);
            setErrorResponse(null);

            const fetchEach = async () => {
                try {
                    const response = await apostRequest(`${baseUrl}/users/each-comment`, { userId: userId.id, productId: feedbackData.productId });

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setEachComments(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchEach();
        }
    }, [userId, eachMount, feedbackMount]);


    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        errorResponse,
        isLoading,
        logoutUser,
        loginInfo,
        updateLoginInfo,
        handleLogin,
        isOpenLogin,
        setIsOpenLogin,
        isLogout,
        setIsLogout,
        isOpenRegister,
        setIsOpenRegister,
        userCredentials,
        updateProfile,
        userId,
        handleAddToCart,
        isProductClick,
        setIsProductClick,
        cartList,
        isChangePassword,
        setIsChangePassword,
        changePasswordData,
        setChangePasswordData,
        handleChangePassword,
        isAddAddress,
        setIsAddAddress,
        addressData,
        setAddressData,
        handleAddAddress,
        myAddressList,
        isMyAddress,
        setIsMyAddress,
        placeOrderData,
        setPlaceOrderData,
        isPlaceOrder,
        setIsPlaceOrder,
        handlePlaceOrder,
        isCart,
        setIsCart,
        handleDeleteCart,
        isMyOrder,
        setIsMyOrder,
        myOrdersList,
        placeOrderMount,
        myNotifications,
        feedbackData,
        setFeedbackData,
        handleAddFeedback,
        handleButtonFeedback,
        isRateMe,
        setIsRateMe,
        setIsSelectProduct,
        isSelectProduct,
        commentsList,
        isEditProfileName,
        setIsEditProfileName,
        names,
        setNames,
        handleEditProfileName,
        eachComments,
        checkUpdate,
        setCheckUpdate
    }}>
        {children}
    </AuthContext.Provider>
}