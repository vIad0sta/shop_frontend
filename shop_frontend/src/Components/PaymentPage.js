import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, List, Box, Paper, Divider } from '@mui/material';
import OrderRequests from "../Requests/OrderRequests";
import { useParams } from "react-router-dom";
import PaymentRequests from "../Requests/PaymentRequests";
import CheckoutShortcut from "./CheckoutShortcut";

function PaymentPage(props) {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [productsFromOrder, setProductsFromOrder] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (orderId) {
            fetchData();
        }
    }, [orderId]);

    const fetchData = async () => {
        try {
            const orderResp = await OrderRequests.getOrder(orderId);
            setOrderData(orderResp);

            const productsResp = await OrderRequests.getOrderItems(orderId);
            setProductsFromOrder(productsResp);

            const response = await PaymentRequests.getPaymentButton({
                orderId: orderId,
                amount: orderResp.priceOrder,
                server_url: 'adwa',
                result_url: 'https://localhost:3000/'
            });

            const formDetails = extractFormDetails(response);
            setFormData(formDetails);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const extractFormDetails = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const form = doc.querySelector('form');
        const dataInput = form.querySelector('input[name="data"]').value;
        const signatureInput = form.querySelector('input[name="signature"]').value;
        return {
            action: form.action,
            data: dataInput,
            signature: signatureInput
        };
    };

    return (
        <Container>
            {orderData && (
                <Box mb={3}>
                    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography>Order ID: {orderData.id}</Typography>
                        <Typography>Amount: {orderData.priceOrder}</Typography>
                    </Paper>
                </Box>
            )}
            {productsFromOrder.length > 0 && (
                <Box mb={3}>
                    <Typography variant="h5" component="h2">
                        Products
                    </Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <List style={{ width: '100%' }}>
                            {(orderData && productsFromOrder) &&
                                productsFromOrder.map((item, index) => {
                                    if (!item) return null; // Check if item is undefined
                                    const product = orderData.orderItems.find(
                                        productFromOrder => productFromOrder.productId === item.id);

                                    if (!product) return null; // Check if product is undefined

                                    return (
                                        <React.Fragment key={index}>
                                            <CheckoutShortcut
                                                item={item}
                                                size={item.clothingSizes.find(size => size.id === product.clothingSizeId).name}
                                                quantity={product.quantity}
                                            />
                                            {index < productsFromOrder.length - 1 && <Divider />}
                                        </React.Fragment>
                                    );
                                })}
                        </List>
                    </Paper>
                </Box>
            )}
            {formData.action && orderData && (
                <Box mt={5} display="flex" justifyContent="center">
                    <form action={formData.action} method="POST" acceptCharset="utf-8">
                        <input type="hidden" name="data" value={formData.data} />
                        <input type="hidden" name="signature" value={formData.signature} />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Pay Now {orderData.priceOrder} UAH
                        </Button>
                    </form>
                </Box>
            )}
        </Container>
    );
}

export default PaymentPage;
