import { useState, useEffect } from 'react';
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './useAuth';

export const useVocabulary = () => {
    const { user } = useAuth();
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setWords([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'vocabulary'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const wordsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setWords(wordsData);
            setLoading(false);
        });

        return unsubscribe;
    }, [user]);

    const addWord = async (wordData) => {
        if (!user) return;
        return await addDoc(collection(db, 'vocabulary'), {
            ...wordData,
            userId: user.uid,
            isFavorite: false,
            status: 'learning', // learning | mastered
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    };

    const toggleFavorite = async (wordId, currentStatus) => {
        const wordRef = doc(db, 'vocabulary', wordId);
        return await updateDoc(wordRef, {
            isFavorite: !currentStatus,
            updatedAt: serverTimestamp()
        });
    };

    const updateWordStatus = async (wordId, status) => {
        const wordRef = doc(db, 'vocabulary', wordId);
        return await updateDoc(wordRef, {
            status,
            updatedAt: serverTimestamp()
        });
    };

    const deleteWord = async (wordId) => {
        const wordRef = doc(db, 'vocabulary', wordId);
        return await deleteDoc(wordRef);
    };

    return { words, loading, addWord, toggleFavorite, updateWordStatus, deleteWord };
};
