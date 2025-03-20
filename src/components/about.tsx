'use client';

import DotPattern from '@/components/ui/dot-pattern-1';

export function Quote() {
    return (
        <>
            <div className="mx-auto mb-10 max-w-7xl mt-10 px-6 md:mb-20 xl:px-0">
                <div className="relative flex flex-col items-center border border-teal-600 bg-black">
                    <DotPattern width={5} height={5} />

                    {/* Corner dots */}
                    <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-teal-600" />
                    <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-teal-600" />
                    <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-teal-600" />
                    <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-teal-600" />

                    <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-20">
                        <p className="md:text-md text-xs text-teal-600 lg:text-lg xl:text-xl">
                            About InvenTrack
                        </p>
                        <div className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100">
                            <div className="flex flex-col gap-2 md:gap-3">
                                <p className="font-normal leading-tight">
                                    Managing inventory efficiently is crucial
                                    for any business, and our web app is
                                    designed to simplify and optimize the
                                    process.
                                </p>
                                <p className="font-normal leading-tight mb-6">
                                    With advanced AI-powered features, we help
                                    you stay ahead of demand, reduce waste, and
                                    maximize profits effortlessly.
                                </p>

                                {/* Key Features Section */}
                                <div className="mt-4">
                                    <h3 className="text-teal-600 text-lg md:text-xl mb-4">
                                        Key features of our website:
                                    </h3>
                                    <ul className="space-y-2 text-sm md:text-base text-gray-100">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                                            AI Recommended Maximum Stock Level
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                                            AI Recommended Minimum Stock Level
                                            and Reorder Level
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                                            AI Recommended Safety Stock Level
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                                            AI Recommended Order Quantity
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
