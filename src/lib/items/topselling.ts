export interface userTopSelling {
    id: number;
    userId: string;
    itemId: number;
    name: string;
    category: string;
    totalItemsSold: number;
}

export async function getTopSellingItems() {
    try {
        const response = await fetch('/api/items/topselling');
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
