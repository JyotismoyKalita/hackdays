export interface userCategories {
    id: number;
    userId: string;
    name: string;
}

export async function fetchCategories() {
    try {
        const response = await fetch('/api/category');
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
