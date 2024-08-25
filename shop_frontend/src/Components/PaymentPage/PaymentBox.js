import React from 'react';
import {Box, Button} from "@mui/material";

function PaymentBox({orderData, formData}) {
    return (
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
    );
}

export default PaymentBox;