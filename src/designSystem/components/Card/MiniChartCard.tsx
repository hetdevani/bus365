import React from 'react';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from './index';
import { cn } from '../../../core/utils';

export interface MiniChartCardProps {
    title: string;
    total: string;
    percent: number;
    chartData: number[];
    chartColor: string;
    type: 'area' | 'bar';
}

export function MiniChartCard({ title, total, percent, chartData, chartColor, type }: MiniChartCardProps) {
    const data = chartData.map((val, i) => ({ i, val }));
    const isPositive = percent >= 0;

    return (
        <Card variant="elevated" className="flex flex-col h-full overflow-hidden !p-0">
            <div className="p-6 pb-0 flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">{title}</p>
                    <h3 className="text-3xl font-black text-text-primary mt-1">{total}</h3>
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full",
                    isPositive ? "text-success-700 bg-success-100" : "text-danger-700 bg-danger-100"
                )}>
                    {isPositive ? '+' : ''}{percent}%
                    <span className="text-[10px] opacity-70">
                        {isPositive ? '↗' : '↘'}
                    </span>
                </div>
            </div>

            <div className="flex-1 min-h-[100px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {type === 'area' ? (
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip cursor={false} content={<></>} />
                            <Area
                                type="monotone"
                                dataKey="val"
                                stroke={chartColor}
                                strokeWidth={3}
                                fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
                            />
                        </AreaChart>
                    ) : (
                        <BarChart data={data}>
                            <Tooltip cursor={{ fill: 'transparent' }} content={<></>} />
                            <Bar
                                dataKey="val"
                                fill={chartColor}
                                radius={[2, 2, 0, 0]}
                                barSize={6}
                            />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
