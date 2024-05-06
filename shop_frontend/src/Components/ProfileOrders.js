import React, { useState } from 'react';
import {Box, Button, Drawer, Grid, Paper, Typography} from "@mui/material";
import OrderList from "./OrderList";

function ProfileOrders({ userOrders }) {
    const [open, setOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null); // Initialize currentOrder state with null
    const toggleDrawer = (isOpen,order) => (event) => {
        if(order)
            setCurrentOrder(order)
        setOpen(isOpen)
    };
    return (
        <div>
            <Drawer
                anchor={'top'}
                open={open}
                onClose={toggleDrawer(false,null)}
            >
                <Button onClick={toggleDrawer(false,null)}>Close</Button>
                <OrderList currentOrder={currentOrder} />

                {/*<Box*/}
                {/*    position="absolute"*/}
                {/*    bottom={0}*/}
                {/*    right={200}*/}
                {/*    p={0} // Padding for some space around the total*/}
                {/*    fontWeight="bold" // Making the total bold*/}
                {/*>*/}
                {/*    /!* Wrap total in Typography *!/*/}
                {/*    <Typography variant="body1" style={{ fontSize: '1.5rem' }}> /!* Adjust the font size *!/*/}
                {/*        Total: {currentOrder && currentOrder.priceOrder}*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
            </Drawer>
            {userOrders && userOrders.map((order) => (
                <Paper key={order.id} elevation={3} style={{ marginBottom: 20, padding: 20 }} onClick={toggleDrawer(true,order)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Order ID: {order.id}</Typography>
                            <Typography variant="body1">Creation Date: {order.creationDate}</Typography>
                            <Typography variant="body1">Delivery Date: {order.deliveryDate}</Typography>
                            <Typography variant="body1">Price: {order.priceOrder}</Typography>
                            <Typography variant="body1">Status: {order.orderStatus}</Typography>
                        </Grid>
                        {/* Additional fields can be added here */}
                    </Grid>
                </Paper>
            ))}
            {userOrders.length === 0 && (
                <Typography variant="body1">No orders available.</Typography>
            )}
        </div>
    );
}

export default ProfileOrders;
