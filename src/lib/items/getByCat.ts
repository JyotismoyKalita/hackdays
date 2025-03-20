export async function fetchCatItems(category: string) {
    try {
        const response = await fetch(
            `/api/items/getByCat?category=${encodeURIComponent(category)}`,
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
        return data || [];
    } catch (error) {
        console.error(error);
    }
}
