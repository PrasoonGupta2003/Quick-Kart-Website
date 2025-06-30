import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';

// Create context
export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    if (!serverUrl) return;
    try {
      const result = await axios.get(`${serverUrl}/api/user/getCurrentUser`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("✅ User data fetched:", result.data);
    } catch (error) {
      setUserData(null);
      console.error("❌ Failed to fetch user:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]); // Only call when serverUrl is ready

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
