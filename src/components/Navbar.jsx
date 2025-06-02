import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium
         hover:bg-primary-medium-green hover:text-white
         ${isActive ? 'bg-primary-medium-green text-white nav-active' : 'text-text-on-dark'}`;
       
    return (
        <nav className="bg-primary-dark-green text-text-on-dark shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        {/* Mengubah warna teks logo/nama aplikasi */}
                        <NavLink to="/" className="text-2xl font-bold text-accent-light-green">
                           CatatDuit
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className={navLinkClass} end>Dashboard</NavLink>
                            <NavLink to="/history" className={navLinkClass}>Riwayat</NavLink>
                            <NavLink to="/monitoring" className={navLinkClass}>Monitor</NavLink>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Mengubah warna teks 'Hi, {username}' */}
                            <span className="text-text-on-dark mr-3">Hi, {currentUser?.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    {/* Mobile menu button (implementasi opsional) */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;