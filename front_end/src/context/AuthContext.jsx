import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiLogin, apiRegister } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        const response = await apiLogin(username, password);
        if (response.success) {
            setCurrentUser(response.user);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('authToken', response.token);
            setLoading(false);
            return true;
        }
        setLoading(false);
        alert(response.message);
        return false;
    };

    const register = async (username, password, email) => {
        setLoading(true);
        const response = await apiRegister(username, password, email);
        if (response.success) {
            setCurrentUser(response.user);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('authToken', response.token);
            setLoading(false);
            return true;
        }
        setLoading(false);
        alert(response.message);
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);