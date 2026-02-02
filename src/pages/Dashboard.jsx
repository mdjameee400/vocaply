import { motion } from "framer-motion"
import Sidebar from "@/components/Dashboard/Sidebar"
import WordList from "@/components/Dashboard/WordList"
import { Button } from "@/components/ui/button"
import { Plus, LogOut, Home } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Link } from "react-router-dom"
import logo from "../img and video/logo-without-bg.png"

export default function Dashboard() {
    const { user, logout } = useAuth()

    return (
        <div className="flex h-screen bg-slate-50/50">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-white flex items-center justify-between px-4 sm:px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="lg:hidden">
                            <img src={logo} alt="Logo" className="h-8 w-auto" />
                        </Link>
                        <h1 className="text-xl font-bold hidden sm:block">My Vocabulary</h1>
                        <Link to="/" className="sm:hidden">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500">
                                <Home size={20} />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button className="gap-2 shadow-sm h-9 px-3 sm:px-4 text-sm sm:text-base">
                            <Plus size={18} /> <span className="hidden xs:inline">Add Word</span>
                        </Button>
                        <div className="h-8 w-px bg-slate-200 mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 leading-none">
                                    {user?.displayName || user?.email?.split('@')[0]}
                                </p>
                            </div>
                            <Button
                                onClick={logout}
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto"
                    >
                        <WordList />
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
