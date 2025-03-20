export interface userItems {
    id: number;
    userId: string;
    name: string;
    category: string;
    categoryId: number;
    quantity: number;
    price: number;
    costPrice: number;
    hasExpiry: boolean | null;
    manufacturingDate: Date;
    expiryDate: Date;
    addedAt: Date | null;
}

export async function fetchAllItems() {
    try {
        const response = await fetch(`/api/items/getAll`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
