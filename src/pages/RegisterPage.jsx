import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Kata sandi dan konfirmasi kata sandi tidak cocok.');
            return;
        }
        setError('');
        setLoading(true);
        const success = await register(username, password, email); // email opsional untuk mock api
        setLoading(false);
        if (success) {
            navigate('/');
        } else {
            // Pesan error akan dihandle oleh AuthContext (alert)
            // setError('Pendaftaran gagal. Coba lagi.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-emerald-500 mb-2">CatatDuit</h1>
                <p className="text-xl text-gray-700 text-center mb-8">Buat Akun Baru Anda</p>

                {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username_reg" className="block text-sm font-medium text-gray-700 mb-1">Nama Pengguna</label>
                        <Input
                            type="text"
                            id="username_reg"
                            placeholder="Pilih nama pengguna"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="email_reg" className="block text-sm font-medium text-gray-700 mb-1">Email (Opsional)</label>
                        <Input
                            type="email"
                            id="email_reg"
                            placeholder="Masukkan email Anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password_reg" className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
                        <Input
                            type="password"
                            id="password_reg"
                            placeholder="Minimal 6 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm_password_reg" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
                        <Input
                            type="password"
                            id="confirm_password_reg"
                            placeholder="Ulangi kata sandi"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" variant="success" className="w-full" disabled={loading}>
                        {loading ? 'Memproses...' : 'Daftar'}
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                        Login di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;