import React, { useState, useEffect } from 'react';
import { CardContent, Chip, Grid, Rating, Typography, Button } from "@mui/material";
import CartRequests from "../Requests/CartRequests";
import ProductRequests from "../Requests/ProductRequests";
import RegisteredUserRequests from "../Requests/RegisteredUserRequests";
import {useCart} from "../Contexts/CartContext";

function MainProductInfo({product}) {
    const [selectedSize, setSelectedSize] = useState(null);
    const { cart, fetchCart} = useCart();

    const calculateDiscountedPrice = () => {
        if (product && product.discount > 0) {
            const discountedPrice = product.price * (1 - product.discount);
            return discountedPrice.toFixed(2);
        }
        return null;
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const isSizeSelected = () => {
        return selectedSize !== null;
    };

    const isSizeInCart = () => {
        if(!cart || !selectedSize)
            return
        return cart.cartItems.some(item =>
            item.productId === product.id &&
            item.clothingSizeId === selectedSize.id
        );
    };


    const handleAddToCart = async () => {
        await CartRequests.addCartItem({
            productId: product.id,
            clothingSizeId: selectedSize.id,
            quantity: 1,
            cartId: cart.id
        });
        fetchCart()
    };

    const handleRemoveFromCart = async () => {
        let cartItemId = cart.cartItems.find(item => (item.clothingSizeId === selectedSize.id && item.productId === product.id)).id
        await CartRequests.deleteCartItem(cartItemId)
        fetchCart()
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>{product.name}</Typography>
                    <Rating
                        name="half-rating-read"
                        defaultValue={product.averageReviewMark || 0}
                        precision={0.1}
                        readOnly
                    />
                    <Typography variant="body1" color="textSecondary">Article: {product.article}</Typography>
                    <Typography variant="body1" color="textSecondary">Category: {product.category.label}</Typography>
                    <Typography variant="body1" color="textSecondary">Gender: {product.gender}</Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={6}>
                <CardContent>
                    {product.discount > 0 && (
                        <>
                            <Typography variant="h6" color="textSecondary" style={{ textDecoration: 'line-through' }}>
                                Original Price: ${product.price}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Discounted Price: ${calculateDiscountedPrice()}
                            </Typography>
                        </>
                    )}
                    {!product.discount && (
                        <Typography variant="h6" color="primary">Price: ${product.price}</Typography>
                    )}
                    <Typography variant="h6" gutterBottom>Clothing Sizes:</Typography>
                    <Grid container spacing={1}>
                        {product.clothingSizes.map((size) => (
                            <Grid item key={size.id}>
                                <Chip
                                    label={size.name}
                                    clickable
                                    onClick={() => handleSizeSelect(size)}
                                    color={selectedSize === size ? 'primary' : 'default'}
                                    variant={selectedSize === size ? 'outlined' : 'default'}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        variant="contained"
                        color={isSizeInCart() ? "secondary" : "primary"}
                        onClick={isSizeInCart() ? handleRemoveFromCart : handleAddToCart}
                        style={{ marginTop: '20px' }}
                        disabled={!isSizeSelected()}
                    >
                        {isSizeInCart() ? "Remove from Cart" : "Add to Cart"}
                    </Button>
                </CardContent>
            </Grid>
        </Grid>
    );
}

export default MainProductInfo;
