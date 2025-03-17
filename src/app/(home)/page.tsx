'use client';
import HeroSection from '@/components/HeroSection';
import Featured1 from '@/components/Featured1';
import FeaturedSec from '@/components/FeaturedSec';
import Instructors from '@/components/Instructors';
import Footer from '@/components/Footer';
import Faq from '@/components/Faq';
import { Globe } from '@/components/ui/globe';
import { useEffect } from 'react';
import axios from 'axios';

export default function Page() {
    useEffect(() => {
        const createUser = async () => {
            try {
                await axios.post('/api/user');
            } catch (error) {
                console.error('Error creating user:', error);
            }
        };

        createUser();
    }, []);
    return (
        <main className="min-h-screen bg-black antialiased bg-grid-white/[0.02]">
            <HeroSection />
            <div className="space-y-16">
                <Featured1 />
                <FeaturedSec />
                <Instructors />
            </div>
            <div className="relative h-[600px] w-full my-20">
                <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
                    Connected <span className="text-teal-600">Globally</span>
                </h2>
                <Globe />
            </div>
            <Featured1 />
            <Faq />
            <Footer />
        </main>
    );
}
