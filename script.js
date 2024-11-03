// API key for the API Ninjas Quotes API
const API_NINJAS_URL = 'https://api.api-ninjas.com/v1/quotes?category=inspirational';
const API_NINJAS_KEY = 'qNTM4mVdrBxgl03u5uc+4g==pc2B41oPw2e19NB8'; // Your provided API key

// Function to fetch a random quote from the API Ninjas Quotes API
async function fetchQuote() {
    try {
        console.log('Fetching new quote from API Ninjas...');
        const response = await fetch(API_NINJAS_URL, {
            headers: {
                'X-Api-Key': API_NINJAS_KEY // Include your API key here
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Quote fetched:', data);
        const quote = data[0].quote;
        const author = data[0].author || 'Unknown';
        document.getElementById('quote').innerText = `${quote} – ${author}`;
    } catch (error) {
        console.error('Error fetching quote from API Ninjas:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a new quote. Please try again later.';
        // Fallback to the backup API
        fetchQuoteBackup();
    }
}

// Alternative function to fetch quotes from a backup API
async function fetchQuoteBackup() {
    try {
        console.log('Fetching new quote from backup API (ZenQuotes)...');
        const response = await fetch('https://zenquotes.io/api/random');
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
    await fetchQuote();
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

// Attach event listeners to buttons
document.getElementById('share-quote-btn').addEventListener('click', () => {
    console.log('Share Quote button clicked');
    shareQuote();
});


document.getElementById('darkModeToggle').addEventListener('click', () => {
    console.log('Dark Mode button clicked');
    toggleDarkMode();
});