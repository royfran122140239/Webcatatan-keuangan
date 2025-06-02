import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const MonthlyChartMonitor = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-text-on-dark">Tidak ada data untuk ditampilkan.</p>;
    }

    return (
        <div className="bg-primary-dark-green p-4 rounded-md border border-accent-light-green text-text-on-dark">
            <h3 className="font-semibold mb-2">Grafik Pengeluaran Bulanan</h3>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f3f3f', borderColor: '#88f', color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MonthlyChartMonitor;