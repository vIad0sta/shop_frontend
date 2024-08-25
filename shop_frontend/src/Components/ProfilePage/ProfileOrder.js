import React from 'react';
import {Paper, Typography} from "@mui/material";

function ProfileOrder({order, toggleDrawer}) {
    return (
        <Paper key={order.id} elevation={3} style={{marginBottom: 20, padding: 20}}
               onClick={toggleDrawer(true, order)}>
            <Typography variant="h6">Order ID: {order.id}</Typography>
            <Typography variant="body1">Creation Date: {order.creationDate}</Typography>
            <Typography variant="body1">Delivery Date: {order.deliveryDate}</Typography>
            <Typography variant="body1">Price: {order.priceOrder}</Typography>
            <Typography variant="body1">Status: {order.orderStatus}</Typography>
        </Paper>
    );
}

export default ProfileOrder;