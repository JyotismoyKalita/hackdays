import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { salesReports } from '@/server/db/schema';
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

        const sales_reports = await db
            .select()
            .from(salesReports)
            .where(eq(salesReports.userId, user.id))
            .orderBy(desc(salesReports.totalItemsSold))
            .limit(10);

        return NextResponse.json(sales_reports, { status: 200 });
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
