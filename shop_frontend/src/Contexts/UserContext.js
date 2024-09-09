import React, {createContext, useContext, useEffect, useState} from "react";
import RegisteredUserRequests from "../Requests/RegisteredUserRequests";
import {CartProvider} from "./CartContext";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await RegisteredUserRequests.getUser('me');
            setUser(response);
        } catch (e) {
            console.error(e.message);
            setUser(null);
        }
    };

    return user !== undefined ? (
            <UserContext.Provider value={{ user, setUser }}>
                <CartProvider>{children}</CartProvider>
            </UserContext.Provider>

    ) : (
        <div>Loading...</div>
    );
};

export const useUser = () => useContext(UserContext);