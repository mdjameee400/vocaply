const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

/**
 * Scheduled function to reset daily goals or cleanup old data.
 * Runs every day at midnight.
 */
exports.dailyCleanup = functions.pubsub.schedule("0 0 * * *")
    .timeZone("Asia/Dhaka")
    .onRun(async (context) => {
        const usersSnapshot = await db.collection("users").get();

        const batch = db.batch();
        usersSnapshot.forEach((userDoc) => {
            const lastActive = userDoc.data().stats.lastActive.toDate();
            const today = new Date();
            const diffInDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

            // Reset streak if inactive for more than 1 day
            if (diffInDays > 1) {
                batch.update(userDoc.ref, {
                    "stats.streak": 0
                });
            }
        });

        return batch.commit();
    });

/**
 * Trigger to update global stats when a new word is added.
 */
exports.onWordCreated = functions.firestore
    .document("vocabulary/{wordId}")
    .onCreate(async (snap, context) => {
        const newValue = snap.data();
        const userId = newValue.userId;

        const userRef = db.collection("users").doc(userId);
        return userRef.update({
            "stats.totalWords": admin.firestore.FieldValue.increment(1),
            "stats.lastActive": admin.firestore.FieldValue.serverTimestamp()
        });
    });

/**
 * Callable function for premium user dictionary generation (AI sample)
 */
exports.generateAIRecommendations = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "User must be logged in.");
    }

    // Logic to call OpenAI/Gemini to suggest words based on user history
    // This is a placeholder for a real startup integration
    return {
        suggestions: [
            { word: "Cognizant", meaning: "Having knowledge or being aware of." },
            { word: "Languid", meaning: "Displaying or having a disinclination for physical exertion or effort." }
        ]
    };
});
