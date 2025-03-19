//for Airecomtable
import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button'; // Importing ShadCN Button

const stockLevels = [
    {
        category: 'Category 1',
        items: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
        category: 'Category 2',
        items: ['Item 1', 'Item 2', 'Item 3'],
    },
];

export function TableDemo() {
    return (
        <div className="flex justify-between gap-6 max-w-6xl w-full mx-auto">
            {/* Table 1 - AI Recommended Products */}
            <div className="border border-gray-300 rounded-xl overflow-hidden shadow-md w-1/2">
                <h2 className="text-2xl font-bold text-center my-4">
                    AI Recommended Products
                </h2>
                <Table className="w-full border-collapse">
                    <TableBody>
                        {stockLevels.map((category) => (
                            <React.Fragment key={category.category}>
                                <TableRow className="bg-gray-800 text-white">
                                    <TableCell
                                        colSpan={2}
                                        className="font-bold text-xl py-3"
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
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Table 2 - AI Recommended Discontinuations */}
            <div className="border border-gray-300 rounded-xl overflow-hidden shadow-md w-1/2">
                <h2 className="text-2xl font-bold text-center my-4">
                    AI Recommended Discontinuations
                </h2>
                <Table className="w-full border-collapse">
                    <TableBody>
                        {stockLevels.map((category) => (
                            <React.Fragment key={category.category}>
                                <TableRow className="bg-gray-800 text-white">
                                    <TableCell
                                        colSpan={3}
                                        className="font-bold text-xl py-3"
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
                                        <TableCell className="text-right">
                                            <Button className="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition-all">
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default TableDemo;
