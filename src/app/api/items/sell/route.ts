import { NextResponse } from 'next/server';
import { db } from '@/server/db'; // Import database connection
import { items, salesReports, soldItems } from '@/server/db/schema'; // Import schemas
import { eq, sql } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const user = await currentUser();

        if (!user || !user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { itemId, amount, quantity } = await req.json();

        if (!itemId || !amount || amount <= 0 || amount > quantity) {
            return NextResponse.json(
                { error: 'Invalid input data' },
                { status: 400 }
            );
        }

        const newQuantity = quantity - amount;

        const [upDatedItem] = await db
            .update(items)
            .set({ quantity: newQuantity })
            .where(eq(items.id, itemId))
            .returning({
                price: items.price,
                name: items.name,
                category: items.category,
            });

        await db.insert(soldItems).values({
            userId: user.id,
            itemId,
            name: upDatedItem.name,
            category: upDatedItem.category,
            quantity: amount,
            salePrice: upDatedItem.price,
            soldAt: new Date(),
        });

        await db
            .update(salesReports)
            .set({
                totalItemsSold: sql`${salesReports.totalItemsSold} + ${amount}`,
            })
            .where(eq(salesReports.name, upDatedItem.name));

        return NextResponse.json(
            {
                message: 'Item sold successfully',
                remainingQuantity: newQuantity,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error selling item:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
