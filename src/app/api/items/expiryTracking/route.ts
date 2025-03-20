import { eq, asc, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { items } from '@/server/db/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
    try {
        const user = await currentUser();

        if (!user || !user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userItems = await db
            .select()
            .from(items)
            .where(and(eq(items.userId, user.id), eq(items.hasExpiry, true)))
            .orderBy(asc(items.expiryDate));

        return NextResponse.json(userItems, { status: 200 });
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
