import { motion } from "framer-motion"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Star, TrendingUp, Search, LogOut, Volume2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useVocabulary } from "@/context/VocabularyContext"

export default function UserHome() {
    const { user, logout } = useAuth()
    const { words, toggleFavorite, favorites } = useVocabulary()

    // Get the two specific words for the "Today" section
    const todayWords = words.filter(w => w.english === "Ineffable" || w.english === "Ephemeral")

    const handleSpeak = (text, e) => {
        e.stopPropagation();
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="relative w-full max-w-md hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input className="pl-10 h-10 border-slate-200" placeholder="Search vocabulary..." />
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 hidden md:inline-flex">Premium Plan</Badge>
                        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
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

                <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Today's Words Section */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <BookOpen className="text-primary" size={22} />
                                    Today's 2 Words
                                </h2>
                                <span className="text-sm text-slate-500 font-medium">
                                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {todayWords.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden relative group">
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="secondary" className="rounded-md font-bold bg-slate-100 text-slate-600 border-none px-3 py-1">
                                                        {item.type || "Word"}
                                                    </Badge>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                                                            onClick={(e) => handleSpeak(item.english, e)}
                                                        >
                                                            <Volume2 size={18} />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => toggleFavorite(item.id)}
                                                            className={`h-9 w-9 transition-all rounded-full ${item.isFavorite
                                                                ? "text-amber-500 bg-amber-50"
                                                                : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                                                                }`}
                                                        >
                                                            <Star size={18} className={item.isFavorite ? "fill-amber-500" : ""} />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <CardTitle className="text-4xl font-black mt-2 tracking-tight text-slate-900 line-clamp-1">{item.english}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-slate-500 mb-6 text-lg leading-relaxed font-medium line-clamp-2">"{item.usage}"</p>

                                                <div className="space-y-4">
                                                    <div className="p-4 bg-linear-to-br from-primary/5 to-transparent rounded-xl border border-primary/10 group-hover:border-primary/20 transition-colors">
                                                        <span className="text-[10px] text-primary/60 font-black uppercase tracking-widest block mb-1">Bangla Meaning</span>
                                                        <span className="text-2xl font-black text-primary">{item.bangla}</span>
                                                    </div>

                                                    {(item.synonyms || item.antonyms) && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                                                            {item.synonyms && (
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-1.5 px-1">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">Synonyms</span>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {item.synonyms.map(syn => (
                                                                            <Badge key={syn} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100/50 text-xs py-1 px-3 font-bold rounded-lg transition-colors">
                                                                                {syn}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {item.antonyms && (
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-1.5 px-1">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                                                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">Antonyms</span>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {item.antonyms.map(ant => (
                                                                            <Badge key={ant} variant="secondary" className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100/50 text-xs py-1 px-3 font-bold rounded-lg transition-colors">
                                                                                {ant}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Quick Stats Grid */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-bold">
                            <Card className="border-slate-200 border shadow-none bg-white">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50">
                                            <TrendingUp size={28} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Learning Streak</p>
                                            <p className="text-3xl font-black text-slate-900 tracking-tight">12 Days</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-slate-200 border shadow-none bg-white">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100/50">
                                            <BookOpen size={28} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Total Words</p>
                                            <p className="text-3xl font-black text-slate-900 tracking-tight">{words.length + 422}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-slate-200 border shadow-none bg-white">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100/50">
                                            <Star size={28} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Favorite Words</p>
                                            <p className="text-3xl font-black text-slate-900 tracking-tight">{favorites.length + 32}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
