'use client';
import { Charts } from '@/components/Charts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetAllItems } from '@/hooks/useGetAllItems';

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

    const { data: items = [], isLoading, error } = useGetAllItems();
    const [cachedItems, setCachedItems] = useState<ItemData[]>([]);

    useEffect(() => {
        // Load cached items from sessionStorage when component mounts
        const storedItems = sessionStorage.getItem('inventoryItems');
        if (storedItems) {
            setCachedItems(JSON.parse(storedItems));
        }

        // Store new items in sessionStorage when they're fetched
        if (items.length > 0 && !isLoading) {
            sessionStorage.setItem('inventoryItems', JSON.stringify(items));
            setCachedItems(items);
        }
    }, [items, isLoading]);

    // Use cached items or fetched items
    const displayItems =
        isLoading && cachedItems.length > 0 ? cachedItems : items;

    const uniqueCategories: string[] = Array.from(
        new Set(displayItems.map((item: ItemData) => item.category))
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

    // For top selling items
    const [cachedTopSellingItems, setCachedTopSellingItems] = useState<
        topSellingItem[]
    >([]);

    useEffect(() => {
        // Load cached top selling items from sessionStorage
        const storedTopItems = sessionStorage.getItem('topSellingItems');
        if (storedTopItems) {
            setCachedTopSellingItems(JSON.parse(storedTopItems));
        }

        // Store new top selling items in sessionStorage when fetched
        if (topSellingItems.length > 0 && !isLoadingTopSelling) {
            sessionStorage.setItem(
                'topSellingItems',
                JSON.stringify(topSellingItems)
            );
            setCachedTopSellingItems(topSellingItems);
        }
    }, [topSellingItems, isLoadingTopSelling]);

    // Use cached top selling items or fetched items
    const displayTopSellingItems =
        isLoadingTopSelling && cachedTopSellingItems.length > 0
            ? cachedTopSellingItems
            : topSellingItems;

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
                        {isLoading && cachedItems.length === 0 ? (
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
                                                {displayItems
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
                            {isLoadingTopSelling &&
                            cachedTopSellingItems.length === 0 ? (
                                <div className="text-center py-4">
                                    Loading...
                                </div>
                            ) : errorTopSelling ? (
                                <div className="text-center py-4 text-red-500">
                                    Error loading top selling items
                                </div>
                            ) : displayTopSellingItems.length === 0 ? (
                                <div className="text-center py-4 text-gray-400">
                                    No sales data available
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {displayTopSellingItems.map(
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
