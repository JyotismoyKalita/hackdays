export interface SoldItemType {
    id: number;
    userId: string;
    itemId: number;
    name: string;
    category: string;
    quantity: number;
    salePrice: number;
    soldAt: Date;
}

export async function getSoldItems() {
    try {
        const response = await fetch('/api/items/soldItems');
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getSoldItemsByCat(category: string) {
    try {
        const response = await fetch(
            `/api/items/soldItems/byCat/?category=${encodeURIComponent(category)}`,
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
