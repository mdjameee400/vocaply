
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate config
if (!firebaseConfig.apiKey) {
    console.error("❌ Error: Firebase Configuration is missing. Please check your .env file.");
    process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleWords = [
    { word: "Ineffable", meaning_bn: "অকথ্য / বর্ণনাতীত", sentence: "The beauty of the sunrise was ineffable.", synonyms: ["indescribable", "unspeakable"], antonyms: ["definable"], type: "Adjective" },
    { word: "Ephemeral", meaning_bn: "ক্ষণস্থায়ী", sentence: "Fame is often ephemeral.", synonyms: ["fleeting", "short-lived"], antonyms: ["permanent"], type: "Adjective" },
    { word: "Resilient", meaning_bn: "স্থিতিস্থাপক", sentence: "He is a resilient person who bounces back from failure.", synonyms: ["tough", "strong"], antonyms: ["fragile"], type: "Adjective" },
    { word: "Eloquence", meaning_bn: "বাগ্মিতা", sentence: "His eloquence moved the audience to tears.", synonyms: ["fluency", "articulation"], antonyms: ["ineloquence"], type: "Noun" },
    { word: "Pragmatic", meaning_bn: "বাস্তববাদী", sentence: "We need a pragmatic approach to this problem.", synonyms: ["practical", "realistic"], antonyms: ["idealistic"], type: "Adjective" },
    { word: "Serendipity", meaning_bn: "কাকতালীয় সৌভাগ্য", sentence: "It was pure serendipity that we met today.", synonyms: ["luck", "fluke"], antonyms: ["misfortune"], type: "Noun" },
    { word: "Tenacious", meaning_bn: "অধ্যবসায়ী", sentence: "She is tenacious in pursuing her dreams.", synonyms: ["persistent", "stubborn"], antonyms: ["yielding"], type: "Adjective" },
    { word: "Vibrant", meaning_bn: "প্রাণবন্ত", sentence: "The city has a vibrant nightlife.", synonyms: ["lively", "energetic"], antonyms: ["dull"], type: "Adjective" },
    { word: "Ambiguity", meaning_bn: "অস্পষ্টতা", sentence: "There is some ambiguity in the instructions.", synonyms: ["vagueness", "uncertainty"], antonyms: ["clarity"], type: "Noun" },
    { word: "Persistent", meaning_bn: "নাছোড়বান্দা", sentence: "The persistent rain ruined our holiday.", synonyms: ["relentless", "continuous"], antonyms: ["intermittent"], type: "Adjective" }
];

const seed = async () => {
    const today = new Date().toISOString().split('T')[0];
    console.log(`🚀 Starting seeding for project: ${firebaseConfig.projectId}`);
    console.log(`📅 Seeding words for today: ${today} and next 7 days...`);

    const dailyWordsRef = collection(db, 'daily_words');

    for (let i = 0; i < 8; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];

        const q = query(dailyWordsRef, where("date", "==", dateStr));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            console.log(`⏩ Words already exist for ${dateStr}, skipping...`);
            continue;
        }

        for (let order = 1; order <= 2; order++) {
            const wordIndex = (i * 2 + (order - 1)) % sampleWords.length;
            const word = sampleWords[wordIndex];

            await addDoc(dailyWordsRef, {
                ...word,
                date: dateStr,
                order: order,
                createdAt: serverTimestamp()
            });
            console.log(`✅ Added word: ${word.word} for ${dateStr} (Order: ${order})`);
        }
    }
    console.log("✨ Seeding complete!");
    process.exit(0);
};

seed().catch(err => {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
});
