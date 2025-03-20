import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { soldItems } from '@/server/db/schema';
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

        const sold_Items = await db
            .select()
            .from(soldItems)
            .where(eq(soldItems.userId, user.id))
            .orderBy(desc(soldItems.soldAt));

        return NextResponse.json(sold_Items, { status: 200 });
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
