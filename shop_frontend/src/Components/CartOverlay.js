import React, { useEffect, useState } from 'react';
import { Button, Drawer, List, ListItem, ListItemText, Card, CardMedia, Typography, CardContent } from "@mui/material";
import CartRequests from "../Requests/CartRequests";
import UserRequests from "../Requests/UserRequests";

function CartOverlay({ isOpen, onClose }) {
    const [cart, setCart] = useState();
    const [signedIn, setSignedIn] = useState(localStorage.getItem('signedIn') === 'true');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [isOpen]);

    const fetchData = async () => {
        if (!isOpen) return;

        const cartResponse = signedIn ?
            await UserRequests.getCart() :
            await CartRequests.getCartBySession();

        setCart(cartResponse);

        const cartItemsResponse = await CartRequests.getCartItems(cartResponse.id);
        setCartItems(cartItemsResponse);
        localStorage.setItem('cartId', cartResponse.id);
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <List>
                <Button style={{ width: '100%' }} onClick={onClose}>
                    <ListItemText primary="Close" />
                </Button>
                {cartItems && cartItems.map(item => (
                    <Card key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CardMedia
                            component="img"
                            src={`https://localhost:8080/images/${item.id}/${item.id}_1.png`} // Replace this with your image URL
                            alt={item.name}
                            sx={{ width: 100, height: 100, flexShrink: 0, objectFit: 'cover' }} // Adjust width and height as needed
                        />
                        <CardContent>
                            <Typography variant="body1">{item.name}</Typography>
                            <Typography variant="body2">{item.price}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Drawer>
    );
}

export default CartOverlay;
