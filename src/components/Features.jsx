import { motion } from "framer-motion"
import {
    Zap,
    Search,
    BookOpen,
    Cloud,
    Smartphone,
    Clock
} from "lucide-react"

const features = [
    {
        title: "Instant Translation",
        description: "Highlight any English word on any website and get the Bangla translation instantly.",
        icon: Zap,
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        title: "Smart Search",
        description: "Powerful search engine to find words from your personal dictionary within seconds.",
        icon: Search,
        color: "text-purple-500",
        bg: "bg-purple-50"
    },
    {
        title: "Learn & Growth",
        description: "Track your progress and see how many new words you've learned each week.",
        icon: BookOpen,
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    },
    {
        title: "Cloud Sync",
        description: "Your vocabulary is synced across all your devices using Firebase Cloud Firestore.",
        icon: Cloud,
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        title: "Mobile Friendly",
        description: "Access your saved words on the go with our fully responsive web application.",
        icon: Smartphone,
        color: "text-rose-500",
        bg: "bg-rose-50"
    },
    {
        title: "History tracking",
        description: "Never lose a word. We keep a history of all your searches for quick reference.",
        icon: Clock,
        color: "text-cyan-500",
        bg: "bg-cyan-50"
    }
]

export default function Features() {
    return (
        <section id="features" className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight sm:text-5xl"
                    >
                        Everything you need to <br />
                        <span className="text-primary text-4xl sm:text-6xl font-extrabold italic">Grow Fast.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-lg text-muted-foreground"
                    >
                        Vocaply provides a suite of tools designed to help you master languages efficiently.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 rounded-2xl border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
