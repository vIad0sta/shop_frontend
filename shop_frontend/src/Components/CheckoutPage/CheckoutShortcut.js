import React from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

function CheckoutShortcut({item, size,quantity}) {
    return (
        <Card key={item.id} sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                height="140"
                image={`https://localhost:8080/images/${item.id}/${item.id}_1.png`}
                alt={item.name}
                sx={{ width: 140, objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 1 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ flex: 1 }}>
                        {item.description}
                    </Typography>
                    <Typography gutterBottom variant="h5" color="primary" component="div">
                        {size}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Price: {quantity} * {item.price} = {quantity * item.price}₴
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}

export default CheckoutShortcut;