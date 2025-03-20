//for expiry tracker
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
        name: 'Item 1',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 1,
    },
    {
        name: 'Item 2',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 4,
    },
    {
        name: 'Item 3',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 7,
    },
    {
        name: 'Item 4',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 14,
    },
    {
        name: 'Item 5',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 60,
    },
    {
        name: 'Item 6',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 90,
    },
    {
        name: 'Item 7',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 90,
    },
    {
        name: 'Item 8',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 90,
    },
    {
        name: 'Item 9',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 90,
    },
    {
        name: 'Item 10',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 90,
    },
    {
        name: 'Item 11',
        category: 'Category',
        manufacturingDate: '35/45/34',
        expiryDate: '34/46/23',
        willExpireIn: 90,
    },

    //
];

export function TableDemo() {
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
                            Will Expire in
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {stockLevels.map((item, index) => (
                        <TableRow
                            key={index}
                            className={`border-t text-lg ${index < 3 ? 'bg-red-900 text-white' : ''}`}
                        >
                            <TableCell className="font-medium">
                                • {item.name}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.manufacturingDate}</TableCell>
                            <TableCell>{item.expiryDate}</TableCell>
                            <TableCell>{item.willExpireIn}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableDemo;
