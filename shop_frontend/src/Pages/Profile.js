import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProfileInfo from "../Components/ProfileInfo";
import RegisteredUserRequests from "../Requests/RegisteredUserRequests";
import ProfileOrders from "../Components/ProfileOrders";


function Profile(props) {
    const [value, setValue] = useState('1')
    const [user, setUser] = useState(null)
    const [userOrders, setUserOrders] = useState([])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        const userData = await RegisteredUserRequests.getUser('me')
        setUser(userData)
        const ordersData = await RegisteredUserRequests.getOrders()
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
}

export default Profile;