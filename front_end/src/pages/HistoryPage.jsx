import React from 'react';
import { useData } from '../context/DataContext';
import TransactionItem from '../components/TransactionItem'; // Akan dibuat

const HistoryPage = () => {
    const { transactions, loadingData } = useData();

    if (loadingData) {
        return <div className="text-center p-10">Memuat riwayat transaksi...</div>;
    }

    // Urutkan transaksi berdasarkan tanggal terbaru
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Riwayat Transaksi</h1>
            {sortedTransactions.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <ul className="divide-y divide-gray-200">
                        {sortedTransactions.map(tx => (
                            <TransactionItem key={tx.id} transaction={tx} />
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500 bg-white p-6 rounded-lg shadow">Belum ada transaksi.</p>
            )}
        </div>
    );
};

export default HistoryPage;