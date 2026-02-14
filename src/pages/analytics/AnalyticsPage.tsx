import { PageLayout } from '../../designSystem/layouts/PageLayout';
import { Card, CardHeader, CardContent } from '../../designSystem/components/Card';
import { AreaChartComponent } from '../../designSystem/charts';
import { Button } from '../../designSystem/components/Button';
import { IconArrowRight, IconSearch, IconUsers, IconFile } from '../../designSystem/components/Icon';
import { MiniChartCard } from '../../designSystem/components/Card';
import { cn } from '../../core/utils';

/**
 * Analytics Page
 * 
 * Advanced analytics with premium Minimals design.
 */
export default function AnalyticsPage() {
    // Mock Data
    const conversionData = [
        { name: 'Week 1', conversions: 42, revenue: 8400 },
        { name: 'Week 2', conversions: 58, revenue: 11600 },
        { name: 'Week 3', conversions: 67, revenue: 13400 },
        { name: 'Week 4', conversions: 75, revenue: 15000 },
    ];

    const trafficSiteData = [
        { site: 'Google', value: '323.23k', icon: <IconSearch size={20} className="text-danger-500" /> },
        { site: 'Direct', value: '142.11k', icon: <IconArrowRight size={20} className="text-secondary-500" /> },
        { site: 'Social', value: '123.45k', icon: <IconUsers size={20} className="text-primary-500" /> },
        { site: 'Referral', value: '12.34k', icon: <IconFile size={20} className="text-info-500" /> },
    ];

    const timelineData = [
        { title: '12 Invoices have been paid', time: '12 mins ago', type: 'order1', color: 'success' },
        { title: 'Order #37745 from September', time: '45 mins ago', type: 'order2', color: 'primary' },
        { title: 'New order placed #XF-2356', time: '2 hours ago', type: 'order3', color: 'info' },
        { title: 'New order placed #XF-2346', time: '3 hours ago', type: 'order4', color: 'warning' },
        { title: 'Payment processing issue', time: '5 hours ago', type: 'error', color: 'danger' },
    ];

    return (
        <PageLayout title="Analytics">
            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MiniChartCard
                        title="Weekly Sales"
                        total="714k"
                        percent={2.6}
                        chartData={[10, 41, 35, 51, 49, 62, 69, 91, 148]}
                        chartColor="#00A76F"
                        type="bar"
                    />
                    <MiniChartCard
                        title="New Users"
                        total="1.35m"
                        percent={-0.1}
                        chartData={[10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34]}
                        chartColor="#00B8D9"
                        type="area"
                    />
                    <MiniChartCard
                        title="Item Orders"
                        total="1.72m"
                        percent={2.8}
                        chartData={[12, 14, 2, 45, 56, 34, 76, 89, 45, 23, 67]}
                        chartColor="#FFAB00"
                        type="area"
                    />
                    <MiniChartCard
                        title="Bug Reports"
                        total="234"
                        percent={-1.5}
                        chartData={[12, 11, 22, 34, 23, 12, 10, 5, 2, 1]}
                        chartColor="#FF5630"
                        type="bar"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Website Visits (Main Chart) */}
                    <div className="lg:col-span-2">
                        <Card variant="elevated" padding="lg">
                            <CardHeader>
                                <h3 className="text-lg font-bold text-text-primary">Website Visits</h3>
                                <p className="text-sm text-text-secondary mt-1">(+43%) vs last year</p>
                            </CardHeader>
                            <CardContent>
                                <AreaChartComponent
                                    data={conversionData}
                                    areas={[
                                        { dataKey: 'conversions', name: 'Mac', color: '#00A76F' },
                                        { dataKey: 'revenue', name: 'Windows', color: '#FFAB00' }
                                    ]}
                                    height={320}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Traffic By Site */}
                    <div className="lg:col-span-1">
                        <Card variant="elevated" padding="lg" className="h-full">
                            <CardHeader>
                                <h3 className="text-lg font-bold text-text-primary mb-6">Traffic by Site</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {trafficSiteData.map((site) => (
                                        <div key={site.site} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border-default hover:border-border-subtle hover:shadow-lg transition-all duration-300">
                                            <div className="mb-2 opacity-80">{site.icon}</div>
                                            <h4 className="text-xl font-bold text-text-primary">{site.value}</h4>
                                            <p className="text-sm text-text-tertiary">{site.site}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Conversion Rates */}
                    <div className="lg:col-span-2">
                        <Card variant="elevated" padding="lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-text-primary">Conversion Rates</h3>
                                    <Button variant="ghost" size="sm">View All</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Add to Cart', val: 45, color: '#00A76F' },
                                        { label: 'Checkout Start', val: 32, color: '#FFAB00' },
                                        { label: 'Payment', val: 24, color: '#00B8D9' },
                                        { label: 'Completed', val: 18, color: '#FF5630' },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2 font-semibold">
                                                <span>{item.label}</span>
                                                <span>{item.val}%</span>
                                            </div>
                                            <div className="h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${item.val}%`, backgroundColor: item.color }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Timeline */}
                    <div className="lg:col-span-1">
                        <Card variant="elevated" padding="lg" className="h-full">
                            <CardHeader>
                                <h3 className="text-lg font-bold text-text-primary mb-6">Order Timeline</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="relative pl-6 border-l-2 border-border-dashed space-y-8">
                                    {timelineData.map((item, i) => (
                                        <div key={i} className="relative">
                                            {/* Dot */}
                                            <div className={cn(
                                                "absolute -left-[31px] top-1 w-3 h-3 rounded-full ring-4 ring-background-surface",
                                                item.color === 'success' && "bg-success-500",
                                                item.color === 'primary' && "bg-primary-500",
                                                item.color === 'info' && "bg-info-500",
                                                item.color === 'warning' && "bg-warning-500",
                                                item.color === 'danger' && "bg-danger-500",
                                            )} />
                                            <div>
                                                <h4 className="text-sm font-bold text-text-primary leading-tight hover:underline cursor-pointer transition-all">{item.title}</h4>
                                                <p className="text-xs text-text-tertiary mt-1">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
