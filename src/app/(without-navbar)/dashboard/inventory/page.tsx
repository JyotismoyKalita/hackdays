'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userItems } from '@/lib/items/getAll';

// Define interface for new item data sent to API
interface NewItemData {
    name: string;
    category: string;
    quantity: number;
    price: number;
    costPrice: number;
    manufacturingDate: string;
    expiryDate: string;
    hasExpiry: boolean;
}

export default function Inventory() {
    const queryClient = useQueryClient();

    // Fetch items using React Query
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

    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        stock: '',
        price: '',
        costPrice: '',
    });
    const [hasExpiry, setHasExpiry] = useState(false);
    const [dates, setDates] = useState({ manufacturing: '', expiry: '' });

    // Use mutation for adding items with proper typing
    const addItemMutation = useMutation({
        mutationFn: (itemData: NewItemData) =>
            axios.post('/api/items/add', itemData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });

            // Clear the form
            setNewItem({
                name: '',
                category: '',
                stock: '',
                price: '',
                costPrice: '',
            });

            // Reset expiry dates if needed
            if (hasExpiry) {
                setDates({ manufacturing: '', expiry: '' });
                setHasExpiry(false);
            }
        },
        onError: (error) => {
            console.error('Failed to add item:', error);
            // You could add user feedback for errors here
        },
    });

    const addItem = async () => {
        if (newItem.name && newItem.category && newItem.stock) {
            const itemForApi: NewItemData = {
                name: newItem.name,
                category: newItem.category,
                quantity: parseInt(newItem.stock),
                price: parseFloat(newItem.price) || 0,
                costPrice: parseFloat(newItem.costPrice) || 0,
                manufacturingDate: hasExpiry ? dates.manufacturing : '',
                expiryDate: hasExpiry ? dates.expiry : '',
                hasExpiry: hasExpiry,
            };

            addItemMutation.mutate(itemForApi);
        }
    };

    // Use mutation for removing items
    const removeItemMutation = useMutation({
        mutationFn: (itemId: number) =>
            axios.delete(`/api/items/delete/${itemId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
        onError: (error) => {
            console.error('Failed to remove item:', error);
        },
    });

    const removeItem = (id: number) => {
        removeItemMutation.mutate(id);
    };

    // Use mutation for updating stock
    const updateStockMutation = useMutation({
        mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
            axios.patch(`/api/items/updateQuantity/${id}`, { quantity }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
        onError: (error) => {
            console.error('Failed to update stock:', error);
        },
    });

    const updateStock = (item: userItems, amount: number) => {
        const newQuantity = Math.max(0, item.quantity + amount);
        updateStockMutation.mutate({ id: item.id, quantity: newQuantity });
    };

    return (
        <div className="flex w-full h-full bg-black text-white p-4">
            <div className="w-full max-w-screen-xl p-6 shadow-lg bg-black-900 flex flex-col">
                <h2 className="text-3xl font-bold text-center mb-6 text-teal-600">
                    Inventory
                </h2>

                <div className="flex flex-col lg:flex-row gap-6 w-full">
                    {/* Items List */}
                    <div className="border p-6 rounded-lg bg-gray-800 flex-1 w-full h-full min-h-102.5 overflow-auto">
                        <h3 className="text-xl font-semibold mb-4">Items</h3>

                        {isLoading && <p>Loading inventory items...</p>}

                        {error && (
                            <p className="text-red-500">
                                Error loading items: {(error as Error).message}
                            </p>
                        )}

                        {!isLoading && !error && (
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-600">
                                            <th className="p-3 text-teal-600">
                                                Category
                                            </th>
                                            <th className="p-3">Item</th>
                                            <th className="p-3">Stock</th>
                                            <th className="p-3">Price</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="p-3 text-center"
                                                >
                                                    No items found
                                                </td>
                                            </tr>
                                        ) : (
                                            items.map((item: userItems) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-gray-700"
                                                >
                                                    <td className="p-3 text-teal-600">
                                                        {item.category}
                                                    </td>
                                                    <td className="p-3">
                                                        {item.name}
                                                    </td>
                                                    <td className="p-3">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="p-3">
                                                        {item.price.toFixed(2)}
                                                    </td>
                                                    <td className="p-3 flex gap-2">
                                                        <Input
                                                            type="number"
                                                            placeholder="Qty"
                                                            className="w-20 text-black"
                                                        />
                                                        <Button
                                                            onClick={() =>
                                                                updateStock(
                                                                    item,
                                                                    1
                                                                )
                                                            }
                                                            className="bg-blue-500 hover:bg-blue-600 w-24"
                                                        >
                                                            Restock
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                updateStock(
                                                                    item,
                                                                    -1
                                                                )
                                                            }
                                                            className="bg-yellow-500 hover:bg-yellow-600 w-24"
                                                        >
                                                            Sell
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                removeItem(
                                                                    item.id
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 w-24"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Add New Item Form */}
                    <div className="border p-6 rounded-lg bg-gray-800 flex-1 max-w-100 h-full">
                        <h3 className="text-xl font-semibold mb-4">
                            Entry of New Item
                        </h3>
                        <Input
                            type="text"
                            placeholder="Product Name"
                            value={newItem.name}
                            onChange={(e) =>
                                setNewItem({ ...newItem, name: e.target.value })
                            }
                            className="mt-3 w-full"
                        />
                        <Input
                            type="text"
                            placeholder="Category"
                            value={newItem.category}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    category: e.target.value,
                                })
                            }
                            className="mt-3 w-full"
                        />
                        <Input
                            type="text"
                            placeholder="Price"
                            value={newItem.price}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    price: e.target.value,
                                })
                            }
                            className="mt-3 w-full"
                        />
                        <Input
                            type="text"
                            placeholder="Cost Price"
                            value={newItem.costPrice}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    costPrice: e.target.value,
                                })
                            }
                            className="mt-3 w-full"
                        />
                        <Input
                            type="number"
                            placeholder="Stock Quantity"
                            value={newItem.stock}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    stock: e.target.value,
                                })
                            }
                            className="mt-3 w-full"
                        />
                        <div className="flex items-center mt-3">
                            <Checkbox
                                id="expiry-date"
                                onCheckedChange={(checked) =>
                                    setHasExpiry(!!checked)
                                }
                            />
                            <label
                                htmlFor="expiry-date"
                                className="ml-2 text-sm"
                            >
                                Has Expiry Date
                            </label>
                        </div>
                        {hasExpiry && (
                            <div className="mt-3">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <span className="w-16">From:</span>
                                        <Input
                                            type="date"
                                            value={dates.manufacturing}
                                            onChange={(e) =>
                                                setDates({
                                                    ...dates,
                                                    manufacturing:
                                                        e.target.value,
                                                })
                                            }
                                            className="flex-1"
                                            placeholder="Manufacturing Date"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="w-16">To:</span>
                                        <Input
                                            type="date"
                                            value={dates.expiry}
                                            onChange={(e) =>
                                                setDates({
                                                    ...dates,
                                                    expiry: e.target.value,
                                                })
                                            }
                                            className="flex-1"
                                            placeholder="Expiry Date"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <Button
                            onClick={addItem}
                            className="mt-5 w-full bg-green-500 hover:bg-green-600"
                            disabled={addItemMutation.isPending}
                        >
                            {addItemMutation.isPending
                                ? 'Adding...'
                                : 'Add Item'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
