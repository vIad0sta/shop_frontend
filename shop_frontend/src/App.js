import './App.css';
import React from "react";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import ProductPage from "./Components/ProductPage";

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';



function App() {

  return (
      <>

      <BrowserRouter>
          <NavBar/>
          <div style={{paddingTop: 100}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/registration" element={<Registration />}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:id" element={<ProductPage />} />




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
      </BrowserRouter>

      </>
  );
}

export default App;
