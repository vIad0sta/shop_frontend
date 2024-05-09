import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

function ProductShortCut(props) {
    const handleBuyClick = (event) => {
        event.preventDefault();
        props.onOverlayOpen(props.product)
    };

    return (
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
            </CardContent>
            <Button sx={{ width: '100%' }} onClick={handleBuyClick}>
                Купити
            </Button>
        </Card>
    );
}

export default ProductShortCut;
