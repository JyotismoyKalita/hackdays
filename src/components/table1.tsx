//ai stock level
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

const stockLevels = [
    {
        category: 'Category 1',
        items: [
            {
                name: 'Item 1',
                currentStock: 10,
                maxStock: 100,
                minStock: 40,
                reorder: 60,
            },
            {
                name: 'Item 2',
                currentStock: 10,
                maxStock: 100,
                minStock: 40,
                reorder: 60,
            },
            {
                name: 'Item 3',
                currentStock: 10,
                maxStock: 100,
                minStock: 40,
                reorder: 60,
            },
        ],
    },
    {
        category: 'Category 2',
        items: [
            {
                name: 'Item 1',
                currentStock: 10,
                maxStock: 100,
                minStock: 40,
                reorder: 60,
            },
            {
                name: 'Item 2',
                currentStock: 10,
                maxStock: 100,
                minStock: 40,
                reorder: 60,
            },
            {
                name: 'Item 3',
                currentStock: 10,
                maxStock: 100,
                minStock: 40,
                reorder: 60,
            },
        ],
    },
];

export function TableDemo() {
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
                    {stockLevels.map((category) => (
                        <React.Fragment key={category.category}>
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
                                        • {item.name}
                                    </TableCell>
                                    <TableCell>{item.currentStock}</TableCell>
                                    <TableCell>{item.maxStock}</TableCell>
                                    <TableCell>{item.minStock}</TableCell>
                                    <TableCell>{item.reorder}</TableCell>
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
