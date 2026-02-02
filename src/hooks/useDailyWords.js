import { useState, useEffect } from 'react';
import {
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    limit,
    getDocs,
    where
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './useAuth';

export const useDailyWords = () => {
    const { user } = useAuth();
    const [dailyWords, setDailyWords] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTodayId = () => {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    };

    useEffect(() => {
        const fetchDailyWords = async () => {
            if (!user) return;

            const todayId = getTodayId();
            const dailyRef = doc(db, 'users', user.uid, 'dailySelections', todayId);
            const dailyDoc = await getDoc(dailyRef);

            if (dailyDoc.exists()) {
                setDailyWords(dailyDoc.data().words);
            } else {
                // Pick 2 random words from global dictionary
                // For production, we'd have a large dictionary collection
                // Here we simulate the selection
                const dictionaryRef = collection(db, 'dictionary');
                const q = query(dictionaryRef, limit(10)); // Simplified random selection
                const snapshot = await getDocs(q);

                let words = snapshot.docs.map(d => d.data());

                // Fallback if dictionary is empty (for demo/initial setup)
                if (words.length < 2) {
                    words = [
                        { word: "Resilient", bangla: "স্থিতিস্থাপক", meaning: "Able to withstand or recover quickly from difficult conditions." },
                        { word: "Ineffable", bangla: "অকথ্য", meaning: "Too great or extreme to be expressed in words." }
                    ];
                }

                const selectedWords = words.sort(() => 0.5 - Math.random()).slice(0, 2);

                await setDoc(dailyRef, {
                    words: selectedWords,
                    date: new Date(),
                    completed: false
                });

                setDailyWords(selectedWords);
            }
            setLoading(false);
        };

        fetchDailyWords();
    }, [user]);

    return { dailyWords, loading };
};
