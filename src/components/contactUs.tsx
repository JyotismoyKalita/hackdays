'use client';

import DotPattern from '@/components/ui/dot-pattern-1';

export function Quote() {
    return (
        <>
            <div className="mx-auto mb-10 w-[90%] max-w-[900px] min-h-[300px] md:min-h-[400px] lg:min-h-[540px] mt-10 px-6 md:mb-20 xl:px-0">
                <div className="relative flex flex-col items-center border border-teal-600 bg-black">
                    <DotPattern width={5} height={5} />

                    {/* Corner dots */}
                    <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-teal-600" />
                    <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-teal-600" />
                    <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-teal-600" />
                    <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-teal-600" />

                    <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-20">
                        <h2 className="text-teal-600 text-xl md:text-2xl lg:text-2xl font-bold mb-4">
                            Via Call :
                        </h2>
                        <div className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100">
                            <div className="flex flex-col gap-2 md:gap-3">
                                <ul className="space-y-2 text-lg md:text-xl lg:text-xl font-bold text-gray-100">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                                        +91 9611239999
                                    </li>
                                </ul>

                                {/* Key Features Section */}
                                <div className="mt-4">
                                    <h2 className="text-teal-600 text-xl md:text-2xl lg:text-2xl font-bold mb-4">
                                        Via Mail:
                                    </h2>
                                    <ul className="space-y-2 text-lg md:text-xl lg:text-xl font-bold text-gray-100">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                                            contact@inventrack.com
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
