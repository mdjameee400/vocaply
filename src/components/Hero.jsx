import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import logo from "../img and video/logo-without-bg.png"

export default function Hero() {
    const { user } = useAuth()

    return (
        <div className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="container relative mx-auto px-4">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="outline" className="mb-8 border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm hover:bg-primary/10 transition-all cursor-default flex gap-2 items-center">
                            <Sparkles size={14} className="animate-pulse" />
                            Trusted by 10,000+ Students in Bangladesh
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl"
                    >
                        Browse Faster. <br />
                        <span className="bg-linear-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Learn Smarter.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 max-w-[750px] text-xl text-slate-500 sm:text-2xl leading-relaxed"
                    >
                        The ultimate Chrome extension for English learners. Translate any word on any website to Bangla instantly with a simple highlight.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-12 flex flex-col gap-5 sm:flex-row"
                    >
                        <Link to={user ? "/dashboard" : "/login"}>
                            <Button size="xl" className="h-16 px-10 text-xl font-bold gap-3 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95">
                                {user ? "Go to Dashboard" : "Get Started Now"} <ArrowRight size={22} />
                            </Button>
                        </Link>
                        <Button size="xl" variant="outline" className="h-16 px-10 text-xl font-bold gap-3 border-slate-200 hover:bg-slate-50 hover:-translate-y-1 transition-all active:scale-95">
                            <Download size={22} /> Add to Chrome
                        </Button>
                    </motion.div>

                    {/* Social Proof / Trust */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 flex items-center gap-4 text-sm font-medium text-slate-400"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-600 font-bold`}>
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <span>Join our growing community</span>
                    </motion.div>

                    {/* Large Mockup Image Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.3 }}
                        className="mt-20 w-full max-w-6xl rounded-4xl border-8 border-slate-900/5 bg-slate-900/5 p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] backdrop-blur-sm"
                    >
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner">
                            <div className="flex h-12 items-center border-b bg-slate-50/80 px-6 gap-3">
                                <div className="flex gap-2">
                                    <div className="h-3 w-3 rounded-full bg-rose-400" />
                                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                </div>
                                <div className="mx-auto rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-slate-400 border border-slate-100 shadow-sm flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    app.vocaply.com
                                </div>
                            </div>
                            <div className="aspect-video bg-slate-50 flex items-center justify-center relative group overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-blue-500/5" />
                                <div className="z-10 text-center flex flex-col items-center gap-6">
                                    <div className="p-4 bg-white rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce">
                                        <div className="h-10 w-auto flex items-center justify-center py-1">
                                            <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold text-slate-400 uppercase">New Word Added</p>
                                            <p className="text-lg font-bold text-slate-800">Ephemeral</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 font-medium italic">Interactive Dashboard Interface</p>
                                </div>

                                {/* Decorative Elements inside Mockup */}
                                <div className="absolute bottom-10 left-10 h-32 w-64 bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl" />
                                <div className="absolute top-20 right-10 h-48 w-48 bg-white/50 backdrop-blur-xl rounded-full border border-white/20 shadow-xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
