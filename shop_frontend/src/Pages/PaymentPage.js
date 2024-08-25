import React, {useEffect, useState} from 'react';
import {Box, Container, Divider, List, Paper, Typography} from '@mui/material';
import OrderRequests from "../Requests/OrderRequests";
import {useParams} from "react-router-dom";
import PaymentRequests from "../Requests/PaymentRequests";
import CheckoutShortcut from "../Components/CheckoutPage/CheckoutShortcut";
import PaymentBox from "../Components/PaymentPage/PaymentBox";

function PaymentPage(props) {
    const {orderId} = useParams();
    const [orderData, setOrderData] = useState(null);
    const [productsFromOrder, setProductsFromOrder] = useState([]);
    const [formData, setFormData] = useState(null);

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

    const getProductFromOrder = (item) => {
        if (!item) return null;
        return productsFromOrder.find(
            productFromOrder => productFromOrder.id === item.productId);
    }

    return (
        <Container>
            {orderData && (
                <Box mb={3}>
                    <Paper elevation={3} sx={{padding: 2, marginBottom: 2}}>
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
                    <Paper elevation={3} sx={{padding: 2}}>
                        <List style={{width: '100%'}}>
                            {(orderData && productsFromOrder) &&
                                orderData.orderItems.map((item, index) => {
                                    const product = getProductFromOrder(item);
                                    if (!product) return null;
                                    return (
                                        <React.Fragment key={index}>
                                            <CheckoutShortcut
                                                item={product}
                                                size={product.clothingSizes.find(size => size.id === item.clothingSizeId).name}
                                                quantity={item.quantity}
                                            />
                                            {index < productsFromOrder.length - 1 && <Divider/>}
                                        </React.Fragment>
                                    );
                                })}
                        </List>
                    </Paper>
                </Box>
            )}
            {formData?.action && orderData &&
                <PaymentBox orderData={orderData} formData={formData}/>
            }
        </Container>
    );
}

export default PaymentPage;
