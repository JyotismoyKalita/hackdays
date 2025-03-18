import { Textarea } from '@/components/ui/textarea';
import { Charts } from '@/components/Charts';

export default function Home() {
    return (
        <div className="flex flex-col h-screen p-4 bg-black">
            {/* Overview Header */}
            <header className="bg-black text-white p-4 border-b border-gray-700">
                <h2 className="text-3xl font-bold tracking-tight text-center bg-gradient-to-r from-teal to-teal-400 bg-clip-text text-transparent">
                    Overview
                </h2>
            </header>

            {/* Main Content */}
            <main className="dark flex flex-1 gap-4 mt-4">
                {/* Left Div */}
                <div className="flex-1 bg-black text-white p-4">
                    <div className="mb-4 pb-2 border-b border-gray-700">
                        <h2 className="text-lg font-semibold text-white text-center">
                            Items
                        </h2>
                    </div>
                    <Textarea
                        className="w-full h-160 min-h-[500px] resize-none text-center p-4 text-lg font-medium bg-gray-900 border-gray-700 focus:border-gray-600 focus:ring-gray-600"
                        placeholder="Enter your items here..."
                    />
                </div>

                {/* Right Side */}
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex-1 bg-black text-white p-4 ">
                        <Charts />
                    </div>
                    <div className="flex-1 bg-black text-white p-4">
                        <div className="mb-4 pb-2 border-b border-gray-700">
                            <h2 className="text-lg font-semibold text-white text-center">
                                Top Selling Items
                            </h2>
                        </div>
                        <Textarea
                            className="w-full h-40 resize-none text-center p-4 text-lg font-medium bg-gray-900 border-gray-700 focus:border-gray-600 focus:ring-gray-600"
                            placeholder="Enter your items here..."
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
