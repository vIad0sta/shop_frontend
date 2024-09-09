import React, {createContext, useState, useContext, useEffect} from 'react';
import RegisteredUserRequests from "../Requests/RegisteredUserRequests";
import CartRequests from "../Requests/CartRequests";
import {useUser} from "./UserContext";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const {user} = useUser();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const cartResponse = user !== null ?
                await RegisteredUserRequests.getCart('me') :
                await CartRequests.getCartBySession();
            setCart(cartResponse);

            const cartItemsResponse = await CartRequests.getCartProducts(cartResponse.id);
            setCartItems(cartItemsResponse);
        } catch (e) {
            console.error(e.message)
        }
    };

    return (
        <CartContext.Provider value={{cart, setCart, cartItems, setCartItems, fetchCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);