import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {baseUrl, getRequest, postRequest } from "../utils/Services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { AdminContext } from "./AdminContext";

export const PublicContext = createContext();

export const PublicContextProvider = ({ children }) => { 

    const [publicLoading, setPublicLoading] = useState(false);
    const {placeOrderMount} = useContext(AuthContext);
    const {productMount, mount} = useContext(AdminContext);

    // ===============================================  GET CATEGORY    =======================================
    const [categoryList, setCategoryList] = useState(null);

    useEffect(() => {
        const getCategory = async () => {
            setPublicLoading(true);
            
            try {
                const response = await getRequest(`${baseUrl}/public/get-category`);

                setPublicLoading(false);

                if (response.error){
                    console.log(response.message);
                }else{
                    setCategoryList(response.message);
                }

            } catch (error) {
                setPublicLoading(false);
                console.log("Error: ", error);
            }
        };
        getCategory();
    }, [mount]);

    // ===========================================  GET PRODUCTS    ============================================
    const [productList, setProductList] = useState(null);
    const [homeSearch, setHomeSearch] = useState('not');

    useEffect(() => {
        const getProduct = async () => {
            setPublicLoading(true);

            try {
                const response = await getRequest(`${baseUrl}/public/fetch-products`);

                setPublicLoading(false);

                if (response.error){
                    console.log(response.message);
                }else{
                    setProductList(response.message);
                }
            } catch (error) {
                setPublicLoading(false);
                console.log("Error: ", error);
            }
        };
        getProduct();
    }, [placeOrderMount, productMount]);

    const productListToSearch = productList?.filter(item =>
        item.name.toLowerCase().includes(homeSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(homeSearch.toLowerCase()) ||
        item.isDelete.toLowerCase().includes(homeSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(homeSearch.toLowerCase()) 
    );

    return <PublicContext.Provider value={{
        publicLoading,
        categoryList,
        productListToSearch,
        homeSearch, 
        setHomeSearch,
    }}>
        {children}
    </PublicContext.Provider>
}