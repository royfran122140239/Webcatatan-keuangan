import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import MonthlyChartMonitor from '../components/MonthlyChartMonitor';
import ChartMonitor from '../components/ChartMonitor';

const MockChart = ({ data, title }) => {
    if (!data || data.length === 0) {
        return <p className="text-text-on-dark">Tidak ada data untuk ditampilkan pada periode ini.</p>;
    }
    return (
        <div className="border border-accent-light-green p-4 rounded-md bg-primary-dark-green text-text-on-dark min-h-[200px]">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm">Chart akan ditampilkan di sini. Data:</p>
            <pre className="text-xs bg-primary-medium-green bg-opacity-20 p-2 rounded overflow-auto max-h-60">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

const MonitoringPage = () => {
    const { transactions, loadingData } = useData();
    const [viewMode, setViewMode] = useState('monthly');
    const [chartData, setChartData] = useState([]);
    const [currentPeriod, setCurrentPeriod] = useState(new Date());

    useEffect(() => {
        if (transactions.length > 0) {
            const relevantTransactions = transactions.filter(tx => {
                const txDate = new Date(tx.date);
                if (viewMode === 'monthly') {
                    return txDate.getFullYear() === currentPeriod.getFullYear() &&
                        txDate.getMonth() === currentPeriod.getMonth() &&
                        tx.type === 'expense';
                }
                if (viewMode === 'weekly') {
                    const startOfWeek = new Date(currentPeriod);
                    startOfWeek.setDate(currentPeriod.getDate() - currentPeriod.getDay());
                    const endOfWeek = new Date(startOfWeek);
                    endOfWeek.setDate(startOfWeek.getDate() + 6);
                    return txDate >= startOfWeek && txDate <= endOfWeek && tx.type === 'expense';
                }
                return false;
            });

            const aggregated = relevantTransactions.reduce((acc, tx) => {
                acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
                return acc;
            }, {});
            setChartData(Object.entries(aggregated).map(([name, value]) => ({ name, value })));
        } else {
            setChartData([]);
        }
    }, [transactions, viewMode, currentPeriod]);

    const changePeriod = (amount) => {
        setCurrentPeriod(prev => {
            const newDate = new Date(prev);
            if (viewMode === 'monthly') {
                newDate.setMonth(newDate.getMonth() + amount);
            } else {
                newDate.setDate(newDate.getDate() + (amount * 7));
            }
            return newDate;
        });
    };

    const getPeriodLabel = () => {
        if (viewMode === 'monthly') {
            return currentPeriod.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        }
        const startOfWeek = new Date(currentPeriod);
        startOfWeek.setDate(currentPeriod.getDate() - currentPeriod.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - ${endOfWeek.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}`;
    };

    if (loadingData) {
        return <div className="text-center p-10 text-text-on-dark">Memuat data monitoring...</div>;
    }

    return (
        <div className="space-y-6 text-text-on-dark">
            <h1 className="text-3xl font-bold text-accent-light-green">Monitor Pengeluaran</h1>

            <div className="bg-primary-dark-green p-6 rounded-lg shadow-md border border-primary-medium-green">
                <div className="flex flex-wrap gap-4 mb-6 items-center">
                    <Button
                        onClick={() => setViewMode('weekly')}
                        variant={viewMode === 'weekly' ? 'primary' : 'ghost'}
                    >
                        Mingguan
                    </Button>
                    <Button
                        onClick={() => setViewMode('monthly')}
                        variant={viewMode === 'monthly' ? 'primary' : 'ghost'}
                    >
                        Bulanan
                    </Button>
                    <div className="flex items-center gap-2 ml-auto">
                        <Button onClick={() => changePeriod(-1)} variant="ghost">&lt; Sebelumnya</Button>
                        <span className="font-medium text-accent-light-green w-48 text-center">{getPeriodLabel()}</span>
                        <Button onClick={() => changePeriod(1)} variant="ghost">Berikutnya &gt;</Button>
                    </div>
                </div>

                {/* Gunakan chart yang sesuai */}
                {viewMode === 'monthly' ? (
                    <MonthlyChartMonitor data={chartData} />
                ) : (
                    <ChartMonitor
                        data={chartData}
                        title={`Grafik Pengeluaran ${viewMode === 'weekly' ? 'Mingguan' : 'Bulanan'}`}
                    />
                )}

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Atur Batas Pengeluaran</h3>
                    <p className="text-sm text-accent-light-green">Fitur untuk mengatur batas pengeluaran mingguan/bulanan akan ada di sini.</p>
                    <Input
                        type="number"
                        placeholder="Masukkan batas (Rp)"
                        className="mt-2 max-w-xs text-black"
                    />
                </div>
            </div>
        </div>
    );
};

export default MonitoringPage;