import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { fetchTransactions, addTransaction, fetchGoals, addGoal, deleteGoal as apiDeleteGoal, updateGoalAmount as apiUpdateGoalAmount } from '../services/api';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [savings, setSavings] = useState(0);
    const [loadingData, setLoadingData] = useState(false);

    const loadInitialData = useCallback(async () => {
        if (currentUser) {
            setLoadingData(true);
            const [userTransactions, userGoals] = await Promise.all([
                fetchTransactions(currentUser.id),
                fetchGoals(currentUser.id)
            ]);
            setTransactions(userTransactions || []);
            setGoals(userGoals || []);
            setLoadingData(false);
        } else {
            setTransactions([]);
            setGoals([]);
            setSavings(0);
        }
    }, [currentUser]);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    useEffect(() => {
        // Hitung total tabungan dari transaksi
        const totalIncome = transactions
            .filter(tx => tx.type === 'income')
            .reduce((acc, tx) => acc + tx.amount, 0);
        const totalExpense = transactions
            .filter(tx => tx.type === 'expense')
            .reduce((acc, tx) => acc + tx.amount, 0);
        setSavings(totalIncome - totalExpense);
    }, [transactions]);

    const handleAddTransaction = async (transactionData) => {
        if (!currentUser) return;
        const newTransaction = await addTransaction(currentUser.id, transactionData);
        if (newTransaction) {
            setTransactions(prev => [...prev, newTransaction]);
             // Jika ini pemasukan ke goal, update goal
            if (transactionData.type === 'income' && transactionData.goalId) {
                await handleUpdateGoalAmount(transactionData.goalId, transactionData.amount);
            }
        }
    };

    const handleAddGoal = async (goalData) => {
        if (!currentUser) return;
        const response = await addGoal(currentUser.id, goalData);
        if (response.success) {
            setGoals(prev => [...prev, response.goal]);
            return true;
        } else {
            alert(response.message);
            return false;
        }
    };

    const handleDeleteGoal = async (goalId) => {
        if (!currentUser) return;
        await apiDeleteGoal(currentUser.id, goalId);
        setGoals(prev => prev.filter(g => g.id !== goalId));
    };

    const handleUpdateGoalAmount = async (goalId, amount) => {
        if (!currentUser) return;
        const response = await apiUpdateGoalAmount(currentUser.id, goalId, amount);
        if (response.success) {
            setGoals(prevGoals => prevGoals.map(g => g.id === goalId ? response.goal : g));
        }
    };


    return (
        <DataContext.Provider value={{
            transactions,
            goals,
            savings,
            loadingData,
            addTransaction: handleAddTransaction,
            addGoal: handleAddGoal,
            deleteGoal: handleDeleteGoal,
            updateGoalAmount: handleUpdateGoalAmount,
            refreshData: loadInitialData // Untuk refresh manual jika perlu
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);