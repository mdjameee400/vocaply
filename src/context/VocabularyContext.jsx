import { createContext, useContext, useState, useEffect } from 'react';

const VocabularyContext = createContext();

export const VocabularyProvider = ({ children }) => {
    // Initial dummy data with isFavorite state
    const [words, setWords] = useState(() => {
        const defaultWords = [
            { id: 1, english: "Resilient", bangla: "স্থিতিস্থাপক", usage: "He is a resilient person.", date: "2 mins ago", isFavorite: false },
            { id: 2, english: "Ambiguity", bangla: "অস্পষ্টতা", usage: "There is some ambiguity in the law.", date: "1 hour ago", isFavorite: true },
            { id: 3, english: "Persistent", bangla: "অবিরাম", usage: "Persistent effort leads to success.", date: "Yesterday", isFavorite: false },
            { id: 4, english: "Vibrant", bangla: "স্পন্দিত", usage: "The city has a vibrant culture.", date: "2 days ago", isFavorite: false },
            {
                id: 5,
                english: "Ineffable",
                bangla: "অকথ্য / বর্ণনাতীত",
                usage: "Too great or extreme to be expressed or described in words.",
                date: "Today",
                isFavorite: false,
                type: "Adjective",
                synonyms: ["indescribable", "unspeakable", "unutterable"],
                antonyms: ["expressible", "definable", "utterable"]
            },
            {
                id: 6,
                english: "Ephemeral",
                bangla: "অল্পস্থায়ী / ক্ষণস্থায়ী",
                usage: "Lasting for a very short time.",
                date: "Today",
                isFavorite: false,
                type: "Adjective",
                synonyms: ["fleeting", "transient", "short-lived"],
                antonyms: ["permanent", "eternal", "everlasting"]
            },
        ];

        const saved = localStorage.getItem('vocaply_words');
        if (!saved) return defaultWords;

        const parsedSaved = JSON.parse(saved);

        // Ensure the newly added words exist and have synonyms/antonyms in the saved list
        const coreWords = ["Ineffable", "Ephemeral"];

        const updatedWords = parsedSaved.map(word => {
            const defaultWord = defaultWords.find(dw => dw.english === word.english);
            if (defaultWord && (!word.synonyms || !word.antonyms)) {
                return { ...word, ...defaultWord, isFavorite: word.isFavorite }; // keep user's favorite status
            }
            return word;
        });

        const missingWords = defaultWords.filter(dw =>
            coreWords.includes(dw.english) && !updatedWords.some(ps => ps.english === dw.english)
        );

        return [...updatedWords, ...missingWords];
    });

    useEffect(() => {
        localStorage.setItem('vocaply_words', JSON.stringify(words));
    }, [words]);

    const toggleFavorite = (id) => {
        setWords(prevWords =>
            prevWords.map(word =>
                word.id === id ? { ...word, isFavorite: !word.isFavorite } : word
            )
        );
    };

    const value = {
        words,
        toggleFavorite,
        favorites: words.filter(w => w.isFavorite)
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
