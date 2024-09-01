import './App.css';
import React from "react";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import ProductPage from "./Pages/ProductPage";
import {CartProvider} from "./Contexts/CartContext";
import Checkout from "./Pages/Checkout";
import {UserProvider} from "./Contexts/UserContext";
import ViewCartPage from "./Pages/ViewCartPage";
import OrdersHistoryPage from "./Pages/OrdersHistoryPage";
import PaymentPage from "./Pages/PaymentPage";
import ProductCreator from "./Pages/ProductCreator";


function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <>
                    <NavBar/>
                    <div style={{paddingTop: 100}}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/registration" element={<Registration/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/product/:id" element={<ProductPage/>}/>
                            <Route path="/checkout" element={<Checkout/>}/>
                            <Route path="/checkout/:idArray" element={<Checkout/>}/>
                            <Route path="/view-cart-page" element={<ViewCartPage/>}/>
                            <Route path="/orders-history" element={<OrdersHistoryPage/>}/>
                            <Route path="/view-cart-page/:idArray" element={<ViewCartPage/>}/>
                            <Route path="/payment-page/:orderId" element={<PaymentPage/>}/>
                            <Route path="/product-creator" element={<ProductCreator/>}/>
                        </Routes>
                    </div>
                </>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;

