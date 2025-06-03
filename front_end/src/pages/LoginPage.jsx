import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const success = await login(username, password);
            if (success) {
                navigate('/');
            } else {
                setError('Nama pengguna atau kata sandi salah.');
            }
        } catch (err) {
            setError('Terjadi kesalahan saat mencoba login. Silakan coba lagi.');
            console.error("Login error:", err); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 px-4 py-8 sm:py-0">
            <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
                <h1 className="text-5xl font-extrabold text-center text-emerald-600 mb-3 tracking-tight">CatatDuit</h1>
                <p className="text-lg text-gray-600 text-center mb-8">Kelola keuangan Anda dengan mudah!</p>
                
                {error && (
                    <p className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-6 text-sm flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Nama Pengguna</label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Masukkan nama pengguna Anda"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password_login" className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
                        <Input
                            type="password"
                            id="password_login"
                            name="password"
                            placeholder="Masukkan kata sandi Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center" 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Memproses...
                            </>
                        ) : 'Login'}
                    </Button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 transition duration-200">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;