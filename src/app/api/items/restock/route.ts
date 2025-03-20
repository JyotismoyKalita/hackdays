import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { items, purchases } from '@/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const { itemId, amount } = await req.json();

        const user = await currentUser();

        if (!user || !user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!itemId || !amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid input data' },
                { status: 400 }
            );
        }

        const [updatedItem] = await db
            .update(items)
            .set({ quantity: sql`${items.quantity} + ${amount}` })
            .where(and(eq(items.id, itemId), eq(items.userId, user.id)))
            .returning({
                updatedQuantity: items.quantity,
                name: items.name,
                costPrice: items.costPrice,
                category: items.category,
            });

        if (!updatedItem) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }

        await db.insert(purchases).values({
            userId: user.id,
            itemId,
            quantity: amount,
            name: updatedItem.name,
            category: updatedItem.category,
            costPrice: updatedItem.costPrice,
            purchasedAt: new Date(),
        });

        return NextResponse.json(
            {
                message: 'Item restocked successfully',
                updatedQuantity: updatedItem.updatedQuantity,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error restocking item:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
