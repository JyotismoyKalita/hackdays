export async function restockItem(itemId: number, amount: number) {
    try {
        const response = await fetch('/api/items/restock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId,
                amount,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add item');
        }

        const data = await response.json();
        console.log('Item added:', data);
    } catch (error) {
        console.error(error);
    }
}
