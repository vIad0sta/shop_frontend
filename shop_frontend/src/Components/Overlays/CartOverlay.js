import React, { useEffect, useState } from 'react';
import {
    Button,
    Drawer,
    List,
    Card,
    CardMedia,
    Typography,
    CardContent,
    TextField,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import CartRequests from "../../Requests/CartRequests";
import _ from 'lodash';
import RegisteredUserRequests from "../../Requests/RegisteredUserRequests";
import {useCart} from "../../Contexts/CartContext";

function CartOverlay({ isOpen, onClose}) {
    const { cart, cartItems, fetchCart, setCartItems} = useCart();
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectionDisabled, setSelectionDisabled] = useState(false);

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

    const handleOrderOneItem = () => {
        setSelectMode(true);
    };

    const handleSelectItem = (itemId) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(itemId)
                ? prevSelected.filter(id => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    const handleOrderSelectedItems = () => {
        setSelectionDisabled(true);
        window.location.href = `/view-cart-page/${selectedItems.join(',')}`;
    };

    const handleCancelSelection = () => {
        setSelectMode(false);
        setSelectedItems([]);
        setSelectionDisabled(false);
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose} sx={{ minWidth: 300 }}>
            <List>
                <Button startIcon={<ClearIcon />} style={{ width: '100%' }} onClick={onClose}>
                    {/* Close */}
                </Button>
                {(cart && cart.cartItems && cart.cartItems.length > 0) &&
                <Button
                    style={{ width: '100%' }}
                    color="primary"
                    onClick={handleOrderOneItem}
                    disabled={selectionDisabled}
                >
                    Замовити окремо
                </Button>
                }
                {(cart && cartItems) && cartItems.map((item, index) => (

                    cart.cartItems[index] ? (
                        <Card key={cart.cartItems[index].id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CardMedia
                                component="img"
                                src={`https://localhost:8080/images/${item.id}/${item.id}_1.png`}
                                alt={item.name}
                                sx={{ width: 100, height: 100, flexShrink: 0, objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography variant="body1">{item.name}</Typography>
                                <Typography style={{ fontSize: 18 }} variant="body2" color="primary">
                                    {item.price * cart.cartItems[index].quantity}₴
                                </Typography>
                                <Typography style={{ fontSize: 18 }} variant="body2" color="primary">
                                    {item.clothingSizes.find(
                                        size => size.id === cart.cartItems[index].clothingSizeId).name}
                                </Typography>
                                <TextField
                                    type={'number'}
                                    variant={'standard'}
                                    onChange={(event) => {
                                        handleQuantityChange(event.target.value, cart.cartItems[index]);
                                    }}
                                    defaultValue={cart.cartItems[index].quantity}
                                    inputProps={{
                                        min: 1,
                                        max: 10
                                    }}
                                />
                                {selectMode && (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedItems.includes(cart.cartItems[index].id)}
                                                onChange={() => handleSelectItem(cart.cartItems[index].id)}
                                                disabled={selectionDisabled}
                                            />
                                        }
                                        label="Обрати"
                                    />
                                )}
                                {!selectMode && (
                                    <>
                                        <Button
                                            variant="text"
                                            color="error"
                                            onClick={() => handleDeleteItem(cart.cartItems[index].id)}
                                            startIcon={<DeleteIcon />}
                                        />
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ) : null
                ))}
            </List>
            {selectMode && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOrderSelectedItems}
                        disabled={selectionDisabled}
                    >
                        Замовити обране окремо
                    </Button>
                    <Button
                        startIcon={<ClearIcon />}
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancelSelection}
                        style={{ marginLeft: 10 }}
                    >
                    </Button>
                </div>
            )}
            {(cart && cartItems && cartItems.length > 0) &&
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <Button startIcon={<ClearIcon />} variant="outlined" onClick={handleClearCart}>
                        Видалити все
                    </Button>
                </div>
            }
            {(cart && cartItems && cartItems.length > 0) &&
                <div style={{ width: '100%', height: "100px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button style={{ width: '60%', height: "40px" }} variant={'contained'} onClick={() => window.location.href = `/view-cart-page/`}>Оглянути</Button>
                </div>
            }
        </Drawer>
    );
}

export default CartOverlay;
