'use client';
import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getAll } from '@/lib/getAll';
import { deleteItem } from '@/lib/items/delete';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

// Interface for AI recommendations data
interface AIRecommendations {
    [category: string]: string[];
}

// Interface for AI discontinuations data
interface DiscontinuationItem {
    Item: string;
    id: number;
}

interface AIDiscontinuations {
    [category: string]: DiscontinuationItem[];
}

export function TableDemo() {
    const {
        data: allData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['allData'],
        queryFn: async () => {
            const response = await getAll();
            return response;
        },
    });

    const queryClient = useQueryClient();

    // Mutation for deleting an item
    const allDataMutation = useMutation({
        mutationFn: async (itemId: number) => {
            await deleteItem(itemId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allData'] });
        },
        onError: (error) => {
            console.error('Error deleting item:', error);
        },
    });

    const aiRecommendations = allData?.get('aiRecommendations') as
        | AIRecommendations
        | undefined;

    const aiDiscontinuations = allData?.get('aiDiscontinuations') as
        | AIDiscontinuations
        | undefined;

    // Format recommendations for rendering
    const recommendationCategories = React.useMemo(() => {
        if (!aiRecommendations) return [];

        return Object.entries(aiRecommendations).map(([category, items]) => ({
            category,
            items,
        }));
    }, [aiRecommendations]);

    // Format discontinuations for rendering
    const discontinuationCategories = React.useMemo(() => {
        if (!aiDiscontinuations) return [];

        return Object.entries(aiDiscontinuations).map(([category, items]) => ({
            category,
            items,
        }));
    }, [aiDiscontinuations]);

    if (isLoading) {
        return (
            <div className="text-center p-6">Loading recommendations...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-6 text-red-500">
                Error loading recommendations
            </div>
        );
    }

    return (
        <div className="flex justify-between gap-6 max-w-6xl w-full mx-auto overflow-hidden">
            {/* Table 1 - AI Recommended Products */}
            <div className="border border-gray-300 rounded-xl overflow-y-scroll shadow-md w-1/2">
                <h2 className="text-2xl font-bold text-center my-4">
                    AI Recommended Products
                </h2>
                <Table className="w-full border-collapse">
                    <TableBody>
                        {recommendationCategories.length > 0 ? (
                            recommendationCategories.map((category) => (
                                <React.Fragment key={category.category}>
                                    <TableRow className="bg-gray-800">
                                        <TableCell
                                            colSpan={2}
                                            className="font-bold text-xl py-3 text-teal-600"
                                        >
                                            {category.category}
                                        </TableCell>
                                    </TableRow>

                                    {category.items.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            className="border-t text-lg"
                                        >
                                            <TableCell className="font-medium">
                                                • {item}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    className="text-center py-6"
                                >
                                    No recommendations available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Table 2 - AI Recommended Discontinuations */}
            <div className="border border-gray-300 rounded-xl overflow-y-scroll shadow-md w-1/2">
                <h2 className="text-2xl font-bold text-center my-4">
                    AI Recommended Discontinuations
                </h2>
                <Table className="w-full border-collapse">
                    <TableBody>
                        {discontinuationCategories.length > 0 ? (
                            discontinuationCategories.map((category) => (
                                <React.Fragment key={category.category}>
                                    <TableRow className="bg-gray-800">
                                        <TableCell
                                            colSpan={3}
                                            className="font-bold text-xl py-3 text-teal-600"
                                        >
                                            {category.category}
                                        </TableCell>
                                    </TableRow>

                                    {category.items.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            className="border-t text-lg"
                                        >
                                            <TableCell className="font-medium">
                                                • {item.Item}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    className="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition-all"
                                                    disabled={
                                                        allDataMutation.isPending
                                                    }
                                                    onClick={() => {
                                                        allDataMutation.mutate(
                                                            item.id
                                                        );
                                                    }}
                                                >
                                                    {allDataMutation.isPending
                                                        ? 'Deleting...'
                                                        : 'Delete'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    className="text-center py-6"
                                >
                                    No discontinuations available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default TableDemo;
