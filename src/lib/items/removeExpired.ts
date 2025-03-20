export async function removeExpiredItem() {
    try {
        const response = await fetch(`/api/items/removeExpired`);
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
