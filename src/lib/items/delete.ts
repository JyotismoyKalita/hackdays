export async function deleteItem(id: number) {
    try {
        const response = await fetch(
            `/api/items/delete?item=${encodeURIComponent(id)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
