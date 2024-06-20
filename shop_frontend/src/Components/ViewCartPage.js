import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Paper, TextField, Button, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CartRequests from '../Requests/CartRequests';
import _ from "lodash";
import {useParams} from "react-router-dom";
import CartViewProduct from "./CartViewProduct";

function ViewCartPage({ cart, setCart, fetchData }) {
    const [productsFromCart, setProductsFromCart] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const { id } = useParams();
    const [oneProduct, setOneProduct] = useState(null)

    useEffect(() => {
        if(!cart || !cart.cartItems)
            return
        if(id) setOneProduct(cart.cartItems.find(product => product.id == id))
        fetchProductsFromCart();
    }, [cart]);

    useEffect(() => {
        calculateTotalPrice();

    }, [productsFromCart]);

    const fetchProductsFromCart = async () => {
        if (!cart) return;
        const response = await CartRequests.getCartProducts(cart.id);
        setProductsFromCart(response);
    };

    const handleRemoveProduct = async (productId) => {
        if(!productId) return
        await CartRequests.deleteCartItem(cart.cartItems.find(item => item.productId === productId).id);
        fetchData();
    };

    const debouncedHandleQuantityChange = _.debounce(async (quantity, productId) => {
        // Ensure quantity is within range of 1 to 15
        quantity = Math.max(1, Math.min(15, quantity));
        const cartItem = cart.cartItems.find(item => item.productId === productId);
        await CartRequests.updateCartItem(cartItem.cartId, {
            id: cartItem.id,
            quantity: Number(quantity),
        });
        fetchData();
    }, 700);

    const handleQuantityChange = (quantity, productId) => {
        debouncedHandleQuantityChange(quantity, productId);
    };

    const calculateTotalPrice = () => {
        let total = 0;
        productsFromCart.forEach(product => {
            total += product.price * cart.cartItems.find(item => item.productId === product.id).quantity;
        });
        setTotalPrice(total);
    };

    const handleMakeOrder = () => {
        // Logic to make order
    };

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value);
    };

    return (
        <Grid container justifyContent="center" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px',minHeight: '100vh',width: '100%' }}>

            <Grid  item xs={12} sm={8} md={6} sx={{margin: 'auto auto'}}  >
                <Paper elevation={3}>
                    {(cart && cart.cartItems && productsFromCart && !oneProduct) && productsFromCart.map((product) => (
                        // <Card sx={{ marginBottom: '20px' }}>
                        //     <CardMedia
                        //         component="img"
                        //         height="200"
                        //         image={`https://localhost:8080/images/${product.id}/${product.id}_1.png`} // Assuming image paths are structured
                        //         alt={product.name}
                        //     />
                        //     <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        //         <div>
                        //             <Typography gutterBottom variant="h5" component="div">
                        //                 {product.name}
                        //             </Typography>
                        //             <Typography variant="body2" color="primary" sx={{ fontSize: '1.1rem' }}>
                        //                 Price: ${product.price}
                        //             </Typography>
                        //         </div>
                        //         <div>
                        //             <Typography variant="body2" color="text.secondary">
                        //                 Quantity: {cart.cartItems.find(item => item.productId === product.id)?.quantity || 0}
                        //             </Typography>
                        //             <TextField
                        //                 type="number"
                        //                 variant="outlined"
                        //                 size="small"
                        //                 defaultValue={cart.cartItems.find(item => item.productId === product.id)?.quantity || 0}
                        //                 inputProps={{ min: 1, max: 15 }}
                        //                 onChange={(e) => handleQuantityChange(e.target.value, product.id)}
                        //             />
                        //             <IconButton aria-label="remove" size="big" onClick={() => handleRemoveProduct(product.id)}>
                        //                 <Delete />
                        //             </IconButton>
                        //         </div>
                        //     </CardContent>
                        // </Card>
                        <CartViewProduct product={product} cart={cart} handleRemoveProduct={handleRemoveProduct} handleQuantityChange={handleQuantityChange}/>
                    ))}
                    {oneProduct &&
                        <CartViewProduct product={productsFromCart.find(productFromCart => productFromCart.id === oneProduct.productId)} cart={cart} handleRemoveProduct={handleRemoveProduct} handleQuantityChange={handleQuantityChange}/>
                    }

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
