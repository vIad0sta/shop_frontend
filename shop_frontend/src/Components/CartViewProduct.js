import React from 'react';
import {Card, CardContent, CardMedia, IconButton, TextField, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";

function CartViewProduct({product,cart,handleRemoveProduct,handleQuantityChange}) {
    return (
        <>
            {product &&
                <Card sx={{ marginBottom: '20px' }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={`https://localhost:8080/images/${product.id}/${product.id}_1.png`} // Assuming image paths are structured
                        alt={product.name}
                    />
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="primary" sx={{ fontSize: '1.1rem' }}>
                                Price: ${product.price}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" color="text.secondary">
                                Quantity: {cart.cartItems.find(item => item.productId === product.id)?.quantity || 0}
                            </Typography>
                            <TextField
                                type="number"
                                variant="outlined"
                                size="small"
                                defaultValue={cart.cartItems.find(item => item.productId === product.id)?.quantity || 0}
                                inputProps={{ min: 1, max: 15 }}
                                onChange={(e) => handleQuantityChange(e.target.value, product.id)}
                            />
                            <IconButton aria-label="remove" size="big" onClick={() => handleRemoveProduct(product.id)}>
                                <Delete />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
            }
        </>
    );
}

export default CartViewProduct;