import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Typography, Avatar, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import ProfileInfo from "./ProfileInfo";
import ProductRequests from "../Requests/ProductRequests";
import CategoryRequests from "../Requests/CategoryRequests";
import UserRequests from "../Requests/UserRequests";
import ProfileOrders from "./ProfileOrders";


function Profile(props) {
    const [value, setValue] = useState('1')
    const [user, setUser] = useState()
    const [userOrders, setUserOrders] = useState()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        const userData = await UserRequests.getUser()
        setUser(userData)
        const ordersData = await UserRequests.getOrders()
        setUserOrders(ordersData)
    }

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Profile info" value="1" />
                    <Tab label="My orders" value="2" />
                    <Tab label="My discounts" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"><ProfileInfo user={user}/></TabPanel>
            <TabPanel value="2"><ProfileOrders userOrders={userOrders}/></TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
        </TabContext>

    );
};

export default Profile;