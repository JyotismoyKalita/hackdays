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

import { useGetAll } from '../hooks/useGetAll';

// Define interface for expiry tracking items
interface ExpiryTrackingItem {
    id: number;
    name: string;
    category: string;
    categoryId: number;
    manufacturingDate: string;
    expiryDate: string;
    hasExpiry: boolean;
    quantity: number;
    price: number;
    costPrice: number;
    userId: string;
    addedAt: string;
}

// Helper function to calculate days remaining until expiry
const calculateDaysRemaining = (expiryDateStr: string): number => {
    const expiryDate = new Date(expiryDateStr);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Helper function to format dates
const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString();
};

export function TableDemo() {
    const { data: allData, isLoading, error } = useGetAll();

    const expiryTracking =
        (allData?.get('expiryTracking') as ExpiryTrackingItem[]) || [];

    if (isLoading) {
        return <div className="text-center py-8">Loading data...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                Error loading data
            </div>
        );
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-y-scroll shadow-md max-w-6xl max-h-300 w-full mx-auto ">
            <Table className="w-full border-collapse">
                <TableCaption>Expiry Tracker Table</TableCaption>

                <TableHeader className="bg-gray-900 text-white">
                    <TableRow>
                        <TableHead className="text-white text-lg">
                            Items
                        </TableHead>
                        <TableHead className="text-white text-lg">
                            Category
                        </TableHead>
                        <TableHead className="text-white text-lg">
                            Manufacturing Date
                        </TableHead>
                        <TableHead className="text-white text-lg">
                            Expiry Date
                        </TableHead>
                        <TableHead className="text-white text-lg">
                            Will Expire in (days)
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {expiryTracking.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                                No items with expiry dates found
                            </TableCell>
                        </TableRow>
                    ) : (
                        expiryTracking.map((item) => {
                            const daysRemaining = calculateDaysRemaining(
                                item.expiryDate
                            );
                            return (
                                <TableRow
                                    key={item.id}
                                    className={`border-t text-lg ${
                                        daysRemaining <= 7
                                            ? 'bg-red-900 text-white'
                                            : daysRemaining <= 14
                                              ? 'bg-orange-100'
                                              : daysRemaining <= 30
                                                ? 'bg-yellow-50'
                                                : ''
                                    }`}
                                >
                                    <TableCell className="font-medium">
                                        • {item.name}
                                    </TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>
                                        {formatDate(item.manufacturingDate)}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.expiryDate)}
                                    </TableCell>
                                    <TableCell>{daysRemaining}</TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableDemo;
