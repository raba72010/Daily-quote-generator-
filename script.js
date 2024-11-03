const QUOTE_STORAGE_KEY = 'storedQuotes';

// Function to fetch a quote from ZenQuotes API and store it
async function fetchAndStoreQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');

        if (!response.ok) {
            document.getElementById('quote').innerText = `Error ${response.status}: ${response.statusText}`;
            console.error(`HTTP error! Status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Fetched Data:', data);

        if (data.length > 0) {
            const quote = {
                text: data[0].q, // Quote text
                author: data[0].a || 'Unknown' // Author
            };

            saveQuoteToLocalStorage(quote);
            displayQuote(quote);
        } else {
            console.warn('No quotes were returned from the API.');
            document.getElementById('quote').innerText = 'No quotes available at the moment.';
        }
    } catch (error) {
        console.error('An error occurred while fetching the quote:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a quote. Please check your connection and try again later.';
    }
}

// Function to save quotes to local storage
function saveQuoteToLocalStorage(quote) {
    let storedQuotes = JSON.parse(localStorage.getItem(QUOTE_STORAGE_KEY)) || [];
    storedQuotes.push(quote);
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(storedQuotes));
}

// Function to load and display a stored quote
function displayQuote(quote) {
    document.getElementById('quote').innerText = `${quote.text} – ${quote.author}`;
}

// Function to get and display the latest stored quote from local storage
function loadLastStoredQuote() {
    const storedQuotes = JSON.parse(localStorage.getItem(QUOTE_STORAGE_KEY));
    if (storedQuotes && storedQuotes.length > 0) {
        displayQuote(storedQuotes[storedQuotes.length - 1]);
    } else {
        document.getElementById('quote').innerText = 'Click the button to get your first quote!';
    }
}

// Load the last stored quote on page load
document.addEventListener('DOMContentLoaded', loadLastStoredQuote);

// Event listener for fetching a new quote
document.getElementById('new-quote-btn').addEventListener('click', fetchAndStoreQuote);

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log('Dark mode toggled');
}

// Attach event listener for dark mode button
document.getElementById('darkModeToggle').addEventListener('click', () => {
    toggleDarkMode();
});

// Share quote functionality
document.getElementById('share-quote-btn').addEventListener('click', () => {
    const quoteElement = document.getElementById('quote').innerText;
    if (navigator.share) {
        navigator.share({
            title: 'Motivational Quote',
            text: quoteElement,
            url: window.location.href
        }).then(() => {
            console.log('Quote shared successfully');
        }).catch((error) => {
            console.error('Error sharing the quote:', error);
        });
    } else {
        alert('Sharing is not supported on this browser.');
    }
});