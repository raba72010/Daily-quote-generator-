// Function to fetch a random quote from an external API
async function fetchQuote() {
    try {
        console.log('Fetching new quote from API...');
        const response = await fetch('https://api.quotable.io/random'); // Primary API
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Quote fetched:', data);
        document.getElementById('quote').innerText = `${data.content} – ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a new quote. Please try again later.';
    }
}

// Alternative function to fetch quotes from a backup API
async function fetchQuoteBackup() {
    try {
        console.log('Fetching new quote from backup API...');
        const response = await fetch('https://zenquotes.io/api/random'); // Backup API
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const quote = data[0].q;
        const author = data[0].a;
        console.log('Backup quote fetched:', data);
        document.getElementById('quote').innerText = `${quote} – ${author}`;
    } catch (error) {
        console.error('Error fetching quote from backup API:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a new quote from backup source. Please try again later.';
    }
}

// Event handler for the "New Quote" button
document.getElementById('new-quote-btn').addEventListener('click', async () => {
    console.log('New Quote button clicked');
    await fetchQuote().catch(() => {
        console.log('Primary API failed, switching to backup API...');
        fetchQuoteBackup();
    });
});

// Function to share the current quote
function shareQuote() {
    const quoteElement = document.getElementById('quote');
    const quoteText = quoteElement.innerText;

    if (quoteText === "Click the button to generate a motivational quote!" || quoteText === "اضغط على الزر لعرض اقتباس تحفيزي!") {
        alert("Please generate a quote before sharing.");
        return;
    }

    // Share API for modern browsers
    if (navigator.share) {
        navigator.share({
            title: 'Motivational Quote',
            text: quoteText,
            url: window.location.href
        }).then(() => {
            console.log('Quote shared successfully');
        }).catch((error) => {
            console.error('Error sharing the quote:', error);
        });
    } else {
        // Fallback for browsers without the Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
        window.open(shareUrl, '_blank');
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log('Dark mode toggled');
}

// Function to toggle between English and Arabic
function toggleLanguage() {
    document.body.classList.toggle('rtl');
    const isArabic = document.body.classList.contains('rtl');

    document.getElementById('header-title').innerText = isArabic ? "مولد الاقتباسات" : "Quote Generator";
    document.getElementById('new-quote-btn').innerText = isArabic ? "اقتباس جديد" : "New Quote";
    document.getElementById('share-quote-btn').innerText = isArabic ? "مشاركة الاقتباس" : "Share Quote";
    document.getElementById('toggle-language').innerText = isArabic ? "English" : "عربي";
    document.getElementById('footer-text').innerText = isArabic ? "صنع بواسطة رباح مداني" : "Created by Rabah Madani";

    console.log('Language toggled to', isArabic ? 'Arabic' : 'English');
}

// Attach event listeners to buttons
document.getElementById('share-quote-btn').addEventListener('click', () => {
    console.log('Share Quote button clicked');
    shareQuote();
});

document.getElementById('toggle-language').addEventListener('click', () => {
    console.log('Toggle Language button clicked');
    toggleLanguage();
});

document.getElementById('darkModeToggle').addEventListener('click', () => {
    console.log('Dark Mode button clicked');
    toggleDarkMode();
});