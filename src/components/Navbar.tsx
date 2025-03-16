'use client';
import React, { useState } from 'react';
import { HoveredLink, Menu, MenuItem } from './ui/navbar-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn(
                'fixed top-10 inset-x-0 max-w-2xl mx-auto z-50',
                className
            )}
        >
            <Menu setActive={setActive}>
                <Link href={'/'}>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item="Home"
                    ></MenuItem>
                </Link>
                <Link href={'/'}>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item="About-Us"
                    ></MenuItem>
                </Link>
                <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Our Services"
                >
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/courses">
                            Ai Powered Inventory
                        </HoveredLink>
                        <HoveredLink href="/courses">
                            Dyanamic Pricing
                        </HoveredLink>
                        <HoveredLink href="/courses">
                            Sales Forecasting
                        </HoveredLink>
                        <HoveredLink href="/courses">
                            Expiry Tracking
                        </HoveredLink>
                    </div>
                </MenuItem>

                <Link href={'/contact'}>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item="Contact Us"
                    ></MenuItem>
                </Link>
                <Link href={'/contact'}>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item="Accounts"
                    ></MenuItem>
                </Link>
            </Menu>
        </div>
    );
}

export default Navbar;
