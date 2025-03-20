import { lt } from 'drizzle-orm';
import { db } from '@/server/db';
import { items } from '@/server/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const currentDate = new Date();

        const deletedCount = await db
            .delete(items)
            .where(lt(items.expiryDate, currentDate))
            .returning({ deletedId: items.id });

        return NextResponse.json(
            `Deleted ${deletedCount.length} expired items`,
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
