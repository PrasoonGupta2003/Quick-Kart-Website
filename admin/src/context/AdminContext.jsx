import React, { useContext, createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';

export const adminDataContext = createContext();

function AdminContext({ children }) {
    const [adminData, setAdminData] = useState(null);
    const { serverUrl } = useContext(authDataContext);

    const getAdmin = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/getAdmin`, {
                withCredentials: true,
            });
            setAdminData(result.data);
            console.log(result.data);
        } catch (e) {
            console.log(e);
            setAdminData(null);
        }
    };

    useEffect(() => {
        getAdmin();
    }, []);

    const value = {
        adminData,
        setAdminData,
        getAdmin,
    };

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    );
}

export default AdminContext;
