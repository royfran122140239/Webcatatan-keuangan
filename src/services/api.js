// src/services/api.js
// Mock data (biasanya ini datang dari database)
let mockUsers = [
    { id: 'user1', username: 'john_doe', password: 'password123', email: 'john@example.com' },
];

let mockTransactions = {
    'user1': [
        { id: 'tx1', userId: 'user1', amount: 5000000, type: 'income', category: 'Gaji', date: '2025-06-01', note: 'Gaji bulanan' },
        { id: 'tx2', userId: 'user1', amount: 50000, type: 'expense', category: 'Makan', date: '2025-06-02', note: 'Makan siang' },
        { id: 'tx3', userId: 'user1', amount: 20000, type: 'expense', category: 'Transportasi', date: '2025-06-02', note: 'Bensin' },
    ],
};

let mockGoals = {
    'user1': [
        { id: 'goal1', userId: 'user1', name: 'Sepatu Nike', targetAmount: 1200000, currentAmount: 300000, icon: 'shoe' },
        { id: 'goal2', userId: 'user1', name: 'Liburan Bali', targetAmount: 5000000, currentAmount: 1000000, icon: 'plane' },
    ],
};

let nextTxId = 4;
let nextGoalId = 3;

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiLogin = async (username, password) => {
    await delay(500);
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
        return { success: true, user: { id: user.id, username: user.username }, token: `fake-token-${user.id}` };
    }
    return { success: false, message: 'Nama pengguna atau kata sandi salah.' };
};

export const apiRegister = async (username, password, email) => {
    await delay(500);
    if (mockUsers.find(u => u.username === username)) {
        return { success: false, message: 'Nama pengguna sudah digunakan.' };
    }
    const newUser = { id: `user${mockUsers.length + 1}`, username, password, email };
    mockUsers.push(newUser);
    mockTransactions[newUser.id] = [];
    mockGoals[newUser.id] = [];
    return { success: true, user: { id: newUser.id, username: newUser.username }, token: `fake-token-${newUser.id}` };
};

export const fetchTransactions = async (userId) => {
    await delay(300);
    return mockTransactions[userId] || [];
};

export const addTransaction = async (userId, transaction) => {
    await delay(300);
    const newTransaction = { ...transaction, id: `tx${nextTxId++}`, userId };
    if (!mockTransactions[userId]) {
        mockTransactions[userId] = [];
    }
    mockTransactions[userId].push(newTransaction);
    return newTransaction;
};

export const fetchGoals = async (userId) => {
    await delay(300);
    return mockGoals[userId] || [];
};

export const addGoal = async (userId, goal) => {
    await delay(300);
    if (mockGoals[userId] && mockGoals[userId].length >= 3) {
        return { success: false, message: "Maksimum 3 goal tercapai." };
    }
    const newGoal = { ...goal, id: `goal${nextGoalId++}`, userId, currentAmount: goal.currentAmount || 0 };
     if (!mockGoals[userId]) {
        mockGoals[userId] = [];
    }
    mockGoals[userId].push(newGoal);
    return { success: true, goal: newGoal };
};

export const deleteGoal = async (userId, goalId) => {
    await delay(300);
    if (mockGoals[userId]) {
        mockGoals[userId] = mockGoals[userId].filter(g => g.id !== goalId);
    }
    return { success: true };
};

export const updateGoalAmount = async (userId, goalId, amount) => {
    await delay(200);
    const goal = mockGoals[userId]?.find(g => g.id === goalId);
    if (goal) {
        goal.currentAmount += amount; // Menambah atau mengurangi berdasarkan 'amount'
        if (goal.currentAmount < 0) goal.currentAmount = 0;
        if (goal.currentAmount > goal.targetAmount) goal.currentAmount = goal.targetAmount;
        return { success: true, goal };
    }
    return { success: false, message: "Goal tidak ditemukan" };
}