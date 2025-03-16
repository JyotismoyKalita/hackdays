import HeroSection from '../components/HeroSection';
import Featured1 from '@/components/Featured1';
import FeaturedSec from '@/components/FeaturedSec';
import Instructors from '@/components/Instructors';
import Footer from '@/components/Footer';
<<<<<<< HEAD
import Faq from '@/components/Faq';
import { Globe } from '@/components/ui/globe';
=======
import FaqSectionWithCategoriesDisplay from '@/components/Faq';
>>>>>>> 5da373f34d609f16b17969c5ff6a60b59e937554

export default function Page() {
    return (
        <main className="min-h-screen bg-black antialiased bg-grid-white/[0.02]">
            <HeroSection />
<<<<<<< HEAD
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
            <Faq />
=======
            <Featured1 />
            <FeaturedSec />
            <Instructors />
            <FaqSectionWithCategoriesDisplay />
>>>>>>> 5da373f34d609f16b17969c5ff6a60b59e937554
            <Footer />
        </main>
    );
}
