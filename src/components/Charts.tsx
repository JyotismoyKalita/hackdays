'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
    { category: 'Category 1', maximum: 450, minimum: 300, reorder: 375 },
    { category: 'Category 2', maximum: 380, minimum: 220, reorder: 300 },
    { category: 'Category 3', maximum: 520, minimum: 120, reorder: 320 },
    { category: 'Category 4', maximum: 440, minimum: 150, reorder: 295 },
    { category: 'Category 5', maximum: 600, minimum: 350, reorder: 475 },
    { category: 'Category 6', maximum: 480, minimum: 200, reorder: 340 },
];

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

export function Component() {
    return (
        <Card className="dark:bg-gray-800">
            <CardHeader>
                <CardTitle className="text-white">
                    Inventory Levels by Category
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData}>
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
            </CardContent>
        </Card>
    );
}

export { Component as Charts };
