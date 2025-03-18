'use client';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    interface Map {
        [key: string]: string;
    }
    const map: Map = {
        '/dashboard/inventory': 'Inventory',
        '/dashboard/overview': 'Overview',
        '/dashboard/sales-and-purchases': 'Sales and Purchases',
        '/dashboard/ai-stock-levels': 'AI Stock Levels',
        '/dashboard/ai-recommendations': 'AI Recommendations',
        '/dashboard/ai-dynamic-pricing': 'AI Dynamic Pricing',
        '/dashboard/expiry-tracker': 'Expiry Tracker',
        '/dashboard/settings': 'Settings',
    };
    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="relative w-full flex items-center justify-center"></div>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/">
                                            InvenTrack
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {map[pathname] || 'Dashboard'}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="ml-auto">
                                <UserButton />
                            </div>
                        </header>
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    );
}
