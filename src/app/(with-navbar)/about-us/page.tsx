import { Quote } from '@/components/about';

export default function Page() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-[var(--background)] dark min-h-250">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight pt-15">
                    About-Us
                </h1>
                <Quote />
            </div>
        </>
    );
}
