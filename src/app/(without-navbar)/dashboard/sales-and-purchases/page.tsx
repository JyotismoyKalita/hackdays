'use client';

import { useState, useEffect } from 'react';
// import { div } from '@/components/ui/div';
import { Table } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

interface Item {
    id: number;
    name: string;
    price: number;
    date: string;
    qty: number;
}

interface Category {
    id: number;
    name: string;
    items: Item[];
}

export default function SalesPurchases() {
    const [salesData, setSalesData] = useState<Category[]>([]);
    const [purchaseData, setPurchaseData] = useState<Category[]>([]);
    const [salesFromDate, setSalesFromDate] = useState('');
    const [salesToDate, setSalesToDate] = useState('');
    const [purchaseFromDate, setPurchaseFromDate] = useState('');
    const [purchaseToDate, setPurchaseToDate] = useState('');

    useEffect(() => {
        // Fetch data from backend (dummy data for now)
        setSalesData([
            {
                id: 1,
                name: 'Category 1',
                items: [
                    {
                        id: 1,
                        name: 'Item A',
                        price: 100,
                        date: '2025-03-18',
                        qty: 2,
                    },
                    {
                        id: 2,
                        name: 'Item B',
                        price: 150,
                        date: '2025-03-18',
                        qty: 1,
                    },
                ],
            },
            {
                id: 2,
                name: 'Category 2',
                items: [
                    {
                        id: 3,
                        name: 'Item C',
                        price: 200,
                        date: '2025-03-18',
                        qty: 3,
                    },
                    {
                        id: 4,
                        name: 'Item D',
                        price: 250,
                        date: '2025-03-18',
                        qty: 1,
                    },
                ],
            },
        ]);

        setPurchaseData([
            {
                id: 1,
                name: 'Category 1',
                items: [
                    {
                        id: 1,
                        name: 'Item X',
                        price: 80,
                        date: '2025-03-18',
                        qty: 5,
                    },
                    {
                        id: 2,
                        name: 'Item Y',
                        price: 120,
                        date: '2025-03-18',
                        qty: 3,
                    },
                ],
            },
            {
                id: 2,
                name: 'Category 2',
                items: [
                    {
                        id: 3,
                        name: 'Item Z',
                        price: 300,
                        date: '2025-03-18',
                        qty: 2,
                    },
                    {
                        id: 4,
                        name: 'Item W',
                        price: 350,
                        date: '2025-03-18',
                        qty: 4,
                    },
                ],
            },
        ]);
    }, []);

    const filterDataByDate = (
        data: Category[],
        fromDate: string,
        toDate: string
    ) => {
        return data.map((category) => ({
            ...category,
            items: category.items.filter(
                (item) =>
                    (!fromDate || item.date >= fromDate) &&
                    (!toDate || item.date <= toDate)
            ),
        }));
    };

    const filteredSalesData = filterDataByDate(
        salesData,
        salesFromDate,
        salesToDate
    );
    const filteredPurchaseData = filterDataByDate(
        purchaseData,
        purchaseFromDate,
        purchaseToDate
    );

    const totalSales = filteredSalesData.reduce(
        (sum, category) =>
            sum +
            category.items.reduce((s, item) => s + item.price * item.qty, 0),
        0
    );
    const totalPurchases = filteredPurchaseData.reduce(
        (sum, category) =>
            sum +
            category.items.reduce((s, item) => s + item.price * item.qty, 0),
        0
    );

    return (
        <div className="grid grid-cols-2 gap-6 p-6 max-h-175">
            {/* Sales Section */}
            <div className="p-4 max-h-175 overflow-y-scroll outline-2 rounded-2xl">
                <h2 className="text-xl font-bold mb-6  text-teal-600">Sales</h2>
                <div className="flex items-center gap-4 mb-6">
                    <span>From:</span>
                    <Input
                        className="w-36"
                        type="date"
                        value={salesFromDate}
                        onChange={(e) => setSalesFromDate(e.target.value)}
                    />
                    <span className="ml-auto">To:</span>
                    <Input
                        className="w-36"
                        type="date"
                        value={salesToDate}
                        onChange={(e) => setSalesToDate(e.target.value)}
                    />
                </div>
                {filteredSalesData.map((category) => (
                    <div key={category.id} className="mb-6">
                        <h3 className="font-semibold mb-2">{category.name}</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th className="border p-2">Item</th>
                                    <th className="border p-2">Price</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="border p-2">
                                            {item.name}
                                        </td>
                                        <td className="border p-2">
                                            ${item.price}
                                        </td>
                                        <td className="border p-2">
                                            {item.date}
                                        </td>
                                        <td className="border p-2">
                                            {item.qty}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ))}
            </div>

            {/* Purchases Section */}
            <div className="p-4 max-h-175 overflow-y-scroll outline-2 rounded-2xl">
                <h2 className="text-xl font-bold mb-6  text-teal-600">
                    Purchases
                </h2>
                <div className="flex items-center gap-4 mb-6">
                    <span>From:</span>
                    <Input
                        className="w-36"
                        type="date"
                        value={purchaseFromDate}
                        onChange={(e) => setPurchaseFromDate(e.target.value)}
                    />
                    <span className="ml-auto">To:</span>
                    <Input
                        className="w-36"
                        type="date"
                        value={purchaseToDate}
                        onChange={(e) => setPurchaseToDate(e.target.value)}
                    />
                </div>
                {filteredPurchaseData.map((category) => (
                    <div key={category.id} className="mb-6">
                        <h3 className="font-semibold mb-2">{category.name}</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th className="border p-2">Item</th>
                                    <th className="border p-2">Price</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Qty</th>
                                </tr>
                            </thead>

                            <tbody>
                                {category.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="border p-2">
                                            {item.name}
                                        </td>
                                        <td className="border p-2">
                                            ${item.price}
                                        </td>
                                        <td className="border p-2">
                                            {item.date}
                                        </td>
                                        <td className="border p-2">
                                            {item.qty}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ))}
            </div>
            <div className="col-span-2 flex justify-evenly gap-30 mt-6">
                <div className="p-4 font-bold">Total Sales: ${totalSales}</div>
                <div className="p-4 font-bold">
                    Total Purchases: ${totalPurchases}
                </div>
            </div>
        </div>
    );
}
