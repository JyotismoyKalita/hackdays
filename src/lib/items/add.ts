export interface Item {
    name: string;
    category: string;
    quantity: number;
    price: number;
    costPrice: number;
    hasExpiry: boolean;
    manufacturingDate: string | null;
    expiryDate: string | null;
}

export async function addItem(item: Item) {
    try {
        const response = await fetch('/api/items/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...item,
                manufacturingDate: item.manufacturingDate
                    ? new Date(item.manufacturingDate).toISOString()
                    : null,
                expiryDate: item.expiryDate
                    ? new Date(item.expiryDate).toISOString()
                    : null,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add item');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
