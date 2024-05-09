import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, Card, CardContent, CardMedia, Typography, Button, Chip, Grid } from '@mui/material';
import CartRequests from "../Requests/CartRequests";
import {plPL} from "@mui/material/locale";

function BuyOverlay(props) {
    const [selectedSize, setSelectedSize] = useState(null);

    const isSizeInCart = () => {
        if(!props.cart || !selectedSize)
            return

        return props.cart.cartItems.some(item =>
            item.productId === props.product.id &&
            item.clothingSizeId === selectedSize.id
        );
    };
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const isSizeSelected = () => {
        return selectedSize !== null;
    };

    const handleAddToCart = async () => {
        if(!props.product)
            return
        await CartRequests.addCartItem({
            productId: props.product.id,
            clothingSizeId: selectedSize.id,
            quantity: 1,
            cartId: Number(localStorage.getItem('cartId'))
        });
        props.fetchData()
    };

    const handleRemoveFromCart = async () => {
        let cartItemId = props.cart.cartItems.find(item => (item.clothingSizeId === selectedSize.id && item.productId === props.product.id)).id;
        await CartRequests.deleteCartItem(cartItemId);
        props.fetchData();
    };

    if (!props.product) {
        return null; // Don't render anything if product is null
    }

    return (
        <Modal
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
        >
            <Fade in={props.open}>
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '20px',
                    }}
                >
                    <Card variant="outlined">
                        <CardMedia
                            component="img"
                            height="200"
                            image={`https://localhost:8080/images/${props.product.id}/${props.product.id}_1.png`}
                            alt={props.product.name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {props.product.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Ціна: {props.product.price - (props.product.price * props.product.discount)}₴
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Опис: {props.product.description}
                            </Typography>
                            <Grid container spacing={1}>
                                {props.product.clothingSizes.map((size) => (
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
                    </Card>
                </div>
            </Fade>
        </Modal>
    );
}

export default BuyOverlay;
