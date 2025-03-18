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
                    <div className="w-full h-142 p-4 text-lg font-medium bg-gray-900 rounded-md border border-gray-700">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-teal-400">
                                    Category 1
                                </h3>
                            </div>
                            <div>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                        <span className="text-gray-200">
                                            Item 1
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                        <span className="text-gray-200">
                                            Item 2
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                        <span className="text-gray-200">
                                            Item 3
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-teal-400">
                                    Category 2
                                </h3>
                            </div>
                            <div>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                        <span className="text-gray-200">
                                            Item 1
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                        <span className="text-gray-200">
                                            Item 2
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                        <span className="text-gray-200">
                                            Item 3
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                        <div className="w-full h-40 p-4 text-lg font-medium bg-gray-900 rounded-md border border-gray-700">
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                    <span className="text-gray-200">
                                        Item 1
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                    <span className="text-gray-200">
                                        Item 2
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                                    <span className="text-gray-200">
                                        Item 3
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
