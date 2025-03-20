export async function sellItem(
    itemId: number,
    amount: number,
    quantity: number
) {
    try {
        const response = await fetch('/api/items/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId,
                amount,
                quantity,
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
