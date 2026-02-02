import {
    Home,
    LayoutDashboard,
    BookMarked,
    History,
    Settings,
    LogOut,
    Star,
    LineChart,
    ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useVocabulary } from "@/context/VocabularyContext"
import logo from "../../img and video/logo-without-bg.png"

export default function Sidebar() {
    const location = useLocation()
    const { logout } = useAuth()
    const { favorites } = useVocabulary()

    const menuItems = [
        { icon: Home, label: "Home", path: "/" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: Star, label: "Favorites", path: "/favorites", badge: favorites.length },
    ]

    return (
        <aside className="w-64 border-r bg-white hidden lg:flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <img src={logo} alt="Vocaply Logo" className="h-8 w-auto px-1" />
                <span className="font-bold text-xl tracking-tight text-slate-900">Vocaply</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all transform hover:translate-x-1",
                                isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon size={20} />
                            <span className="flex-1">{item.label}</span>
                            {item.badge !== undefined && item.badge > 0 && (
                                <span className={cn(
                                    "min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full text-xs font-bold",
                                    isActive
                                        ? "bg-white/20 text-white"
                                        : "bg-amber-100 text-amber-600"
                                )}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    )
}
