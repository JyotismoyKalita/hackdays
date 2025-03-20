'use client';
import React from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useGetAll } from './useGetAll';

// Define interfaces for the data structure
interface PriceItem {
    Item: string;
    Demand: string;
    willExpireIn: string;
    currentPrice: number;
    newPrice: number;
}

interface DynamicPriceData {
    [category: string]: PriceItem[];
}

// The hardcoded data can be removed as we'll use the API data

export function TableDemo() {
    const { data: allData, isLoading, error } = useGetAll();

    const dynamicPrice = allData?.get('dynamicPrice') as
        | DynamicPriceData
        | undefined;

    // Handle loading state
    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    // Handle error state
    if (error) {
        return (
            <div className="text-center py-4 text-red-500">
                Error loading data
            </div>
        );
    }

    // If no data is available
    if (!dynamicPrice) {
        return (
            <div className="text-center py-4">No pricing data available</div>
        );
    }

    // Get categories from the dynamicPrice object
    const categories = Object.keys(dynamicPrice);

    return (
        <div className="border border-gray-300 rounded-xl overflow-y-scroll shadow-md max-w-6xl w-full mx-auto">
            <Table className="w-full border-collapse">
                <TableCaption>AI Dynamic Pricing</TableCaption>

                <TableHeader className="bg-gray-900 text-white">
                    <TableRow>
                        <TableHead className="text-white text-xl">
                            Items
                        </TableHead>
                        <TableHead className="text-white text-xl">
                            Demand
                        </TableHead>
                        <TableHead className="text-white text-xl">
                            Will Expire In
                        </TableHead>
                        <TableHead className="text-white text-xl">
                            Current Price
                        </TableHead>
                        <TableHead className="text-white text-xl">
                            AI Recommended Price
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((category) => (
                        <React.Fragment key={category}>
                            <TableRow className="bg-gray-800">
                                <TableCell
                                    colSpan={5}
                                    className="font-bold text-xl py-3 text-teal-600"
                                >
                                    {category}
                                </TableCell>
                            </TableRow>
                            {dynamicPrice[category].map((item, index) => (
                                <TableRow
                                    key={index}
                                    className="border-t text-lg"
                                >
                                    <TableCell className="font-medium">
                                        • {item.Item}
                                    </TableCell>
                                    <TableCell>{item.Demand}</TableCell>
                                    <TableCell>{item.willExpireIn}</TableCell>
                                    <TableCell>{item.currentPrice}</TableCell>
                                    <TableCell>{item.newPrice}</TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableDemo;
