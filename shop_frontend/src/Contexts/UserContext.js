import React, {createContext, useContext, useEffect, useState} from "react";
import RegisteredUserRequests from "../Requests/RegisteredUserRequests";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try{
            const response = await RegisteredUserRequests.getUser('me');
            setUser(response);
        } catch (e) {
            console.error(e.message)
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);