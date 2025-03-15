import HeroSection from '../components/HeroSection';
import Featured1 from '@/components/Featured1';
import FeaturedSec from '@/components/FeaturedSec';

export default function Page() {
    return (
        <main className="=min-h-screen bg-black antialiased bg-grid-white/[0.02]">
            <HeroSection />
            <Featured1 />
            <FeaturedSec />
        </main>
    );
}
