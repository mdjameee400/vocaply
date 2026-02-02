import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const VocabularyContext = createContext();

// Helper function to get date string in YYYY-MM-DD format
const getDateString = (date = new Date()) => {
    return date.toISOString().split('T')[0];
};

// Helper function to calculate consecutive days between two dates
const getDaysDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const VocabularyProvider = ({ children }) => {
    const { user } = useAuth();

    // User stats state
    const [userStats, setUserStats] = useState({
        streak: 0,
        totalWordsLearned: 0,
        lastLoginDate: null,
        firstLoginDate: null
    });

    // Words for today (2 words per day)
    const allAvailableWords = [
        {
            id: 1,
            english: "Ineffable",
            bangla: "অকথ্য / বর্ণনাতীত",
            usage: "Too great or extreme to be expressed or described in words.",
            type: "Adjective",
            synonyms: ["indescribable", "unspeakable", "unutterable"],
            antonyms: ["expressible", "definable", "utterable"]
        },
        {
            id: 2,
            english: "Ephemeral",
            bangla: "অল্পস্থায়ী / ক্ষণস্থায়ী",
            usage: "Lasting for a very short time.",
            type: "Adjective",
            synonyms: ["fleeting", "transient", "short-lived"],
            antonyms: ["permanent", "eternal", "everlasting"]
        },
        {
            id: 3,
            english: "Resilient",
            bangla: "স্থিতিস্থাপক",
            usage: "He is a resilient person.",
            type: "Adjective",
            synonyms: ["flexible", "tough", "strong"],
            antonyms: ["fragile", "weak", "rigid"]
        },
        {
            id: 4,
            english: "Ambiguity",
            bangla: "অস্পষ্টতা",
            usage: "There is some ambiguity in the law.",
            type: "Noun",
            synonyms: ["vagueness", "uncertainty", "obscurity"],
            antonyms: ["clarity", "certainty", "precision"]
        },
        {
            id: 5,
            english: "Persistent",
            bangla: "অবিরাম",
            usage: "Persistent effort leads to success.",
            type: "Adjective",
            synonyms: ["determined", "tenacious", "relentless"],
            antonyms: ["inconsistent", "wavering", "yielding"]
        },
        {
            id: 6,
            english: "Vibrant",
            bangla: "স্পন্দিত",
            usage: "The city has a vibrant culture.",
            type: "Adjective",
            synonyms: ["lively", "energetic", "dynamic"],
            antonyms: ["dull", "lifeless", "boring"]
        },
        {
            id: 7,
            english: "Eloquent",
            bangla: "বাগ্মী",
            usage: "She gave an eloquent speech.",
            type: "Adjective",
            synonyms: ["articulate", "fluent", "expressive"],
            antonyms: ["inarticulate", "tongue-tied", "halting"]
        },
        {
            id: 8,
            english: "Pragmatic",
            bangla: "বাস্তববাদী",
            usage: "He took a pragmatic approach to the problem.",
            type: "Adjective",
            synonyms: ["practical", "realistic", "sensible"],
            antonyms: ["idealistic", "impractical", "unrealistic"]
        },
        {
            id: 9,
            english: "Tenacious",
            bangla: "অধ্যবসায়ী",
            usage: "A tenacious grip on the rope saved him.",
            type: "Adjective",
            synonyms: ["persistent", "determined", "stubborn"],
            antonyms: ["yielding", "weak", "irresolute"]
        },
        {
            id: 10,
            english: "Serendipity",
            bangla: "সৌভাগ্যজনক আবিষ্কার",
            usage: "Finding that book was pure serendipity.",
            type: "Noun",
            synonyms: ["luck", "fortune", "chance"],
            antonyms: ["misfortune", "design", "plan"]
        }
    ];

    // Words with isFavorite state
    const [words, setWords] = useState([]);

    // Load/initialize user data from Firestore on login
    useEffect(() => {
        const initializeUserData = async () => {
            if (!user || !db) {
                // Reset to default state when logged out
                setWords([]);
                setUserStats({
                    streak: 0,
                    totalWordsLearned: 0,
                    lastLoginDate: null,
                    firstLoginDate: null
                });
                return;
            }

            const today = getDateString();
            const userRef = doc(db, 'users', user.uid);

            try {
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const lastLogin = userData.stats?.lastLoginDate || null;
                    const firstLogin = userData.stats?.firstLoginDate || today;
                    let currentStreak = userData.stats?.streak || 1;
                    let totalWords = userData.stats?.totalWordsLearned || 2;
                    const savedFavorites = userData.favorites || [];

                    // Calculate streak & word growth based on ACTIVITY
                    if (lastLogin && lastLogin !== today) {
                        const daysDiff = getDaysDifference(lastLogin, today);

                        if (daysDiff === 1) {
                            // Consecutive day activity!
                            currentStreak += 1;
                            // Add 2 new words for this new active day
                            totalWords += 2;
                        } else if (daysDiff > 1) {
                            // Activity resumed after a break
                            currentStreak = 1; // Reset streak
                            totalWords += 2;   // Still discovered 2 new words today
                        }

                        // Update Firestore with new active stats
                        await updateDoc(userRef, {
                            'stats.streak': currentStreak,
                            'stats.totalWordsLearned': totalWords,
                            'stats.lastLoginDate': today,
                            'stats.lastActive': new Date()
                        });
                    }

                    // Show words based on how many the user has "unlocked" through activity
                    // If totalWords is 4, show first 4 words from the master list
                    const wordsToShow = Math.min(totalWords, allAvailableWords.length);

                    const wordsWithState = allAvailableWords.slice(0, wordsToShow).map((word, index) => ({
                        ...word,
                        isFavorite: savedFavorites.includes(word.id),
                        // Mark the last 2 unlocked words as "Today"
                        date: index >= wordsToShow - 2 ? 'Today' : 'Earlier'
                    }));

                    setWords(wordsWithState);
                    setUserStats({
                        streak: currentStreak,
                        totalWordsLearned: totalWords,
                        lastLoginDate: today,
                        firstLoginDate: firstLogin
                    });
                } else {
                    // New user - initialize everything
                    const initialWords = allAvailableWords.slice(0, 2).map(word => ({
                        ...word,
                        isFavorite: false,
                        date: 'Today'
                    }));

                    await setDoc(userRef, {
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        createdAt: new Date(),
                        favorites: [],
                        preferences: { targetLanguage: 'Bangla', theme: 'light', dailyGoal: 5 },
                        stats: {
                            totalWordsLearned: 2,
                            streak: 1,
                            lastLoginDate: today,
                            firstLoginDate: today,
                            lastActive: new Date()
                        }
                    });

                    setWords(initialWords);
                    setUserStats({
                        streak: 1,
                        totalWordsLearned: 2,
                        lastLoginDate: today,
                        firstLoginDate: today
                    });
                }
            } catch (error) {
                console.error("Error initializing user data:", error);
                // Fallback to local state with first 2 words
                const fallbackWords = allAvailableWords.slice(0, 2).map(word => ({
                    ...word,
                    isFavorite: false,
                    date: 'Today'
                }));
                setWords(fallbackWords);
                setUserStats({
                    streak: 1,
                    totalWordsLearned: 2,
                    lastLoginDate: today,
                    firstLoginDate: today
                });
            }
        };

        initializeUserData();
    }, [user]);

    // Toggle favorite and save to Firestore
    const toggleFavorite = async (id) => {
        setWords(prevWords =>
            prevWords.map(word =>
                word.id === id ? { ...word, isFavorite: !word.isFavorite } : word
            )
        );

        // Update Firestore
        if (user && db) {
            try {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const currentFavorites = userDoc.data().favorites || [];
                    const wordIndex = currentFavorites.indexOf(id);

                    let newFavorites;
                    if (wordIndex > -1) {
                        // Remove from favorites
                        newFavorites = currentFavorites.filter(fid => fid !== id);
                    } else {
                        // Add to favorites
                        newFavorites = [...currentFavorites, id];
                    }

                    await updateDoc(userRef, {
                        favorites: newFavorites
                    });
                }
            } catch (error) {
                console.error("Error updating favorites:", error);
            }
        }
    };

    // Get favorites
    const favorites = words.filter(w => w.isFavorite);

    // Get today's words (last 2 words shown)
    const todayWords = words.filter(w => w.date === 'Today');

    const value = {
        words,
        toggleFavorite,
        favorites,
        todayWords,
        userStats
    };

    return (
        <VocabularyContext.Provider value={value}>
            {children}
        </VocabularyContext.Provider>
    );
};

export const useVocabulary = () => {
    const context = useContext(VocabularyContext);
    if (!context) {
        throw new Error('useVocabulary must be used within a VocabularyProvider');
    }
    return context;
};
