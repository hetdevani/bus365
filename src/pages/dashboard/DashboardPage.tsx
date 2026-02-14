import { PageLayout } from '../../designSystem/layouts/PageLayout';
import { Card, CardHeader, CardContent } from '../../designSystem/components/Card';
import { AreaChartComponent } from '../../designSystem/charts';

// --- Components ---

function WelcomeCard() {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 relative overflow-hidden rounded-2xl bg-[#C8FACD] text-primary-900 p-8 flex items-center shadow-lg">
            <div className="z-10 max-w-md">
                <h3 className="text-2xl font-black mb-2">Welcome back_! <br /> Minimal UI</h3>
                <p className="opacity-80 mb-6 font-medium leading-relaxed">
                    If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.
                </p>
                <button className="px-6 py-2.5 bg-[#007B55] text-white font-bold rounded-lg shadow-lg hover:bg-[#004B50] transition-colors">
                    Go Now
                </button>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute right-0 bottom-0 h-full w-1/2 pointer-events-none">
                {/* Abstract Shapes or Illustration Placeholder */}
                <div className="absolute right-10 bottom-10 w-64 h-64 bg-white/40 rounded-full blur-3xl" />
                <div className="absolute right-20 top-10 w-40 h-40 bg-primary-500/20 rounded-full blur-2xl" />
                {/* Illustration Image */}
                <img
                    src="/minimals_login_illustration.png"
                    alt="Welcome"
                    className="absolute right-4 bottom-0 h-[90%] object-contain drop-shadow-xl transform translate-x-10"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            </div>
        </div>
    );
}

import { MiniChartCard } from '../../designSystem/components/Card';

/**
 * Dashboard Page
 */
export default function DashboardPage() {
    // Mock Data
    const revenueData = [
        { name: 'Jan', revenue: 12, profit: 10 },
        { name: 'Feb', revenue: 19, profit: 15 },
        { name: 'Mar', revenue: 3, profit: 5 },
        { name: 'Apr', revenue: 5, profit: 2 },
        { name: 'May', revenue: 2, profit: 3 },
        { name: 'Jun', revenue: 3, profit: 5 },
        { name: 'Jul', revenue: 15, profit: 12 },
        { name: 'Aug', revenue: 25, profit: 18 },
        { name: 'Sep', revenue: 18, profit: 14 },
    ];

    return (
        <PageLayout title="Dashboard" showPageHeader={false}>
            <div className="space-y-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Welcome Card - Spans 2 columns on large screens if we wanted, but sticking to 3-col grid logic */}
                    <div className="lg:col-span-2">
                        <WelcomeCard />
                    </div>

                    {/* Featured App - Placeholder for 'Karla' style card */}
                    <Card variant="elevated" className="bg-gradient-to-br from-[#1a2138] to-[#121624] text-white border-0 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://api-prod.minimalcc.com/assets/images/cover/cover_18.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                            <img src="/assets/icons/app/ic_chrome.svg" className="w-12 h-12 mb-4" onError={(e) => ((e.target as any).style.display = 'none')} alt="" />
                            <div>
                                <h4 className="text-lg font-bold">Featured App</h4>
                                <p className="opacity-70 text-sm mt-1">Apply these 5 distinct changes.</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Mini Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MiniChartCard
                        title="Total Active Users"
                        total="18,765"
                        percent={2.6}
                        chartData={[10, 41, 35, 51, 49, 62, 69, 91, 148]}
                        chartColor="#00A76F"
                        type="bar"
                    />
                    <MiniChartCard
                        title="Total Installed"
                        total="4,876"
                        percent={0.2}
                        chartData={[10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34]}
                        chartColor="#00B8D9"
                        type="area"
                    />
                    <MiniChartCard
                        title="Total Downloads"
                        total="678"
                        percent={-0.1}
                        chartData={[10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34].reverse()}
                        chartColor="#FF5630"
                        type="area"
                    />
                </div>

                {/* Main Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card variant="elevated" padding="lg">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary">Current Download</h3>
                                        <p className="text-sm text-text-secondary">Overall progress</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <AreaChartComponent
                                    data={revenueData}
                                    areas={[
                                        { dataKey: 'revenue', name: 'Mac', color: '#00A76F' },
                                        { dataKey: 'profit', name: 'Windows', color: '#FFAB00' }
                                    ]}
                                    height={320}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card variant="elevated" padding="lg" className="h-full">
                            <CardHeader>
                                <h3 className="text-lg font-bold text-text-primary mb-6">Area Installed</h3>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {[
                                    { country: 'Germany', val: 78, flag: '🇩🇪' },
                                    { country: 'England', val: 54, flag: '🇬🇧' },
                                    { country: 'France', val: 23, flag: '🇫🇷' },
                                    { country: 'Korean', val: 12, flag: '🇰🇷' },
                                    { country: 'USA', val: 45, flag: '🇺🇸' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <span className="text-xl">{item.flag}</span>
                                        <span className="flex-1 font-medium text-text-secondary">{item.country}</span>
                                        <div className="flex items-center gap-2 min-w-[100px]">
                                            <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${item.val}%`,
                                                        backgroundColor: i % 2 === 0 ? '#00A76F' : '#FFAB00'
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-text-primary">{item.val}k</span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
