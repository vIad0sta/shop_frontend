import React, {createContext, useContext, useEffect, useState} from "react";
import RegisteredUserRequests from "../Requests/RegisteredUserRequests";
import {CartProvider} from "./CartContext";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await RegisteredUserRequests.getUser('me');
            setUser(response);
        } catch (e) {
            console.error(e.message)
        }
    };

    return user !== null ? (
            <UserContext.Provider value={{ user, setUser }}>
                <CartProvider>{children}</CartProvider>
            </UserContext.Provider>

    ) : (
        <div>Loading...</div>
    );
};

export const useUser = () => useContext(UserContext);