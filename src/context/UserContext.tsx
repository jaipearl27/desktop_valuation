"use client";
import ApiInstance from '@/apiInstance/apiInstance';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState, ReactNode, FC } from 'react';

// Define the shape of the context state
interface UserContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    setUserData: (_: any) => void;
    userData: any
    loading: boolean
    refetchUserData: () => any
}

// Create a context with an initial undefined value
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the props for the provider component
interface UserProviderProps {
    children: ReactNode;
}

// Create a provider component
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getUserDetail = async (decoded: { id: string; }) => {
        try {
          const response = await ApiInstance.get("/user/" + decoded?.id);
          const user = response?.data?.user;
          setUserData(user);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
        finally {
          setLoading(false);
        }
      };
    
      const getUserId = () => {
        setLoading(true);

        const token = globalThis?.window?.localStorage.getItem("token");
        let decoded = { id: "" }
    
        if (token) {
          decoded = jwtDecode<any>(token)
          getUserDetail(decoded)
        } else {
          setUserData({});
        }
      };

      useEffect(() => {
        const tokenStr = globalThis?.window?.localStorage.getItem("token");
        setToken(tokenStr);
        getUserId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={{ token, setToken, userData, setUserData, loading, refetchUserData:getUserId }}>
            {children}
        </UserContext.Provider>
    );
};
