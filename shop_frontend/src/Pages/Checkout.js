import React, {useEffect, useState} from 'react';
import {
    TextField,
    Container,
    List,
    CardContent,
    CardMedia,
    Card,
    Typography,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    Box,
} from '@mui/material';
import {useCart} from "../Contexts/CartContext";
import CustomAutocomplete from "../Components/CustomAutocomplete";
import NPRequests from "../Requests/NPRequests";
import OrderRequests from "../Requests/OrderRequests";
import {useUser} from "../Contexts/UserContext";
import RegisteredUserRequests from "../Requests/RegisteredUserRequests";
import UnregisteredUserRequests from "../Requests/UnregisteredUserRequests";
import CheckoutShortcut from "../Components/CheckoutShortcut";
import {useParams} from "react-router-dom";
import CartViewProduct from "../Components/CartViewProduct";

function Checkout() {
    const [selectedSettlement, setSelectedSettlement] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [settlements, setSettlements] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [guest, setGuest] = useState(null);
    const { cartItems, cart } = useCart();
    const { user, setUser } = useUser();
    const { idArray } = useParams();
    const [selectedCartItems, setSelectedCartItems] = useState([])

    const [creator, setCreator] = useState({
        name: '',
        surname: '',
        email: '',
        departmentRef: '',
        phoneNumber: '',
    });
    const [shippingInfo, setShippingInfo] = useState({
        creatorId: '',
        cartId: '',
        orderStatus: 'CONFIRMED',
        payOption: '',
    });
    const autoCompleteProps = {
        isOptionEqualToValue: (option, value) => option.Ref === value.Ref,
        getOptionLabel: (option) => option.Description
    };

    useEffect(() => {
        let i
        if(!user){
            fetchGuestData();
        }
        else{
            setShippingInfo({...shippingInfo, creatorId: user.id});
            setCreator({
                name: user.name,
                surname: user.surname,
                email: user.email,
                departmentRef: user.departmentRef,
                phoneNumber: user.phoneNumber,
            })
        }
        if (cart?.cartItems && idArray && selectedCartItems.length === 0) {
            const ids = idArray.split(',');
            ids.map(id => {
                setSelectedCartItems(prevItems => [
                    ...prevItems,
                    cart.cartItems.find(product => product.id == id)
                ]);
            });
        }
    }, [user,cart]);
    useEffect(() => {
        if(selectedSettlement){
            fetchDepartments(selectedSettlement.Ref)
        }
    }, [selectedSettlement]);
    useEffect(() => {
        if(selectedDepartment){
            setCreator({ ...creator, departmentRef: selectedDepartment.Ref });
        }
    }, [selectedDepartment]);

    const fetchGuestData = async () => {
        const response = await UnregisteredUserRequests.getUser('me');
        setGuest(response);
        setCreator({
            name: response.name,
            surname: response.surname,
            email: response.email,
            departmentRef: response.departmentRef,
            phoneNumber: response.phoneNumber,
        })
        setShippingInfo({...shippingInfo, creatorId: response.id})
    }
    const findDepartmentByDescription = (description) => {
        if(!departments.length) return [];
        return departments.find(department => department.Description.contains(description));
    };
    const handleInputChange = (event, method, object) => {
        const { name, value } = event.target;
        method({ ...object, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let response, body = shippingInfo;
        if(!user && !guest){
            response = await UnregisteredUserRequests.createUser(creator);
            setUser(response);
            body = { ...shippingInfo, creatorId: response.id }
        }
        const resp = idArray
            ? await OrderRequests.addSpecificOrder(body, idArray)
            : await OrderRequests.addOrder(body, cart.id)
        window.location.href = `/payment-page/${resp.id}`

    };
    const fetchSettlements = async (inputValue) => {
        const response = await NPRequests.getSettlements(inputValue);
        setSettlements(response.settlements);
        return response.settlements || [];
    };
    const fetchDepartments = async (inputValue) => {
        if(!inputValue) return;
        const options = await NPRequests.getDepartments(inputValue);
        setDepartments(options.departments);
        return options.departments || [];
    }
    return (
        <Container maxWidth="xl">
            <h2>Ваші контактні дані</h2>
            <Box component="form">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Ім'я"
                            name="name"
                            value={creator.name}
                            onChange={(event) => {
                                handleInputChange(event, setCreator, creator);
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Прізвище"
                            name="surname"
                            value={creator.surname}
                            onChange={(event) => {
                                handleInputChange(event, setCreator, creator);
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Електронна пошта"
                            type="email"
                            name="email"
                            value={creator.email}
                            onChange={(event) => {
                                handleInputChange(event, setCreator, creator);
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Телефон"
                            name="phoneNumber"
                            value={creator.phoneNumber}
                            onChange={(event) => {
                                handleInputChange(event, setCreator, creator);
                            }}
                            required
                        />
                    </Grid>
                </Grid>
            </Box>
            <h2>Замовлення</h2>
            <List style={{ width: '100%' }}>
                {(cart?.cartItems && cartItems) &&
                    (!idArray ? cart.cartItems : selectedCartItems).map((item) => {
                        if (!item) return null; // Check if item is undefined
                        const product = cartItems.find(productFromCart => productFromCart.id === item.productId);
                        if (!product) return null; // Check if product is undefined

                        return (
                            <CheckoutShortcut
                                item={product}
                                size={product.clothingSizes.find(size => size.id === item.clothingSizeId).name}
                                cart={cart}
                                quantity={item.quantity}
                            />

                        );
                    })}
            </List>
            <h2>Доставка</h2>
            <CustomAutocomplete
                label="Місто/Село"
                placeholder="Почніть вводити..."
                fetchOptions={fetchSettlements}
                setSelectedOption={setSelectedSettlement}
                {...autoCompleteProps}
            />

            <CustomAutocomplete
                label="Відділення"
                placeholder="Почніть вводити..."
                fetchOptions={findDepartmentByDescription}
                staticOptions={departments}
                setSelectedOption={setSelectedDepartment}
                disabled={!selectedSettlement}
                {...autoCompleteProps}
            />
            <h2>Оплата</h2>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="payment"
                    name="payOption"
                    value={shippingInfo.payOption}
                    onChange={(event) => {
                        handleInputChange(event, setShippingInfo, shippingInfo);
                    }}
                >
                    <FormControlLabel value="PRE_PAYMENT" control={<Radio />} label="Pre Payment 150 UAH" />
                    <FormControlLabel value="FULL_PAYMENT" control={<Radio />} label="Full Payment" />
                </RadioGroup>
            </FormControl>
            <br></br>
            <Button variant={'contained'} onClick={handleSubmit}>Підтвердити</Button>
        </Container>
    );
}

export default Checkout;
