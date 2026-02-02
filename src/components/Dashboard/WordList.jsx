import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Volume2, Star } from "lucide-react"
import { useVocabulary } from "@/context/VocabularyContext"

export default function WordList({ onlyFavorites = false }) {
    const { words, toggleFavorite, favorites } = useVocabulary()

    const displayWords = onlyFavorites ? favorites : words

    const handleSpeak = (text, e) => {
        e.stopPropagation();
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9; // Slightly slower for clarity
            window.speechSynthesis.speak(utterance);
        }
    }

    if (displayWords.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No words found in this section.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {displayWords.map((word) => (
                <Card key={word.id} className="px-6 py-5 transition-all hover:shadow-lg hover:border-primary/20 cursor-default border-slate-200 group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold text-slate-900 leading-tight">{word.english}</span>
                                    <button
                                        onClick={(e) => handleSpeak(word.english, e)}
                                        className="p-2 bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary rounded-full transition-all active:scale-90"
                                    >
                                        <Volume2 size={18} />
                                    </button>
                                </div>
                                <span className="text-lg text-primary font-bold mt-0.5">{word.bangla}</span>
                            </div>
                            <div className="h-10 w-px bg-slate-100 hidden md:block" />
                            <div className="hidden md:block max-w-sm">
                                <p className="text-sm text-slate-500 italic font-medium leading-relaxed">"{word.usage}"</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold px-3 py-1 text-[11px] uppercase tracking-wider">
                                {word.date}
                            </Badge>
                            <button
                                onClick={() => toggleFavorite(word.id)}
                                className={`p-2 rounded-lg transition-all active:scale-90 ${word.isFavorite
                                        ? "bg-amber-50 text-amber-500 hover:bg-amber-100"
                                        : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                    }`}
                            >
                                <Star size={18} className={word.isFavorite ? "fill-amber-500" : ""} />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
