import { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import logoVideo from '../img and video/logo-without-bg.png';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Ensure splash shows for at least 1 second for brand visibility
        const splashTimer = setTimeout(() => {
            setShowSplash(false);
        }, 1500);

        // Reduced safety timeout for faster failure recovery
        const timer = setTimeout(() => {
            if (loading) {
                setLoading(false);
            }
        }, 5000);

        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                setLoading(false);

                if (db) {
                    try {
                        const userRef = doc(db, 'users', firebaseUser.uid);
                        const userDoc = await getDoc(userRef);

                        if (!userDoc.exists()) {
                            await setDoc(userRef, {
                                email: firebaseUser.email,
                                displayName: firebaseUser.displayName,
                                photoURL: firebaseUser.photoURL,
                                createdAt: new Date(),
                                preferences: { targetLanguage: 'Bangla', theme: 'light', dailyGoal: 5 },
                                stats: { totalWords: 0, streak: 0, lastActive: new Date() }
                            });
                        }
                    } catch (error) {
                        console.error("Background sync error:", error);
                    }
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
            clearTimeout(timer);
            clearTimeout(splashTimer);
        };
    }, []);

    const loginWithEmail = (email, password) => {
        if (!auth) throw new Error("Firebase Auth is not initialized.");
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signupWithEmail = (email, password) => {
        if (!auth) throw new Error("Firebase Auth is not initialized.");
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        if (!auth) throw new Error("Firebase Auth is not initialized.");
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        if (!auth) return Promise.resolve();
        return signOut(auth);
    };

    const value = {
        user,
        loading: loading || showSplash,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            {(loading || showSplash) && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500">
                    <div className="relative h-24 w-24 mb-6">
                        <img
                            src={logoVideo}
                            alt="Vocaply"
                            className="h-full w-full object-contain animate-pulse scale-90"
                        />
                        <div className="absolute -inset-4 rounded-full border-4 border-slate-100 border-t-primary animate-spin" />
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-black tracking-tighter text-slate-900 mb-1">Vocaply</p>
                        <div className="h-1 w-12 bg-primary rounded-full animate-pulse mb-3" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                            Loading Experience
                        </p>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};
