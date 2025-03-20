import { eq, desc, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { purchases } from '@/server/db/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
    try {
        const user = await currentUser();

        if (!user || !user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const category = searchParams!.get('category');

        if (!category) {
            return NextResponse.json(
                { error: 'Category is required' },
                { status: 400 }
            );
        }

        const purchased_Items = await db
            .select()
            .from(purchases)
            .where(
                and(
                    eq(purchases.userId, user.id),
                    eq(purchases.category, category)
                )
            )
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
