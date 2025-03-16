'use client';
import React, { useState } from 'react';
import { HoveredLink, Menu, MenuItem } from './ui/navbar-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

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
                        item="About"
                    ></MenuItem>
                </Link>
                <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Our Services"
                >
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/courses">
                            AI Powered Inventory
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
                <MenuItem setActive={setActive} active={active} item="Account">
                    <div className="flex flex-col space-y-4 text-sm text-neutral-200">
                        <SignUpButton />
                        <SignInButton />
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Navbar;
