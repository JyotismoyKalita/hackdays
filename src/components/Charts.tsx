'use client';

import { useEffect, useMemo } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useGetAll } from '@/hooks/useGetAll';
import { Loader2 } from 'lucide-react';

// Define TypeScript interfaces for the data structure
interface StockItem {
    Item: string;
    CurrentStock: number;
    MaxStock: number;
    MinStock: number;
    Reorder: number;
}

interface StockLevels {
    [category: string]: StockItem[];
}

interface ChartDataItem {
    category: string;
    maximum: number;
    minimum: number;
    reorder: number;
}

const chartConfig = {
    maximum: {
        label: 'Maximum',
        color: '#ef4444', // Red color
    },
    minimum: {
        label: 'Minimum',
        color: '#3b82f6', // Blue color
    },
    reorder: {
        label: 'Reorder',
        color: '#10b981', // Green color
    },
} satisfies ChartConfig;

const STORAGE_KEY = 'inventory-chart-data';

export function Component() {
    const { data: allData, isLoading, error } = useGetAll();
    const aiStockLevels = allData?.get('aiStockLevels') as
        | StockLevels
        | undefined;

    const processedChartData = useMemo(() => {
        if (!aiStockLevels) {
            try {
                const storedData = sessionStorage.getItem(STORAGE_KEY);
                if (storedData) {
                    return JSON.parse(storedData) as ChartDataItem[];
                }
            } catch (e) {
                console.error('Error loading data from sessionStorage:', e);
            }
            return [];
        }

        const categories = Object.keys(aiStockLevels).slice(0, 3);

        const result = categories.map((category) => {
            const items = aiStockLevels[category];

            const aggregates = items.reduce(
                (
                    acc: { maximum: number; minimum: number; reorder: number },
                    item: StockItem
                ) => {
                    acc.maximum += item.MaxStock || 0;
                    acc.minimum += item.MinStock || 0;
                    acc.reorder += item.Reorder || 0;
                    return acc;
                },
                { maximum: 0, minimum: 0, reorder: 0 }
            );

            return {
                category,
                ...aggregates,
            };
        });

        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
        } catch (e) {
            console.error('Error saving data to sessionStorage:', e);
        }

        return result;
    }, [aiStockLevels]) as ChartDataItem[];

    useEffect(() => {
        if (isLoading && !processedChartData.length) {
            try {
                const storedData = sessionStorage.getItem(STORAGE_KEY);
                if (storedData) {
                    // We don't set state directly here as that would cause a re-render loop
                    // Instead we rely on the useMemo hook to retrieve from sessionStorage
                    console.log('Found cached chart data in sessionStorage');
                }
            } catch (e) {
                console.error('Error reading from sessionStorage:', e);
            }
        }
    }, []);

    if (isLoading && !processedChartData.length) {
        return (
            <Card className="dark:bg-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">
                        Inventory Levels by Category
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <span className="ml-2 text-gray-200">
                            Loading data...
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="dark:bg-gray-800">
            <CardHeader>
                <CardTitle className="text-white">
                    Inventory Levels by Category
                </CardTitle>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-red-500 text-center">
                            <p className="font-semibold">Error loading data</p>
                            <p className="text-sm">
                                {error.message || 'Please try again later'}
                            </p>
                        </div>
                    </div>
                )}

                {!error && isLoading && processedChartData.length > 0 && (
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 z-10">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                            <span className="ml-2 text-white">
                                Refreshing...
                            </span>
                        </div>
                        <ChartContainer config={chartConfig}>
                            <BarChart data={processedChartData}>
                                <XAxis
                                    dataKey="category"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    stroke="#888888"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    stroke="#888888"
                                    tickFormatter={(value) =>
                                        Math.round(value).toLocaleString()
                                    }
                                />
                                <Bar
                                    dataKey="maximum"
                                    fill={chartConfig.maximum.color}
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="minimum"
                                    fill={chartConfig.minimum.color}
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="reorder"
                                    fill={chartConfig.reorder.color}
                                    radius={[4, 4, 0, 0]}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            hideLabel
                                            className="w-[180px] dark:bg-gray-900 dark:border-gray-700"
                                            formatter={(value, name) => (
                                                <>
                                                    <div
                                                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                                        style={{
                                                            backgroundColor:
                                                                chartConfig[
                                                                    name as keyof typeof chartConfig
                                                                ].color,
                                                        }}
                                                    />
                                                    <span className="text-gray-200">
                                                        {
                                                            chartConfig[
                                                                name as keyof typeof chartConfig
                                                            ]?.label
                                                        }
                                                    </span>
                                                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-white">
                                                        {value.toLocaleString()}
                                                        <span className="text-gray-400">
                                                            units
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        />
                                    }
                                    cursor={false}
                                />
                            </BarChart>
                        </ChartContainer>
                    </div>
                )}

                {!error && !isLoading && processedChartData.length > 0 && (
                    <ChartContainer config={chartConfig}>
                        <BarChart data={processedChartData}>
                            <XAxis
                                dataKey="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                stroke="#888888"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                stroke="#888888"
                                tickFormatter={(value) =>
                                    Math.round(value).toLocaleString()
                                }
                            />
                            <Bar
                                dataKey="maximum"
                                fill={chartConfig.maximum.color}
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="minimum"
                                fill={chartConfig.minimum.color}
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="reorder"
                                fill={chartConfig.reorder.color}
                                radius={[4, 4, 0, 0]}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        hideLabel
                                        className="w-[180px] dark:bg-gray-900 dark:border-gray-700"
                                        formatter={(value, name) => (
                                            <>
                                                <div
                                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                                    style={{
                                                        backgroundColor:
                                                            chartConfig[
                                                                name as keyof typeof chartConfig
                                                            ].color,
                                                    }}
                                                />
                                                <span className="text-gray-200">
                                                    {
                                                        chartConfig[
                                                            name as keyof typeof chartConfig
                                                        ]?.label
                                                    }
                                                </span>
                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-white">
                                                    {value.toLocaleString()}
                                                    <span className="text-gray-400">
                                                        units
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    />
                                }
                                cursor={false}
                            />
                        </BarChart>
                    </ChartContainer>
                )}

                {!isLoading && !error && processedChartData.length === 0 && (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-400">
                            No data available to display
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export { Component as Charts };
