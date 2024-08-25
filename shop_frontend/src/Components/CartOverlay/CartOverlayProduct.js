import React from 'react';
import {Button, Card, CardContent, CardMedia, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import _ from "lodash";
import CartRequests from "../../Requests/CartRequests";
import {useCart} from "../../Contexts/CartContext";

function CartOverlayProduct({
                                index,
                                product,
                                selectMode,
                                handleSelectItem,
                                selectionDisabled,
                                selectedItems
                            }) {
    const {cart, fetchCart} = useCart();

    const debouncedHandleQuantityChange = _.debounce(async (quantity, cartItem) => {
        await CartRequests.updateCartItem(cartItem.cartId, {
            id: cartItem.id,
            quantity: Number(quantity),
        });
        fetchCart();
    }, 700);

    const handleQuantityChange = (quantity, cartItem) => {
        debouncedHandleQuantityChange(quantity, cartItem);
    };

    const handleDeleteItem = async (cartItemId) => {
        await CartRequests.deleteCartItem(cartItemId)
        fetchCart();
    };

    return (
        <Card key={cart.cartItems[index].id} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
            <CardMedia
                component="img"
                src={`https://localhost:8080/images/${product.id}/${product.id}_1.png`}
                alt={product.name}
                sx={{width: 100, height: 100, flexShrink: 0, objectFit: 'cover'}}
            />
            <CardContent>
                <Typography variant="body1">{product.name}</Typography>
                <Typography style={{fontSize: 18}} variant="body2" color="primary">
                    {product.price * cart.cartItems[index].quantity}₴
                </Typography>
                <Typography style={{fontSize: 18}} variant="body2" color="primary">
                    {product.clothingSizes.find(
                        size => size.id === cart.cartItems[index].clothingSizeId)?.name}
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
                            startIcon={<DeleteIcon/>}
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default CartOverlayProduct;