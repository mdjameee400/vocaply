import { motion } from "framer-motion"
import Sidebar from "@/components/Dashboard/Sidebar"
import WordList from "@/components/Dashboard/WordList"
import { Star } from "lucide-react"

export default function Favorites() {
    return (
        <div className="flex h-screen bg-slate-50/50">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-white flex items-center justify-between px-8">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Star className="text-amber-500 fill-amber-500" size={24} />
                        Favorite Words
                    </h1>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="bg-white rounded-2xl border p-8 text-center space-y-4 mb-8">
                            <div className="h-16 w-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                                <Star size={32} />
                            </div>
                            <h2 className="text-2xl font-bold">Your Golden Collection</h2>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Here are all the words you've marked as important. Keep practicing them to master your vocabulary.
                            </p>
                        </div>
                        <WordList onlyFavorites={true} />
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
