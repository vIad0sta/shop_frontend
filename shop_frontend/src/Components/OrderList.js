import React, {useEffect, useState} from 'react';
import { Grid, Typography, Paper, CardContent } from '@mui/material';
import ProductRequests from "../Requests/ProductRequests";
import OrderRequests from "../Requests/OrderRequests";

function OrderList({ currentOrder }) {
    const [products,setProducts] = useState()

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const productsResponse = await OrderRequests.getOrderItems(currentOrder.id);
        setProducts(productsResponse);
    }

    if (!currentOrder || !currentOrder.orderItems) {
        return null;
    }



        return (
        <Grid container spacing={2} >
            {products && products.map((orderItem, index) => (
                <Grid item xs={products.length === 1 ? 12 : 6} key={index} sx={{ marginBottom: 2 }}>
                    <Paper elevation={3} sx={{ width: '100%', display: 'flex'}}>
                        <Grid container spacing={2} style={{ flex: 1, alignItems: 'center' }}>
                            <Grid item xs={4}>
                                <div style={{ margin: '0 auto' }}>
                                    <img
                                        src={`https://localhost:8080/images/${orderItem.id}/${orderItem.id}_1.png`}
                                        alt={orderItem.name}
                                        style={{ width: 250, height: 200, objectFit: 'cover',marginTop: 5 }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {orderItem.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Size: {currentOrder.orderItems.find(item => item.productId === orderItem.id).clothingSizeId}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: {orderItem.price}
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default OrderList;
