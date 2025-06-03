import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Input from './common/Input';
import Button from './common/Button';

const TransactionForm = ({ type, onClose, goalsForIncome }) => {
    const { addTransaction } = useData();
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');
    const [selectedGoalId, setSelectedGoalId] = useState('');

    const KATEGORI_PENGELUARAN = ["Makan", "Transportasi", "Belanja", "Tagihan", "Hiburan", "Lainnya"];
    const KATEGORI_PEMASUKAN = ["Gaji", "Bonus", "Hadiah", "Investasi", "Lainnya"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !category || !date) {
            alert("Mohon isi jumlah, kategori, dan tanggal.");
            return;
        }

        const transactionData = {
            amount: parseFloat(amount),
            type,
            category,
            date,
            note,
            goalId: type === 'income' && selectedGoalId ? selectedGoalId : null,
        };

        await addTransaction(transactionData);
        
        setAmount('');
        setCategory('');
        setDate(new Date().toISOString().split('T')[0]);
        setNote('');
        setSelectedGoalId('');
        if (onClose) onClose();
    };

    const categories = type === 'expense' ? KATEGORI_PENGELUARAN : KATEGORI_PEMASUKAN;

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-md bg-gray-50 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
                Tambah {type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
            </h3>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Jumlah (Rp)</label>
                <Input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" required />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
                <select 
                    id="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow"
                >
                    <option value="" disabled>Pilih Kategori</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            {type === 'income' && goalsForIncome && goalsForIncome.length > 0 && (
                 <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Alokasikan ke Goal (Opsional)</label>
                    <select 
                        id="goal" 
                        value={selectedGoalId} 
                        onChange={(e) => setSelectedGoalId(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow"
                    >
                        <option value="">Tidak dialokasikan</option>
                        {goalsForIncome.map(goal => <option key={goal.id} value={goal.id}>{goal.name} (Target: Rp {goal.targetAmount.toLocaleString('id-ID')})</option>)}
                    </select>
                </div>
            )}
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tanggal</label>
                <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">Catatan (Opsional)</label>
                <Input type="text" id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="cth: Makan siang kantor" />
            </div>
            <div className="flex gap-2">
                <Button type="submit" variant={type === 'income' ? 'success' : 'danger'}>
                    Simpan {type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                </Button>
                {onClose && <Button type="button" onClick={onClose} variant="ghost">Batal</Button>}
            </div>
        </form>
    );
};

export default TransactionForm;