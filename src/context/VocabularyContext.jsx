import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, orderBy, serverTimestamp, documentId } from 'firebase/firestore';

const VocabularyContext = createContext();

// Helper function to get date string in YYYY-MM-DD format (Local Time)
const getDateString = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

    // Today's words from Firestore
    const [todayWords, setTodayWords] = useState([]);
    const [loadingTodayWords, setLoadingTodayWords] = useState(true);

    // Store full details of favorite words for search/display
    const [favoritesData, setFavoritesData] = useState([]);

    // Fetch today's words from Firestore
    useEffect(() => {
        const fetchDailyWords = async () => {
            if (!db) return;

            setLoadingTodayWords(true);
            const today = getDateString();

            try {
                const dailyWordsRef = collection(db, 'daily_words');
                // Remove orderBy to avoid composite index requirement
                const q = query(
                    dailyWordsRef,
                    where('date', '==', today)
                );

                const querySnapshot = await getDocs(q);
                let fetchedWords = [];
                querySnapshot.forEach((doc) => {
                    fetchedWords.push({ id: doc.id, ...doc.data() });
                });

                // Sort in-memory instead of in query
                fetchedWords.sort((a, b) => (a.order || 0) - (b.order || 0));

                console.log(`Fetched ${fetchedWords.length} words for date: ${today}`);

                // Map to consistent format and handle favorites if user is logged in
                const formattedWords = fetchedWords.map(word => ({
                    ...word,
                    english: word.word,
                    bangla: word.meaning_bn,
                    usage: word.sentence,
                    isFavorite: user ? (userStats.favorites || []).includes(word.id) : false
                }));

                setTodayWords(formattedWords);
            } catch (error) {
                console.error("Error fetching daily words:", error);
                setTodayWords([]);
            } finally {
                setLoadingTodayWords(false);
            }
        };

        fetchDailyWords();
    }, [db, user, userStats.favorites]);

    // Update user stats with daily logic (simplified for the new system)
    useEffect(() => {
        const syncUserStats = async () => {
            if (!user || !db) return;

            const today = getDateString();
            const userRef = doc(db, 'users', user.uid);

            try {
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const lastLogin = userData.stats?.lastLoginDate || null;
                    let currentStreak = userData.stats?.streak || 1;
                    let totalWords = userData.stats?.totalWordsLearned || 0;

                    if (lastLogin && lastLogin !== today) {
                        const daysDiff = getDaysDifference(lastLogin, today);
                        if (daysDiff === 1) {
                            currentStreak += 1;
                        } else {
                            currentStreak = 1;
                        }

                        // Update total words - assuming 2 new words per active day
                        totalWords += 2;

                        await updateDoc(userRef, {
                            'stats.streak': currentStreak,
                            'stats.totalWordsLearned': totalWords,
                            'stats.lastLoginDate': today,
                            'stats.lastActive': serverTimestamp()
                        });
                    }

                    setUserStats(prev => ({
                        ...prev,
                        streak: currentStreak,
                        totalWordsLearned: totalWords,
                        favorites: userData.favorites || []
                    }));
                } else {
                    // Initialize new user
                    await setDoc(userRef, {
                        email: user.email,
                        createdAt: serverTimestamp(),
                        favorites: [],
                        stats: {
                            totalWordsLearned: 2,
                            streak: 1,
                            lastLoginDate: today,
                            lastActive: serverTimestamp()
                        }
                    });
                    setUserStats({
                        streak: 1,
                        totalWordsLearned: 2,
                        favorites: []
                    });
                }
            } catch (error) {
                console.error("Error syncing user stats:", error);
            }
        };

        syncUserStats();
    }, [user, db]);

    // Fetch details for favorite words whenever userStats.favorites changes
    useEffect(() => {
        const fetchFavoritesDetails = async () => {
            if (!db || !userStats.favorites || userStats.favorites.length === 0) {
                setFavoritesData([]);
                return;
            }

            try {
                // Firestore 'in' query supports up to 10 items. 
                // Since favorites can be many, we might need to batch or fetch individually.
                // For simplicity and scalability with potentially many favorites, let's fetch individual/batch.
                // A scalable app might duplicate this data or use a better search index (Algolia).
                // Here, we'll fetch them because the list is likely small (<100) for a prototype.

                const dailyWordsRef = collection(db, 'daily_words');

                // Chunking into batches of 10 for 'in' query
                const chunks = [];
                const favIds = userStats.favorites;
                for (let i = 0; i < favIds.length; i += 10) {
                    chunks.push(favIds.slice(i, i + 10));
                }

                let allFavWords = [];
                for (const chunk of chunks) {
                    const q = query(dailyWordsRef, where(documentId(), 'in', chunk));
                    const snapshot = await getDocs(q);
                    snapshot.forEach(doc => {
                        allFavWords.push({ id: doc.id, ...doc.data() });
                    });
                }

                const formattedFavs = allFavWords.map(word => ({
                    ...word,
                    english: word.word,
                    bangla: word.meaning_bn,
                    usage: word.sentence,
                    isFavorite: true
                }));

                setFavoritesData(formattedFavs);

            } catch (error) {
                console.error("Error fetching favorite details:", error);
            }
        };

        fetchFavoritesDetails();
    }, [userStats.favorites, db]);

    // Toggle favorite and save to Firestore
    const toggleFavorite = async (wordId) => {
        if (!user || !db) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const currentFavorites = userDoc.data().favorites || [];
                const isAlreadyFavorite = currentFavorites.includes(wordId);

                let newFavorites;
                if (isAlreadyFavorite) {
                    newFavorites = currentFavorites.filter(id => id !== wordId);
                } else {
                    newFavorites = [...currentFavorites, wordId];
                }

                await updateDoc(userRef, { favorites: newFavorites });

                // Update local state immediately for UI responsiveness
                setUserStats(prev => ({ ...prev, favorites: newFavorites }));
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    // Favorites derived from userStats.favorites and a potential dictionary (omitted for brevity, or just filter todayWords)
    const favoriteWords = []; // Logic to fetch full word details for favorites would go here

    const value = {
        todayWords,
        loadingTodayWords,
        toggleFavorite,
        favorites: userStats.favorites || [],
        favoritesData, // Exposed for search
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
