import React, { useEffect, useState } from 'react';
import PaymentRequests from '../Requests/PaymentRequests';
import '../styles/payButton.css'

function TestComponent(props) {
    const [html, setHTML] = useState({ __html: "" });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await PaymentRequests.getPaymentButton({ orderId: 1, amount: 100, server_url: 'adwa', result_url: '123' });
            console.log(response);
            setHTML({ __html: response });
        } catch (error) {
            console.error('Error fetching data:', error);
            setHTML({ __html: "<p>Error loading payment button</p>" });
        }
    };


    return (
        <div dangerouslySetInnerHTML={html}></div>
    );
}

export default TestComponent;
