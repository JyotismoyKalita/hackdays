'use client';
import * as React from 'react';
import { SearchForm } from '@/components/search-form';
import { usePathname } from 'next/navigation';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';

const data = {
    navMain: [
        {
            title: 'Getting Started',
            url: '#',
            items: [
                {
                    title: 'Overview',
                    url: '/dashboard/overview',
                },
                {
                    title: 'Inventory',
                    url: '/dashboard/inventory',
                },
                {
                    title: 'Sales and Purchases',
                    url: '/dashboard/sales-and-purchases',
                },
            ],
        },
        {
            title: 'AI Tools',
            url: '#',
            items: [
                {
                    title: 'AI Stock Levels',
                    url: '/dashboard/ai-stock-levels',
                },
                {
                    title: 'AI Recommendations',
                    url: '/dashboard/ai-recommendations',
                },
                {
                    title: 'AI Dynamic Pricing',
                    url: '/dashboard/ai-dynamic-pricing',
                },
                {
                    title: 'Expiry Tracker',
                    url: '/dashboard/expiry-tracker',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            items: [
                {
                    title: 'Settings',
                    url: '/dashboard/settings',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="mb-4">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg">
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">
                                        Dashboard
                                    </span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SearchForm />
                    </SidebarMenu>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.url}
                                        >
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
