import React, { useEffect, useState } from 'react';
import { Grid, Paper, TextField, Button, Box, Typography } from '@mui/material';
import CartRequests from '../Requests/CartRequests';
import _ from "lodash";
import { useParams } from "react-router-dom";
import CartViewProduct from "../Components/ViewCartPage/CartViewProduct";
import { useCart } from "../Contexts/CartContext";

function ViewCartPage() {
    const [productsFromCart, setProductsFromCart] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const { idArray } = useParams();
    const [selectedCartItems, setSelectedCartItems] = useState([]);
    const { cart, fetchCart } = useCart();

    useEffect(() => {
        if (!cart?.cartItems) return;

        fetchProductsFromCart();
        initializeSelectedItems();
    }, [cart]);

    useEffect(() => {
        calculateTotalPrice();
    }, [productsFromCart, selectedCartItems]);

    const fetchProductsFromCart = async () => {
       try {
           if (!cart) return;
           const response = await CartRequests.getCartProducts(cart.id);
           setProductsFromCart(response);
       } catch (e) {
           console.error(e.message)
       }
    };

    const initializeSelectedItems = () => {
        if (idArray && selectedCartItems.length === 0) {
            const ids = idArray.split(',');
            const selectedItems = ids.map(id => cart.cartItems.find(item => item.id === parseInt(id)));
            setSelectedCartItems(selectedItems.filter(Boolean));
        }
    };

    const handleRemoveProduct = async (cartItemId) => {
        try {
            if (!cartItemId) return;
            await CartRequests.deleteCartItem(cartItemId);
            setSelectedCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
            fetchCart();
        }
        catch (e) {
            console.error(e.message)
        }
    };

    const debouncedHandleQuantityChange = _.debounce(async (quantity, cartItemId) => {
       try {
           quantity = Math.max(1, Math.min(15, quantity));
           await CartRequests.updateCartItem(cart.id, { id: cartItemId, quantity });
           setSelectedCartItems(prevItems =>
               prevItems.map(item => item.id === cartItemId ? { ...item, quantity } : item)
           );
           fetchCart();
       } catch (e) {
           console.error(e.message)
       }
    }, 700);

    const handleQuantityChange = (quantity, cartItemId) => {
        debouncedHandleQuantityChange(quantity, cartItemId);
    };

    const calculateTotalPrice = () => {
        const items = idArray ? selectedCartItems : cart?.cartItems || [];
        const total = items.reduce((sum, item) => {
            const product = productsFromCart.find(p => p.id === item.productId);
            return sum + (item.quantity * (product?.price || 0));
        }, 0);
        setTotalPrice(total);
    };

    const handleMakeOrder = () => {
        window.location.href = idArray ? `/checkout/${idArray}` : '/checkout';
    };

    const styles = {
        container: { backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', minHeight: '100vh', width: '100%' },
        paper: { margin: 'auto auto' },
        summaryBox: {
            margin: 'auto auto',
            position: 'sticky',
            height: '200px',
            width: { xs: '100%', sm: '300px' },
            bgcolor: 'white',
            p: 2,
            borderRadius: '5px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
            zIndex: 1000,
            top: '20%',
            bottom: '20%',
        },
        button: { marginTop: '10px' },
    };

    return (
        <Grid container justifyContent="center" sx={styles.container}>
            <Grid item xs={12} sm={8} md={6} sx={styles.paper}>
                <Paper elevation={3}>
                    {cart?.cartItems && productsFromCart &&
                        (idArray ? selectedCartItems : cart.cartItems).map(item => {
                            const product = productsFromCart.find(p => p.id === item.productId);
                            if (!product) return null;
                            return (
                                <CartViewProduct
                                    key={item.productId}
                                    product={product}
                                    handleRemoveProduct={handleRemoveProduct}
                                    handleQuantityChange={handleQuantityChange}
                                    quantity={item.quantity}
                                    size={product.clothingSizes.find(size => size.id === item.clothingSizeId)?.name}
                                    cartItemId={item.id}
                                />
                            );
                        })}
                </Paper>
            </Grid>
            <Box sx={styles.summaryBox}>
                <Typography variant="h6">Cart Summary</Typography>
                <Typography variant="subtitle1">Total Price: {totalPrice.toFixed(2)}₴</Typography>
                <TextField
                    label="Promo Code"
                    variant="outlined"
                    fullWidth
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    sx={styles.button}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleMakeOrder} sx={styles.button}>
                    Make Order
                </Button>
            </Box>
        </Grid>
    );
}

export default ViewCartPage;
