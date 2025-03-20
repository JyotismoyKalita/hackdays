import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { items } from '@/server/db/schema';
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
        const category = searchParams.get('category');

        if (!category) {
            return NextResponse.json(
                { error: 'Category is required' },
                { status: 400 }
            );
        }

        const categoryItems = await db
            .select()
            .from(items)
            .where(
                and(eq(items.userId, user.id), eq(items.category, category))
            );

        return NextResponse.json(categoryItems, { status: 200 });
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
