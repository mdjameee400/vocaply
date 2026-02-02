import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import logo from "../img and video/logo-without-bg.png"

export default function Navbar() {
    const { user, logout } = useAuth()

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-md"
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logo} alt="Vocaply Logo" className="h-9 w-auto group-hover:scale-110 transition-transform drop-shadow-sm" />
                    <span className="text-2xl font-bold tracking-tight text-slate-900">
                        Vocaply
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <a href="#features" className="text-sm font-semibold text-slate-500 transition-colors hover:text-primary">
                        Features
                    </a>
                    <a href="#extension" className="text-sm font-semibold text-slate-500 transition-colors hover:text-primary">
                        Extension
                    </a>
                    <a href="#about" className="text-sm font-semibold text-slate-500 transition-colors hover:text-primary">
                        About
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="hidden sm:block">
                                <Button variant="ghost" className="gap-2 font-semibold text-slate-600 hover:text-primary">
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Button>
                            </Link>

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="hidden text-right md:block">
                                    <p className="text-sm font-bold text-slate-900 leading-none">
                                        {user.displayName || user.email?.split('@')[0]}
                                    </p>
                                    <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
                                        Active Student
                                    </p>
                                </div>
                                <div className="h-9 w-9 rounded-full bg-linear-to-tr from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10 overflow-hidden shadow-sm">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-primary font-bold text-sm">
                                            {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <Button
                                    onClick={logout}
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all ml-1"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" className="hidden sm:inline-flex font-semibold text-slate-600">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </motion.nav>
    )
}
