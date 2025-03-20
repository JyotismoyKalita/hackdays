'use client';
import React, { useState } from 'react';
import { HoveredLink, Menu, MenuItem } from './ui/navbar-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const { isSignedIn } = useUser();

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
                <Link href={'/about-us'}>
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
                        <HoveredLink href="/dashboard/ai-recommendations">
                            AI Powered Inventory
                        </HoveredLink>
                        <HoveredLink href="/dashboard/ai-dynamic-pricing">
                            Dynamic Pricing
                        </HoveredLink>
                        <HoveredLink href="/dashboard/ai-stock-levels">
                            AI Stock Levels
                        </HoveredLink>
                        <HoveredLink href="/dashboard/expiry-tracker">
                            Expiry Tracking
                        </HoveredLink>
                    </div>
                </MenuItem>

                <Link href={'/contact-us'}>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item="Contact Us"
                    ></MenuItem>
                </Link>

                {isSignedIn ? (
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item={<UserButton />}
                    ></MenuItem>
                ) : (
                    <Link href={'/sign-in'}>
                        <MenuItem
                            setActive={setActive}
                            active={active}
                            item="Sign In"
                        ></MenuItem>
                    </Link>
                )}
            </Menu>
        </div>
    );
}

export default Navbar;
