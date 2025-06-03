import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import MonitoringPage from './pages/MonitoringPage';

const ProtectedRoute = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>; // Atau spinner
    }

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
    const { currentUser, loading } = useAuth();
     if (loading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    }
    return !currentUser ? <Outlet /> : <Navigate to="/" />;
}


function AppContent() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><p>Memuat aplikasi...</p></div>;
    }
    
    return (
        <div className="min-h-screen bg-gray-100">
            {currentUser && <Navbar />}
            <main className="container mx-auto p-4">
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                    
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/monitoring" element={<MonitoringPage />} />
                    </Route>
                    
                    {/* Fallback route jika tidak ada yang cocok */}
                    <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} />} />
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <DataProvider> {/* DataProvider membutuhkan AuthContext */}
                    <AppContent />
                </DataProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;