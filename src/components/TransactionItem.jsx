import React from 'react';

const TransactionItem = ({ transaction }) => {
    const { type, amount, category, date, note } = transaction;
    const amountColor = type === 'income' ? 'text-green-600' : 'text-red-600';
    const amountPrefix = type === 'income' ? '+' : '-';

    // Format tanggal ke dd/mm/yyyy
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <li className="py-4 flex justify-between items-center">
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {category} {note && <span className="text-xs text-gray-500">({note})</span>}
                </p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            <div className={`text-sm font-semibold ${amountColor} ml-4`}>
                {amountPrefix} Rp {amount.toLocaleString('id-ID')}
            </div>
        </li>
    );
};

export default TransactionItem;