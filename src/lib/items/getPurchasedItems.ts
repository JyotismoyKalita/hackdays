export interface PurchasedItemType {
    id: number;
    userId: string;
    itemId: number;
    quantity: number;
    name: string;
    category: string;
    costPrice: number;
    purchasedAt: Date;
}

export async function getPurchasedItems() {
    try {
        const response = await fetch('/api/items/purchasedItems');
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPurchasedItemsByCat(category: string) {
    try {
        const response = await fetch(
            `/api/items/purchasedItems/byCat/?category=${encodeURIComponent(category)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
