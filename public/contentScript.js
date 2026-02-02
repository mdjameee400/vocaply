/**
 * Content Script for Vocaply
 * Injected into every page to handle visual feedback and selection tracking.
 */

console.log("Vocaply Content Script Active");

// Listen for selection changes to show a floating button (Premium UI)
document.addEventListener("mouseup", (event) => {
    const selection = window.getSelection().toString().trim();

    if (selection.length > 0 && selection.length < 50) {
        // Show a floating "V" button near the selection
        // Implementation details: create a div, style it, add click listener
        console.log("Selection caught:", selection);
    }
});

// Receive messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "word_captured") {
        // Show a success toast on the webpage itself
        const toast = document.createElement('div');
        toast.textContent = `Saved: ${request.word}`;
        toast.className = 'vocaply-toast-success';
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    }
});
