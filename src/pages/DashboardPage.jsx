import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import GoalCard from '../components/GoalCard';
import TransactionForm from '../components/TransactionForm';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const DashboardPage = () => {
    const { currentUser } = useAuth();
    const { savings, goals, addGoal, deleteGoal, loadingData, updateGoalAmount } = useData();

    const [showGoalForm, setShowGoalForm] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalTarget, setNewGoalTarget] = useState('');

    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [transactionType, setTransactionType] = useState('income');

    const handleAddGoalSubmit = async (e) => {
        e.preventDefault();
        if (newGoalName && newGoalTarget) {
            const success = await addGoal({
                name: newGoalName,
                targetAmount: parseFloat(newGoalTarget),
                currentAmount: 0
            });
            if (success) {
                setNewGoalName('');
                setNewGoalTarget('');
                setShowGoalForm(false);
            }
        }
    };

    const openTransactionForm = (type) => {
        setTransactionType(type);
        setShowTransactionForm(true);
    };

    if (loadingData) {
        return <div className="text-center p-10 text-text-on-dark">Memuat data dashboard...</div>;
    }

    return (
        <div className="space-y-8 text-violet-purple">
            <h1 className="text-4xl font-bold">
                Selamat datang di <span className="text-accent-light-green">CatatDuit</span>, {currentUser?.username}!
            </h1>

            {/* Profil & Tabungan */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary-dark-green p-6 rounded-lg shadow-lg border border-primary-medium-green">
                    <h2 className="text-2xl font-semibold text-accent-light-green mb-3">Profil Saya</h2>
                    <p>Nama Pengguna: <span className="font-medium">{currentUser?.username}</span></p>
                </div>
                <div className="bg-primary-dark-green p-6 rounded-lg shadow-lg border border-primary-medium-green">
                    <h2 className="text-2xl font-semibold text-accent-light-green mb-3">Total Tabungan Saat Ini</h2>
                    <p className={`text-4xl font-bold ${savings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        Rp {savings.toLocaleString('id-ID')}
                    </p>
                </div>
            </div>

            {/* Goal Tabungan */}
            <div className="bg-primary-dark-green p-6 rounded-lg shadow-lg border border-primary-medium-green">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-accent-light-green">Goal Tabungan Anda</h2>
                    {goals.length < 3 && !showGoalForm && (
                        <Button onClick={() => setShowGoalForm(true)} variant="primary">
                            + Tambah Goal
                        </Button>
                    )}
                </div>

                {showGoalForm && (
                    <form onSubmit={handleAddGoalSubmit} className="mb-6 p-4 border rounded-md bg-primary-medium-green bg-opacity-10 space-y-3">
                        <h3 className="text-lg font-medium text-text-on-dark">Goal Baru</h3>
                        <div>
                            <label htmlFor="goalName" className="block text-sm font-medium text-text-on-dark">Nama Goal</label>
                            <Input type="text" id="goalName" value={newGoalName} onChange={(e) => setNewGoalName(e.target.value)} placeholder="cth: Sepatu Baru" required />
                        </div>
                        <div>
                            <label htmlFor="goalTarget" className="block text-sm font-medium text-text-on-dark">Target (Rp)</label>
                            <Input type="number" id="goalTarget" value={newGoalTarget} onChange={(e) => setNewGoalTarget(e.target.value)} placeholder="cth: 200000" required />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" variant="success">Simpan Goal</Button>
                            <Button type="button" onClick={() => setShowGoalForm(false)} variant="ghost">Batal</Button>
                        </div>
                    </form>
                )}

                {goals.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {goals.map(goal => (
                            <GoalCard key={goal.id} goal={goal} onDelete={deleteGoal} onAddFunds={updateGoalAmount} />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-text-on-dark">{!showGoalForm && "Anda belum memiliki goal. Ayo buat satu!"}</p>
                )}
                {goals.length >= 3 && (
                    <p className="text-sm text-yellow-400 mt-4">Anda telah mencapai batas maksimum 3 goal.</p>
                )}
            </div>

            {/* Tambah Pemasukan/Pengeluaran */}
            <div className="bg-primary-dark-green p-6 rounded-lg shadow-lg border border-primary-medium-green">
                <h2 className="text-2xl font-semibold text-accent-light-green mb-4">Catat Transaksi</h2>
                {!showTransactionForm ? (
                    <div className="flex gap-4">
                        <Button onClick={() => openTransactionForm('income')} variant="success" className="flex-1">
                            + Tambah Pemasukan
                        </Button>
                        <Button onClick={() => openTransactionForm('expense')} variant="danger" className="flex-1">
                            - Tambah Pengeluaran
                        </Button>
                    </div>
                ) : (
                    <TransactionForm
                        type={transactionType}
                        onClose={() => setShowTransactionForm(false)}
                        goalsForIncome={goals.filter(g => g.currentAmount < g.targetAmount)}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;