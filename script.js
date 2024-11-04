// List of quote sources
const quoteSources = [
    'https://api.quotable.io/random', // Quotable API
    'https://api.zenquotes.io/api/random', // Zen Quotes API
    'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', // Forismatic API
];

// Function to fetch a new quote from a random source
async function newQuote() {
    try {
        // Select a random source
        const randomSource = quoteSources[Math.floor(Math.random() * quoteSources.length)];
        const response = await fetch(randomSource);

        if (!response.ok) {
            throw new Error('Failed to fetch a new quote');
        }

        // Handle different responses based on the API
        let data;
        if (randomSource.includes('quotable')) {
            data = await response.json();
            document.getElementById('quote').innerText = `"${data.content}" – ${data.author}`;
        } else if (randomSource.includes('zenquotes')) {
            data = await response.json();
            document.getElementById('quote').innerText = `"${data[0].q}" – ${data[0].a}`;
        } else if (randomSource.includes('forismatic')) {
            data = await response.json();
            document.getElementById('quote').innerText = `"${data.quoteText}" – ${data.quoteAuthor}`;
        }
    } catch (error) {
        console.error('Error fetching new quote:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a new quote. Please try again later.';
    }
}

// Function to share the current quote
function shareQuote() {
    const quote = document.getElementById('quote').innerText;
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: quote,
        }).catch(() => console.log("Sharing failed or was canceled by the user."));
    } else {
        console.log("Sharing not supported on this browser.");
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Save dark mode preference in local storage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.removeItem('darkMode');
    }
}

// Check local storage for dark mode preference
window.onload = () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
};