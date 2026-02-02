import { motion } from "framer-motion"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Calendar, Award, Zap } from "lucide-react"

export default function Progress() {
    const stats = [
        { label: "Words Learned", value: "324", change: "+12% this week", icon: Award, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Study Time", value: "14.5h", change: "+2h today", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Quiz Score", value: "92%", change: "Top 5% of users", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    ]

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b bg-white flex items-center justify-between px-8">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <LineChart className="text-primary" size={24} />
                        Learning Progress
                    </h1>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, idx) => (
                                <Card key={idx} className="border-slate-200">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-slate-500">{stat.label}</CardTitle>
                                        <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                                            <stat.icon size={20} />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{stat.value}</div>
                                        <p className="text-xs text-slate-400 mt-1 font-medium">{stat.change}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="border-slate-200">
                            <CardHeader>
                                <CardTitle>Vocabulary Growth</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium italic">
                                    [ Interactive Chart will be rendered here ]
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle>Milestones</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">#{i}</div>
                                            <div>
                                                <p className="font-bold">Reached {i * 100} Words</p>
                                                <p className="text-sm text-slate-500">Completed on Jan {10 + i}, 2024</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle>Top Categories</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {["Business", "Academic", "Daily Use"].map((cat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium">{cat}</span>
                                                <span className="text-slate-500">{90 - (i * 15)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${90 - (i * 15)}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
