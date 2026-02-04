import { Github, Twitter, Linkedin } from "lucide-react"
import logo from "@/img and video/logo-without-bg.png"

export default function Footer() {
    return (
        <footer className="border-t bg-background py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="Vocaply" className="h-10 w-auto" />
                            <span className="text-xl font-bold tracking-tight">Vocaply</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Empowering learners to build their English to Bangla vocabulary seamlessly through modern technology.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Extension</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Web App</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                                <Github size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Vocaply. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
