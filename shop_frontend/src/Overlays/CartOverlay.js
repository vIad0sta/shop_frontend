import React, {useState} from 'react';
import {Button, Drawer, List} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CartRequests from "../Requests/CartRequests";
import CartOverlayProduct from "../Components/CartOverlay/CartOverlayProduct";
import SelectModeButtons from "../Components/CartOverlay/SelectModeButtons";
import CartActions from "../Components/CartOverlay/CartActions";
import {useCart} from "../Contexts/CartContext";

function CartOverlay({isOpen, onClose}) {
    const {cart, cartItems, fetchCart, setCartItems} = useCart();
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectionDisabled, setSelectionDisabled] = useState(false);

    const handleClearCart = async () => {
        await CartRequests.clearCart(cart.id)
        setCartItems(null);
        fetchCart();
    };

    const handleOrderOneItem = () => {
        setSelectMode(true);
    };

    const handleSelectItem = (itemId) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(itemId)
                ? prevSelected.filter(id => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    const handleOrderSelectedItems = () => {
        setSelectionDisabled(true);
        window.location.href = `/view-cart-page/${selectedItems.join(',')}`;
    };

    const handleCancelSelection = () => {
        setSelectMode(false);
        setSelectedItems([]);
        setSelectionDisabled(false);
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose} sx={{minWidth: 300}}>
            <List>
                <Button startIcon={<ClearIcon/>} style={{width: '100%'}} onClick={onClose}>
                    {/* Close */}
                </Button>
                {(cart && cart.cartItems && cart.cartItems.length > 0) &&
                    <Button
                        style={{width: '100%'}}
                        color="primary"
                        onClick={handleOrderOneItem}
                        disabled={selectionDisabled}
                    >
                        Замовити окремо
                    </Button>
                }
                {(cart && cartItems) && cartItems.map((item, index) => (
                    cart.cartItems[index] ? (
                        <CartOverlayProduct index={index} product={item} handleSelectItem={handleSelectItem}
                                            selectedItems={selectedItems} selectionDisabled={selectionDisabled}
                                            selectMode={selectMode}/>
                    ) : null
                ))}
            </List>
            {selectMode &&
                <SelectModeButtons selectionDisabled={selectionDisabled} handleCancelSelection={handleCancelSelection}
                                   handleOrderSelectedItems={handleOrderSelectedItems}/>}
            {(cart && cartItems && cartItems.length > 0) && <CartActions handleClearCart={handleClearCart}/>}
        </Drawer>
    );
}

export default CartOverlay;
