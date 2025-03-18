import * as React from 'react';
import { SearchForm } from '@/components/search-form';

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

// This is sample data.
const data = {
    versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
    navMain: [
        {
            title: 'Getting Started',
            url: '#',
            items: [
                {
                    title: 'Overview',
                    url: '#',
                },
                {
                    title: 'Inventory',
                    url: '#',
                },
                {
                    title: 'Sales and Purchases',
                    url: '#',
                },
            ],
        },
        {
            title: 'AI Tools',
            url: '#',
            items: [
                {
                    title: 'AI Stock Levels',
                    url: '#',
                },
                {
                    title: 'AI Recomendations',
                    url: '#',
                    isActive: true,
                },
                {
                    title: 'AI Dynamic Pricing',
                    url: '#',
                },
                {
                    title: 'Expiry Tracker',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            items: [
                {
                    title: 'Settings',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                                            isActive={item.isActive}
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
