/**
 * Background Service Worker for Vocaply
 * Handles: Context Menus, Alarms, Notifications, and API calls.
 */

// 1. Initial Setup on Install
chrome.runtime.onInstalled.addListener(() => {
    console.log("Vocaply Extension Installed");

    // Create Context Menu Item
    chrome.contextMenus.create({
        id: "add-to-vocaply",
        title: "Add '%s' to Vocaply",
        contexts: ["selection"]
    });

    // Set up Daily Reminder Alarm
    // Check once per minute for demo, but in production use periodInMinutes: 1440
    chrome.alarms.create("daily-reminder", {
        periodInMinutes: 1440,
        when: Date.now() + 60000
    });
});

// 2. Handle Context Menu Clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "add-to-vocaply") {
        const selectedText = info.selectionText;
        console.log("Word selected:", selectedText);

        // In production, trigger translation API and save to Firestore
        // For now, show a notification
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "Saving to Vocaply...",
            message: `Adding "${selectedText}" to your collection.`,
            priority: 2
        });

        // You can send a message to the content script or popup if needed
        // chrome.tabs.sendMessage(tab.id, { action: "word_captured", word: selectedText });
    }
});

// 3. Handle Daily Reminder Alarm
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "daily-reminder") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "Time to grow your vocabulary!",
            message: "Check your 2 new words of the day on Vocaply.",
            buttons: [
                { title: "Let's Go!" }
            ],
            priority: 1
        });
    }
});

// 4. Handle Notification Button Clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    // Open Dashboard on click
    chrome.tabs.create({ url: "https://vocaply.web.app/dashboard" });
});
