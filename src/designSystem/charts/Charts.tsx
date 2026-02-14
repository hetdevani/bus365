import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { cn } from '../../core/utils';

/**
 * Custom Tooltip Component
 */
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) {
        return null;
    }

    return (
        <div className="glass border border-border-default rounded-xl shadow-2xl p-4 min-w-[140px] animate-scale-in">
            <p className="text-xs font-black text-text-tertiary uppercase tracking-widest mb-3">{label}</p>
            <div className="space-y-2">
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm font-bold text-text-secondary">{entry.name}</span>
                        </div>
                        <span className="text-sm font-black text-text-primary">
                            {entry.value?.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * Line Chart Component
 */
export interface LineChartProps {
    data: any[];
    lines: Array<{
        dataKey: string;
        name?: string;
        color?: string;
    }>;
    xAxisDataKey?: string;
    height?: number;
    className?: string;
}

export function LineChartComponent({
    data,
    lines,
    xAxisDataKey = 'name',
    height = 350,
    className,
}: LineChartProps) {
    return (
        <div className={cn('w-full', className)}>
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border-subtle" />
                    <XAxis
                        dataKey={xAxisDataKey}
                        className="text-xs text-text-secondary"
                        stroke="var(--color-text-tertiary)"
                    />
                    <YAxis
                        className="text-xs text-text-secondary"
                        stroke="var(--color-text-tertiary)"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{
                            paddingTop: '20px',
                        }}
                        iconType="circle"
                    />
                    {lines.map((line, index) => (
                        <Line
                            key={line.dataKey}
                            type="monotone"
                            dataKey={line.dataKey}
                            name={line.name || line.dataKey}
                            stroke={line.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

/**
 * Area Chart Component
 */
export interface AreaChartProps {
    data: any[];
    areas: Array<{
        dataKey: string;
        name?: string;
        color?: string;
    }>;
    xAxisDataKey?: string;
    height?: number;
    className?: string;
}

export function AreaChartComponent({
    data,
    areas,
    xAxisDataKey = 'name',
    height = 350,
    className,
}: AreaChartProps) {
    return (
        <div className={cn('w-full', className)}>
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart data={data}>
                    <defs>
                        {areas.map((area, index) => {
                            const color = area.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`;
                            return (
                                <linearGradient
                                    key={area.dataKey}
                                    id={`gradient-${area.dataKey}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            );
                        })}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border-subtle" />
                    <XAxis
                        dataKey={xAxisDataKey}
                        className="text-xs text-text-secondary"
                        stroke="var(--color-text-tertiary)"
                    />
                    <YAxis
                        className="text-xs text-text-secondary"
                        stroke="var(--color-text-tertiary)"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {areas.map((area, index) => {
                        const color = area.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`;
                        return (
                            <Area
                                key={area.dataKey}
                                type="monotone"
                                dataKey={area.dataKey}
                                name={area.name || area.dataKey}
                                stroke={color}
                                fill={`url(#gradient-${area.dataKey})`}
                                strokeWidth={2}
                            />
                        );
                    })}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

/**
 * Bar Chart Component
 */
export interface BarChartProps {
    data: any[];
    bars: Array<{
        dataKey: string;
        name?: string;
        color?: string;
    }>;
    xAxisDataKey?: string;
    height?: number;
    className?: string;
}

export function BarChartComponent({
    data,
    bars,
    xAxisDataKey = 'name',
    height = 350,
    className,
}: BarChartProps) {
    return (
        <div className={cn('w-full', className)}>
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border-subtle" />
                    <XAxis
                        dataKey={xAxisDataKey}
                        className="text-xs text-text-secondary"
                        stroke="var(--color-text-tertiary)"
                    />
                    <YAxis
                        className="text-xs text-text-secondary"
                        stroke="var(--color-text-tertiary)"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {bars.map((bar, index) => (
                        <Bar
                            key={bar.dataKey}
                            dataKey={bar.dataKey}
                            name={bar.name || bar.dataKey}
                            fill={bar.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                            radius={[6, 6, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
