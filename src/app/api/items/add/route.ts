import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { items, categories, salesReports, purchases } from '@/server/db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';

export async function POST(req: Request) {
    try {
        const user = await currentUser();

        if (!user || !user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const {
            name,
            category,
            quantity,
            price,
            costPrice,
            hasExpiry,
            manufacturingDate,
            expiryDate,
        } = await req.json();

        if (!name || !category || !quantity || !price) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        let categoryRecord = await db
            .select()
            .from(categories)
            .where(
                and(
                    eq(categories.userId, user.id),
                    eq(categories.name, category)
                )
            )
            .limit(1);

        if (categoryRecord.length === 0) {
            categoryRecord = await db
                .insert(categories)
                .values({
                    userId: user.id,
                    name: category,
                })
                .returning({
                    id: categories.id,
                    userId: categories.userId,
                    name: categories.name,
                });
        }

        const parsedManufacturingDate =
            manufacturingDate && hasExpiry ? new Date(manufacturingDate) : null;
        const parsedExpiryDate =
            expiryDate && hasExpiry ? new Date(expiryDate) : null;

        const newItem = await db
            .insert(items)
            .values({
                userId: user.id,
                name,
                category,
                categoryId: categoryRecord[0].id,
                quantity,
                price,
                costPrice,
                hasExpiry: hasExpiry || false,
                manufacturingDate: parsedManufacturingDate,
                expiryDate: parsedExpiryDate,
                addedAt: new Date(),
            })
            .onConflictDoNothing()
            .returning();

        if (newItem.length === 0) {
            return NextResponse.json(
                { message: 'Item already exists' },
                { status: 200 }
            );
        }

        await db.insert(salesReports).values({
            userId: user.id,
            itemId: newItem[0].id,
            name,
            category,
            totalItemsSold: 0,
        });

        await db.insert(purchases).values({
            userId: user.id,
            itemId: newItem[0].id,
            quantity,
            name,
            category,
            costPrice,
            purchasedAt: new Date(),
        });

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error adding item:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
