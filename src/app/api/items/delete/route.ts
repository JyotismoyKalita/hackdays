import { eq } from 'drizzle-orm';
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
        const itemId = searchParams.get('item');

        if (!itemId) {
            return NextResponse.json(
                { error: 'Item is required' },
                { status: 400 }
            );
        }

        const parsedItemId = parseInt(itemId, 10);

        await db.delete(items).where(eq(items.id, parsedItemId));

        return NextResponse.json('Item deleted Successfully', { status: 200 });
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
