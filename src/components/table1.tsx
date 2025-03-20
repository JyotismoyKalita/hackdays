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
interface StockItem {
    Item: string;
    CurrentStock: number;
    MaxStock: number;
    MinStock: number;
    Reorder: number;
}

interface AIStockLevels {
    [category: string]: StockItem[];
}

// Example data replaced with the actual structure from console log

export function TableDemo() {
    const { data: allData, isLoading, error } = useGetAll();

    const aiRecommendedStockLevels: AIStockLevels | undefined =
        allData?.get('aiStockLevels');

    if (isLoading) {
        return <div className="text-center py-4">Loading stock levels...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-4 text-red-500">
                Error loading data
            </div>
        );
    }

    if (!aiRecommendedStockLevels) {
        return <div className="text-center py-4">No stock data available</div>;
    }

    // Convert the object structure to an array format for rendering
    const categoryData = Object.entries(aiRecommendedStockLevels).map(
        ([category, items]) => ({
            category,
            items,
        })
    );

    return (
        <div className="border border-gray-300 rounded-lg overflow-y-scroll shadow-md max-w-6xl w-full mx-auto">
            <Table className="w-full border-collapse max-h-175 overflow-y-scroll">
                <TableCaption>AI Stock Levels</TableCaption>

                {/* Dark Table Header */}
                <TableHeader className="bg-gray-900 text-white">
                    <TableRow>
                        <TableHead className="text-white text-lg">
                            Items
                        </TableHead>
                        <TableHead className="text-white text-lg">
                            Current Stock
                        </TableHead>
                        <TableHead className="text-white text-lg">
                            Max Stock
                        </TableHead>
                        <TableHead className="text-white text-lg">
                            Min Stock
                        </TableHead>
                        <TableHead className="text-white text-lg">
                            Reorder
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body with Dark Category Headers */}
                <TableBody>
                    {categoryData.map((category, categoryIndex) => (
                        <React.Fragment key={categoryIndex}>
                            {/* Dark Category Row */}
                            <TableRow className="bg-gray-800">
                                <TableCell
                                    colSpan={5}
                                    className="font-bold text-xl py-3 text-teal-600"
                                >
                                    {category.category}
                                </TableCell>
                            </TableRow>

                            {/* Items in Category */}
                            {category.items.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className="border-t text-lg"
                                >
                                    <TableCell className="font-medium">
                                        • {item.Item}
                                    </TableCell>
                                    <TableCell>{item.CurrentStock}</TableCell>
                                    <TableCell>{item.MaxStock}</TableCell>
                                    <TableCell>{item.MinStock}</TableCell>
                                    <TableCell>{item.Reorder}</TableCell>
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
