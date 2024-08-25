import React, {useState} from 'react';
import {Button, Card, CardContent, CardMedia, Chip, Fade, Grid, Modal, Typography} from '@mui/material';
import CartRequests from "../Requests/CartRequests";
import {useCart} from "../Contexts/CartContext";

function BuyOverlay({product, open, handleClose}) {
    const [selectedSize, setSelectedSize] = useState(null);
    const {cart, fetchCart} = useCart();

    const isSizeInCart = selectedSize && cart?.cartItems?.some(item =>
        item.productId === product.id &&
        item.clothingSizeId === selectedSize.id
    );

    const handleSizeSelect = (size) => setSelectedSize(size);

    const handleCartAction = async () => {
        if (!selectedSize) return;

        try {
            if (isSizeInCart) {
                const cartItemId = cart.cartItems.find(item =>
                    item.productId === product.id &&
                    item.clothingSizeId === selectedSize.id
                ).id;
                await CartRequests.deleteCartItem(cartItemId);
            } else {
                await CartRequests.addCartItem({
                    productId: product.id,
                    clothingSizeId: selectedSize.id,
                    quantity: 1,
                    cartId: cart.id,
                });
            }
            fetchCart();
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleCloseOverlay = () => {
        setSelectedSize(null);
        handleClose();
    };

    if (!product) return null;

    const styles = {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        contentWrapper: {
            backgroundColor: 'white',
            padding: '20px',
        },
        card: {
            maxWidth: 400,
        },
        media: {
            height: 200,
        },
        button: {
            marginTop: '20px',
        },
    };

    return (
        <Modal
            style={styles.modal}
            open={open}
            onClose={handleCloseOverlay}
            closeAfterTransition
        >
            <Fade in={open}>
                <div style={styles.contentWrapper}>
                    <Card variant="outlined" style={styles.card}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={`https://localhost:8080/images/${product.id}/${product.id}_1.png`}
                            alt={product.name}
                            style={styles.media}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Ціна: {product.price - (product.price * product.discount)}₴
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Опис: {product.description}
                            </Typography>
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
                                color={isSizeInCart ? "secondary" : "primary"}
                                onClick={handleCartAction}
                                style={styles.button}
                                disabled={!selectedSize}
                            >
                                {isSizeInCart ? "Remove from Cart" : "Add to Cart"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </Fade>
        </Modal>
    );
}

export default BuyOverlay;
