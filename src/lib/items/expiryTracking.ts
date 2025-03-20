export async function trackExpire() {
    try {
        const response = await fetch('/api/items/expiryTracking');
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
