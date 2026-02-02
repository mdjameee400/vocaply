import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './useAuth';

export const useProgress = () => {
    const { user } = useAuth();
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setProgress(null);
            setLoading(false);
            return;
        }

        const userRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(userRef, (snapshot) => {
            if (snapshot.exists()) {
                setProgress(snapshot.data().stats);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [user]);

    const recordWordLearned = async () => {
        if (!user) return;
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            'stats.totalWords': increment(1),
            'stats.lastActive': new Date()
        });
    };

    const updateStreak = async (newStreak) => {
        if (!user) return;
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            'stats.streak': newStreak
        });
    };

    return { progress, loading, recordWordLearned, updateStreak };
};
