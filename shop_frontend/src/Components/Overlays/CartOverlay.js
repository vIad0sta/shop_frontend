import React, { useEffect, useState } from 'react';
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Card,
    CardMedia,
    Typography,
    CardContent,
    TextField
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import CartRequests from "../../Requests/CartRequests";
import _ from 'lodash';
import RegisteredUserRequests from "../../Requests/RegisteredUserRequests";
import {useCart} from "../../Contexts/CartContext";

function CartOverlay({ isOpen, onClose}) {
    const { cart, cartItems, fetchCart, setCartItems} = useCart();

    const debouncedHandleQuantityChange = _.debounce(async (quantity, cartItem) => {
        await CartRequests.updateCartItem(cartItem.cartId, {
            id: cartItem.id,
            quantity: Number(quantity),
        });
        fetchCart()
        }, 700);
    const handleQuantityChange = (quantity, cartItem) => {
        debouncedHandleQuantityChange(quantity, cartItem);
    };
    const handleClearCart = async () => {
        await CartRequests.clearCart(cart.id)
        setCartItems(null);
        fetchCart();
    };
    const handleDeleteItem = async (cartItemId) => {
        await CartRequests.deleteCartItem(cartItemId)
        fetchCart();
    };
    return (
        <Drawer anchor="right"  open={isOpen} onClose={onClose} sx={{ minWidth: 300 }}>
            <List>
                <Button style={{ width: '100%' }} onClick={onClose}>
                    <ListItemText primary="Close" />
                </Button>
                {(cart && cartItems) && cartItems.map((item, index) => (
                    cart.cartItems[index] ? (
                        <Card key={cart.cartItems[index].id} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                            <CardMedia
                                component="img"
                                src={`https://localhost:8080/images/${item.id}/${item.id}_1.png`}
                                alt={item.name}
                                sx={{width: 100, height: 100, flexShrink: 0, objectFit: 'cover'}}
                            />
                            <CardContent>
                                <Typography variant="body1">{item.name}</Typography>
                                <Typography variant="body2">{item.price * cart.cartItems[index].quantity}₴</Typography>
                                <TextField
                                    type={'number'}
                                    variant={'standard'}
                                    onChange={(event) => {
                                        handleQuantityChange(event.target.value, cart.cartItems[index])
                                    }}
                                    defaultValue={cart.cartItems[index].quantity}
                                    inputProps={{
                                        min: 1,
                                        max: 10
                                    }}
                                />
                                <Button
                                    variant="text"
                                    color="error"
                                    onClick={() => handleDeleteItem(cart.cartItems[index].id)}
                                    startIcon={<DeleteIcon/>}
                                />
                            </CardContent>
                        </Card>
                    ) : null
                ))}
            </List>
            <div style={{ marginTop: "auto", }}>
                {cart && <Typography textAlign={'center'} variant="h4">Сума</Typography>}
                {cart && <Typography textAlign={'center'} variant="h4">{cart.fullPrice}₴</Typography>}
            </div>
            <hr style={{ color: "black", width: '99%' }} />
            {(cart && cartItems && cartItems.length > 0) &&
                <>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                        <Button startIcon={<ClearIcon />} variant="outlined" onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                    </div>
                    <div style={{ width: '100%', height: "100px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button style={{ width: '60%', height: "40px" }} variant={'contained'} onClick={() => window.location.href = `/checkout/${cart.id}`}>Оформити</Button>
                    </div>
                    <div style={{ width: '100%', height: "100px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button style={{ width: '60%', height: "40px" }} variant={'contained'} onClick={() => window.location.href = `/carts/${cart.id}`}>Оглянути</Button>
                    </div>
                </>
            }
        </Drawer>
    );
}

export default CartOverlay;
