import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Footer from "@/components/Footer"
import { useAuth } from "@/hooks/useAuth"
import UserHome from "./UserHome"

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <Hero />
                <Features />
            </main>
            <Footer />
        </div>
    )
}
