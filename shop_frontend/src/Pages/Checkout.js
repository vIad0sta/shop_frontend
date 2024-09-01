import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    List,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import {useCart} from "../Contexts/CartContext";
import CustomAutocomplete from "../Components/CheckoutPage/CustomAutocomplete";
import NPRequests from "../Requests/NPRequests";
import OrderRequests from "../Requests/OrderRequests";
import {useUser} from "../Contexts/UserContext";
import UnregisteredUserRequests from "../Requests/UnregisteredUserRequests";
import CheckoutShortcut from "../Components/CheckoutPage/CheckoutShortcut";
import {useParams} from "react-router-dom";

function Checkout() {
    const [selectedSettlement, setSelectedSettlement] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [settlements, setSettlements] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [guest, setGuest] = useState(null);
    const [selectedCartItems, setSelectedCartItems] = useState([]);
    const {cartItems, cart} = useCart();
    const {user, setUser} = useUser();
    const {idArray} = useParams();
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
        departmentRef: '',
    });
    const autoCompleteProps = {
        isOptionEqualToValue: (option, value) => option.ref === value.ref,
        getOptionLabel: (option) => option.description
    };

    useEffect(() => {
        if (!user) {
            fetchGuestData();
        } else {
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
                    cart.cartItems.find(product => product.id === parseInt(id))
                ]);
            });
        }
    }, [user, cart]);
    useEffect(() => {
        if (selectedSettlement) {
            fetchDepartments(selectedSettlement.ref)
        }
    }, [selectedSettlement]);
    useEffect(() => {
        if (selectedDepartment) {
            setCreator({...creator, departmentRef: selectedDepartment.ref});
            setShippingInfo({...shippingInfo, departmentRef: selectedDepartment.ref});
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
        if (!departments.length) return [];
        return departments.find(department => department.Description.contains(description));
    };
    const handleInputChange = (event, method, object) => {
        const {name, value} = event.target;
        method({...object, [name]: value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let response, body = shippingInfo;
        if (!user && !guest) {
            response = await UnregisteredUserRequests.createUser(creator);
            setUser(response);
            body = {...shippingInfo, creatorId: response.id}
        }
        const resp = idArray
            ? await OrderRequests.addSpecificOrder(body, idArray)
            : await OrderRequests.addOrder(body, cart.id)
        window.location.href = `/payment-page/${resp.id}`

    };
    const fetchSettlements = async (inputValue) => {
        const response = await NPRequests.getSettlements(inputValue);
        setSettlements(response);
        return response || [];
    };
    const fetchDepartments = async (inputValue) => {
        if (!inputValue) return;
        const options = await NPRequests.getDepartments(inputValue);
        setDepartments(options);
        return options || [];
    }
    const textFields = [
        {label: "Ім'я", variant: "standard", name: "name", type: "text", onChange: handleInputChange},
        {label: "Прізвище", variant: "standard", name: "surname", type: "text", onChange: handleInputChange},
        {label: "Електронна пошта", variant: "standard", name: "email", type: "email", onChange: handleInputChange},
        {label: "Телефон", variant: "standard", name: "phoneNumber", type: "text", onChange: handleInputChange}
    ];
    return (
        <Container maxWidth="xl">
            <h2>Ваші контактні дані</h2>
            <Box component="form">
                <Grid container spacing={2}>
                    {textFields.map((item, index) => (
                        <Grid item xs={12} sm={6}>
                            <TextField
                                key={index}
                                label={item.label}
                                name={item.name}
                                variant={item.variant}
                                type={item.type}
                                value={creator[item.name]}
                                fullWidth
                                onChange={item.onClick}
                                required
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <h2>Замовлення</h2>
            <List style={{width: '100%'}}>
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
                    <FormControlLabel value="PRE_PAYMENT" control={<Radio/>} label="Pre Payment 150 UAH"/>
                    <FormControlLabel value="FULL_PAYMENT" control={<Radio/>} label="Full Payment"/>
                </RadioGroup>
            </FormControl>
            <br></br>
            <Button variant={'contained'} onClick={handleSubmit}>Підтвердити</Button>
        </Container>
    );
}

export default Checkout;
