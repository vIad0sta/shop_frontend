import React from 'react';
import {Button} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function CartActions({handleClearCart}) {
    return (
        <>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <Button startIcon={<ClearIcon/>} variant="outlined" onClick={handleClearCart}>
                    Видалити все
                </Button>
            </div>
            <div style={{
                width: '100%',
                height: "100px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button style={{width: '60%', height: "40px"}} variant={'contained'}
                        onClick={() => window.location.href = `/view-cart-page/`}>Оглянути</Button>
            </div>
        </>
    );
}

export default CartActions;