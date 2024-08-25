import React, {useState} from 'react';
import {Button, Drawer, Grid, Typography} from "@mui/material";
import OrderList from "./OrderList";
import ProfileOrder from "./ProfileOrder";

function ProfileOrders({userOrders}) {
    const [open, setOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null); // Initialize currentOrder state with null
    const toggleDrawer = (isOpen, order) => (event) => {
        if (order)
            setCurrentOrder(order)
        setOpen(isOpen)
    };
    return (
        <div>
            <Drawer
                anchor={'top'}
                open={open}
                onClose={toggleDrawer(false, null)}
            >
                <Button onClick={toggleDrawer(false, null)}>Close</Button>
                <OrderList currentOrder={currentOrder}/>

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
            <Grid container spacing={2}>
                {userOrders && userOrders.map((order) => (
                    <Grid item xs={12}>
                        <ProfileOrder toggleDrawer={toggleDrawer} order={order}/>
                    </Grid>
                ))}
            </Grid>
            {userOrders.length === 0 && (
                <Typography variant="body1">No orders available.</Typography>
            )}
        </div>
    );
}

export default ProfileOrders;
