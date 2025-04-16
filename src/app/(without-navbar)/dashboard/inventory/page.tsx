'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userItems } from '@/lib/items/getAll';
import { useGetAllItems } from '@/hooks/useGetAllItems';

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

    const [selectItems, setSelectItems] = useState<userItems[]>([]);

    // Fetch items using React Query
    const { data: fetchedItems = [], isLoading, error } = useGetAllItems();

    // Use cached items from sessionStorage when loading
    const [cachedItems, setCachedItems] = useState<userItems[]>(() => {
        if (typeof window !== 'undefined') {
            const storedItems = sessionStorage.getItem('inventoryItems');
            return storedItems ? JSON.parse(storedItems) : [];
        }
        return [];
    });

    // Use cached items when loading, otherwise use fetched items
    const items = isLoading ? cachedItems : fetchedItems;

    // Store items in sessionStorage when they change
    useEffect(() => {
        if (!isLoading && fetchedItems.length > 0) {
            sessionStorage.setItem(
                'inventoryItems',
                JSON.stringify(fetchedItems)
            );
            setCachedItems(fetchedItems);
        }
    }, [fetchedItems, isLoading]);

    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        stock: '',
        price: '',
        costPrice: '',
    });

    // New state for tracking quantity changes per item
    const [stockAmounts, setStockAmounts] = useState<{ [id: number]: string }>(
        {}
    );

    const [hasExpiry, setHasExpiry] = useState(false);
    const [dates, setDates] = useState({ manufacturing: '', expiry: '' });
    const [batchQty, setBatchQty] = useState(0);

    // Use mutation for adding items with proper typing
    const addItemMutation = useMutation({
        mutationFn: (itemData: NewItemData) =>
            axios.post('/api/items/add', itemData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });

            // Clear the form completely
            setNewItem({
                name: '',
                category: '',
                stock: '',
                price: '',
                costPrice: '',
            });

            // Reset expiry related states
            setDates({ manufacturing: '', expiry: '' });
            setHasExpiry(false);

            // Reset batch quantity
            setBatchQty(0);
        },
        onMutate: async (itemData) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['items'] });

            // Snapshot the previous value
            const previousItems = queryClient.getQueryData(['items']);

            // Optimistically update to the new value
            queryClient.setQueryData(['items'], (old: userItems[] = []) => {
                return [
                    ...old,
                    {
                        ...itemData,
                        id: Date.now(), // Temporary ID until server response
                    },
                ];
            });

            // Return a context object with the snapshotted value
            return { previousItems };
        },
        onError: (error, variables, context) => {
            if (context?.previousItems) {
                queryClient.setQueryData(['items'], context.previousItems);
            }
            console.error('Failed to add item:', error);
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

            // Reset form state immediately for better user feedback
            setNewItem({
                name: '',
                category: '',
                stock: '',
                price: '',
                costPrice: '',
            });
            setDates({ manufacturing: '', expiry: '' });
            setHasExpiry(false);
        }
    };

    // Use mutation for removing items with item ID tracking
    const removeItemMutation = useMutation({
        mutationFn: (itemId: number) =>
            axios.get(`/api/items/delete?item=${itemId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
        onMutate: async (itemId) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['items'] });

            // Snapshot the previous value
            const previousItems = queryClient.getQueryData(['items']);

            // Optimistically update to the new value
            queryClient.setQueryData(['items'], (old: userItems[] = []) => {
                return old.filter((item) => item.id !== itemId);
            });

            // Return a context object with the snapshotted value
            return { previousItems };
        },
        onError: (error, variables, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousItems) {
                queryClient.setQueryData(['items'], context.previousItems);
            }
            console.error('Failed to remove item:', error);
        },
    });

    // Track which item is being removed
    const [removingItemId, setRemovingItemId] = useState<number | null>(null);

    const removeItem = (id: number) => {
        setRemovingItemId(id);
        removeItemMutation.mutate(id, {
            onSettled: () => {
                setRemovingItemId(null);
            },
        });
    };

    // Use mutation for updating stock
    const restockItemMutation = useMutation({
        mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
            axios.post(`/api/items/restock`, { itemId: id, amount: quantity }),
        onMutate: async ({ id, quantity }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['items'] });

            // Snapshot the previous value
            const previousItems = queryClient.getQueryData(['items']);

            // Optimistically update to the new value
            queryClient.setQueryData(['items'], (old: userItems[] = []) => {
                return old.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            });

            // Return a context object with the snapshotted value
            return { previousItems };
        },
        onError: (error, variables, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousItems) {
                queryClient.setQueryData(['items'], context.previousItems);
            }
            console.error('Failed to update stock:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            setStockAmounts({});
        },
    });

    const sellItemMutation = useMutation({
        mutationFn: ({
            id,
            quantity,
            stockAmounts,
        }: {
            id: number;
            quantity: number;
            stockAmounts: number;
        }) =>
            axios.post('/api/items/sell', {
                itemId: id,
                amount: stockAmounts,
                quantity: quantity,
            }),
        onMutate: async ({ id, stockAmounts }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['items'] });

            // Snapshot the previous value
            const previousItems = queryClient.getQueryData(['items']);

            // Optimistically update to the new value
            queryClient.setQueryData(['items'], (old: userItems[] = []) => {
                return old.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              quantity: Math.max(
                                  0,
                                  item.quantity - stockAmounts
                              ),
                          }
                        : item
                );
            });

            // Return a context object with the snapshotted value
            return { previousItems };
        },
        onError: (error, variables, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousItems) {
                queryClient.setQueryData(['items'], context.previousItems);
            }
            console.error('Failed to update stock', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            setStockAmounts({});
        },
    });

    // Change the updateStock function as follows:
    const restock = (item: userItems, amount: number) => {
        restockItemMutation.mutate({ id: item.id, quantity: amount });
    };

    const sell = (item: userItems, stockAmounts: number) => {
        sellItemMutation.mutate({
            id: item.id,
            stockAmounts: stockAmounts,
            quantity: item.quantity,
        });
    };

    const batchRestock = () => {
        selectItems.forEach((itemId) => {
            restockItemMutation.mutate({
                id: itemId.id,
                quantity: batchQty,
            });
        });
    };

    const batchSell = () => {
        selectItems.forEach((item) => {
            sellItemMutation.mutate({
                id: item.id,
                quantity: item.quantity,
                stockAmounts: batchQty,
            });
        });
    };

    const batchRemove = () => {
        selectItems.forEach((item) => {
            removeItemMutation.mutate(item.id);
        });
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

                        {isLoading && cachedItems.length === 0 && (
                            <p>Loading inventory items...</p>
                        )}

                        {error && (
                            <p className="text-red-500">
                                Error loading items: {(error as Error).message}
                            </p>
                        )}

                        {(!isLoading || cachedItems.length > 0) && !error && (
                            <>
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-600">
                                                <th className="p-3 text-teal-600">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            selectItems.length ===
                                                            items.length
                                                        }
                                                        onChange={() => {
                                                            if (
                                                                selectItems.length >=
                                                                0
                                                            ) {
                                                                setSelectItems([
                                                                    ...items.map(
                                                                        (
                                                                            item: userItems
                                                                        ) =>
                                                                            item
                                                                    ),
                                                                ]);
                                                            }
                                                            if (
                                                                selectItems.length ==
                                                                items.length
                                                            ) {
                                                                setSelectItems(
                                                                    []
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </th>
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
                                                    <>
                                                        <tr
                                                            key={item.id}
                                                            className="border-b border-gray-700"
                                                        >
                                                            <td className="p-3">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectItems.includes(
                                                                        item
                                                                    )}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        ) {
                                                                            setSelectItems(
                                                                                [
                                                                                    ...selectItems,
                                                                                    item,
                                                                                ]
                                                                            );
                                                                        } else {
                                                                            setSelectItems(
                                                                                selectItems.filter(
                                                                                    (
                                                                                        selectedItem
                                                                                    ) =>
                                                                                        selectedItem.id !==
                                                                                        item.id
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </td>
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
                                                                ₹
                                                                {item.price.toFixed(
                                                                    2
                                                                )}
                                                            </td>
                                                            <td className="p-3 flex gap-2">
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Qty"
                                                                    value={
                                                                        stockAmounts[
                                                                            item
                                                                                .id
                                                                        ] || ''
                                                                    }
                                                                    className="w-20 text-white"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setStockAmounts(
                                                                            {
                                                                                ...stockAmounts,
                                                                                [item.id]:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                                <Button
                                                                    disabled={
                                                                        restockItemMutation.isPending
                                                                    }
                                                                    onClick={() =>
                                                                        restock(
                                                                            item,
                                                                            parseInt(
                                                                                stockAmounts[
                                                                                    item
                                                                                        .id
                                                                                ] ||
                                                                                    '0'
                                                                            ) ||
                                                                                0
                                                                        )
                                                                    }
                                                                    className="bg-blue-500 hover:bg-blue-600 w-16"
                                                                >
                                                                    Restock
                                                                </Button>
                                                                <Button
                                                                    disabled={
                                                                        sellItemMutation.isPending
                                                                    }
                                                                    onClick={() =>
                                                                        sell(
                                                                            item,
                                                                            parseInt(
                                                                                stockAmounts[
                                                                                    item
                                                                                        .id
                                                                                ] ||
                                                                                    '0'
                                                                            ) ||
                                                                                0
                                                                        )
                                                                    }
                                                                    className="bg-yellow-500 hover:bg-yellow-600 w-16"
                                                                >
                                                                    Sell
                                                                </Button>
                                                                <Button
                                                                    onClick={() =>
                                                                        removeItem(
                                                                            item.id
                                                                        )
                                                                    }
                                                                    className="bg-red-500 hover:bg-red-600 w-16"
                                                                    disabled={
                                                                        removeItemMutation.isPending
                                                                    }
                                                                >
                                                                    {removeItemMutation.isPending &&
                                                                    removingItemId ===
                                                                        item.id
                                                                        ? 'Removing...'
                                                                        : 'Remove'}
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {selectItems.length > 0 && (
                                    <div className="items-center justify-center flex gap-2 mt-4">
                                        <Input
                                            type="number"
                                            placeholder="Qty"
                                            className="w-20 text-white"
                                            value={
                                                batchQty == 0 ? '' : batchQty
                                            }
                                            onChange={(e) =>
                                                setBatchQty(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                        <Button
                                            disabled={
                                                restockItemMutation.isPending
                                            }
                                            onClick={batchRestock}
                                            className="bg-blue-500 hover:bg-blue-600 w-16"
                                        >
                                            Restock
                                        </Button>
                                        <Button
                                            disabled={
                                                sellItemMutation.isPending
                                            }
                                            onClick={batchSell}
                                            className="bg-yellow-500 hover:bg-yellow-600 w-16"
                                        >
                                            Sell
                                        </Button>
                                        <Button
                                            className="bg-red-500 hover:bg-red-600 w-16"
                                            onClick={batchRemove}
                                            disabled={
                                                removeItemMutation.isPending
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}
                            </>
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
                        >
                            Add Item
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
