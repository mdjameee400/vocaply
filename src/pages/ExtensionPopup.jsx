import { motion } from "framer-motion"
import { Play, Pause, Plus, ChevronDown, MoreHorizontal, Clock, Settings, BookMarked } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ExtensionPopup() {
    const recentTranslations = [
        { word: "User Research", type: "Folder", val: "32:28", icon: BookMarked },
        { word: "Use Sketch to make...", type: "Action", val: "26:29", icon: null },
        { word: "Animation", type: "Folder", val: "01:46:37", icon: BookMarked },
    ]

    return (
        <div className="w-[380px] h-[600px] bg-white border shadow-2xl rounded-2xl overflow-hidden flex flex-col font-sans">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Vocabulary Tracker</span>
                    <ChevronDown size={16} className="text-slate-400" />
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                    <Settings size={18} />
                </button>
            </div>

            {/* Timer Section (Main visual) */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-8 text-center flex flex-col items-center justify-center space-y-6">
                    <h1 className="text-6xl font-extrabold tracking-tight tabular-nums text-slate-900">00:10:25</h1>
                    <div className="flex items-center gap-4">
                        <button className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                            <Pause size={28} fill="currentColor" />
                        </button>
                        <button className="h-12 w-12 rounded-full border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-all">
                            <Plus size={24} />
                        </button>
                    </div>
                </div>

                {/* Translation List */}
                <div className="px-4 pb-4 space-y-6 mt-4">
                    {/* Date Divider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
                            <span>Wed, May 27</span>
                            <span className="text-slate-900">Total: 02:55:59</span>
                        </div>

                        {/* Active Item */}
                        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="font-bold flex-1 truncate max-w-[180px]">Discuss project with...</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-mono opacity-80">00:10:25</span>
                                <Pause size={18} className="cursor-pointer" />
                            </div>
                        </div>

                        {/* Inactive Items */}
                        {recentTranslations.map((item, idx) => (
                            <div key={idx} className="bg-white border hover:border-primary/50 hover:bg-slate-50 p-4 rounded-xl transition-all cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {item.icon && <item.icon size={18} className="text-slate-400" />}
                                        {!item.icon && <div className="h-4.5 w-4.5 bg-slate-100 rounded" />}
                                        <span className="font-bold text-slate-700 leading-none">{item.word}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                                        <span>{item.val}</span>
                                        <Play size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Previous Day */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
                            <span>Tue, May 26</span>
                            <span className="text-slate-900">Total: 01:00:35</span>
                        </div>
                        <div className="bg-white border p-4 rounded-xl flex items-center justify-between">
                            <span className="font-bold text-slate-700">Prepare mindmap</span>
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <span>28:17</span>
                                <Play size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
