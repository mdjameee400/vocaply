import { motion } from "framer-motion"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Users, Globe, Database, Settings } from "lucide-react"

export default function AdminPanel() {
    const stats = [
        { label: "Total Users", value: "1,284", icon: Users, color: "text-blue-500" },
        { label: "Total Words DB", value: "45,000+", icon: Database, color: "text-emerald-500" },
        { label: "API Requests", value: "12k/day", icon: Globe, color: "text-purple-500" },
    ]

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b bg-white flex items-center justify-between px-8">
                    <h1 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                        <ShieldCheck className="text-primary" size={24} />
                        Global Administration
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Live</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, idx) => (
                                <Card key={idx} className="border-slate-200 shadow-sm">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-12 w-12 rounded-xl bg-slate-50 ${stat.color} flex items-center justify-center`}>
                                                <stat.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                                <p className="text-2xl font-bold">{stat.value}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="border-slate-200">
                                <CardHeader className="border-b">
                                    <CardTitle>Recent User Signups</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">U{i}</div>
                                                    <div className="text-sm">
                                                        <p className="font-bold">user_{649 + i}@gmail.com</p>
                                                        <p className="text-slate-400">Joined 2 hours ago</p>
                                                    </div>
                                                </div>
                                                <button className="text-sm font-bold text-primary hover:underline">Manage</button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-slate-200">
                                <CardHeader className="border-b">
                                    <CardTitle>System Logs</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="bg-slate-900 rounded-xl p-6 font-mono text-xs text-emerald-400 h-[300px] overflow-y-auto space-y-2">
                                        <p>[INFO] Firebase connection established...</p>
                                        <p>[AUTH] User session validated: uid_4829...</p>
                                        <p className="text-amber-400 font-bold">[WARN] API rate limit approaching for Google Translate...</p>
                                        <p>[DATA] Word 'Episodic' added to global dictionary...</p>
                                        <p>[INFO] Daily digest sent to 842 users...</p>
                                        <p>[INFO] Cache cleared successfully.</p>
                                        <p className="text-blue-400">&gt;&gt; Waiting for input...</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
