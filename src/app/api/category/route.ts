import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/server/db'; // Adjust the path based on your project structure
import { categories } from '@/server/db/schema'; // Adjust the path based on your project structure
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

        const userCategories = await db
            .select()
            .from(categories)
            .where(eq(categories.userId, user.id));

        return NextResponse.json(userCategories, { status: 200 });
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
