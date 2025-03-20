'use client';
import { Charts } from '@/components/Charts';
import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
    useEffect(() => {
        axios.post('/api/user');
    }, []);

    interface ItemData {
        name: string;
        category: string;
        quantity: number;
        price: number;
        costPrice: number;
        manufacturingDate: string;
        expiryDate: string;
        hasExpiry: boolean;
    }

    interface topSellingItem {
        id: number;
        userId: string;
        itemId: number;
        name: string;
        category: string;
        topItemsSold: number;
    }

    const {
        data: items = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const response = await axios.get('/api/items/getAll');
            return response.data;
        },
    });

    const uniqueCategories: string[] = Array.from(
        new Set(items.map((item: ItemData) => item.category))
    );

    const {
        data: topSellingItems = [],
        isLoading: isLoadingTopSelling,
        error: errorTopSelling,
    } = useQuery({
        queryKey: ['topSellingItems'],
        queryFn: async () => {
            const response = await axios.get('/api/items/topselling');
            return response.data;
        },
    });

    return (
        <div className="flex flex-col h-screen p-4 bg-black">
            {/* Overview Header */}
            <header className="bg-black text-white p-4 border-b border-gray-700">
                <h2 className="text-3xl font-bold tracking-tight text-center  text-teal-600">
                    Overview
                </h2>
            </header>

            {/* Main Content */}
            <main className="dark flex flex-1 gap-4 mt-4">
                {/* Left Div */}
                <div className="flex-1 bg-black text-white  p-4 max-h-175 overflow-y-scroll outline-2 rounded-2xl">
                    <div className="mb-4 pb-2 border-b border-gray-700">
                        <h2 className="text-lg font-semibold text-white text-center">
                            Items
                        </h2>
                    </div>
                    <div className="w-full h-142 p-4 text-lg font-medium bg-black-900 ">
                        {isLoading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : error ? (
                            <div className="text-center py-4 text-red-500">
                                Error loading items
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {uniqueCategories.map((category) => (
                                    <div key={category}>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-semibold text-teal-600">
                                                {category}
                                            </h3>
                                        </div>
                                        <div>
                                            <ul className="space-y-2">
                                                {items
                                                    .filter(
                                                        (item: ItemData) =>
                                                            item.category ===
                                                            category
                                                    )
                                                    .map(
                                                        (
                                                            item: ItemData,
                                                            index: number
                                                        ) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                                                <span className="text-gray-200">
                                                                    {item.name}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex-1 bg-black text-white p-4 ">
                        <Charts />
                    </div>
                    <div className="flex-1 bg-black text-white p-4">
                        <div className="mb-4 pb-2 border-b border-gray-700">
                            <h2 className="text-lg font-semibold text-white text-center">
                                Top Selling Items
                            </h2>
                        </div>
                        <div className="w-full h-40 p-4 text-lg font-medium bg-black-900 rounded-md border border-gray-700 max-h-175 overflow-y-scroll">
                            {isLoadingTopSelling ? (
                                <div className="text-center py-4">
                                    Loading...
                                </div>
                            ) : errorTopSelling ? (
                                <div className="text-center py-4 text-red-500">
                                    Error loading top selling items
                                </div>
                            ) : topSellingItems.length === 0 ? (
                                <div className="text-center py-4 text-gray-400">
                                    No sales data available
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {topSellingItems.map(
                                        (
                                            item: topSellingItem,
                                            index: number
                                        ) => (
                                            <li
                                                key={index}
                                                className="flex items-center space-x-2"
                                            >
                                                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                                <span className="text-gray-200">
                                                    {item.name}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
