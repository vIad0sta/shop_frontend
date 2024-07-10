import './App.css';
import React from "react";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import ProductPage from "./Pages/ProductPage";
import {CartProvider} from "./Contexts/CartContext";
import Checkout from "./Pages/Checkout";
import {UserProvider} from "./Contexts/UserContext";



function App() {
    return (
      <BrowserRouter>
          <UserProvider>
              <CartProvider>
                  <>
                      <NavBar/>
                      <div style={{paddingTop: 100}}>
                          <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/login" element={<Login />}/>
                              <Route path="/registration" element={<Registration />}/>
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/product/:id" element={<ProductPage />} />
                              <Route path="/checkout/:cartId" element={<Checkout/>} />




                              {/*<Route path="/profile" element={<Profile />} />*/}
                              {/*<Route path="/error" element={<ErrorPage />} />*/}
                              {/*<Route path="/events/:eventId" element={<EventPage cart={cart} cartTickets={tickets} setCart={setCart} setTickets={setTickets}/>} />*/}
                              {/*<Route path="/events/:eventId/tickets" element={<TicketsCreator />} />*/}
                              {/*<Route path="/companies/:companyId/event-creator" element={<EventCreator />} />*/}
                              {/*<Route path="/companies/:companyId" element={<CompanyPage />} />*/}
                              {/*<Route path="/users/:userId/company-creator" element={<CompanyCreator />} />*/}
                              {/*<Route path="/payments/confirmation/:cartId" cart={cart} cartTickets={tickets} setCart={setCart} setTickets={setTickets} element={<ConfirmationPage />} />*/}
                              {/*<Route path="/payments/buy-ticket/:cartId" element={<PaymentPage />} />*/}
                              {/*<Route path="/restore-password" element={<RestorePasswordPage />} />*/}
                              {/*<Route path="/restore-password/new-password" element={<CreateNewPasswordPage />} />*/}
                          </Routes>
                      </div>
                  </>
              </CartProvider>
          </UserProvider>
      </BrowserRouter>
  );
}

export default App;
