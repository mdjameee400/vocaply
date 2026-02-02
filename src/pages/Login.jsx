import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import logo from "../img and video/logo-without-bg.png"

export default function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

    const { loginWithEmail, signupWithEmail, loginWithGoogle, user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            if (isLogin) {
                await loginWithEmail(email, password)
            } else {
                await signupWithEmail(email, password)
            }
            navigate("/")
        } catch (err) {
            setError(err.message.replace("Firebase: ", ""))
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError("")
        setIsGoogleLoading(true)
        try {
            await loginWithGoogle()
            navigate("/")
        } catch (err) {
            setError(err.message.replace("Firebase: ", ""))
        } finally {
            setIsGoogleLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 py-12">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="flex justify-center mb-10">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={logo} alt="Vocaply Logo" className="h-14 w-auto drop-shadow-lg group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-3xl tracking-tight text-slate-900">Vocaply</span>
                    </Link>
                </div>

                <Card className="border-slate-200/60 shadow-2xl backdrop-blur-sm bg-white/80">
                    <CardHeader className="space-y-1 text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? "login" : "signup"}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CardTitle className="text-2xl font-bold tracking-tight">
                                    {isLogin ? "Welcome back" : "Create an account"}
                                </CardTitle>
                                <CardDescription className="text-slate-500">
                                    {isLogin
                                        ? "Enter your credentials to access your vocabulary"
                                        : "Start your language learning journey today"}
                                </CardDescription>
                            </motion.div>
                        </AnimatePresence>
                    </CardHeader>

                    <CardContent className="grid gap-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="flex items-center gap-2 p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-lg border border-destructive/20"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="h-11 bg-white/50 border-slate-200 focus:bg-white transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-11 bg-white/50 border-slate-200 focus:bg-white transition-colors"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-11 text-base font-semibold shadow-md active:scale-[0.98] transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? "Sign In" : "Sign Up")}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full h-11 gap-3 font-medium border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
                            onClick={handleGoogleLogin}
                            disabled={isGoogleLoading}
                        >
                            {isGoogleLoading ? <Loader2 className="animate-spin" size={18} /> : (
                                <>
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </>
                            )}
                        </Button>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 border-t border-slate-50 pt-6">
                        <div className="text-center text-sm text-slate-500">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary hover:underline font-semibold"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </div>
                        {isLogin && (
                            <Link to="/forgot-password" size="sm" className="text-sm text-primary hover:underline font-semibold mx-auto">
                                Forgot password?
                            </Link>
                        )}
                    </CardFooter>
                </Card>

                <p className="mt-8 text-center text-xs text-slate-400">
                    By continuing, you agree to Vocaply's{" "}
                    <Link to="/terms" className="underline hover:text-slate-600 transition-colors">Terms of Service</Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</Link>.
                </p>
            </motion.div>
        </div>
    )
}
