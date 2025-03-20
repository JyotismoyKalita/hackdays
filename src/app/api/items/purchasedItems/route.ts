import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { purchases } from '@/server/db/schema';
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

        const purchased_Items = await db
            .select()
            .from(purchases)
            .where(eq(purchases.userId, user.id))
            .orderBy(desc(purchases.purchasedAt));

        return NextResponse.json(purchased_Items, { status: 200 });
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
