import React, { useEffect, useState } from 'react';
import { Grid, Card, Typography, IconButton, Paper, TextField, Button, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CartRequests from '../Requests/CartRequests';
import _ from "lodash";
import {useParams} from "react-router-dom";
import CartViewProduct from "./CartViewProduct";
import {useCart} from "../Contexts/CartContext";

function ViewCartPage({ }) {
    const [productsFromCart, setProductsFromCart] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const { idArray } = useParams();
    const [selectedCartItems, setSelectedCartItems] = useState([])
    const { cart, setCart, fetchCart } = useCart();

    useEffect(() => {
        let ids
        if(!cart || !cart.cartItems) return

        fetchProductsFromCart();

        if (idArray && selectedCartItems.length === 0) {
            const ids = idArray.split(',');
            ids.map(id => {
                setSelectedCartItems(prevItems => [
                    ...prevItems,
                    cart.cartItems.find(product => product.id === id)
                ]);
            });
        }
    }, [cart]);

    useEffect(() => {
        calculateTotalPrice();

    }, [productsFromCart]);

    const fetchProductsFromCart = async () => {
        if (!cart) return;
        const response = await CartRequests.getCartProducts(cart.id);
        setProductsFromCart(response);
    };

    const handleRemoveProduct = async (cartItemId) => {
        if(!cartItemId) return
        await CartRequests.deleteCartItem(cartItemId);
        if (selectedCartItems) {
            const updatedSelectedCartItems = selectedCartItems.filter(item => item.id !== cartItemId);
            setSelectedCartItems(updatedSelectedCartItems);
        }
        fetchCart();
    };

    const debouncedHandleQuantityChange = _.debounce(async (quantity, cartItemId) => {
        // Ensure quantity is within range of 1 to 15
        quantity = Math.max(1, Math.min(15, quantity));
        const cartItem = cart.cartItems.find(item => item.id === cartItemId);
        await CartRequests.updateCartItem(cartItem.cartId, {
            id: cartItem.id,
            quantity: Number(quantity),
        });
        const updatedItems = selectedCartItems.map(item =>
            item.id === cartItemId ? { ...item, quantity: quantity } : item
        );
        setSelectedCartItems(updatedItems)

        fetchCart();
    }, 700);

    const handleQuantityChange = (quantity, cartItemId) => {
        debouncedHandleQuantityChange(quantity, cartItemId);
    };

    const calculateTotalPrice = () => {
        if (!cart || !cart.cartItems) return;

        const getTotal = (items) => {
            return items.reduce((total, item) => {
                if (!item) return total; // Ensure item is defined
                const product = productsFromCart.find(cartProduct => cartProduct.id === item.productId);
                return total + (item.quantity * (product ? product.price : 0));
            }, 0);
        };

        let total = idArray ? getTotal(selectedCartItems) : getTotal(cart.cartItems);

        setTotalPrice(total);
    };



    const handleMakeOrder = () => {
        window.location.href = `/checkout/${cart.id}`;
    };

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value);
    };

    return (
        <Grid container justifyContent="center" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px',minHeight: '100vh',width: '100%' }}>

            <Grid  item xs={12} sm={8} md={6} sx={{margin: 'auto auto'}}  >
                <Paper elevation={3}>
                    {(cart?.cartItems && productsFromCart) &&
                        (!idArray ? cart.cartItems : selectedCartItems).map((item) => {
                            if (!item) return null; // Check if item is undefined
                            const product = productsFromCart.find(productFromCart => productFromCart.id === item.productId);
                            if (!product) return null; // Check if product is undefined

                            return (
                                <CartViewProduct
                                    key={item.productId}
                                    product={product}
                                    cart={cart}
                                    handleRemoveProduct={handleRemoveProduct}
                                    handleQuantityChange={handleQuantityChange}
                                    quantity={item.quantity}
                                    size={item.size}
                                    cartItemId={item.id}
                                />
                            );
                        })}
                </Paper>

            </Grid>
            <Box
                sx={{
                    margin: 'auto auto',
                    position: 'sticky',
                    height: '200px',
                    width: { xs: '100%', sm: '300px' },
                    bgcolor: 'white',
                    p: 2,
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    top: '20%', // Adjust this value as needed
                    bottom: '20%', // Adjust this value as needed
                }}
            >
                <Typography variant="h6">Cart Summary</Typography>
                <Typography variant="subtitle1">Total Price: ${totalPrice.toFixed(2)}</Typography>
                <TextField
                    label="Promo Code"
                    variant="outlined"
                    fullWidth
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    sx={{ marginTop: '10px' }}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleMakeOrder} sx={{ marginTop: '10px' }}>
                    Make Order
                </Button>
            </Box>
        </Grid>
    );
}

export default ViewCartPage;
