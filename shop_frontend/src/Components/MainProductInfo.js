import React, { useState } from 'react';
import { CardContent, Chip, Grid, Rating, Typography, Button } from "@mui/material";
import CartRequests from "../Requests/CartRequests";
import ProductRequests from "../Requests/ProductRequests";

function MainProductInfo({ product }) {
    const [selectedSize, setSelectedSize] = useState(null);

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
    const handleAddToCart = async () => {
        await CartRequests.updateCartItems({
            id: Number(localStorage.getItem('cartId')),
            cartItem: {
                productId: product.id,
                clothingSizeId: selectedSize.id,
                quantity: 1,
                cartId: Number(localStorage.getItem('cartId'))
            }

        })
    }
    return (
        <Grid container spacing={2}>
            {/* Main Product Information */}
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
            {/* Additional Details */}
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
                        color="primary"
                        onClick={handleAddToCart}
                        style={{ marginTop: '20px' }}
                        disabled={!isSizeSelected()}
                    >
                        Add to Cart
                    </Button>
                </CardContent>
            </Grid>
        </Grid>
    );
}

export default MainProductInfo;
