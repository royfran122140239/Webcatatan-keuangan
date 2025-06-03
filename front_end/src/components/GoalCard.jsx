import React from 'react';
import Button from './common/Button';

const getIcon = (iconName) => {
    if (iconName === 'shoe') return '👟';
    if (iconName === 'plane') return '✈️';
    if (iconName === 'gadget') return '📱';
    return '🎯';
};

const GoalCard = ({ goal, onDelete, onAddFunds }) => {
    const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;

    const handleAddFundsToGoal = () => {
        const amount = prompt(`Masukkan jumlah yang ingin ditambahkan ke goal "${goal.name}":`);
        if (amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0) {
            onAddFunds(goal.id, parseFloat(amount));
        } else if (amount !== null) { 
            alert("Jumlah tidak valid.");
        }
    };


    return (
        <div className="border p-4 rounded-lg shadow-md bg-slate-50 space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        {getIcon(goal.icon)} {goal.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Target: Rp {goal.targetAmount.toLocaleString('id-ID')}
                    </p>
                </div>
                <Button onClick={() => onDelete(goal.id)} variant="ghost" className="text-red-500 hover:text-red-700 p-1 text-xs">
                    Hapus
                </Button>
            </div>

            <div>
                <p className="text-lg font-medium text-green-600">
                    Terkumpul: Rp {goal.currentAmount.toLocaleString('id-ID')}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{progress.toFixed(1)}% tercapai</p>
            </div>
             {/* Tombol untuk menambah dana ke goal ini melalui transaksi baru (akan menjadi 'pemasukan' yang dialokasikan ke goal) */}
            {/* Fitur ini belum sepenuhnya terintegrasi dengan TransactionForm, tapi bisa dihandle di DataContext */}
            {goal.currentAmount < goal.targetAmount && (
                 <Button onClick={handleAddFundsToGoal} variant="primary" className="w-full text-xs py-1">
                    + Tambah Dana ke Goal Ini
                </Button>
            )}
        </div>
    );
};

export default GoalCard;