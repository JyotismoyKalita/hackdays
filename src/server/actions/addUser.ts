'use server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '../db';
import { UserTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createUserIfNotExists() {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not authenticated');
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
    }
}
