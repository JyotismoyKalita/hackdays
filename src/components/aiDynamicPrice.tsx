//for ai dynamic price
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
                demand: 'HIGH',
                willExpire: '3 days',
                currentPrice: 80,
                aiRecommendedPrice: 80,
            },
            {
                name: 'Item 2',
                demand: 'LOW',
                willExpire: '-',
                currentPrice: 30,
                aiRecommendedPrice: 25,
            },
            {
                name: 'Item 3',
                demand: 'LOW',
                willExpire: '1 day',
                currentPrice: 40,
                aiRecommendedPrice: 30,
            },
        ],
    },
    {
        category: 'Category 2',
        items: [
            {
                name: 'Item 1',
                demand: 'HIGH',
                willExpire: '3 days',
                currentPrice: 80,
                aiRecommendedPrice: 80,
            },
            {
                name: 'Item 2',
                demand: 'LOW',
                willExpire: '-',
                currentPrice: 30,
                aiRecommendedPrice: 25,
            },
            {
                name: 'Item 3',
                demand: 'LOW',
                willExpire: '1 day',
                currentPrice: 40,
                aiRecommendedPrice: 30,
            },
        ],
    },
];

export function TableDemo() {
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
                    {stockLevels.map((category) => (
                        <React.Fragment key={category.category}>
                            <TableRow className="bg-gray-800">
                                <TableCell
                                    colSpan={5}
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
                                        • {item.name}
                                    </TableCell>
                                    <TableCell>{item.demand}</TableCell>
                                    <TableCell>{item.willExpire}</TableCell>
                                    <TableCell>{item.currentPrice}</TableCell>
                                    <TableCell>
                                        {item.aiRecommendedPrice}
                                    </TableCell>
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
