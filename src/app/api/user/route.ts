import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { UserTable } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            );
        }

        const existingUser = await db.query.UserTable.findFirst({
            where: eq(UserTable.id, user.id),
        });

        if (!existingUser) {
            await db.insert(UserTable).values({
                id: user.id,
                name: user.fullName as string,
                email: user.emailAddresses[0]?.emailAddress,
            });
            return NextResponse.json(
                { message: 'User created successfully' },
                { status: 201 }
            );
        }

        return NextResponse.json(
            { message: 'User already exists' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
