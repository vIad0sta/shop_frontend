import React, {createContext, useState, useContext, useEffect} from 'react';
import RegisteredUserRequests from "../Requests/RegisteredUserRequests";
import CartRequests from "../Requests/CartRequests";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart,setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [signedIn, setSignedIn] = useState(JSON.parse(localStorage.getItem('signedIn')));

    useEffect(() => {
        fetchCart();
    }, []);
    const fetchCart = async () => {
        try{
            const cartResponse = signedIn ?
                await RegisteredUserRequests.getCart() :
                await CartRequests.getCartBySession();
            setCart(cartResponse);

            const cartItemsResponse = await CartRequests.getCartProducts(cartResponse.id);
            setCartItems(cartItemsResponse);
        } catch (e) {
            console.log(e.message)
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, cartItems, setCartItems, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);