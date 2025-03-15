'use client';
import React from 'react';
import { Spotlight } from '@/components/ui/spotlight-new';
import { TextGenerateEffect } from './ui/text-generate-effect';
import Link from 'next/link';
import { Button } from '@/components/ui/moving-border';

const words = `Smarter Inventory,Seamless Operations`;

export function SpotlightNewDemo() {
    return (
        <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight />
            <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 transform translate-y-30">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    InvenTrack <br />
                </h1>
                <div className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                    <TextGenerateEffect words={words} />
                </div>
                <div className="mt-8 flex justify-center transform translate-y-10">
                    <Link href="/courses">
                        <Button
                            borderRadius="1.75rem"
                            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                        >
                            Getting Started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default SpotlightNewDemo;
